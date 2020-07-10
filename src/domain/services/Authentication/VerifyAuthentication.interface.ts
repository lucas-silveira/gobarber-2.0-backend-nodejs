export interface IAuthentication {
  execute: (authHeader: string) => IAuthentication.Output | null;
}

export namespace IAuthentication {
  export type Output = {
    userId: string;
  };
}
