import { IAuthenticate } from './Authenticate.interface';
import JWTAuthenticateAdapter from './JWTAuthenticate.adapter';

class Authenticate implements IAuthenticate {
  private authenticateAdapter: IAuthenticate;

  constructor() {
    this.authenticateAdapter = new JWTAuthenticateAdapter();
  }

  public create(
    head: IAuthenticate.Head,
    secretKey: string,
    options: IAuthenticate.Options,
  ): string {
    return this.authenticateAdapter.create(head, secretKey, options);
  }

  public verify(
    token: string,
    secretKey: string,
  ): IAuthenticate.VerifyResponse | null {
    return this.authenticateAdapter.verify(token, secretKey);
  }
}

export default new Authenticate();
