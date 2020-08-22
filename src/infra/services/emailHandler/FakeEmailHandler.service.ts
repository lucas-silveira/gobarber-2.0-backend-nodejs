import { IEmailHandlerService } from '@domain/protocols/service/EmailHandlerService.interface';

class FakeEmailHandlerService implements IEmailHandlerService {
  private messages: IEmailHandlerService.Input[];

  constructor() {
    this.messages = [];
  }

  public async sendMail({
    email,
    subject,
    message,
  }: IEmailHandlerService.Input): Promise<void> {
    this.messages.push({ email, subject, message });
    return Promise.resolve();
  }
}

export default FakeEmailHandlerService;
