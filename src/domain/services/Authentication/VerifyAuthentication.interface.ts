export interface IVerifyAuthentication {
  execute: (authHeader: string) => IVerifyAuthentication.Output;
}

export namespace IVerifyAuthentication {
  export type Output = {
    userId: string;
  };
}
