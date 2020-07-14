export interface ICustomError {
  errorType: ICustomError.ErrorTypes;
}

export namespace ICustomError {
  export type ErrorTypes = 'error' | 'unauthorized' | 'forbidden';
}
