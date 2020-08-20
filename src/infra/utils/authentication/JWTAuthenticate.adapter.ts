import { sign, verify } from 'jsonwebtoken';

import { IAuthenticateUtil } from '@domain/protocols/utils/Authenticate.interface';
import authConfig from '@infra/configs/auth';

class JWTAuthenticateAdapter implements IAuthenticateUtil {
  verify: (token: string, secretKey: string) => string | null;

  public create(userId: string): string {
    const { secretKey, expiresIn } = authConfig.jwt;
    return sign({}, secretKey, { subject: userId, expiresIn });
  }

  public verifyAndReturnUserID(token: string): string | null {
    try {
      const { secretKey } = authConfig.jwt;
      const decodedToken = verify(token, secretKey);
      const { sub: userId } = decodedToken as { sub: string };
      return userId;
    } catch (err) {
      return null;
    }
  }
}

export default JWTAuthenticateAdapter;
