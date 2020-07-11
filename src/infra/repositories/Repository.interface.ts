export default interface IRepository<T, A> {
  findAll: () => Promise<T[]>;
  findOne: (where: Partial<T>) => Promise<A | null>;
  create: (appointment: T) => Promise<A>;
}
