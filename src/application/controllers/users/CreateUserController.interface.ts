import { ICreateUserService } from '@domain/services/Users/CreateUserService.interface';

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

  export type Output = ICreateUserService.Output;
}
