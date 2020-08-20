import IController from '../Controller.interface';

export type ICreateAuthenticationController = IController<
  ICreateAuthenticationController.Input,
  Promise<ICreateAuthenticationController.Output>
>;

export namespace ICreateAuthenticationController {
  export type Input = {
    email: string;
    password: string;
  };

  export type Output = {
    user: User;
    token: string;
  };

  export type User = {
    id: string;
    name: string;
    email: string;
  };
}
