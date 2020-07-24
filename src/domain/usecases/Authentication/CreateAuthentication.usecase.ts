import Authentication from '@domain/entities/Authentication';
import authConfig from '@configs/auth';
import { IAuthenticateLib } from '@domain/protocols/authentication/Authenticate.interface';
import IEncryptor from '@domain/protocols/encryptor/Encryptor.interface';
import IUserRepository from '@infra/repositories/UserRepository.interface';
import CustomError from '@domain/entities/Error';
import { ICreateAuthentication } from './CreateAuthentication.interface';

class CreateAuthentication implements ICreateAuthentication {
  private userRepository: IUserRepository;

  private authenticate: IAuthenticateLib;

  private encryptor: IEncryptor;

  constructor(
    userRepository: IUserRepository,
    authenticate: IAuthenticateLib,
    encryptor: IEncryptor,
  ) {
    this.userRepository = userRepository;
    this.authenticate = authenticate;
    this.encryptor = encryptor;
  }

  public async execute({
    email,
    password,
  }: ICreateAuthentication.Input): Promise<ICreateAuthentication.Output> {
    const user = await this.userRepository.findOne({ email });

    if (!user)
      throw new CustomError('error', 'Incorrect email/password combination.');

    const passwordIsValid = await this.encryptor.compare(
      password,
      user.password,
    );

    if (!passwordIsValid)
      throw new CustomError('error', 'Incorrect email/password combination.');

    const { secretKey, expiresIn } = authConfig.jwt;
    const authentication = new Authentication(secretKey, user.id, expiresIn);
    const token = this.authenticate.create(authentication);

    delete user.password;

    return {
      user,
      token,
    };
  }
}

export default CreateAuthentication;
