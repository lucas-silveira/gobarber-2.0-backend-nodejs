import { IAuthenticateUtil } from '@domain/protocols/utils/Authenticate.interface';
import authConfig from '@infra/configs/auth';
import ErrorExcepetion from '@utils/ErrorExcepetion/ErrorExcepetion';
import { IVerifyAuthentication } from './VerifyAuthentication.interface';

class VerifyBearerAuthentication implements IVerifyAuthentication {
  private readonly authenticate: IAuthenticateUtil;

  constructor(authenticate: IAuthenticateUtil) {
    this.authenticate = authenticate;
  }

  execute(authHeader: string): IVerifyAuthentication.Output {
    const [, token] = authHeader.split(' ');
    const { secretKey } = authConfig.jwt;

    const authIsValid = this.authenticate.verifyAndReturnUserID(
      token,
      secretKey,
    );

    if (!authIsValid)
      throw new ErrorExcepetion(
        'unauthorized',
        'You must be authenticated to access this feature.',
      );

    return authIsValid;
  }
}

export default VerifyBearerAuthentication;
