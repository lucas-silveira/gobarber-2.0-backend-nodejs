export interface IErrorHandler {
  throw: (message: string, errorType: IErrorHandler.ErrorTypes) => Error;
}

export namespace IErrorHandler {
  export type ErrorTypes = 'error' | 'unauthorized' | 'forbidden';
}
