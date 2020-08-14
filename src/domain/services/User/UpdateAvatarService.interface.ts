export interface IUpdateAvatarService {
  execute: (data: IUpdateAvatarService.Input) => Promise<void>;
}

export namespace IUpdateAvatarService {
  export type Input = {
    userId: string;
    avatarName: string;
  };
}
