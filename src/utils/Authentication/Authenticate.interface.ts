export interface IAuthenticate {
  create: (
    head: IAuthenticate.Head,
    secretKey: string,
    options: IAuthenticate.Options,
  ) => string;
}

export namespace IAuthenticate {
  export type Head = {
    [attribute: string]: string | number;
  };

  export type Options = {
    subject?: string;
    expiresIn?: string;
  };
}
