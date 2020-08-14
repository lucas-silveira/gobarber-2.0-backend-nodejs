/* eslint-disable import/no-extraneous-dependencies */
import faker from 'faker';
import { IUserRepository } from '@domain/protocols/repository/UserRepository.interface';
import IUserEntity from '@domain/entities/UserEntity.interface';
import User from '@domain/entities/User.entity';

class FakeUserRepository implements IUserRepository {
  private users: IUserEntity[];

  constructor() {
    this.users = [];
  }

  public async findAll(): Promise<IUserEntity[]> {
    return this.users;
  }

  public async findById(id: string): Promise<IUserEntity | null> {
    const user = this.users.find(usr => usr.id === id);

    if (!user) return null;

    return new User(user.id, user.name, user.email, user.avatar, user.password);
  }

  public async findByEmail(email: string): Promise<IUserEntity | null> {
    const user = this.users.find(usr => usr.email === email);

    if (!user) return null;

    return new User(user.id, user.name, user.email, user.avatar, user.password);
  }

  public async create({
    name,
    email,
    password,
  }: IUserRepository.createInput): Promise<IUserEntity> {
    const newUser = {
      name,
      email,
      password,
      avatar: '',
      id: faker.random.uuid(),
    };
    this.users.push(newUser);
    return new User(
      newUser.id,
      newUser.name,
      newUser.email,
      newUser.avatar,
      newUser.password,
    );
  }

  public async update(user: IUserEntity): Promise<IUserEntity> {
    const userIndex = this.users.findIndex(usr => usr.id === user.id);
    this.users[userIndex] = user;
    return user;
  }

  public async delete(id: string): Promise<void> {
    const userIndex = this.users.findIndex(user => user.id === id);
    this.users.splice(userIndex, 1);
  }
}

export default FakeUserRepository;
