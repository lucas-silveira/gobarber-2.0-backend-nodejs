import { IAuthentication } from '@domain/entities/Authentication.interface';

export interface ICreateAuthenticationService {
  execute: (
    authenticate: ICreateAuthenticationService.Input,
  ) => Promise<ICreateAuthenticationService.Output>;
}

export namespace ICreateAuthenticationService {
  export type Input = {
    email: string;
    password: string;
  };

  export type Output = {
    user: IAuthentication.User;
    token: string;
  };
}
