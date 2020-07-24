import { IUpdateAvatar } from '@domain/usecases/Users/UpdateAvatar.interface';
import { IUpdateAvatarController } from './UpdateAvatar.interface';

class UpdateAvatarController implements IUpdateAvatarController {
  private updateAvatar: IUpdateAvatar;

  constructor(updateAvatar: IUpdateAvatar) {
    this.updateAvatar = updateAvatar;
  }

  public async handle(
    data: IUpdateAvatarController.Input,
  ): Promise<IUpdateAvatarController.Output> {
    const { userId, avatarName } = data;
    await this.updateAvatar.execute({
      userId,
      avatarName,
    });
  }
}

export default UpdateAvatarController;
