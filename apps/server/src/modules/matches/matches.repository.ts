import { PrismaService } from '@/server/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { Match, Prisma } from '@prisma/client';

export type MatchWithUser1User2 = Prisma.MatchGetPayload<{
  include: {
    user1: true;
    user2: true;
  };
}>;

@Injectable()
export class MatchesRepository {
  constructor(private prisma: PrismaService) {}

  async createMatch(params: { data: Prisma.MatchCreateInput }): Promise<Match> {
    const { data } = params;
    return this.prisma.match.create({ data });
  }

  async findMatch(params: {
    where: Prisma.MatchWhereInput;
  }): Promise<Match | null> {
    const { where } = params;
    return this.prisma.match.findFirst({ where });
  }

  async getMatches(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.MatchWhereUniqueInput;
    where?: Prisma.MatchWhereInput;
    orderBy?: Prisma.MatchOrderByWithRelationInput;
    include?: Prisma.MatchInclude;
    select?: Prisma.MatchSelect;
  }): Promise<Array<Match | MatchWithUser1User2>> {
    const { skip, take, cursor, where, orderBy, include } = params;
    return this.prisma.match.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include,
    });
  }

  async updateMatch(params: {
    where: Prisma.MatchWhereUniqueInput;
    data: Prisma.MatchUpdateInput;
  }): Promise<Match> {
    const { where, data } = params;
    return this.prisma.match.update({ where, data });
  }
}
