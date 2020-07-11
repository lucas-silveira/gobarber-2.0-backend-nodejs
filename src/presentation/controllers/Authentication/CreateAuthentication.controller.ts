import { ICreateAuthenticationService } from '@domain/services/Authentication/CreateAuthentication.interface';
import { IAuthenticationController } from './AuthenticationController.interface';

class CreateAuthenticationController
  implements
    IAuthenticationController<Promise<ICreateAuthenticationService.Output>> {
  private createAuthentication: ICreateAuthenticationService;

  constructor(createAuthentication: ICreateAuthenticationService) {
    this.createAuthentication = createAuthentication;
  }

  public async handle(
    body: IAuthenticationController.Body,
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
