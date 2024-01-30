import { Injectable } from '@nestjs/common';
import { MatchesRepository } from './matches.repository';
import { Match, UserProfile } from '@prisma/client';

@Injectable()
export class MatchesService {
    constructor(private repository: MatchesRepository) {}

    async createMatch(params: { 
        matchScore: Match[`matchScore`]; 
        user1Id: UserProfile[`id`]; 
        user2Id: UserProfile[`id`]; 
    }): Promise<Match> {
        const { matchScore, user1Id, user2Id} = params;
    
        const match = await this.repository.createMatch({
          data: {
            matchScore,
            user1: {
              connect: {
                id: user1Id,
              },
            },
            user2: {
                connect: {
                  id: user2Id,
                },
              },
          },
        });
        
        return match;
    }

    async getSuccessfulMatches(params: {
        userId: UserProfile[`id`];
    }): Promise<Match[]>  {
        const matches = await this.repository.getMatches({
            where: {
                matchStatus: 'ACCEPTED',
                OR: [
                    {user1Id: params.userId},
                    {user2Id: params.userId}
                ]
            }
        });
        return matches;
    }

}
