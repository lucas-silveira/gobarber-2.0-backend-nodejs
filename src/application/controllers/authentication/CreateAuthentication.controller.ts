import { IUserRepository } from '@domain/protocols/repository/UserRepository.interface';
import { IAuthenticateUtil } from '@domain/protocols/utils/Authenticate.interface';
import IEncryptor from '@domain/protocols/utils/Encryptor.interface';
import ErrorExcepetion from '@utils/ErrorExcepetion/ErrorExcepetion';
import authConfig from '@infra/configs/auth';
import { ICreateAuthenticationController } from './CreateAuthenticationController.interface';

class CreateAuthenticationController
  implements ICreateAuthenticationController {
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

  public async handle(
    data: ICreateAuthenticationController.Input,
  ): Promise<ICreateAuthenticationController.Output> {
    const { email, password } = data;
    const user = await this.userRepository.findByEmail(email);

    if (!user)
      throw new ErrorExcepetion(
        'error',
        'Incorrect email/password combination.',
      );

    const passwordIsValid = await this.encryptor.compare(
      password,
      user.password,
    );

    if (!passwordIsValid)
      throw new ErrorExcepetion(
        'error',
        'Incorrect email/password combination.',
      );

    const { secretKey, expiresIn } = authConfig.jwt;
    const token = this.authenticate.create({
      secretKey,
      subject: user.id,
      expiresIn,
    });

    delete user.password;

    return {
      user,
      token,
    };
  }
}

export default CreateAuthenticationController;
