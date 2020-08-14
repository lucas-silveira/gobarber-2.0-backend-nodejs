import IUserTokensVO from '@domain/valueobjects/UserTokenVO.interface';

export interface IUserTokensRepository {
  generate: (userId: string) => Promise<string>;
  findByToken: (token: string) => Promise<IUserTokensVO | null>;
  findByUserId: (userId: string) => Promise<IUserTokensVO | null>;
}
