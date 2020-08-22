import { injectable, inject } from 'tsyringe';
import { IRecoveryPasswordService } from '@domain/services/User/RecoveryPasswordService.interface';
import { IRecoveryPasswordController } from './RecoveryPasswordController.interface';

@injectable()
class PasswordRecoveryController implements IRecoveryPasswordController {
  private recoveryPasswordService: IRecoveryPasswordService;

  constructor(
    @inject('RecoveryPasswordService')
    recoveryPasswordService: IRecoveryPasswordService,
  ) {
    this.recoveryPasswordService = recoveryPasswordService;
  }

  public async handle({
    email,
  }: IRecoveryPasswordController.Input): Promise<void> {
    await this.recoveryPasswordService.execute({ email });
  }
}

export default PasswordRecoveryController;
