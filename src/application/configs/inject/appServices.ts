import { container } from 'tsyringe';
import { IEmailHandlerService } from '@domain/protocols/service/EmailHandlerService.interface';
import MailtrapEmailHandlerService from '@infra/services/emailHandler/MailtrapEmailHandler.service';

container.register<IEmailHandlerService>(
  'EmailHandlerService',
  MailtrapEmailHandlerService,
);
