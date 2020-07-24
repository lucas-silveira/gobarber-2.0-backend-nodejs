import { ICreateUser } from '@domain/usecases/Users/CreateUser.interface';
import { ICreateUserController } from './CreateUserController.interface';

class CreateUserController implements ICreateUserController {
  private createUser: ICreateUser;

  constructor(createUser: ICreateUser) {
    this.createUser = createUser;
  }

  public async handle(
    data: ICreateUserController.Input,
  ): Promise<ICreateUserController.Output> {
    const { name, email, password } = data;
    const user = await this.createUser.execute({
      name,
      email,
      password,
    });

    return user;
  }
}

export default CreateUserController;
