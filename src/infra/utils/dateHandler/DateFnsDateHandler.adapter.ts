import { startOfHour, parseISO, isEqual, differenceInHours } from 'date-fns';

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

  public differenceInHours(
    dateLeft: number | Date,
    dateRight: number | Date,
  ): number {
    return differenceInHours(dateLeft, dateRight);
  }
}

export default DateFnsDateHandlerAdapter;
