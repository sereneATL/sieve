import { INestApplication, Injectable } from '@nestjs/common';
import { z } from 'zod';
import { TrpcService } from '@/server/trpc/trpc.service';
import * as trpcExpress from '@trpc/server/adapters/express';
import { UserProfilesService } from '@/server/modules/userProfiles/userProfiles.service';
import { MusicPreferencesService } from '@/server/modules/musicPreferences/musicPreferences.service';
import { MatchesService } from '@/server/modules/matches/matches.service';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly userProfilesService: UserProfilesService,
    private readonly musicPreferencesService: MusicPreferencesService,
    private readonly matchesService: MatchesService,
  ) {}

  appRouter = this.trpc.router({
    user: this.trpc.procedure
      .input(
        z.object({
          email: z.string(),
        }),
      )
      .query(async ({ input }) => {
        const data = await this.userProfilesService.getUserProfile(input);

        if (!data) {
          return { error: 'user not found' };
        }
        return { data };
      }),

    createUser: this.trpc.procedure
      .input(
        z.object({
          email: z.string(),
          name: z.string(),
          gender: z.enum(['MALE', 'FEMALE']),
          age: z.number().min(18).max(80),
          profilePicture: z.string(),
          personalityType: z.enum(['INTROVERT', 'EXTROVERT', 'AMBIVERT']),
          sportsScore: z.number().min(0),
          artsEntertainmentScore: z.number().min(0),
          outdoorActivitiesScore: z.number().min(0),
          technologyGamingScore: z.number().min(0),
          culinaryArtsScore: z.number().min(0),
          wellnessFitnessScore: z.number().min(0),
          otherHobbies: z.number().min(0),
          genderPreference: z.enum(['MALE', 'FEMALE', 'ALL']),
          samePersonalityPreference: z.boolean(),
          sameMusicTypePreference: z.number().min(0).max(3),
          minAgePreference: z.number().min(18).max(80),
          maxAgePreference: z.number().min(18).max(80),
        }),
      )
      .mutation(async ({ input }) => {
        return {
          data: await this.userProfilesService.createUserProfile(input),
        };
      }),

    userMusicPreferences: this.trpc.procedure
      .input(
        z.object({
          userId: z.number(),
        }),
      )
      .query(async ({ input }) => {
        return {
          data: await this.musicPreferencesService.getMusicPreferences(input),
        };
      }),

    createUserMusicPreferences: this.trpc.procedure
      .input(
        z.object({
          userId: z.number(),
          topGenres: z.array(z.string()),
          topArtists: z.array(z.string()),
          topTracksString: z.array(z.string()),
          topTracksId: z.array(z.string()),
          acousticnessScore: z.number(),
          danceabilityScore: z.number(),
          energyScore: z.number(),
          instrumentalnessScore: z.number(),
          livenessScore: z.number(),
          speechinessScore: z.number(),
          valenceScore: z.number(),
        }),
      )
      .mutation(async ({ input }) => {
        return {
          data: await this.musicPreferencesService.createMusicPreferences(
            input,
          ),
        };
      }),

    possibleMatches: this.trpc.procedure
      .input(
        z.object({
          email: z.string(),
        }),
      )
      .query(async ({ input }) => {
        return {
          data: await this.userProfilesService.getPossibleMatches(input),
        };
      }),

    acceptMatch: this.trpc.procedure
      .input(
        z.object({
          user1Id: z.number(),
          user2Id: z.number(),
          matchScore: z.any(),
        }),
      )
      .mutation(async ({ input }) => {
        const { matchScore, ...inputWithoutMatch } = input;
        return {
          data: await this.matchesService.acceptMatch({
            matchScore: new Decimal(matchScore),
            ...inputWithoutMatch,
          }),
        };
      }),

    rejectMatch: this.trpc.procedure
      .input(
        z.object({
          user1Id: z.number(),
          user2Id: z.number(),
          matchScore: z.any(),
        }),
      )
      .mutation(async ({ input }) => {
        const { matchScore, ...inputWithoutMatch } = input;
        return {
          data: await this.matchesService.rejectMatch({
            matchScore: new Decimal(matchScore),
            ...inputWithoutMatch,
          }),
        };
      }),

    getSuccessfulMatches: this.trpc.procedure
      .input(
        z.object({
          email: z.string(),
        }),
      )
      .query(async ({ input }) => {
        return {
          data: await this.matchesService.getSuccessfulMatches(input),
        };
      }),
  });

  async applyMiddleware(app: INestApplication) {
    app.use(
      `/trpc`,
      trpcExpress.createExpressMiddleware({
        router: this.appRouter,
      }),
    );
  }
}

export type AppRouter = TrpcRouter[`appRouter`];
