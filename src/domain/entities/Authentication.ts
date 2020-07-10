import IAuthentication from './Authentication.interface';

class Authentication implements IAuthentication {
  public readonly email: string;

  public readonly token: string;

  constructor(email: string, token: string) {
    this.email = email;
    this.token = token;
  }
}

export default Authentication;
