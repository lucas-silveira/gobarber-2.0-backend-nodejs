/* eslint-disable import/no-extraneous-dependencies */
import faker from 'faker';
import { cloneDeep } from 'lodash';
import { IUserRepository } from '@domain/protocols/repository/UserRepository.interface';

class FakeUserRepository implements IUserRepository {
  private users: IUserRepository.UserData[];

  constructor() {
    this.users = [];
  }

  public async findAll(): Promise<IUserRepository.UserData[]> {
    return Promise.resolve(this.users);
  }

  public async findById(id: string): Promise<IUserRepository.UserData | null> {
    const user = this.users.find(usr => usr.id === id);

    return Promise.resolve(cloneDeep(user) || null);
  }

  public async findByEmail(
    email: string,
  ): Promise<IUserRepository.UserData | null> {
    const user = this.users.find(usr => usr.email === email);

    return Promise.resolve(cloneDeep(user) || null);
  }

  public async create(
    user: IUserRepository.UserEntity,
  ): Promise<IUserRepository.UserData> {
    const newUser = {
      ...user,
      avatar: '',
      id: faker.random.uuid(),
    };
    this.users.push(newUser);
    return Promise.resolve(cloneDeep(newUser));
  }

  public async update(
    user: IUserRepository.UserData,
  ): Promise<IUserRepository.UserData> {
    const userIndex = this.users.findIndex(usr => usr.id === user.id);
    this.users[userIndex] = user;
    return Promise.resolve(cloneDeep(user));
  }
}

export default FakeUserRepository;
