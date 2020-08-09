export interface IUserRepository {
  findAll: () => Promise<IUserRepository.UserData[]>;
  findById: (id: string) => Promise<IUserRepository.UserData | null>;
  findByEmail: (email: string) => Promise<IUserRepository.UserData | null>;
  create: (
    entity: IUserRepository.UserEntity,
  ) => Promise<IUserRepository.UserData>;
  update: (
    entitiy: IUserRepository.UserData,
  ) => Promise<IUserRepository.UserData>;
}

export namespace IUserRepository {
  export type UserEntity = {
    name: string;
    email: string;
    password: string;
  };

  export type UserData = {
    id: string;
    name: string;
    email: string;
    avatar: string;
    password: string;
  };
}
