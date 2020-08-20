import IController from '../Controller.interface';

export type ICreateUserController = IController<
  ICreateUserController.Input,
  Promise<void>
>;

export namespace ICreateUserController {
  export type Input = {
    name: string;
    email: string;
    password: string;
  };
}
