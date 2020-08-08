import { ICreateAuthentication } from '@domain/services/Authentication/CreateAuthentication.interface';
import { ICreateAuthenticationController } from './CreateAuthenticationController.interface';

class CreateAuthenticationController
  implements ICreateAuthenticationController {
  private createAuthentication: ICreateAuthentication;

  constructor(createAuthentication: ICreateAuthentication) {
    this.createAuthentication = createAuthentication;
  }

  public async handle(
    data: ICreateAuthenticationController.Input,
  ): Promise<ICreateAuthenticationController.Output> {
    const { email, password } = data;
    const authentication = await this.createAuthentication.execute({
      email,
      password,
    });

    return authentication;
  }
}

export default CreateAuthenticationController;
