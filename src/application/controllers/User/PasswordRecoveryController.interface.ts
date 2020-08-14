export interface IPasswordRecoveryController {
  handle: (dto: IPasswordRecoveryController.Input) => Promise<void>;
}

export namespace IPasswordRecoveryController {
  export type Input = {
    email: string;
  };
}
