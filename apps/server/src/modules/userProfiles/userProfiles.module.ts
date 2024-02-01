import { Module } from '@nestjs/common';

import { UserProfilesRepository } from '@/server/modules/userProfiles/userProfiles.repository';
import { PrismaModule } from '@/server/database/prisma.module';
import { UserProfilesService } from '@/server/modules/userProfiles/userProfiles.service';
import { MusicPreferencesRepository } from '@/server/modules/musicPreferences/musicPreferences.repository';
import { MatchesRepository } from '@/server/modules/matches/matches.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    UserProfilesRepository,
    UserProfilesService,
    UserProfilesRepository,
    MusicPreferencesRepository,
    MatchesRepository,
  ],
  exports: [UserProfilesService],
})
export class UserProfilesModule {}
