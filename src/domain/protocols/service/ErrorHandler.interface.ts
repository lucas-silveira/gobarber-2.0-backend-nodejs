import { IErrorExcepetion } from '@domain/protocols/utils/ErrorExcepetion.interface';

export interface IErrorHandler {
  throw: (message: string, errorType: IErrorHandler.ErrorTypes) => Error;
}

export namespace IErrorHandler {
  export type ErrorTypes = IErrorExcepetion.ErrorTypes;
}
