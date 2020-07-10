export interface IAuthentication {
  user: IAuthentication.User;
  token: string;
}

export namespace IAuthentication {
  export type User = {
    id?: string;
    name: string;
    email: string;
  };
}
