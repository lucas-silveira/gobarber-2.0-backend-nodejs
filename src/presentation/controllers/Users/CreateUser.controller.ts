import CreateUser from '@domain/services/Users/CreateUser.service';
import IUser from '@domain/entities/User.interface';
import IRepository from '@infra/repositories/Repository.interface';
import { ICreateUserService } from '@domain/services/Users/CreateUser.interface';
import { IUserController } from './UserController.interface';

class CreateUserController
  implements IUserController<Promise<ICreateUserService.Output>> {
  private userRepository: IRepository<IUser>;

  constructor(userRepository: IRepository<IUser>) {
    this.userRepository = userRepository;
  }

  public async handle(
    body: IUserController.Body,
  ): Promise<ICreateUserService.Output> {
    const { name, email, password } = body;
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
