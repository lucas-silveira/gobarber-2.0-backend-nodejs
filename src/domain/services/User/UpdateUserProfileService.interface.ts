import IService from '../Service.interface';

export type IUpdateUserProfileService = IService<
  IUpdateUserProfileService.Input,
  Promise<void>
>;

export namespace IUpdateUserProfileService {
  export type Input = {
    userId: string;
    name: string;
    email: string;
    oldPassword?: string;
    password?: string;
  };
}
