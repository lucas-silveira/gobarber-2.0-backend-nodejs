import CreateUser from '@domain/services/Users/CreateUser.service';
import IUser from '@domain/entities/User.interface';
import IRepository from '@infra/repositories/Repository.interface';
import { IUserController } from './UserController.interface';

class CreateUserController
  implements IUserController<Promise<Omit<IUser, 'password'>>> {
  private userRepository: IRepository<IUser>;

  constructor(userRepository: IRepository<IUser>) {
    this.userRepository = userRepository;
  }

  public async handle(
    httpBody: IUserController.httpBody,
  ): Promise<Omit<IUser, 'password'>> {
    const { name, email, password } = httpBody;
    const createUser = new CreateUser(this.userRepository);
    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return user;
  }
}

export default CreateUserController;
