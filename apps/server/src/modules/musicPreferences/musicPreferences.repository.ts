import { PrismaService } from '@/server/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { MusicPreferences, Prisma } from '@prisma/client';

@Injectable()
export class MusicPreferencesRepository {
    constructor(private prisma: PrismaService){}

    async createMusicPreferences(params: { data: Prisma.MusicPreferencesCreateInput }): Promise<MusicPreferences> {
        const { data } = params;
        return this.prisma.musicPreferences.create({ data });
    }
    
    async getMusicPreferences(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.MusicPreferencesWhereUniqueInput;
        where?: Prisma.MusicPreferencesWhereInput;
        orderBy?: Prisma.MusicPreferencesOrderByWithRelationInput;
      }): Promise<MusicPreferences[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.musicPreferences.findMany({ skip, take, cursor, where, orderBy });
    }
    
    async updateMusicPreferences(params: {
        where: Prisma.MusicPreferencesWhereUniqueInput;
        data: Prisma.MusicPreferencesUpdateInput;
      }): Promise<MusicPreferences> {
        const { where, data } = params;
        return this.prisma.musicPreferences.update({ where, data });
    }
}
