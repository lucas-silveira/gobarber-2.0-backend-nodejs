export default interface IDateHandler {
  startOfHour: (date: Date) => Date;
  parseISO: (date: string) => Date;
}
