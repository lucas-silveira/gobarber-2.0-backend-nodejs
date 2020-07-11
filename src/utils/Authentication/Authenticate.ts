import IAuthentication from '@src/domain/entities/Authentication.interface';
import { IAuthenticate } from './Authenticate.interface';
import JWTAuthenticateAdapter from './JWTAuthenticate.adapter';

class Authenticate implements IAuthenticate {
  private authenticateAdapter: IAuthenticate;

  constructor() {
    this.authenticateAdapter = new JWTAuthenticateAdapter();
  }

  public create(authentication: IAuthentication): string {
    return this.authenticateAdapter.create(authentication);
  }

  public verify(
    token: string,
    secretKey: string,
  ): IAuthenticate.VerifyResponse | null {
    return this.authenticateAdapter.verify(token, secretKey);
  }
}

export default new Authenticate();
