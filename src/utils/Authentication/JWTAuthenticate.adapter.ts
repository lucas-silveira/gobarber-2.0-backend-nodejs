import { sign, verify } from 'jsonwebtoken';

import IAuthentication from '@src/domain/entities/Authentication.interface';
import { IAuthenticate } from './Authenticate.interface';

class JWTAuthenticateAdapter implements IAuthenticate {
  public create(authentication: IAuthentication): string {
    const { secretKey, subject, expiresIn } = authentication;
    return sign({}, secretKey, { subject, expiresIn });
  }

  public verify(
    token: string,
    secretKey: string,
  ): IAuthenticate.VerifyResponse | null {
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
