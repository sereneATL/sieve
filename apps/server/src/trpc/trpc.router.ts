import { INestApplication, Injectable } from '@nestjs/common';
import { z } from 'zod';
import { TrpcService } from '@/server/trpc/trpc.service';
import * as trpcExpress from '@trpc/server/adapters/express';
import { UserProfilesService } from '../modules/userProfiles/userProfiles.service';
import { MusicPreferencesService } from '../modules/musicPreferences/musicPreferences.service';

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly userProfilesService: UserProfilesService,
    private readonly musicPreferencesService: MusicPreferencesService,
  ) {}

  appRouter = this.trpc.router({
    user: this.trpc.procedure
      .input(
        z.object({
          email: z.string(),
        }),
      ).query(async ({ input }) => {
        return {
          data: await this.userProfilesService.getUserProfile(input),
        };
      }),

    createUser: this.trpc.procedure
      .input(
        z.object({
          email: z.string(),
          gender: z.enum(["MALE", "FEMALE"]),
          age: z.number().min(18).max(80),
          personalityType: z.enum(["INTROVERT", "EXTROVERT", "AMBIVERT"]),
          sportsScore: z.number().min(0),
          artsEntertainmentScore: z.number().min(0),
          outdoorActivitiesScore: z.number().min(0),
          technologyGamingScore: z.number().min(0),
          culinaryArtsScore: z.number().min(0),
          wellnessFitnessScore: z.number().min(0),
          otherHobbies: z.number().min(0),
          genderPreference: z.enum(["MALE", "FEMALE", "ALL"]),
          samePersonalityPreference: z.boolean(),
          sameMusicTypePreference: z.number().min(0).max(3),
          minAgePreference: z.number().min(18).max(80),
          maxAgePreference: z.number().min(18).max(80),
        }),
      ).mutation(async ({input}) => {
          return {
            data: await this.userProfilesService.createUserProfile(input),
          }
      }),

    otherUsers: this.trpc.procedure
      .input(
        z.object({
          userId: z.number(),
        }),
      ).query(async ({ input }) => {
        return {
          data: await this.userProfilesService.getAllUserProfilesExceptMyself(input),
        };
      }),

    userMusicPreferences: this.trpc.procedure
      .input(
        z.object({
          userId: z.number(),
        }),
      ).query(async ({ input }) => {
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

        }),
      ).mutation(async ({input}) => {
          return {
            data: await this.musicPreferencesService.createMusicPreferences(input),
          }
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
