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
    const userExists = await this.authRepository.findOne({ email });

    if (userExists) throw new Error('This email address is already in use.');

    const passwordIsValid = await Encryptor.makeHash(password, 8);
    const token = '';
    const authentication = new Authentication(email, token);

    return authentication;
  }
}

export default CreateAuthentication;
