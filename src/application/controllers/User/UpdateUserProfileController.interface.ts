import IController from '../Controller.interface';

export type IUpdateUserProfileController = IController<
  IUpdateUserProfileController.Input,
  Promise<void>
>;

export namespace IUpdateUserProfileController {
  export type Input = {
    userId: string;
    name: string;
    email: string;
    oldPassword?: string;
    password?: string;
  };
}
