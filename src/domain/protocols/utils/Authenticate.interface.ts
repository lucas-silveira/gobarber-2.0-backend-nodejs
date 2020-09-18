export interface ICreateAuthentication {
  create: (userId: string) => string;
}

export interface IVerifyAuthentication {
  verifyAndReturnUserID: (token: string) => string | null;
}

export interface IAuthenticateUtil
  extends ICreateAuthentication,
    IVerifyAuthentication {}
