import { IAuthenticateUtil } from '@domain/protocols/utils/Authenticate.interface';
import authConfig from '@infra/configs/auth';
import ErrorExcepetion from '@utils/ErrorExcepetion/ErrorExcepetion';
import { IVerifyAuthenticationController } from './VerifyAuthenticationController.interface';

class VerifyAuthenticationController
  implements IVerifyAuthenticationController {
  private readonly authenticate: IAuthenticateUtil;

  constructor(authenticate: IAuthenticateUtil) {
    this.authenticate = authenticate;
  }

  public handle(authHeader = ''): IVerifyAuthenticationController.Output {
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

export default VerifyAuthenticationController;
