import UserEntity from '@domain/entities/User.entity';
import IEncryptor from '@domain/protocols/utils/Encryptor.interface';
import IUserRepository from '@domain/protocols/repository/UserRepository.interface';
import ErrorExcepetion from '@utils/ErrorExcepetion/ErrorExcepetion';
import { ICreateUserService } from './CreateUserService.interface';

class CreateUserService implements ICreateUserService {
  private userRepository: IUserRepository;

  private encryptor: IEncryptor;

  constructor(userRepository: IUserRepository, encryptor: IEncryptor) {
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
    const user = new UserEntity(name, email, hashedPassword);
    const newUser = await this.userRepository.create(user);

    delete newUser.password;

    return newUser;
  }
}

export default CreateUserService;
