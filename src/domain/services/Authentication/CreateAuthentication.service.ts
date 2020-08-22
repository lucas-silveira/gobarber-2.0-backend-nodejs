import { injectable, inject } from 'tsyringe';
import IEncryptor from '@domain/protocols/utils/Encryptor.interface';
import { IUserRepository } from '@domain/protocols/repository/UserRepository.interface';
import ErrorExcepetion from '@utils/ErrorExcepetion/ErrorExcepetion';
import { IAuthenticateUtil } from '@domain/protocols/utils/Authenticate.interface';
import { ICreateAuthenticationService } from './CreateAuthenticationService.interface';

@injectable()
class CreateUserService implements ICreateAuthenticationService {
  private userRepository: IUserRepository;

  private authenticate: IAuthenticateUtil;

  private encryptor: IEncryptor;

  constructor(
    @inject('UserRepository')
    userRepository: IUserRepository,
    @inject('AuthenticateUtil')
    authenticate: IAuthenticateUtil,
    @inject('Encryptor')
    encryptor: IEncryptor,
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

    const token = this.authenticate.create(user.id);

    delete user.password;

    return {
      user,
      token,
    };
  }
}

export default CreateUserService;
