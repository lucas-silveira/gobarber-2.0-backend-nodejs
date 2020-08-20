/* eslint-disable import/no-extraneous-dependencies */
import faker from 'faker';
import { cloneDeep } from 'lodash';
import { IRecoveryTokenRepository } from '@domain/protocols/repository/RecoveryTokenRepository.interface';
import IRecoveryTokenVO from '@domain/valueobjects/RecoveryTokenVO.interface';

class FakeUserTokensRepository implements IRecoveryTokenRepository {
  private userTokens: IRecoveryTokenVO[];

  constructor() {
    this.userTokens = [];
  }

  public async generate(userId: string): Promise<string> {
    const token = faker.random.uuid();
    const newUserToken = {
      id: faker.random.uuid(),
      token,
      user_id: userId,
      created_at: new Date(),
    };
    this.userTokens.push(newUserToken);
    return Promise.resolve(token);
  }

  public async findByUserId(userId: string): Promise<IRecoveryTokenVO | null> {
    const userToken = this.userTokens.find(user => user.user_id === userId);

    return Promise.resolve(cloneDeep(userToken) || null);
  }

  public async findByToken(token: string): Promise<IRecoveryTokenVO | null> {
    const userToken = this.userTokens.find(user => user.token === token);

    return Promise.resolve(cloneDeep(userToken) || null);
  }
}

export default FakeUserTokensRepository;
