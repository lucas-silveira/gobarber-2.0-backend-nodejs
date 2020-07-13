import { IUpdateAvatarService } from '@domain/usecases/Users/UpdateAvatar.interface';
import { IUpdateAvatarController } from './UpdateAvatar.interface';

class UpdateAvatarController implements IUpdateAvatarController {
  private updateAvatar: IUpdateAvatarService;

  constructor(updateAvatar: IUpdateAvatarService) {
    this.updateAvatar = updateAvatar;
  }

  public async handle(
    body: IUpdateAvatarController.Body,
  ): Promise<IUpdateAvatarService.Output> {
    const { userId, avatarName } = body;
    await this.updateAvatar.execute({
      userId,
      avatarName,
    });
  }
}

export default UpdateAvatarController;
