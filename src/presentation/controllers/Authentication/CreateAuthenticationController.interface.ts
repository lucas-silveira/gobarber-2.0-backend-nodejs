import { ICreateAuthenticationService } from '@src/domain/services/Authentication/CreateAuthentication.interface';

export interface ICreateAuthenticationController {
  handle: (
    body: ICreateAuthenticationController.Body,
  ) => Promise<ICreateAuthenticationService.Output>;
}

export namespace ICreateAuthenticationController {
  export interface Body {
    email: string;
    password: string;
  }
}
