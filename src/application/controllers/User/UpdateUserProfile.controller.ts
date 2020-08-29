import { injectable, inject } from 'tsyringe';
import { IUpdateUserProfileService } from '@domain/services/User/UpdateUserProfileService.interface';
import { IUpdateUserProfileController } from './UpdateUserProfileController.interface';

@injectable()
class UpdateUserProfileController implements IUpdateUserProfileController {
  private updateUserProfileService: IUpdateUserProfileService;

  constructor(
    @inject('UpdateUserProfileService')
    updateUserProfileService: IUpdateUserProfileService,
  ) {
    this.updateUserProfileService = updateUserProfileService;
  }

  public async handle(data: IUpdateUserProfileController.Input): Promise<void> {
    const { userId, name, email, oldPassword, password } = data;
    await this.updateUserProfileService.execute({
      userId,
      name,
      email,
      oldPassword: oldPassword || '',
      password: password || '',
    });
  }
}

export default UpdateUserProfileController;
