import IController from '../Controller.interface';

export type IGetUserProfileController = IController<
  string,
  Promise<IGetUserProfileController.Output>
>;

export namespace IGetUserProfileController {
  export type Output = {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
}
