import { Module } from '@nestjs/common';

import { MatchesRepository } from './matches.repository';
import { PrismaModule } from '@/server/database/prisma.module';
import { MatchesService } from './matches.service';

@Module({
    imports: [PrismaModule],
    providers: [MatchesRepository, MatchesService],
    exports: [MatchesService]
})
export class MatchesModule {}
