export default interface IRepository<T> {
  findAll: () => Promise<T[]>;
  findOne: (where: Partial<T>) => Promise<T | null>;
  create: (appointment: T) => Promise<T>;
}
