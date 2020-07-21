import { IUpdateAvatar } from '@domain/usecases/Users/UpdateAvatar.interface';
import { IUpdateAvatarController } from './UpdateAvatar.interface';

class UpdateAvatarController implements IUpdateAvatarController {
  private updateAvatar: IUpdateAvatar;

  constructor(updateAvatar: IUpdateAvatar) {
    this.updateAvatar = updateAvatar;
  }

  public async handle(
    body: IUpdateAvatarController.Body,
  ): Promise<IUpdateAvatar.Output> {
    const { userId, avatarName } = body;
    await this.updateAvatar.execute({
      userId,
      avatarName,
    });
  }
}

export default UpdateAvatarController;
