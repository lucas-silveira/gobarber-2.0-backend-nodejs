import CreateAuthentication from '@domain/services/Authentication/CreateAuthentication.service';
import IUser from '@domain/entities/User.interface';
import IRepository from '@infra/repositories/Repository.interface';
import { ICreateAuthenticationService } from '@domain/services/Authentication/CreateAuthentication.interface';
import { IAuthenticationController } from './AuthenticationController.interface';

class CreateAuthenticationController
  implements
    IAuthenticationController<Promise<ICreateAuthenticationService.Output>> {
  private userRepository: IRepository<IUser>;

  constructor(userRepository: IRepository<IUser>) {
    this.userRepository = userRepository;
  }

  public async handle(
    body: IAuthenticationController.Body,
  ): Promise<ICreateAuthenticationService.Output> {
    const { email, password } = body;
    const createAuthentication = new CreateAuthentication(this.userRepository);
    const authentication = await createAuthentication.execute({
      email,
      password,
    });

    return authentication;
  }
}

export default CreateAuthenticationController;
