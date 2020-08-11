/* eslint-disable import/no-extraneous-dependencies */
import faker from 'faker';
import { cloneDeep } from 'lodash';
import { IUserRepository } from '@domain/protocols/repository/UserRepository.interface';
import IUserEntity from '@domain/entities/UserEntity.interface';

class FakeUserRepository implements IUserRepository {
  private users: IUserEntity[];

  constructor() {
    this.users = [];
  }

  public async findAll(): Promise<IUserEntity[]> {
    return Promise.resolve(this.users);
  }

  public async findById(id: string): Promise<IUserEntity | null> {
    const user = this.users.find(usr => usr.id === id);

    return Promise.resolve(cloneDeep(user) || null);
  }

  public async findByEmail(email: string): Promise<IUserEntity | null> {
    const user = this.users.find(usr => usr.email === email);

    return Promise.resolve(cloneDeep(user) || null);
  }

  public async create(user: IUserEntity): Promise<IUserEntity> {
    const newUser = {
      ...user,
      avatar: '',
      id: faker.random.uuid(),
    };
    this.users.push(newUser);
    return Promise.resolve(cloneDeep(newUser));
  }

  public async update(user: IUserEntity): Promise<IUserEntity> {
    const userIndex = this.users.findIndex(usr => usr.id === user.id);
    this.users[userIndex] = user;
    return Promise.resolve(cloneDeep(user));
  }

  public async delete(id: string): Promise<void> {
    const userIndex = this.users.findIndex(user => user.id === id);
    this.users.splice(userIndex, 1);
  }
}

export default FakeUserRepository;
