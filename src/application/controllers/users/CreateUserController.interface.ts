import { ICreateUser } from '@domain/services/Users/CreateUser.interface';

export interface ICreateUserController {
  handle: (
    data: ICreateUserController.Input,
  ) => Promise<ICreateUserController.Output>;
}

export namespace ICreateUserController {
  export type Input = {
    name: string;
    email: string;
    password: string;
  };

  export type Output = ICreateUser.Output;
}
