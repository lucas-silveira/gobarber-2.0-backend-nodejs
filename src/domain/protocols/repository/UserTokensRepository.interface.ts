import IUserTokensVO from '@domain/valueObjects/UserTokens.vo';

export interface IUserTokensRepository {
  generate: (userId: string) => Promise<string>;
  findByToken: (
    token: string,
  ) => Promise<IUserTokensRepository.FindByTokenOutput | null>;
  findByUserId: (
    userId: string,
  ) => Promise<IUserTokensRepository.FindByUserIdOutput | null>;
}

export namespace IUserTokensRepository {
  export type FindByTokenOutput = IUserTokensVO;
  export type FindByUserIdOutput = IUserTokensVO;
}
