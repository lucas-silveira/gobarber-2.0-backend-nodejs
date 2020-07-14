import { ICustomError } from '@domain/entities/Error.interface';

export interface IErrorHandler {
  throw: (message: string, errorType: IErrorHandler.ErrorTypes) => Error;
}

export namespace IErrorHandler {
  export type ErrorTypes = ICustomError.ErrorTypes;
}
