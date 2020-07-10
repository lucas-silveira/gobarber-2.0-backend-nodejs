import { sign } from 'jsonwebtoken';

import { IAuthenticate } from './Authenticate.interface';

class JWTAuthenticateAdapter implements IAuthenticate {
  public create(
    head: IAuthenticate.Head,
    secretKey: string,
    options: IAuthenticate.Options,
  ): string {
    return sign(head, secretKey, options);
  }
}

export default JWTAuthenticateAdapter;
