import IDateHandler from './DateHandler.interface';
import DateFnsDateHandlerAdapter from './DateFnsDateHandler.adapter';

class DateHandler implements IDateHandler {
  private dateHandlerAdapter: IDateHandler;

  constructor() {
    this.dateHandlerAdapter = new DateFnsDateHandlerAdapter();
  }

  public startOfHour(date: Date): Date {
    return this.dateHandlerAdapter.startOfHour(date);
  }

  public parseISO(date: string): Date {
    return this.dateHandlerAdapter.parseISO(date);
  }
}

export default new DateHandler();
