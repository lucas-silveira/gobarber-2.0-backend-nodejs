import IUserEntity from '@domain/entities/UserEntity.interface';

export interface IUserRepository {
  findAll: () => Promise<IUserEntity[]>;
  findById: (id: string) => Promise<IUserEntity | null>;
  findByEmail: (email: string) => Promise<IUserEntity | null>;
  create: (userDTO: IUserRepository.createInput) => Promise<IUserEntity>;
  update: (user: IUserEntity) => Promise<IUserEntity>;
  delete: (id: string) => Promise<void>;
}

export namespace IUserRepository {
  export type createInput = {
    name: string;
    email: string;
    password: string;
  };
}
