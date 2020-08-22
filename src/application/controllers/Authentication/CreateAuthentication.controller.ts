import { injectable, inject } from 'tsyringe';
import { ICreateAuthenticationService } from '@domain/services/Authentication/CreateAuthenticationService.interface';
import { ICreateAuthenticationController } from './CreateAuthenticationController.interface';

@injectable()
class CreateAuthenticationController
  implements ICreateAuthenticationController {
  private createAuthenticationService: ICreateAuthenticationService;

  constructor(
    @inject('CreateAuthenticationService')
    createAuthenticationService: ICreateAuthenticationService,
  ) {
    this.createAuthenticationService = createAuthenticationService;
  }

  public async handle(
    data: ICreateAuthenticationController.Input,
  ): Promise<ICreateAuthenticationController.Output> {
    const { email, password } = data;
    const { user, token } = await this.createAuthenticationService.execute({
      email,
      password,
    });

    return {
      user,
      token,
    };
  }
}

export default CreateAuthenticationController;
