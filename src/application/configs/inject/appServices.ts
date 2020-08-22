import { container } from 'tsyringe';
import FakeEmailHandlerService from '@infra/services/emailHandler/FakeEmailHandler.service';
import { IEmailHandlerService } from '@domain/protocols/service/EmailHandlerService.interface';

container.register<IEmailHandlerService>(
  'EmailHandlerService',
  FakeEmailHandlerService,
);
