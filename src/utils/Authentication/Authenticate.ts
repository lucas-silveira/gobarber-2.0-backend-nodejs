import { IAuthenticate } from './Authenticate.interface';
import JWTAuthenticateAdapter from './JWTAuthenticate.adapter';

class Authenticate implements IAuthenticate {
  private authenticateAdapter: IAuthenticate;

  constructor() {
    this.authenticateAdapter = new JWTAuthenticateAdapter();
  }

  create(
    head: IAuthenticate.Head,
    secretKey: string,
    options: IAuthenticate.Options,
  ): string {
    return this.authenticateAdapter.create(head, secretKey, options);
  }
}

export default new Authenticate();
