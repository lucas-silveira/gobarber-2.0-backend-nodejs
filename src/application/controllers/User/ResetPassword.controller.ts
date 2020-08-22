import { injectable, inject } from 'tsyringe';
import { IResetPasswordService } from '@domain/services/User/ResetPasswordService.interface';
import { IResetPasswordController } from './ResetPasswordController.interface';

@injectable()
class ResetPasswordController implements IResetPasswordController {
  private resetPasswordService: IResetPasswordService;

  constructor(
    @inject('ResetPasswordService')
    resetPasswordService: IResetPasswordService,
  ) {
    this.resetPasswordService = resetPasswordService;
  }

  public async handle({
    token,
    password,
  }: IResetPasswordController.Input): Promise<void> {
    await this.resetPasswordService.execute({ token, password });
  }
}

export default ResetPasswordController;
