import { injectable, inject } from 'tsyringe';
import IEncryptor from '@domain/protocols/utils/Encryptor.interface';
import { IUserRepository } from '@domain/protocols/repository/UserRepository.interface';
import ErrorExcepetion from '@utils/ErrorExcepetion/ErrorExcepetion';
import { ICreateUserService } from './CreateUserService.interface';

@injectable()
class CreateUserService implements ICreateUserService {
  private userRepository: IUserRepository;

  private encryptor: IEncryptor;

  constructor(
    @inject('UserRepository')
    userRepository: IUserRepository,
    @inject('Encryptor')
    encryptor: IEncryptor,
  ) {
    this.userRepository = userRepository;
    this.encryptor = encryptor;
  }

  public async execute({
    name,
    email,
    password,
  }: ICreateUserService.Input): Promise<ICreateUserService.Output> {
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists)
      throw new ErrorExcepetion(
        'error',
        'This email address is already in use.',
      );

    const hashedPassword = await this.encryptor.makeHash(password, 8);
    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    delete user.password;

    return user;
  }
}

export default CreateUserService;
