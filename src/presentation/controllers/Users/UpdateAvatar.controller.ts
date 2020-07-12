import { IUpdateAvatarService } from '@domain/services/Users/UpdateAvatar.interface';
import { IUpdateAvatarController } from './UpdateAvatar.interface';

class UpdateAvatarController implements IUpdateAvatarController {
  private updateAvatar: IUpdateAvatarService;

  constructor(updateAvatar: IUpdateAvatarService) {
    this.updateAvatar = updateAvatar;
  }

  public async handle(
    body: IUpdateAvatarController.Body,
  ): Promise<IUpdateAvatarService.Output> {
    const { userId, file } = body;
    await this.updateAvatar.execute({
      userId,
      avatarUrl: file,
    });
  }
}

export default UpdateAvatarController;
