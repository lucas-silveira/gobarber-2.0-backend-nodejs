import { IVerifyAuthenticationService } from '@domain/services/Authentication/VerifyAuthenticationService.interface';
import { IVerifyAuthenticationController } from './VerifyAuthenticationController.interface';

class VerifyAuthenticationController
  implements IVerifyAuthenticationController {
  private verifyAuthenticationService: IVerifyAuthenticationService;

  constructor(verifyAuthenticationService: IVerifyAuthenticationService) {
    this.verifyAuthenticationService = verifyAuthenticationService;
  }

  public handle(token = ''): IVerifyAuthenticationController.Output {
    const userId = this.verifyAuthenticationService.execute(token);

    return { userId };
  }
}

export default VerifyAuthenticationController;
