import IAuthentication from '@src/domain/entities/Authentication.interface';

export interface IAuthenticate {
  create: (authentication: IAuthentication) => string;

  verify: (
    token: string,
    secretKey: string,
  ) => IAuthenticate.VerifyResponse | null;
}

export namespace IAuthenticate {
  export type VerifyResponse = {
    userId: string;
  };
}
