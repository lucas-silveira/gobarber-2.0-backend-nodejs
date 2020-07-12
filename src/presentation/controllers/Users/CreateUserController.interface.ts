import { ICreateUserService } from '@src/domain/services/Users/CreateUser.interface';

export interface ICreateUserController {
  handle: (
    body: ICreateUserController.Body,
  ) => Promise<ICreateUserService.Output>;
}

export namespace ICreateUserController {
  export interface Body {
    name: string;
    email: string;
    password: string;
  }
}
