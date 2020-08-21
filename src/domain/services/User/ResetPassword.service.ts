import { IUserRepository } from '@domain/protocols/repository/UserRepository.interface';
import ErrorExcepetion from '@utils/ErrorExcepetion/ErrorExcepetion';
import { IRecoveryTokenRepository } from '@domain/protocols/repository/RecoveryTokenRepository.interface';
import IEncryptor from '@domain/protocols/utils/Encryptor.interface';
import IDateHandler from '@domain/protocols/utils/DateHandler.interface';
import { IResetPasswordService } from './ResetPasswordService.interface';

class ResetPasswordService implements IResetPasswordService {
  private userRepository: IUserRepository;

  private userTokensRepository: IRecoveryTokenRepository;

  private encryptor: IEncryptor;

  private dateHandler: IDateHandler;

  constructor(
    userRepository: IUserRepository,
    userTokensRepository: IRecoveryTokenRepository,
    encryptor: IEncryptor,
    dateHandler: IDateHandler,
  ) {
    this.userRepository = userRepository;
    this.userTokensRepository = userTokensRepository;
    this.encryptor = encryptor;
    this.dateHandler = dateHandler;
  }

  public async execute({
    token,
    password,
  }: IResetPasswordService.Input): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);
    if (!userToken) {
      throw new ErrorExcepetion('error', 'Token does not exists.');
    }

    if (
      this.dateHandler.differenceInHours(Date.now(), userToken.created_at) > 2
    ) {
      throw new ErrorExcepetion('error', 'Token expired.');
    }

    const user = await this.userRepository.findById(userToken.user_id);
    if (!user) {
      throw new ErrorExcepetion('error', 'User does not exists.');
    }

    const hashedPassword = await this.encryptor.makeHash(password, 8);
    user.password = hashedPassword;
    await this.userRepository.update(user);
  }
}

export default ResetPasswordService;
