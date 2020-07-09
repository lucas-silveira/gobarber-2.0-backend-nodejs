export default interface IRepository<T> {
  findAll: () => Promise<T[]>;
  findByDate: (date: Date) => Promise<T | null>;
  create: (appointment: T) => Promise<T>;
}
