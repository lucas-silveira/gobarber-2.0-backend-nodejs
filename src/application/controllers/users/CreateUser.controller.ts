import { ICreateUserService } from '@domain/services/Users/CreateUserService.interface';
import { ICreateUserController } from './CreateUserController.interface';

class CreateUserController implements ICreateUserController {
  private createUser: ICreateUserService;

  constructor(createUser: ICreateUserService) {
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
