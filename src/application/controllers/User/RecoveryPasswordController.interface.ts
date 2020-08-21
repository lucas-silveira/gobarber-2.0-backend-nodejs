import IController from '../Controller.interface';

export type IRecoveryPasswordController = IController<
  IRecoveryPasswordController.Input,
  Promise<void>
>;

export namespace IRecoveryPasswordController {
  export type Input = {
    email: string;
  };
}
