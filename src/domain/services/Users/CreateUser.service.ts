import User from '@domain/entities/User';
import IUser from '@domain/entities/User.interface';
import { IRepository } from '@infra/repositories/Repository.interface';
import ICreateUserService from './CreateUser.interface';

class CreateUser implements ICreateUserService {
  private userRepository: IRepository<IUser>;

  constructor(userRepository: IRepository<IUser>) {
    this.userRepository = userRepository;
  }

  public async execute({ name, email, password }: IUser): Promise<IUser> {
    const user = new User(name, email, password);
    const newUser = await this.userRepository.create(user);
    return newUser;
  }
}

export default CreateUser;
