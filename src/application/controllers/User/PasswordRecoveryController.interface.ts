import IController from '../Controller.interface';

export type IPasswordRecoveryController = IController<
  IPasswordRecoveryController.Input,
  Promise<void>
>;

export namespace IPasswordRecoveryController {
  export type Input = {
    email: string;
  };
}
