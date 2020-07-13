import { ICreateUserService } from '@domain/usecases/Users/CreateUser.interface';
import { ICreateUserController } from './CreateUserController.interface';

class CreateUserController implements ICreateUserController {
  private createUser: ICreateUserService;

  constructor(createUser: ICreateUserService) {
    this.createUser = createUser;
  }

  public async handle(
    body: ICreateUserController.Body,
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
