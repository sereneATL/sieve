import { Module } from '@nestjs/common';
import { TrpcService } from '@/server/trpc/trpc.service';
import { TrpcRouter } from '@/server/trpc/trpc.router';
import { UserProfilesService } from '@/server/modules/userProfiles/userProfiles.service';
import { MatchesService } from '@/server/modules/matches/matches.service';
import { UserProfilesRepository } from '@/server/modules/userProfiles/userProfiles.repository';
import { MatchesRepository } from '@/server/modules/matches/matches.repository';
import { PrismaService } from '@/server/database/prisma.service';
import { MusicPreferencesService } from '@/server/modules/musicPreferences/musicPreferences.service';
import { MusicPreferencesRepository } from '@/server/modules/musicPreferences/musicPreferences.repository';


@Module({
  imports: [],
  controllers: [],
  providers: [TrpcService, TrpcRouter, UserProfilesService, MusicPreferencesService, MatchesService, UserProfilesRepository, MusicPreferencesRepository, MatchesRepository,PrismaService ],
  exports: [UserProfilesService, MusicPreferencesService, MatchesService]
})
export class TrpcModule {}
