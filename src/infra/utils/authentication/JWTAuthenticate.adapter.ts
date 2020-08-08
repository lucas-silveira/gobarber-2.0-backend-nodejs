import { sign, verify } from 'jsonwebtoken';

import { IAuthenticateUtil } from '@domain/protocols/utils/Authenticate.interface';

class JWTAuthenticateAdapter implements IAuthenticateUtil {
  verify: (
    token: string,
    secretKey: string,
  ) => IAuthenticateUtil.VerifyResponse | null;

  public create(authentication: IAuthenticateUtil.CreateInput): string {
    const { secretKey, subject, expiresIn } = authentication;
    return sign({}, secretKey, { subject, expiresIn });
  }

  public verifyAndReturnUserID(
    token: string,
    secretKey: string,
  ): IAuthenticateUtil.VerifyResponse | null {
    try {
      const decodedToken = verify(token, secretKey);
      const { sub: userId } = decodedToken as { sub: string };
      return { userId };
    } catch (err) {
      return null;
    }
  }
}

export default JWTAuthenticateAdapter;
