import { IUpdateAvatarService } from '@src/domain/services/Users/UpdateAvatar.interface';

export interface IUpdateAvatarController {
  handle: (
    body: IUpdateAvatarController.Body,
  ) => Promise<IUpdateAvatarService.Output>;
}

export namespace IUpdateAvatarController {
  export interface Body {
    userId: string;
    file: string;
  }
}
