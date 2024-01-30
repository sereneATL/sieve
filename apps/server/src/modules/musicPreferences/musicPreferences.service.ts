import { Injectable } from '@nestjs/common';
import { MusicPreferencesRepository } from './musicPreferences.repository';
import { MusicPreferences, UserProfile } from '@prisma/client';

@Injectable()
export class MusicPreferencesService {
    constructor(private repository: MusicPreferencesRepository) {}

    async createMusicPreferences(
        params: Omit<MusicPreferences, 'id' | 'createdAt' | 'updatedAt'>
    ): Promise<MusicPreferences> {
        const { userId, ...omittedUserId } = params;
        const musicPreferences = await this.repository.createMusicPreferences({
          data: {
            user: {
              connect: {
                id: userId,
              },
            }, ...omittedUserId,
          },
        });
        
        return musicPreferences;
    }

    async getMusicPreferences(params: {
        userId: UserProfile[`id`];
    }): Promise<MusicPreferences[]>  {
        const musicPreferences = await this.repository.getMusicPreferences({
            where: {
                userId: params.userId,
            }
        });
        return musicPreferences;
    }

}
