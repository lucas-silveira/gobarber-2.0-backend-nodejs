namespace IRepository {
  export type FindAll<T> = () => Promise<T[]>;
  export type FindOne<T, A> = (where: Partial<T>) => Promise<A | null>;
  export type Create<T, A> = (entity: T) => Promise<A>;
  export type Update<T, A> = (entitiy: T) => Promise<A>;
}

export default IRepository;
