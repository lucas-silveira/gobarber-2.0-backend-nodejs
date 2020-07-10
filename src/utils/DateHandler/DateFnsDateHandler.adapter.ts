import { startOfHour } from 'date-fns';

import IDateHandler from './DateHandler.interface';

class DateHandlerAdapter implements IDateHandler {
  public startOfHour(date: Date): Date {
    return startOfHour(date);
  }
}

export default DateHandlerAdapter;
