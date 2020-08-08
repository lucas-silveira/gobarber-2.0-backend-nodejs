export interface ICreateAuthentication {
  execute: (
    dto: ICreateAuthentication.Input,
  ) => Promise<ICreateAuthentication.Output>;
}

export namespace ICreateAuthentication {
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
