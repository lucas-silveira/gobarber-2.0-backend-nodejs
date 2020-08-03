import IUser from '@domain/entities/User.interface';

export default interface IUserRepository {
  findAll: () => Promise<IUser[]>;
  findById: (id: string) => Promise<Required<IUser> | null>;
  findByEmail: (email: string) => Promise<Required<IUser> | null>;
  create: (entity: IUser) => Promise<Required<IUser>>;
  update: (entitiy: Required<IUser>) => Promise<Required<IUser>>;
}
