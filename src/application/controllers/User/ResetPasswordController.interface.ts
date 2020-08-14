export interface IResetPasswordController {
  handle: (dto: IResetPasswordController.Input) => Promise<void>;
}

export namespace IResetPasswordController {
  export type Input = {
    token: string;
    password: string;
  };
}
