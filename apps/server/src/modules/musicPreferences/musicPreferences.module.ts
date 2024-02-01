import { Module } from '@nestjs/common';

import { MusicPreferencesRepository } from './musicPreferences.repository';
import { PrismaModule } from '@/server/database/prisma.module';
import { MusicPreferencesService } from './musicPreferences.service';

@Module({
  imports: [PrismaModule],
  providers: [MusicPreferencesRepository, MusicPreferencesService],
  exports: [MusicPreferencesService],
})
export class MusicPreferencesModule {}
