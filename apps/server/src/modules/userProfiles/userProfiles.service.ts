import { Injectable } from '@nestjs/common';
import { UserProfilesRepository } from './userProfiles.repository';
import { UserProfile } from '@prisma/client';

@Injectable()
export class UserProfilesService {
    constructor(private repository: UserProfilesRepository) {}

    async createUserProfile(
        params: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt' | 'matchAsUser1' | 'matchAsUser2'>
    ): Promise<UserProfile> {

        const userProfile = await this.repository.createUserProfile({
          data: {
            ...params
          }
        });
        
        return userProfile;
    }

    async getUserProfile(params: {
        email: UserProfile[`email`]
    }): Promise<UserProfile | null> {
        const { email } = params;
        return await this.repository.getUserProfile({
            where: {
                email
            }
        })
    }

    // turn to get potential matches
    async getAllUserProfilesExceptMyself(params: {
        userId: UserProfile[`id`];
    }) {
        const tweets = await this.repository.getAllUserProfiles({
            where: {
                id: {
                    not: params.userId
                }
            }
        });
        return tweets;
    }

}
