import { startOfHour, parseISO } from 'date-fns';

import IDateHandler from './DateHandler.interface';

class DateHandlerAdapter implements IDateHandler {
  public startOfHour(date: Date): Date {
    return startOfHour(date);
  }

  public parseISO(date: string): Date {
    return parseISO(date);
  }
}

export default DateHandlerAdapter;
