import { IUserRepository } from '@domain/protocols/repository/UserRepository.interface';
import ErrorExcepetion from '@utils/ErrorExcepetion/ErrorExcepetion';
import { IRecoveryTokenRepository } from '@domain/protocols/repository/RecoveryTokenRepository.interface';
import IEncryptor from '@domain/protocols/utils/Encryptor.interface';
import { IResetPasswordService } from './ResetPasswordService.interface';

class ResetPasswordService implements IResetPasswordService {
  private userRepository: IUserRepository;

  private recoveryTokenRepository: IRecoveryTokenRepository;

  private encryptor: IEncryptor;

  constructor(
    userRepository: IUserRepository,
    recoveryTokenRepository: IRecoveryTokenRepository,
    encryptor: IEncryptor,
  ) {
    this.userRepository = userRepository;
    this.recoveryTokenRepository = recoveryTokenRepository;
    this.encryptor = encryptor;
  }

  public async execute({
    token,
    password,
  }: IResetPasswordService.Input): Promise<void> {
    const recoveryToken = await this.recoveryTokenRepository.findByToken(token);
    if (!recoveryToken) {
      throw new ErrorExcepetion('error', 'Token does not exists.');
    }

    if (recoveryToken.isExpired()) {
      throw new ErrorExcepetion('error', 'Token expired.');
    }

    const user = await this.userRepository.findById(recoveryToken.user_id);
    if (!user) {
      throw new ErrorExcepetion('error', 'User does not exists.');
    }

    const hashedPassword = await this.encryptor.makeHash(password, 8);
    user.password = hashedPassword;
    await this.userRepository.update(user);
  }
}

export default ResetPasswordService;
