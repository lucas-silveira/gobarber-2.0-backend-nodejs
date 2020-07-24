import { sign, verify } from 'jsonwebtoken';

import IAuthentication from '@domain/entities/Authentication.interface';
import { IAuthenticateLib } from './Authenticate.interface';

class JWTAuthenticateAdapter implements IAuthenticateLib {
  public create(authentication: IAuthentication): string {
    const { secretKey, subject, expiresIn } = authentication;
    return sign({}, secretKey, { subject, expiresIn });
  }

  public verify(
    token: string,
    secretKey: string,
  ): IAuthenticateLib.VerifyResponse | null {
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
