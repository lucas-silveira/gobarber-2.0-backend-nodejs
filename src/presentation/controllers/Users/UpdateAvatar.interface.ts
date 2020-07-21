import { IUpdateAvatar } from '@domain/usecases/Users/UpdateAvatar.interface';

export interface IUpdateAvatarController {
  handle: (body: IUpdateAvatarController.Body) => Promise<IUpdateAvatar.Output>;
}

export namespace IUpdateAvatarController {
  export interface Body {
    userId: string;
    avatarName: string;
  }
}
