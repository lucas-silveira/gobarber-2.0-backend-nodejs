import { IEmailService } from '@domain/protocols/service/EmailService.interface';
import { IPasswordRecoveryRequestController } from './PasswordRecoveryRequestController.interface';

class PasswordRecoveryRequest implements IPasswordRecoveryRequestController {
  private emailService: IEmailService;

  constructor(emailService: IEmailService) {
    this.emailService = emailService;
  }

  public async handle({
    email,
  }: IPasswordRecoveryRequestController.Input): Promise<void> {
    await this.emailService.sendMail({
      email,
      subject: 'Recuperação de senha',
      message: 'Recuperação de senha',
    });
  }
}

export default PasswordRecoveryRequest;
