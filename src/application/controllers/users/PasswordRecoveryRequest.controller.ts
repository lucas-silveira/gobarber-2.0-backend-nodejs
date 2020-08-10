import { IEmailService } from '@domain/protocols/service/EmailService.interface';
import { IUserRepository } from '@domain/protocols/repository/UserRepository.interface';
import ErrorExcepetion from '@utils/ErrorExcepetion/ErrorExcepetion';
import { IUserTokensRepository } from '@domain/protocols/repository/UserTokensRepository.interface';
import { IPasswordRecoveryRequestController } from './PasswordRecoveryRequestController.interface';

class PasswordRecoveryRequest implements IPasswordRecoveryRequestController {
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
  }: IPasswordRecoveryRequestController.Input): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new ErrorExcepetion('error', 'User does not exists.');
    }

    await this.userTokensRepository.generate(user.id);

    await this.emailService.sendMail({
      email,
      subject: 'Recuperação de senha',
      message: 'Recuperação de senha',
    });
  }
}

export default PasswordRecoveryRequest;
