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
    email: string;
    token: string;
  };
}
