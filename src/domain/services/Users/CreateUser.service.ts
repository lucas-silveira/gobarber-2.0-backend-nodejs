import User from '@domain/entities/User';
import IEncryptor from '@domain/protocols/utils/Encryptor.interface';
import IUserRepository from '@domain/protocols/repository/UserRepository.interface';
import ErrorExcepetion from '@utils/ErrorExcepetion/ErrorExcepetion';
import { ICreateUser } from './CreateUser.interface';

class CreateUser implements ICreateUser {
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
  }: ICreateUser.Input): Promise<ICreateUser.Output> {
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists)
      throw new ErrorExcepetion(
        'error',
        'This email address is already in use.',
      );

    const hashedPassword = await this.encryptor.makeHash(password, 8);
    const user = new User(name, email, hashedPassword);
    const newUser = await this.userRepository.create(user);

    delete newUser.password;

    return newUser;
  }
}

export default CreateUser;