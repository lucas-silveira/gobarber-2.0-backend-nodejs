import IController from '../Controller.interface';

export type IResetPasswordController = IController<
  IResetPasswordController.Input,
  Promise<void>
>;

export namespace IResetPasswordController {
  export type Input = {
    token: string;
    password: string;
  };
}
