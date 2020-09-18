export interface IStartOfHour {
  startOfHour: (date: Date) => Date;
}

export interface IParseISO {
  parseISO: (date: string) => Date;
}

export interface IIsEqual {
  isEqual: (date: Date, dateToCompare: Date) => boolean;
}

export interface IDifferenceInHours {
  differenceInHours: (
    dateLeft: number | Date,
    dateRight: number | Date,
  ) => number;
}

export interface IDateHandler
  extends IStartOfHour,
    IParseISO,
    IIsEqual,
    IDifferenceInHours {}
