import { IEmailService } from '@domain/protocols/service/EmailService.interface';
import { IPasswordRecoveryRequest } from './PasswordRecoveryRequest.interface';

class PasswordRecoveryRequest implements IPasswordRecoveryRequest {
  private emailService: IEmailService;

  constructor(emailService: IEmailService) {
    this.emailService = emailService;
  }

  public async execute({
    email,
  }: IPasswordRecoveryRequest.Input): Promise<void> {
    await this.emailService.sendMail({
      email,
      subject: 'Recuperação de senha',
      message: 'Recuperação de senha',
    });
  }
}

export default PasswordRecoveryRequest;
