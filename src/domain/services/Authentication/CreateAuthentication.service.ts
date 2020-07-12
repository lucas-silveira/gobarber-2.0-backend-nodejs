import Authentication from '@domain/entities/Authentication';
import authConfig from '@configs/auth';
import { IAuthenticate } from '@src/utils/Authentication/Authenticate.interface';
import IEnctryptor from '@src/utils/Encryptor/Encryptor.interface';
import IUserRepository from '@src/infra/repositories/UserRepository.interface';
import { ICreateAuthenticationService } from './CreateAuthentication.interface';

class CreateAuthentication implements ICreateAuthenticationService {
  private userRepository: IUserRepository;

  private authenticate: IAuthenticate;

  private encryptor: IEnctryptor;

  constructor(
    userRepository: IUserRepository,
    authenticate: IAuthenticate,
    encryptor: IEnctryptor,
  ) {
    this.userRepository = userRepository;
    this.authenticate = authenticate;
    this.encryptor = encryptor;
  }

  public async execute({
    email,
    password,
  }: ICreateAuthenticationService.Input): Promise<
    ICreateAuthenticationService.Output
  > {
    const user = await this.userRepository.findOne({ email });

    if (!user) throw new Error('Incorrect email/password combination.');

    const passwordIsValid = await this.encryptor.compare(
      password,
      user.password,
    );

    if (!passwordIsValid)
      throw new Error('Incorrect email/password combination.');

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
