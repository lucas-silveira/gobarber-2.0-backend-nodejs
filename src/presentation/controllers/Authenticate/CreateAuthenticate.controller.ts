import CreateAuthenticate from '@domain/services/Authenticate/CreateAuthenticate.service';
import IAuthenticate from '@domain/entities/Authenticate.interface';
import { ICreateAuthenticateService } from '@domain/services/Authenticate/CreateAuthenticate.interface';
import { IAuthenticateController } from './AuthenticateController.interface';

class CreateAuthenticateController
  implements
    IAuthenticateController<Promise<ICreateAuthenticateService.Output>> {
  public async handle(
    body: IAuthenticateController.Body,
  ): Promise<ICreateAuthenticateService.Output> {
    const { email, password } = body;
    const createAuthenticate = new CreateAuthenticate();
    const authenticate = await createAuthenticate.execute({
      email,
      password,
    });

    return authenticate;
  }
}

export default CreateAuthenticateController;
