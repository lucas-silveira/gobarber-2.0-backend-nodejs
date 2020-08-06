export interface IPasswordRecoveryRequest {
  execute: (dto: IPasswordRecoveryRequest.Input) => Promise<void>;
}

export namespace IPasswordRecoveryRequest {
  export type Input = {
    email: string;
  };
}
