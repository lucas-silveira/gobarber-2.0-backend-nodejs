export interface IPasswordRecoveryRequestController {
  handle: (dto: IPasswordRecoveryRequestController.Input) => Promise<void>;
}

export namespace IPasswordRecoveryRequestController {
  export type Input = {
    email: string;
  };
}
