import { ICreateAuthentication } from '@domain/usecases/Authentication/CreateAuthentication.interface';

export interface ICreateAuthenticationController {
  handle: (
    body: ICreateAuthenticationController.Body,
  ) => Promise<ICreateAuthentication.Output>;
}

export namespace ICreateAuthenticationController {
  export interface Body {
    email: string;
    password: string;
  }
}
