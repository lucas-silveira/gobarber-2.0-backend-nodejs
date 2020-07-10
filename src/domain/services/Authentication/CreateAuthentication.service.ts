import Authentication from '@domain/entities/Authentication';
import IUser from '@domain/entities/User.interface';
import IRepository from '@infra/repositories/Repository.interface';
import Encryptor from '@utils/Encryptor/Encryptor';
import { ICreateAuthenticationService } from './CreateAuthentication.interface';

class CreateAuthentication implements ICreateAuthenticationService {
  private authRepository: IRepository<IUser>;

  constructor(authRepository: IRepository<IUser>) {
    this.authRepository = authRepository;
  }

  public async execute({
    email,
    password,
  }: ICreateAuthenticationService.Input): Promise<
    ICreateAuthenticationService.Output
  > {
    const user = await this.authRepository.findOne({ email });

    if (!user) throw new Error('Incorrect email/password combination.');

    const passwordIsValid = await Encryptor.compare(password, user.password);

    if (!passwordIsValid)
      throw new Error('Incorrect email/password combination.');

    const token = '123';
    const authentication = new Authentication(email, token);

    return authentication;
  }
}

export default CreateAuthentication;
