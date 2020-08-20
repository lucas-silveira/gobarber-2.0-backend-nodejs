import IRecoveryTokenVO from '@domain/valueobjects/RecoveryTokenVO.interface';

export interface IRecoveryTokenRepository {
  generate: (userId: string) => Promise<string>;
  findByToken: (token: string) => Promise<IRecoveryTokenVO | null>;
  findByUserId: (userId: string) => Promise<IRecoveryTokenVO | null>;
}
