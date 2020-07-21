export interface ICreateUser {
  execute: (user: ICreateUser.Input) => Promise<ICreateUser.Output>;
}

export namespace ICreateUser {
  export type Input = {
    name: string;
    email: string;
    password: string;
  };

  export type Output = {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
}
