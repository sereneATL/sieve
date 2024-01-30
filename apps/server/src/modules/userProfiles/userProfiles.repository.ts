import { PrismaService } from '@/server/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { UserProfile, Prisma } from '@prisma/client';

@Injectable()
export class UserProfilesRepository {
    constructor(private prisma: PrismaService){}

    async createUserProfile(params: { data: Prisma.UserProfileCreateInput }): Promise<UserProfile> {
        const { data } = params;
        return this.prisma.userProfile.create({ data });
    }

    async getUserProfile(params: {
        where: Prisma.UserProfileWhereUniqueInput;
      }): Promise<UserProfile | null> {
        const { where } = params;
        return this.prisma.userProfile.findUnique({where});
    }
    
    async getAllUserProfiles(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserProfileWhereUniqueInput;
        where?: Prisma.UserProfileWhereInput;
        orderBy?: Prisma.UserProfileOrderByWithRelationInput;
      }): Promise<UserProfile[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.userProfile.findMany({ skip, take, cursor, where, orderBy });
    }
    
    async updateUserProfile(params: {
        where: Prisma.UserProfileWhereUniqueInput;
        data: Prisma.UserProfileUpdateInput;
      }): Promise<UserProfile> {
        const { where, data } = params;
        return this.prisma.userProfile.update({ where, data });
    }
}
