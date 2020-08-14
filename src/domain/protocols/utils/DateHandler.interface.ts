export default interface IDateHandler {
  startOfHour: (date: Date) => Date;
  parseISO: (date: string) => Date;
  isEqual: (date: Date, dateToCompare: Date) => boolean;
  differenceInHours: (
    dateLeft: number | Date,
    dateRight: number | Date,
  ) => number;
}
