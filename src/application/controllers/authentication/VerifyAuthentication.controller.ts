import { IVerifyAuthentication } from '@domain/services/Authentication/VerifyAuthentication.interface';
import { IVerifyAuthenticationController } from './VerifyAuthenticationController.interface';

class VerifyAuthenticationController
  implements IVerifyAuthenticationController {
  private verifyAuthentication: IVerifyAuthentication;

  constructor(verifyAuthentication: IVerifyAuthentication) {
    this.verifyAuthentication = verifyAuthentication;
  }

  public handle(
    authHeader: string | undefined,
  ): IVerifyAuthenticationController.Output {
    return this.verifyAuthentication.execute(authHeader || '');
  }
}

export default VerifyAuthenticationController;
