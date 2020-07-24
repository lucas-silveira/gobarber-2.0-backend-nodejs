import { IAuthenticateLib } from '@domain/protocols/authentication/Authenticate.interface';
import authConfig from '@configs/auth';
import CustomError from '@domain/entities/Error';
import { IVerifyAuthentication } from './VerifyAuthentication.interface';

class VerifyBearerAuthentication implements IVerifyAuthentication {
  private readonly authenticateLib: IAuthenticateLib;

  constructor(authenticateLib: IAuthenticateLib) {
    this.authenticateLib = authenticateLib;
  }

  execute(authHeader: string): IVerifyAuthentication.Output {
    const [, token] = authHeader.split(' ');
    const { secretKey } = authConfig.jwt;

    const authResponse = this.authenticateLib.verify(token, secretKey);

    if (!authResponse)
      throw new CustomError('unauthorized', "You don't have authorization.");

    return authResponse;
  }
}

export default VerifyBearerAuthentication;
