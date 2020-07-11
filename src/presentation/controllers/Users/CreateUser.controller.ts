import { ICreateUserService } from '@domain/services/Users/CreateUser.interface';
import { IUserController } from './UserController.interface';

class CreateUserController
  implements IUserController<Promise<ICreateUserService.Output>> {
  private createUser: ICreateUserService;

  constructor(createUser: ICreateUserService) {
    this.createUser = createUser;
  }

  public async handle(
    body: IUserController.Body,
  ): Promise<ICreateUserService.Output> {
    const { name, email, password } = body;
    const user = await this.createUser.execute({
      name,
      email,
      password,
    });

    return user;
  }
}

export default CreateUserController;
