export interface IErrorExcepetion {
  errorType: IErrorExcepetion.ErrorTypes;
}

export namespace IErrorExcepetion {
  export type ErrorTypes = 'error' | 'unauthorized' | 'forbidden';
}
