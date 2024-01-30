import { PrismaService } from '@/server/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { Match, Prisma } from '@prisma/client';

@Injectable()
export class MatchesRepository {
    constructor(private prisma: PrismaService){}

    async createMatch(params: { data: Prisma.MatchCreateInput }): Promise<Match> {
        const { data } = params;
        return this.prisma.match.create({ data });
    }
    
    async getMatches(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.MatchWhereUniqueInput;
        where?: Prisma.MatchWhereInput;
        orderBy?: Prisma.MatchOrderByWithRelationInput;
      }): Promise<Match[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.match.findMany({ skip, take, cursor, where, orderBy });
    }
    
    async updateMatch(params: {
        where: Prisma.MatchWhereUniqueInput;
        data: Prisma.MatchUpdateInput;
      }): Promise<Match> {
        const { where, data } = params;
        return this.prisma.match.update({ where, data });
    }
}
