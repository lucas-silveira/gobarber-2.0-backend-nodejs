import { IEmailHandlerService } from '@domain/protocols/service/EmailHandlerService.interface';
import transporter from '@infra/configs/email';

class MailtrapEmailHandlerService implements IEmailHandlerService {
  public async sendMail({
    email,
    subject,
    message,
  }: IEmailHandlerService.Input): Promise<void> {
    await transporter.sendMail({
      from: 'Equipe GoBarber <equipe@gobarber.com.br>',
      to: email,
      subject,
      text: message,
    });
  }
}

export default MailtrapEmailHandlerService;
