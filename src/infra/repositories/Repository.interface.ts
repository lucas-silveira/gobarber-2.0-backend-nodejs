export interface IRepository<T> {
  findAll: () => Promise<T[]>;
  findOne: (where: IRepository.Where) => Promise<T | null>;
  create: (appointment: T) => Promise<T>;
}

export namespace IRepository {
  export type Where = {
    [attributes: string]: string | boolean | number | Date;
  };
}
