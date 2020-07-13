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
    user: User;
    token: string;
  };

  export type User = {
    id: string;
    name: string;
    email: string;
  };
}
