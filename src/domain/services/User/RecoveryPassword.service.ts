import { injectable, inject } from 'tsyringe';
import { IEmailHandlerService } from '@domain/protocols/service/EmailHandlerService.interface';
import { IUserRepository } from '@domain/protocols/repository/UserRepository.interface';
import ErrorExcepetion from '@utils/ErrorExcepetion/ErrorExcepetion';
import { IRecoveryTokenRepository } from '@domain/protocols/repository/RecoveryTokenRepository.interface';
import { IRecoveryPasswordService } from './RecoveryPasswordService.interface';

@injectable()
class PasswordRecoveryService implements IRecoveryPasswordService {
  private userRepository: IUserRepository;

  private recoveryTokenRepository: IRecoveryTokenRepository;

  private emailHandlerService: IEmailHandlerService;

  constructor(
    @inject('UserRepository')
    userRepository: IUserRepository,
    @inject('RecoveryTokenRepository')
    recoveryTokenRepository: IRecoveryTokenRepository,
    @inject('EmailHandlerService')
    emailHandlerService: IEmailHandlerService,
  ) {
    this.userRepository = userRepository;
    this.recoveryTokenRepository = recoveryTokenRepository;
    this.emailHandlerService = emailHandlerService;
  }

  public async execute({
    email,
  }: IRecoveryPasswordService.Input): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new ErrorExcepetion('error', 'User does not exists.');
    }

    const token = await this.recoveryTokenRepository.generate(user.id);

    await this.emailHandlerService.sendMail({
      email,
      subject: 'Recuperação de senha',
      message: `Recuperação de senha. ${token}`,
    });
  }
}

export default PasswordRecoveryService;
