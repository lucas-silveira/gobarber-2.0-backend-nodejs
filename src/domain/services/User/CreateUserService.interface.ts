import IUserEntity from '@domain/entities/UserEntity.interface';
import IService from '../Service.interface';

export type ICreateUserService = IService<
  ICreateUserService.Input,
  Promise<ICreateUserService.Output>
>;

export namespace ICreateUserService {
  export type Input = {
    name: string;
    email: string;
    password: string;
  };

  export type Output = IUserEntity;
}
