import IController from '../Controller.interface';

export type IUpdateAvatarController = IController<
  IUpdateAvatarController.Input,
  Promise<void>
>;

export namespace IUpdateAvatarController {
  export type Input = {
    userId: string;
    avatarName: string;
  };
}
