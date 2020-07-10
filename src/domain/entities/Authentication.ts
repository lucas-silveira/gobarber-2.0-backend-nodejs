import { IAuthentication } from './Authentication.interface';

class Authentication implements IAuthentication {
  public readonly user: IAuthentication.User;

  public readonly token: string;

  constructor(user: IAuthentication.User, token: string) {
    this.user = user;
    this.token = token;
  }
}

export default Authentication;
