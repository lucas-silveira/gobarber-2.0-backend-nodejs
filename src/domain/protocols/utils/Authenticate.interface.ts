export interface IAuthenticateUtil {
  create: (userId: string) => string;

  verifyAndReturnUserID: (token: string) => string | null;
}
