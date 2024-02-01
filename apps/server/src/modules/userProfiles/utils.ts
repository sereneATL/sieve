import { MusicPreferences, UserProfile } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

interface InterestWeights {
    sportsWeight: number;
    artsEntertainmentWeight: number;
    outdoorActivitiesWeight: number;
    technologyGamingWeight: number;
    culinaryArtsWeight: number;
    wellnessFitnessWeight: number;
    otherHobbiesWeight: number;
};

interface AudioFeatureWeights {
    acousticnessWeight: number;
    danceabilityWeight: number;
    energyWeight: number;
    instrumentalnessWeight: number;
    livenessWeight: number;
    speechinessWeight: number;
    valenceWeight: number;
  };

export interface MatchWithSimilarity {
    id: number;
    matchScore: Decimal;
}
  
function generateRandomWeights(): InterestWeights {
    return {
        sportsWeight: Math.random(),
        artsEntertainmentWeight: Math.random(),
        outdoorActivitiesWeight: Math.random(),
        technologyGamingWeight: Math.random(),
        culinaryArtsWeight: Math.random(),
        wellnessFitnessWeight: Math.random(),
        otherHobbiesWeight: Math.random(),
    };
}

function calculateMagnitude(user: UserProfile, weights: InterestWeights): number {
    return Math.sqrt(
        Math.pow(weights.sportsWeight * user.sportsScore, 2) +
        Math.pow(weights.artsEntertainmentWeight * user.artsEntertainmentScore, 2) +
        Math.pow(weights.outdoorActivitiesWeight * user.outdoorActivitiesScore, 2) +
        Math.pow(weights.technologyGamingWeight * user.technologyGamingScore, 2) +
        Math.pow(weights.culinaryArtsWeight * user.culinaryArtsScore, 2) +
        Math.pow(weights.wellnessFitnessWeight * user.wellnessFitnessScore, 2) +
        Math.pow(weights.otherHobbiesWeight * user.otherHobbies, 2),
    );
}

function calculateCosineSimilarity(
    user1: UserProfile,
    user2: UserProfile,
    weights: InterestWeights,
  ): number {
    const dotProduct =
        weights.sportsWeight * user1.sportsScore * user2.sportsScore +
        weights.artsEntertainmentWeight * user1.artsEntertainmentScore * user2.artsEntertainmentScore +
        weights.outdoorActivitiesWeight * user1.outdoorActivitiesScore * user2.outdoorActivitiesScore +
        weights.technologyGamingWeight * user1.technologyGamingScore * user2.technologyGamingScore +
        weights.culinaryArtsWeight * user1.culinaryArtsScore * user2.culinaryArtsScore +
        weights.wellnessFitnessWeight * user1.wellnessFitnessScore * user2.wellnessFitnessScore +
        weights.otherHobbiesWeight * user1.otherHobbies * user2.otherHobbies;
  
    // calculate the magnitude of each user's interest vector
    const magnitudeUser1 = calculateMagnitude(user1, weights);
    const magnitudeUser2 = calculateMagnitude(user2, weights);
  
    // calculate the cosine similarity
    const cosineSimilarity = dotProduct / (magnitudeUser1 * magnitudeUser2);
  
    return cosineSimilarity;
}

export function calculateCompatibilityScore(
    user1: UserProfile,
    user2: UserProfile,
  ): number {
    // generate random weights
    const weights = generateRandomWeights();
  
    // calculate the cosine similarity between the two users' interest scores
    const compatibilityScore = calculateCosineSimilarity(user1, user2, weights);

    return compatibilityScore;
}
  
function generateRandomAudioWeights(): AudioFeatureWeights {
    return {
        acousticnessWeight: Math.random(),
        danceabilityWeight: Math.random(),
        energyWeight: Math.random(),
        instrumentalnessWeight: Math.random(),
        livenessWeight: Math.random(),
        speechinessWeight: Math.random(),
        valenceWeight: Math.random(),
    };
}

