import { ICreateUserService } from '@domain/services/User/CreateUserService.interface';
import { injectable, inject } from 'tsyringe';
import { ICreateUserController } from './CreateUserController.interface';

@injectable()
class CreateUserController implements ICreateUserController {
  private createUserService: ICreateUserService;

  constructor(
    @inject('CreateUserService')
    createUserService: ICreateUserService,
  ) {
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
