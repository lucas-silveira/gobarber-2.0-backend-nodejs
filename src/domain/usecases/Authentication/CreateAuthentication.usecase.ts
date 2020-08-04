import Authentication from '@domain/entities/Authentication';
import authConfig from '@infra/configs/auth';
import { IAuthenticateUtil } from '@domain/protocols/utils/Authenticate.interface';
import IEncryptor from '@domain/protocols/utils/Encryptor.interface';
import IUserRepository from '@domain/protocols/repository/UserRepository.interface';
import CustomError from '@domain/entities/Error';
import { ICreateAuthentication } from './CreateAuthentication.interface';

class CreateAuthentication implements ICreateAuthentication {
  private userRepository: IUserRepository;

  private authenticate: IAuthenticateUtil;

  private encryptor: IEncryptor;

  constructor(
    userRepository: IUserRepository,
    authenticate: IAuthenticateUtil,
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
    const user = await this.userRepository.findByEmail(email);

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
