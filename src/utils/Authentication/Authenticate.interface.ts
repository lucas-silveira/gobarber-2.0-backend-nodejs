export interface IAuthenticate {
  create: (
    head: IAuthenticate.Head,
    secretKey: string,
    options: IAuthenticate.Options,
  ) => string;

  verify: (
    token: string,
    secretKey: string,
  ) => IAuthenticate.VerifyResponse | null;
}

export namespace IAuthenticate {
  export type Head = {
    [attribute: string]: string | number;
  };

  export type Options = {
    subject?: string;
    expiresIn?: string;
  };

  export type VerifyResponse = {
    userId: string;
  };
}
