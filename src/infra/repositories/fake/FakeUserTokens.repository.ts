/* eslint-disable import/no-extraneous-dependencies */
import faker from 'faker';
import { IUserTokensRepository } from '@domain/protocols/repository/UserTokensRepository.interface';
import IUserTokensVO from '@domain/valueObjects/UserTokens.vo';

class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: IUserTokensVO[];

  constructor() {
    this.userTokens = [];
  }

  public async generate(user_id: string): Promise<string> {
    const newUserToken = {
      id: faker.random.uuid(),
      token: faker.random.uuid(),
      user_id,
    };
    this.userTokens.push(newUserToken);
    return Promise.resolve(newUserToken.token);
  }
}

export default FakeUserTokensRepository;
