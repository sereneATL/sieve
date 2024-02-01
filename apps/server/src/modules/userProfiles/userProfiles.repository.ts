import { PrismaService } from '@/server/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { UserProfile, Prisma } from '@prisma/client';

export type UserWithMusicPreferences = Prisma.UserProfileGetPayload<{
  include: {
    musicPreferences: true;
  };
}>;

@Injectable()
export class UserProfilesRepository {
  constructor(private prisma: PrismaService) {}

  async createUserProfile(params: {
    data: Prisma.UserProfileCreateInput;
  }): Promise<UserProfile> {
    const { data } = params;
    return this.prisma.userProfile.create({ data });
  }

  async getUserProfile(params: {
    where: Prisma.UserProfileWhereUniqueInput;
    include?: Prisma.UserProfileInclude;
  }): Promise<UserWithMusicPreferences | UserProfile | null> {
    const { where, include } = params;
    return this.prisma.userProfile.findUnique({ where, include });
  }

  async getAllUserProfiles(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserProfileWhereUniqueInput;
    where?: Prisma.UserProfileWhereInput;
    orderBy?: Prisma.UserProfileOrderByWithRelationInput;
    include?: Prisma.UserProfileInclude;
  }): Promise<Array<UserWithMusicPreferences | UserProfile>> {
    const { skip, take, cursor, where, orderBy, include } = params;
    return this.prisma.userProfile.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include,
    });
  }

  async updateUserProfile(params: {
    where: Prisma.UserProfileWhereUniqueInput;
    data: Prisma.UserProfileUpdateInput;
  }): Promise<UserProfile> {
    const { where, data } = params;
    return this.prisma.userProfile.update({ where, data });
  }
}
