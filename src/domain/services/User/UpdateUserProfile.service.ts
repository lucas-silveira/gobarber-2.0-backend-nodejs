import { injectable, inject } from 'tsyringe';
import { IUserRepository } from '@domain/protocols/repository/UserRepository.interface';
import ErrorExcepetion from '@utils/ErrorExcepetion/ErrorExcepetion';
import IEncryptor from '@domain/protocols/utils/Encryptor.interface';
import { IUpdateUserProfileService } from './UpdateUserProfileService.interface';

@injectable()
class UpdateUserProfileService implements IUpdateUserProfileService {
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
    userId,
    name,
    email,
    oldPassword,
    password,
  }: IUpdateUserProfileService.Input): Promise<void> {
    const user = await this.userRepository.findById(userId);

    if (!user) throw new ErrorExcepetion('error', 'User ID is incorrect.');

    if (email !== user.email) {
      const emailIsAlreadyInUse = await this.userRepository.findByEmail(email);

      if (emailIsAlreadyInUse)
        throw new ErrorExcepetion('error', 'Email is already in use.');
    }

    user.name = name;
    user.email = email;

    if (oldPassword && password) {
      const passwordIsValid = await this.encryptor.compare(
        oldPassword,
        user.password,
      );

      if (!passwordIsValid)
        throw new ErrorExcepetion('error', 'Incorrect password.');

      const hashedPassword = await this.encryptor.makeHash(password, 8);
      user.password = hashedPassword;
    }

    await this.userRepository.update(user);
  }
}

export default UpdateUserProfileService;
