import { startOfHour } from 'date-fns';

import IDateManipulator from './DateManipulator.interface';

class DateManipulatorAdapter implements IDateManipulator {
  public static startOfHour(date: Date): Date {
    return startOfHour(date);
  }
}

export default DateManipulatorAdapter;
