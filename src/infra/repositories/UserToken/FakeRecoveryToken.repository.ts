/* eslint-disable import/no-extraneous-dependencies */
import faker from 'faker';
import { IRecoveryTokenRepository } from '@domain/protocols/repository/RecoveryTokenRepository.interface';
import RecoveryTokenEntity from '@domain/entities/RecoveryToken.entity';
import IRecoveryTokenEntity from '@domain/entities/RecoveryTokenEntity.interface';

class FakeRecoveryTokenRepository implements IRecoveryTokenRepository {
  private recoveryToken: IRecoveryTokenEntity[];

  constructor() {
    this.recoveryToken = [];
  }

  public async generate(userId: string): Promise<string> {
    const token = faker.random.uuid();
    const newUserToken = {
      id: faker.random.uuid(),
      token,
      user_id: userId,
      created_at: new Date(),
    };
    this.recoveryToken.push(newUserToken);
    return Promise.resolve(token);
  }

  public async findByUserId(
    userId: string,
  ): Promise<IRecoveryTokenEntity | null> {
    const recoveryToken = this.recoveryToken.find(
      user => user.user_id === userId,
    );

    if (!recoveryToken) return null;

    return new RecoveryTokenEntity(
      recoveryToken.id,
      recoveryToken.token,
      recoveryToken.user_id,
      recoveryToken.created_at,
    );
  }

  public async findByToken(
    token: string,
  ): Promise<IRecoveryTokenEntity | null> {
    const recoveryToken = this.recoveryToken.find(user => user.token === token);

    if (!recoveryToken) return null;

    return new RecoveryTokenEntity(
      recoveryToken.id,
      recoveryToken.token,
      recoveryToken.user_id,
      recoveryToken.created_at,
    );
  }
}

export default FakeRecoveryTokenRepository;
