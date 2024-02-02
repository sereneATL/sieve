import { Injectable } from '@nestjs/common';
import {
  UserProfilesRepository,
  UserWithMusicPreferences,
} from './userProfiles.repository';
import { MatchStatus, UserProfile } from '@prisma/client';
import { MatchesRepository } from '@/server/modules/matches/matches.repository';
import { MusicPreferencesRepository } from '@/server/modules/musicPreferences/musicPreferences.repository';
import {
  MatchWithSimilarity,
  calculateAudioFeatureCompatibilityScore,
  calculateCompatibilityScore,
  calculateDesirability,
  calculatePriorityScore,
} from './utils';

export interface CardData {
  id: number;
  name: string;
  profilePicture: string;
  age: number;
  gender: string;
  personalityType: string;
  matchScore: number;
  topGenres?: string[];
  topArtists?: string[];
  topTracksId?: string[];
}

@Injectable()
export class UserProfilesService {
  constructor(
    private userRepository: UserProfilesRepository,
    private matchesRepository: MatchesRepository,
  ) {}

  async createUserProfile(
    params: Omit<
      UserProfile,
      'id' | 'createdAt' | 'updatedAt' | 'matchAsUser1' | 'matchAsUser2'
    >,
  ): Promise<UserProfile> {
    const userProfile = await this.userRepository.createUserProfile({
      data: {
        ...params,
      },
    });

    return userProfile;
  }

  async getUserProfile(params: {
    email: UserProfile[`email`];
  }): Promise<UserProfile | null> {
    const { email } = params;
    return await this.userRepository.getUserProfile({
      where: {
        email,
      },
    });
  }

  async getPossibleMatches(params: {
    email: UserProfile[`email`];
  }): Promise<Array<CardData>> {
    // get current user
    const currentUser = await this.userRepository.getUserProfile({
      where: { email: params.email },
      include: { musicPreferences: true },
    });

    if (!currentUser) {
      throw new Error('User not found');
    }

    // get all potential matches, filtered by gender and age preferences
    const potentialMatches = await this.userRepository.getAllUserProfiles({
      where: {
        age: {
          gte: currentUser.minAgePreference,
          lte: currentUser.maxAgePreference,
        },
        id: {
          not: currentUser.id, // exclude the current user
        },
        NOT: {
          musicPreferences: null
        },
        ...(currentUser.genderPreference != 'ALL'
          ? { gender: currentUser.genderPreference }
          : {}),
      },
      include: { musicPreferences: true },
    });

    if (potentialMatches.length === 0) return [];

    const newMatches = await Promise.all(
      potentialMatches.map(async (potentialMatch) => {
        // check for previous interactions (already accepted or rejected)
        const hasPreviousInteraction = await this.matchesRepository.findMatch({
          where: {
            OR: [
              {
                user1Id: currentUser.id,
                user2Id: potentialMatch.id,
              },
              {
                user1Id: potentialMatch.id,
                user2Id: currentUser.id,
                NOT: {
                  matchStatus: MatchStatus.PENDING,
                },
              },
            ],
          },
        });

        return !hasPreviousInteraction;
      }),
    );

    // filter the matches array to get only the ones without previous interactions
    const filteredMatches = potentialMatches.filter(
      (_, index) => newMatches[index],
    );

    const matches = filteredMatches.map(async (potentialMatch) => {
      // calculate compatibility score - user's interests
      const compatibilityScore = calculateCompatibilityScore(
        currentUser,
        potentialMatch,
      );

      // calculate personality preference score - if specified
      const personalityPreferenceScore =
        currentUser.samePersonalityPreference &&
        currentUser.personalityType === potentialMatch.personalityType
          ? Math.random()
          : 0;

      // calculate compatibility score - music taste preference
      const audioCompatibilityScore = calculateAudioFeatureCompatibilityScore(
        (currentUser as UserWithMusicPreferences).musicPreferences!,
        (potentialMatch as UserWithMusicPreferences).musicPreferences!,
      );

      // consider desirability of potential match based on past successful matches
      const acceptedUserMatches = await this.matchesRepository.getMatches({
        where: {
          OR: [
            { user1Id: potentialMatch.id, matchStatus: 'ACCEPTED' },
            { user2Id: potentialMatch.id, matchStatus: 'ACCEPTED' },
          ],
        },
        select: { id: true, matchScore: true },
      });

      const totalMatches = await this.matchesRepository.getMatches({});

      // combine potential match's successful matches from both relations
      const allSuccessfulMatches: Array<MatchWithSimilarity> =
        acceptedUserMatches.map((match) => ({
          id: match.id,
          matchScore: match.matchScore,
        }));

      const desirabilityScore =
        allSuccessfulMatches.length === 0
          ? 0
          : calculateDesirability(allSuccessfulMatches, totalMatches.length);

      // prioritize matches where the other user has already accepted the current user
      const potentialMatchPending = await this.matchesRepository.getMatches({
        where: {
          OR: [
            {
              user1Id: potentialMatch.id,
              user2Id: currentUser.id,
              matchStatus: 'PENDING',
            },
            {
              user1Id: currentUser.id,
              user2Id: potentialMatch.id,
              matchStatus: 'PENDING',
            },
          ],
        },
      });

      // calculate match acceptance score (1 if the other user has already accepted, in which case the status is PENDING, 0 if not)
      // give random weight of 0.7
      const matchAcceptanceScore = potentialMatchPending.length ? 1 : 0;
      const matchPriority = 0.7 * matchAcceptanceScore;

      // give priority to users who joined recently
      const joinDatePriority = calculatePriorityScore(potentialMatch.createdAt);

      // calculate the final score
      const finalScore =
        personalityPreferenceScore * Math.random() +
        audioCompatibilityScore +
        compatibilityScore +
        desirabilityScore +
        matchPriority +
        joinDatePriority;

      return {
        matchScore: finalScore,
        potentialMatch: potentialMatch.email,
      };
    });

    const promises = await Promise.all(matches);
    const sortedArray = promises.sort((a, b) => b.matchScore - a.matchScore);

    const finalArray = sortedArray!.slice(0, 10);

    const userProfilePromises: Promise<UserWithMusicPreferences>[] =
      finalArray!.map(async (current) => {
        return (await this.userRepository.getUserProfile({
          where: { email: current.potentialMatch },
          include: { musicPreferences: true },
        })) as UserWithMusicPreferences;
      });

    const userProfileDetails = await Promise.all(userProfilePromises);

    const matchesAsCards = userProfileDetails.map((match, index) => ({
      ...match,
      matchScore: finalArray[index].matchScore,
      topGenres: match.musicPreferences?.topGenres.slice(0, 6),
      topArtists: match.musicPreferences?.topArtists.slice(0, 8),
      topTracksId: match.musicPreferences?.topTracksId.slice(0, 8),
    }));

    return matchesAsCards;
  }
}
