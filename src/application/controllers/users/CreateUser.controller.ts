import { ICreateUserService } from '@domain/services/Users/CreateUserService.interface';
import { ICreateUserController } from './CreateUserController.interface';

class CreateUserController implements ICreateUserController {
  private createUserService: ICreateUserService;

  constructor(createUserService: ICreateUserService) {
    this.createUserService = createUserService;
  }

  public async handle(
    data: ICreateUserController.Input,
  ): Promise<ICreateUserController.Output> {
    const { name, email, password } = data;
    const user = await this.createUserService.execute({
      name,
      email,
      password,
    });

    return user;
  }
}

export default CreateUserController;
