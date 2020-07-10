import { sign, verify } from 'jsonwebtoken';

import { IAuthenticate } from './Authenticate.interface';

class JWTAuthenticateAdapter implements IAuthenticate {
  public create(
    head: IAuthenticate.Head,
    secretKey: string,
    options: IAuthenticate.Options,
  ): string {
    return sign(head, secretKey, options);
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
