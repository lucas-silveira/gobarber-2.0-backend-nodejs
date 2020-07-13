import { ICreateAuthenticationService } from '@domain/usecases/Authentication/CreateAuthentication.interface';
import { ICreateAuthenticationController } from './CreateAuthenticationController.interface';

class CreateAuthenticationController
  implements ICreateAuthenticationController {
  private createAuthentication: ICreateAuthenticationService;

  constructor(createAuthentication: ICreateAuthenticationService) {
    this.createAuthentication = createAuthentication;
  }

  public async handle(
    body: ICreateAuthenticationController.Body,
  ): Promise<ICreateAuthenticationService.Output> {
    const { email, password } = body;
    const authentication = await this.createAuthentication.execute({
      email,
      password,
    });

    return authentication;
  }
}

export default CreateAuthenticationController;
