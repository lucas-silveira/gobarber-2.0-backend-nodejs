export interface ICreateUserController {
  handle: (data: ICreateUserController.Input) => Promise<void>;
}

export namespace ICreateUserController {
  export type Input = {
    name: string;
    email: string;
    password: string;
  };
}
