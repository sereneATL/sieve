import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config/configuration';
import { TrpcModule } from '@/server/trpc/trpc.module';
import { TrpcService } from '@/server/trpc/trpc.service';
import { MatchesModule } from './modules/matches/matches.module';
import { UserProfilesModule } from './modules/userProfiles/userProfiles.module';
import { UserProfilesService } from './modules/userProfiles/userProfiles.service';
import { MatchesService } from './modules/matches/matches.service';
import { PrismaService } from './database/prisma.service';
import { PrismaModule } from './database/prisma.module';
import { UserProfilesRepository } from './modules/userProfiles/userProfiles.repository';
import { MatchesRepository } from './modules/matches/matches.repository';
import { MusicPreferencesService } from './modules/musicPreferences/musicPreferences.service';
import { MusicPreferencesModule } from './modules/musicPreferences/musicPreferences.module';
import { MusicPreferencesRepository } from './modules/musicPreferences/musicPreferences.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TrpcModule,
    PrismaModule,
    MatchesModule,
    UserProfilesModule,
    MusicPreferencesModule,
  ],
  controllers: [],
  providers: [
    TrpcService,
    UserProfilesService,
    MusicPreferencesService,
    MatchesService,
    UserProfilesRepository,
    MusicPreferencesRepository,
    MatchesRepository,
    PrismaService,
  ],
})
export class AppModule {}
