import IAuthentication from './Authentication.interface';

class Authentication implements IAuthentication {
  public readonly secretKey: string;

  public readonly subject: string;

  public readonly expiresIn: string;

  constructor(secretKey: string, subject: string, expiresIn: string) {
    this.secretKey = secretKey;
    this.subject = subject;
    this.expiresIn = expiresIn;
  }
}

export default Authentication;
