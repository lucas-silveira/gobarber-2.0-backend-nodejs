import { sign, verify } from 'jsonwebtoken';

import IAuthentication from '@domain/entities/Authentication.interface';
import { IAuthenticateUtil } from '@domain/protocols/utils/Authenticate.interface';

class JWTAuthenticateAdapter implements IAuthenticateUtil {
  verify: (
    token: string,
    secretKey: string,
  ) => IAuthenticateUtil.VerifyResponse | null;

  public create(authentication: IAuthentication): string {
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
