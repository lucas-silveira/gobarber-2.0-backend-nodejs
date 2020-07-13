export interface IUpdateAvatarService {
  execute: (
    params: IUpdateAvatarService.Input,
  ) => Promise<IUpdateAvatarService.Output>;
}

export namespace IUpdateAvatarService {
  export type Input = {
    userId: string;
    avatarName: string;
  };

  export type Output = void;
}
