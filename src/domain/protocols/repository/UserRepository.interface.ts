import IUserEntity from '@domain/entities/UserEntity.interface';

export default interface IUserRepository {
  findAll: () => Promise<IUserEntity[]>;
  findById: (id: string) => Promise<Required<IUserEntity> | null>;
  findByEmail: (email: string) => Promise<Required<IUserEntity> | null>;
  create: (entity: IUserEntity) => Promise<Required<IUserEntity>>;
  update: (entitiy: Required<IUserEntity>) => Promise<Required<IUserEntity>>;
}
