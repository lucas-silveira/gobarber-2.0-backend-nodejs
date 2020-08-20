import IService from '../Service.interface';

export type ICreateAuthenticationService = IService<
  ICreateAuthenticationService.Input,
  Promise<ICreateAuthenticationService.Output>
>;

export namespace ICreateAuthenticationService {
  export type Input = {
    email: string;
    password: string;
  };

  export type Output = {
    user: User;
    token: string;
  };

  export type User = {
    id: string;
    name: string;
    email: string;
  };
}
