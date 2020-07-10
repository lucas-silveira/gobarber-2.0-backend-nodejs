import IDateHandler from './DateHandler.interface';
import DateHandlerAdapter from './DateFnsDateHandler.adapter';

class DateHandler implements IDateHandler {
  private dateHandlerAdapter: IDateHandler;

  constructor() {
    this.dateHandlerAdapter = new DateHandlerAdapter();
  }

  public startOfHour(date: Date): Date {
    return this.dateHandlerAdapter.startOfHour(date);
  }
}

export default new DateHandler();
