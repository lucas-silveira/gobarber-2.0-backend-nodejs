import IAuthentication from '@domain/entities/Authentication.interface';

export interface IAuthenticateLib {
  create: (authentication: IAuthentication) => string;

  verify: (
    token: string,
    secretKey: string,
  ) => IAuthenticateLib.VerifyResponse | null;
}

export namespace IAuthenticateLib {
  export type VerifyResponse = {
    userId: string;
  };
}
