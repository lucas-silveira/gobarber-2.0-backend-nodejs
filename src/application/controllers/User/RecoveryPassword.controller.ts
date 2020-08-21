import { IRecoveryPasswordService } from '@domain/services/User/RecoveryPasswordService.interface';
import { IRecoveryPasswordController } from './RecoveryPasswordController.interface';

class PasswordRecoveryController implements IRecoveryPasswordController {
  private recoveryPasswordService: IRecoveryPasswordService;

  constructor(recoveryPasswordService: IRecoveryPasswordService) {
    this.recoveryPasswordService = recoveryPasswordService;
  }

  public async handle({
    email,
  }: IRecoveryPasswordController.Input): Promise<void> {
    await this.recoveryPasswordService.execute({ email });
  }
}

export default PasswordRecoveryController;
