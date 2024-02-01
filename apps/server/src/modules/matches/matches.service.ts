import { Injectable } from '@nestjs/common';
import { MatchWithUser1User2, MatchesRepository } from './matches.repository';
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
        email: UserProfile[`email`];
    }): Promise<UserProfile[]>  {
      const matches = (await this.repository.getMatches({
          where: {
              matchStatus: 'ACCEPTED',
              OR: [
                  {
                    user1: {
                      email: params.email
                    }
                  },
                  {
                    user2: {
                      email: params.email
                    }
                  },
              ]
          },
          orderBy: {
            updatedAt: 'desc',
          }, 
          select: {
            user1: true,
            user2: true
          },
          include: { 
            user1: {
              include: {
                musicPreferences: true,
              }
            },
            user2: {
              include: {
                musicPreferences: true,
              }
            },
          },
      })) as MatchWithUser1User2[]

      const data = matches.map(match => {
        if (match.user1.email === params.email){
          return match.user2;
        }
        else {
          return match.user1;
        }
      })

      return data;
    }

    async acceptMatch(params: {
      user1Id: UserProfile[`id`];
      user2Id: UserProfile[`id`];
      matchScore: Match[`matchScore`];
    }): Promise<Match>  {

      const {user1Id, user2Id, matchScore} = params;

      // check if match already exists
      const match = await this.repository.findMatch({
        where: {
          OR: [
            {
              user1Id,
              user2Id,
            },
            {
              user1Id: user2Id,
              user2Id: user1Id,
            },
          ],
        }
      });

      // if match exists, change status to ACCEPTED 
      if (match) {
        return await this.repository.updateMatch({
          where: {
            id: match.id
          }, 
          data: {
            matchStatus: 'ACCEPTED'
          }
        });
      } 

      // else, create new match with status PENDING
      return await this.repository.createMatch({
        data: {
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
          matchStatus: 'PENDING',
          matchScore
        },
      });
  }

  async rejectMatch(params: {
    user1Id: UserProfile[`id`];
    user2Id: UserProfile[`id`];
    matchScore: Match[`matchScore`];
  }): Promise<Match>  {

    const {user1Id, user2Id, matchScore} = params;

    // check if match already exists
    const match = await this.repository.findMatch({
      where: {
        OR: [
          {
            user1Id,
            user2Id,
          },
          {
            user1Id: user2Id,
            user2Id: user1Id,
          },
        ],
      }
    });

    // if match exists, change status to DECLINED 
    if (match) {
      return await this.repository.updateMatch({
        where: {
          id: match.id
        }, 
        data: {
          matchStatus: 'DECLINED'
        }
      });
    } 

    // else, create new match with status DECLINED
    return await this.repository.createMatch({
      data: {
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
        matchStatus: 'DECLINED',
        matchScore
      },
    });
}

}