function calculateAudioMagnitude(musicPreference: MusicPreferences, weights: AudioFeatureWeights): number {
    return Math.sqrt(
        Math.pow(weights.acousticnessWeight * musicPreference.acousticnessScore, 2) +
        Math.pow(weights.danceabilityWeight * musicPreference.danceabilityScore, 2) +
        Math.pow(weights.energyWeight * musicPreference.energyScore, 2) +
        Math.pow(weights.instrumentalnessWeight * musicPreference.instrumentalnessScore, 2) +
        Math.pow(weights.livenessWeight * musicPreference.livenessScore, 2) +
        Math.pow(weights.speechinessWeight * musicPreference.speechinessScore, 2) +
        Math.pow(weights.valenceWeight * musicPreference.valenceScore, 2),
    );
}

function calculateAudioCosineSimilarity(
    user1MusicPreference: MusicPreferences,
    user2MusicPreference: MusicPreferences,
    weights: AudioFeatureWeights,
    different: boolean
  ): number {
    const dotProduct =
        weights.acousticnessWeight * user1MusicPreference.acousticnessScore * user2MusicPreference.acousticnessScore +
        weights.danceabilityWeight * user1MusicPreference.danceabilityScore * user2MusicPreference.danceabilityScore +
        weights.energyWeight * user1MusicPreference.energyScore * user2MusicPreference.energyScore +
        weights.instrumentalnessWeight * user1MusicPreference.instrumentalnessScore * user2MusicPreference.instrumentalnessScore +
        weights.livenessWeight * user1MusicPreference.livenessScore * user2MusicPreference.livenessScore +
        weights.speechinessWeight * user1MusicPreference.speechinessScore * user2MusicPreference.speechinessScore +
        weights.valenceWeight * user1MusicPreference.valenceScore * user2MusicPreference.valenceScore;
  
    // calculate the magnitude of each user's interest vector
    const magnitudeUser1 = calculateAudioMagnitude(user1MusicPreference, weights);
    const magnitudeUser2 = calculateAudioMagnitude(user2MusicPreference, weights);
  
    // calculate the cosine similarity
    const cosineSimilarity = dotProduct / (magnitudeUser1 * magnitudeUser2);
  
    return different ? (-1 *cosineSimilarity) : cosineSimilarity;
}

export function calculateAudioFeatureCompatibilityScore(
    user1MusicPreference: MusicPreferences,
    user2MusicPreference: MusicPreferences,
    different?: boolean
  ): number {
    // generate random weights
    const weights = generateRandomAudioWeights();
  
    // calculate the cosine similarity between the two users' interest scores
    const compatibilityScore = calculateAudioCosineSimilarity(user1MusicPreference, user2MusicPreference, weights, different || false);

    return compatibilityScore;
}

export function calculateDesirability(successfulMatches: MatchWithSimilarity[], totalMatches: number): number {
    // weight for the number of successful matches
    const matchCountWeight = Math.random();
  
    // weight for the average similarity score
    const similarityScoreWeight = Math.random();

    // calculate the average similarity score of successful matches
    const totalSimilarity = successfulMatches.reduce((sum, match) => sum + Number(match.matchScore), 0);
    const averageSimilarity = totalSimilarity / successfulMatches.length;

    // Calculate the desirability score
    const desirabilityScore = matchCountWeight * (successfulMatches.length / totalMatches) + similarityScoreWeight * averageSimilarity;

    return desirabilityScore;
  
  }

export function calculatePriorityScore(createdAt: Date): number {
    // weight for user join date
    const joinDateWeight = 0.5;

    // calculate match's join date score (higher if joined recently)
    const currentDate = new Date();
    const daysSinceJoin = Math.floor((currentDate.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
    const joinDateScore = 1 / (1 + daysSinceJoin);

    // Calculate priority score using the weighted sum
    const priorityScore = joinDateWeight * joinDateScore;

    return priorityScore;
}
  
  