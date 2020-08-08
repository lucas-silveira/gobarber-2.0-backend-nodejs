export interface IUpdateAvatar {
  execute: (dto: IUpdateAvatar.Input) => Promise<IUpdateAvatar.Output>;
}

export namespace IUpdateAvatar {
  export type Input = {
    userId: string;
    avatarName: string;
  };

  export type Output = void;
}
