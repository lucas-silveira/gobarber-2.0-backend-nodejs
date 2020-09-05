/* eslint-disable import/no-extraneous-dependencies */
import faker from 'faker';
import { plainToClass } from 'class-transformer';
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
    const userDB = this.users.find(usr => usr.id === id);

    if (!userDB) return null;

    return plainToClass(User, userDB);
  }

  public async findByEmail(email: string): Promise<IUserEntity | null> {
    const userDB = this.users.find(usr => usr.email === email);

    if (!userDB) return null;

    return plainToClass(User, userDB);
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

    return plainToClass(User, newUser);
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
