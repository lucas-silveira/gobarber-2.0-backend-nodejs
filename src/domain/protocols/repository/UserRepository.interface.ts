import IUserEntity from '@domain/entities/UserEntity.interface';

export interface IUserRepository {
  findAll: () => Promise<IUserEntity[]>;
  findById: (id: string) => Promise<IUserEntity | null>;
  findByEmail: (email: string) => Promise<IUserEntity | null>;
  create: (user: IUserEntity) => Promise<IUserEntity>;
  update: (user: IUserEntity) => Promise<IUserEntity>;
}
