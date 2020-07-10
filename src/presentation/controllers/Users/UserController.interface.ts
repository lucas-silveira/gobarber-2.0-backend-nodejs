export interface IUserController<T> {
  handle: (httpBody: IUserController.httpBody) => T;
}

export namespace IUserController {
  export interface httpBody {
    name: string;
    email: string;
    password: string;
  }
}
