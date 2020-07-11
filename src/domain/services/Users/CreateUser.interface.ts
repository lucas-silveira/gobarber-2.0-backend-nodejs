export interface ICreateUserService {
  execute: (
    user: ICreateUserService.Input,
  ) => Promise<ICreateUserService.Output>;
}

export namespace ICreateUserService {
  export type Input = {
    name: string;
    email: string;
    password: string;
  };

  export type Output = {
    id: string;
    name: string;
    email: string;
  };
}
