import { IErrorExcepetion } from '@domain/protocols/utils/ErrorExcepetion.interface';

class ErrorExcepetion extends Error {
  public errorType: IErrorExcepetion.ErrorTypes;

  constructor(errorType: IErrorExcepetion.ErrorTypes, message: string) {
    super(message);
    this.errorType = errorType;
  }
}

export default ErrorExcepetion;
