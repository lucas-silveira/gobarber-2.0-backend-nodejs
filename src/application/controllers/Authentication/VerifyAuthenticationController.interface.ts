import IController from '../Controller.interface';

export type IVerifyAuthenticationController = IController<
  string,
  IVerifyAuthenticationController.Output
>;

export namespace IVerifyAuthenticationController {
  export type Output = {
    userId: string;
  };
}
