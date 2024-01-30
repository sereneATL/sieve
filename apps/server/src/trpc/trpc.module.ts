import { Module } from '@nestjs/common';
import { TrpcService } from '@/server/trpc/trpc.service';
import { TrpcRouter } from '@/server/trpc/trpc.router';
import { UserProfilesService } from '../modules/userProfiles/userProfiles.service';
import { MatchesService } from '../modules/matches/matches.service';
import { UserProfilesModule } from '../modules/userProfiles/userProfiles.module';
import { MatchesModule } from '../modules/matches/matches.module';
import { UserProfilesRepository } from '../modules/userProfiles/userProfiles.repository';
import { MatchesRepository } from '../modules/matches/matches.repository';
import { PrismaService } from '../database/prisma.service';
import { MusicPreferencesService } from '../modules/musicPreferences/musicPreferences.service';
import { MusicPreferencesRepository } from '../modules/musicPreferences/musicPreferences.repository';


@Module({
  imports: [],
  controllers: [],
  providers: [TrpcService, TrpcRouter, UserProfilesService, MusicPreferencesService, MatchesService, UserProfilesRepository, MusicPreferencesRepository, MatchesRepository,PrismaService ],
  exports: [UserProfilesService, MusicPreferencesService, MatchesService]
})
export class TrpcModule {}
