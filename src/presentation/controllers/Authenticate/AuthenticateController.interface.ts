export interface IAuthenticateController<T> {
  handle: (body: IAuthenticateController.Body) => T;
}

export namespace IAuthenticateController {
  export interface Body {
    email: string;
    password: string;
  }
}
