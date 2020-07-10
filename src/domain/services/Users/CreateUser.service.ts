import User from '@domain/entities/User';
import IUser from '@domain/entities/User.interface';
import IRepository from '@infra/repositories/Repository.interface';
import Encryptor from '@utils/Encryptor/Encryptor';
import { ICreateUserService } from './CreateUser.interface';

class CreateUser implements ICreateUserService {
  private userRepository: IRepository<IUser>;

  constructor(userRepository: IRepository<IUser>) {
    this.userRepository = userRepository;
  }

  public async execute({
    name,
    email,
    password,
  }: ICreateUserService.Input): Promise<ICreateUserService.Output> {
    const userExists = await this.userRepository.findOne({ email });

    if (userExists) throw new Error('This email address is already in use.');

    const hashedPassword = await Encryptor.makeHash(password, 8);
    const user = new User(name, email, hashedPassword);
    const newUser = await this.userRepository.create(user);

    delete newUser.password;

    return newUser;
  }
}

export default CreateUser;
