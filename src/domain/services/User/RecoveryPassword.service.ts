import { IEmailService } from '@domain/protocols/service/EmailService.interface';
import { IUserRepository } from '@domain/protocols/repository/UserRepository.interface';
import ErrorExcepetion from '@utils/ErrorExcepetion/ErrorExcepetion';
import { IRecoveryTokenRepository } from '@domain/protocols/repository/RecoveryTokenRepository.interface';
import { IRecoveryPasswordService } from './RecoveryPasswordService.interface';

class PasswordRecoveryService implements IRecoveryPasswordService {
  private userRepository: IUserRepository;

  private userTokensRepository: IRecoveryTokenRepository;

  private emailService: IEmailService;

  constructor(
    userRepository: IUserRepository,
    userTokensRepository: IRecoveryTokenRepository,
    emailService: IEmailService,
  ) {
    this.userRepository = userRepository;
    this.userTokensRepository = userTokensRepository;
    this.emailService = emailService;
  }

  public async execute({
    email,
  }: IRecoveryPasswordService.Input): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new ErrorExcepetion('error', 'User does not exists.');
    }

    const token = await this.userTokensRepository.generate(user.id);

    await this.emailService.sendMail({
      email,
      subject: 'Recuperação de senha',
      message: `Recuperação de senha. ${token}`,
    });
  }
}

export default PasswordRecoveryService;
