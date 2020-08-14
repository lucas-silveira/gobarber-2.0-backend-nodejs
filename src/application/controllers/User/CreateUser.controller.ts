import { ICreateUserService } from '@domain/services/User/CreateUserService.interface';
import { ICreateUserController } from './CreateUserController.interface';

class CreateUserController implements ICreateUserController {
  private createUserService: ICreateUserService;

  constructor(createUserService: ICreateUserService) {
    this.createUserService = createUserService;
  }

  public async handle(data: ICreateUserController.Input): Promise<void> {
    const { name, email, password } = data;
    await this.createUserService.execute({
      name,
      email,
      password,
    });
  }
}

export default CreateUserController;
