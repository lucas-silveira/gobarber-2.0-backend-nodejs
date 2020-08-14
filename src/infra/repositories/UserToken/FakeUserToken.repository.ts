/* eslint-disable import/no-extraneous-dependencies */
import faker from 'faker';
import { cloneDeep } from 'lodash';
import { IUserTokensRepository } from '@domain/protocols/repository/UserTokenRepository.interface';
import IUserTokensVO from '@domain/valueobjects/UserTokenVO.interface';

class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: IUserTokensVO[];

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

  public async findByUserId(userId: string): Promise<IUserTokensVO | null> {
    const userToken = this.userTokens.find(user => user.user_id === userId);

    return Promise.resolve(cloneDeep(userToken) || null);
  }

  public async findByToken(token: string): Promise<IUserTokensVO | null> {
    const userToken = this.userTokens.find(user => user.token === token);

    return Promise.resolve(cloneDeep(userToken) || null);
  }
}

export default FakeUserTokensRepository;
