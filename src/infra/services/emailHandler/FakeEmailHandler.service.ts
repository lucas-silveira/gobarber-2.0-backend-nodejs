import { IEmailService } from '@domain/protocols/service/EmailService.interface';

class FakeEmailHandlerService implements IEmailService {
  private messages: IEmailService.Input[];

  constructor() {
    this.messages = [];
  }

  public async sendMail({
    email,
    subject,
    message,
  }: IEmailService.Input): Promise<void> {
    this.messages.push({ email, subject, message });
    return Promise.resolve();
  }
}

export default FakeEmailHandlerService;
