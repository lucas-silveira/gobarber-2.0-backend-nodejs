import IAuthentication from '@domain/entities/Authentication.interface';

export interface IAuthenticateUtil {
  create: (authentication: IAuthentication) => string;

  verifyAndReturnUserID: (
    token: string,
    secretKey: string,
  ) => IAuthenticateUtil.VerifyResponse | null;
}

export namespace IAuthenticateUtil {
  export type VerifyResponse = {
    userId: string;
  };
}
