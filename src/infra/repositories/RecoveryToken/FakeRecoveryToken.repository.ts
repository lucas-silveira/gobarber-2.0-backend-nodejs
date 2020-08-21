/* eslint-disable import/no-extraneous-dependencies */
import faker from 'faker';
import { container } from 'tsyringe';
import { IRecoveryTokenRepository } from '@domain/protocols/repository/RecoveryTokenRepository.interface';
import RecoveryTokenEntity from '@domain/entities/RecoveryToken.entity';
import IRecoveryTokenEntity from '@domain/entities/RecoveryTokenEntity.interface';

class FakeRecoveryTokenRepository implements IRecoveryTokenRepository {
  private recoveryToken: Omit<IRecoveryTokenEntity, 'isExpired'>[];

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
    const recoveryTokenDB = this.recoveryToken.find(
      user => user.user_id === userId,
    );

    if (!recoveryTokenDB) return null;

    const recoveryToken = container.resolve(RecoveryTokenEntity);

    recoveryToken.id = recoveryTokenDB.id;
    recoveryToken.token = recoveryTokenDB.token;
    recoveryToken.user_id = recoveryTokenDB.user_id;
    recoveryToken.created_at = recoveryTokenDB.created_at;

    return recoveryToken;
  }

  public async findByToken(
    token: string,
  ): Promise<IRecoveryTokenEntity | null> {
    const recoveryTokenDB = this.recoveryToken.find(
      user => user.token === token,
    );

    if (!recoveryTokenDB) return null;

    const recoveryToken = container.resolve(RecoveryTokenEntity);

    recoveryToken.id = recoveryTokenDB.id;
    recoveryToken.token = recoveryTokenDB.token;
    recoveryToken.user_id = recoveryTokenDB.user_id;
    recoveryToken.created_at = recoveryTokenDB.created_at;

    return recoveryToken;
  }
}

export default FakeRecoveryTokenRepository;
