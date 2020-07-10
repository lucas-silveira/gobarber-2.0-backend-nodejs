export interface IUserController<T> {
  handle: (body: IUserController.Body) => T;
}

export namespace IUserController {
  export interface Body {
    name: string;
    email: string;
    password: string;
  }
}
