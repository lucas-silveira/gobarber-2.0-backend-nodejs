import IRecoveryTokenEntity from '@domain/entities/RecoveryTokenEntity.interface';

export interface IRecoveryTokenRepository {
  generate: (userId: string) => Promise<string>;
  findByToken: (token: string) => Promise<IRecoveryTokenEntity | null>;
  findByUserId: (userId: string) => Promise<IRecoveryTokenEntity | null>;
}
