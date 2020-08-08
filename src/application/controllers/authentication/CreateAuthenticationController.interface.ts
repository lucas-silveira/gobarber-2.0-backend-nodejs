import { ICreateAuthentication } from '@domain/services/Authentication/CreateAuthentication.interface';

export interface ICreateAuthenticationController {
  handle: (
    data: ICreateAuthenticationController.Input,
  ) => Promise<ICreateAuthenticationController.Output>;
}

export namespace ICreateAuthenticationController {
  export type Input = {
    email: string;
    password: string;
  };

  export type Output = ICreateAuthentication.Output;
}
