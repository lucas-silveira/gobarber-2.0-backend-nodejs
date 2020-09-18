import {
  IEmailHandlerService,
  ISendMail,
} from '@domain/protocols/service/EmailHandlerService.interface';

class FakeEmailHandlerService implements IEmailHandlerService {
  private messages: ISendMail.Message[];

  constructor() {
    this.messages = [];
  }

  public async sendMail({
    email,
    subject,
    message,
  }: ISendMail.Message): Promise<void> {
    this.messages.push({ email, subject, message });
    return Promise.resolve();
  }
}

export default FakeEmailHandlerService;
