/* eslint-disable import/no-extraneous-dependencies */
import faker from 'faker';
import { cloneDeep } from 'lodash';
import { IUserTokensRepository } from '@domain/protocols/repository/UserTokensRepository.interface';
import IUserTokensVO from '@domain/valueObjects/UserTokens.vo';

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
    };
    this.userTokens.push(newUserToken);
    return Promise.resolve(token);
  }

  public async findByUserId(
    userId: string,
  ): Promise<IUserTokensRepository.FindByUserIdOutput | null> {
    const userToken = this.userTokens.find(user => user.user_id === userId);

    return Promise.resolve(cloneDeep(userToken) || null);
  }

  public async findByToken(
    token: string,
  ): Promise<IUserTokensRepository.FindByTokenOutput | null> {
    const userToken = this.userTokens.find(user => user.token === token);

    return Promise.resolve(cloneDeep(userToken) || null);
  }
}

export default FakeUserTokensRepository;
