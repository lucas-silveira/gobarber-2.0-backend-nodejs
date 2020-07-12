import { IErrorHandler } from './ErrorHandler.interface';
import LocalErrorHandlerAdapter from './LocalErrorHandler.adapter';

class ErrorHandler implements IErrorHandler {
  private errorHandlerAdapter: IErrorHandler;

  constructor() {
    this.errorHandlerAdapter = new LocalErrorHandlerAdapter();
  }

  throw(message: string, errorType: IErrorHandler.ErrorTypes): Error {
    return this.errorHandlerAdapter.throw(message, errorType);
  }
}

export default new ErrorHandler();
