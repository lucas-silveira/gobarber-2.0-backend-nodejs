import User from '@domain/entities/User';
import IEnctryptor from '@src/utils/Encryptor/Encryptor.interface';
import IUserRepository from '@src/infra/repositories/UserRepository.interface';
import { ICreateUserService } from './CreateUser.interface';

class CreateUser implements ICreateUserService {
  private userRepository: IUserRepository;

  private encryptor: IEnctryptor;

  constructor(userRepository: IUserRepository, encryptor: IEnctryptor) {
    this.userRepository = userRepository;
    this.encryptor = encryptor;
  }

  public async execute({
    name,
    email,
    password,
  }: ICreateUserService.Input): Promise<ICreateUserService.Output> {
    const userExists = await this.userRepository.findOne({ email });

    if (userExists) throw new Error('This email address is already in use.');

    const hashedPassword = await this.encryptor.makeHash(password, 8);
    const user = new User(name, email, hashedPassword);
    const newUser = await this.userRepository.create(user);

    delete newUser.password;

    return newUser;
  }
}

export default CreateUser;
