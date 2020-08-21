import { container } from 'tsyringe';
import IDateHandler from '@domain/protocols/utils/DateHandler.interface';
import DateFnsDateHandlerAdapter from '@infra/utils/dateHandler/DateFnsDateHandler.adapter';

container.registerSingleton<IDateHandler>(
  'DateHandler',
  DateFnsDateHandlerAdapter,
);
