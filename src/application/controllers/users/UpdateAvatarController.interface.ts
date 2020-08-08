export interface IUpdateAvatarController {
  handle: (data: IUpdateAvatarController.Input) => Promise<void>;
}

export namespace IUpdateAvatarController {
  export type Input = {
    userId: string;
    avatarName: string;
  };
}
