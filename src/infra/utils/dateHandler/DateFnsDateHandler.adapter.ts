import { startOfHour, parseISO, isEqual } from 'date-fns';

import IDateHandler from '@domain/protocols/utils/DateHandler.interface';

class DateFnsDateHandlerAdapter implements IDateHandler {
  public startOfHour(date: Date): Date {
    return startOfHour(date);
  }

  public parseISO(date: string): Date {
    return parseISO(date);
  }

  public isEqual(date: Date, dateToCompare: Date): boolean {
    return isEqual(date, dateToCompare);
  }
}

export default DateFnsDateHandlerAdapter;
