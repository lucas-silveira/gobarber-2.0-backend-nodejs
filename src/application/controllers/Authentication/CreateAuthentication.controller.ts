import { ICreateAuthenticationService } from '@domain/services/Authentication/CreateAuthenticationService.interface';
import { ICreateAuthenticationController } from './CreateAuthenticationController.interface';

class CreateAuthenticationController
  implements ICreateAuthenticationController {
  private createAuthenticationService: ICreateAuthenticationService;

  constructor(createAuthenticationService: ICreateAuthenticationService) {
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
