import { injectable, inject } from 'tsyringe';
import { IUpdateAvatarService } from '@domain/services/User/UpdateAvatarService.interface';
import { IUpdateAvatarController } from './UpdateAvatarController.interface';

@injectable()
class UpdateAvatarController implements IUpdateAvatarController {
  private updateAvatarService: IUpdateAvatarService;

  constructor(
    @inject('UpdateAvatarService')
    updateAvatarService: IUpdateAvatarService,
  ) {
    this.updateAvatarService = updateAvatarService;
  }

  public async handle(data: IUpdateAvatarController.Input): Promise<void> {
    const { userId, avatarName } = data;
    await this.updateAvatarService.execute({ userId, avatarName });
  }
}

export default UpdateAvatarController;
