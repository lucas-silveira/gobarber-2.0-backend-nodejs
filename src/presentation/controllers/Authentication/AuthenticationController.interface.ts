export interface IAuthenticationController<T> {
  handle: (body: IAuthenticationController.Body) => T;
}

export namespace IAuthenticationController {
  export interface Body {
    email: string;
    password: string;
  }
}
