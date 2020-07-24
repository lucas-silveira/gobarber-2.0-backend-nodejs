import { IUpdateAvatar } from '@domain/usecases/Users/UpdateAvatar.interface';

export interface IUpdateAvatarController {
  handle: (
    data: IUpdateAvatarController.Input,
  ) => Promise<IUpdateAvatarController.Output>;
}

export namespace IUpdateAvatarController {
  export type Input = {
    userId: string;
    avatarName: string;
  };

  export type Output = IUpdateAvatar.Output;
}
