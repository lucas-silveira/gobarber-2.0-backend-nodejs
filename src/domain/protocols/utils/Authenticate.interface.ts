export interface IAuthenticateUtil {
  create: (authentication: IAuthenticateUtil.CreateInput) => string;

  verifyAndReturnUserID: (
    token: string,
    secretKey: string,
  ) => IAuthenticateUtil.VerifyResponse | null;
}

export namespace IAuthenticateUtil {
  export type CreateInput = {
    secretKey: string;
    subject: string;
    expiresIn: string;
  };
  export type VerifyResponse = {
    userId: string;
  };
}
