import { Module } from '@nestjs/common';

import { UserProfilesRepository } from './userProfiles.repository';
import { PrismaModule } from '@/server/database/prisma.module';
import { UserProfilesService } from './userProfiles.service';

@Module({
    imports: [PrismaModule],
    providers: [UserProfilesRepository, UserProfilesService],
    exports: [UserProfilesService]
})
export class UserProfilesModule{}
