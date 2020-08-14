import { IEmailService } from '@domain/protocols/service/EmailService.interface';
import { IUserRepository } from '@domain/protocols/repository/UserRepository.interface';
import ErrorExcepetion from '@utils/ErrorExcepetion/ErrorExcepetion';
import { IUserTokensRepository } from '@domain/protocols/repository/UserTokenRepository.interface';
import { IPasswordRecoveryController } from './PasswordRecoveryController.interface';

class PasswordRecovery implements IPasswordRecoveryController {
  private userRepository: IUserRepository;

  private userTokensRepository: IUserTokensRepository;

  private emailService: IEmailService;

  constructor(
    userRepository: IUserRepository,
    userTokensRepository: IUserTokensRepository,
    emailService: IEmailService,
  ) {
    this.userRepository = userRepository;
    this.userTokensRepository = userTokensRepository;
    this.emailService = emailService;
  }

  public async handle({
    email,
  }: IPasswordRecoveryController.Input): Promise<void> {
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

export default PasswordRecovery;
