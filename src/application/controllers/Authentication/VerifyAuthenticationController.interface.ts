export interface IVerifyAuthenticationController {
  handle: (token: string) => IVerifyAuthenticationController.Output;
}

export namespace IVerifyAuthenticationController {
  export type Output = {
    userId: string;
  };
}
