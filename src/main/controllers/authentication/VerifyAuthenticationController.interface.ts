import { IVerifyAuthentication } from '@domain/usecases/Authentication/VerifyAuthentication.interface';

export interface IVerifyAuthenticationController {
  handle: (token: string | undefined) => IVerifyAuthenticationController.Output;
}

export namespace IVerifyAuthenticationController {
  export type Output = IVerifyAuthentication.Output;
}
