/* eslint-disable import/no-extraneous-dependencies */
import faker from 'faker';
import { cloneDeep } from 'lodash';
import IUserEntity from '@domain/entities/UserEntity.interface';
import IUserRepository from '@domain/protocols/repository/UserRepository.interface';

class FakeUserRepository implements IUserRepository {
  private users: Required<IUserEntity>[];

  constructor() {
    this.users = [];
  }

  public async findAll(): Promise<Required<IUserEntity>[]> {
    return Promise.resolve(this.users);
  }

  public async findById(id: string): Promise<Required<IUserEntity> | null> {
    const user = this.users.find(usr => usr.id === id);

    return Promise.resolve(cloneDeep(user) || null);
  }

  public async findByEmail(
    email: string,
  ): Promise<Required<IUserEntity> | null> {
    const user = this.users.find(usr => usr.email === email);

    return Promise.resolve(cloneDeep(user) || null);
  }

  public async create(user: IUserEntity): Promise<Required<IUserEntity>> {
    const newUser = {
      ...user,
      avatar: user.avatar || '',
      id: faker.random.uuid(),
    };
    this.users.push(newUser);
    return Promise.resolve(cloneDeep(newUser));
  }

  public async update(
    user: Required<IUserEntity>,
  ): Promise<Required<IUserEntity>> {
    const userIndex = this.users.findIndex(usr => usr.id === user.id);
    this.users[userIndex] = user;
    return Promise.resolve(cloneDeep(user));
  }
}

export default FakeUserRepository;
