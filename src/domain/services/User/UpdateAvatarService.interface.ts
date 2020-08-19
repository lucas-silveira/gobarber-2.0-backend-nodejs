import IService from '../Service.interface';

export type IUpdateAvatarService = IService<
  IUpdateAvatarService.Input,
  Promise<void>
>;

export namespace IUpdateAvatarService {
  export type Input = {
    userId: string;
    avatarName: string;
  };
}
