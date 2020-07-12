import { IErrorHandler } from './ErrorHandler.interface';
import LocalError from './LocalError';

class LocalErrorHandlerAdapter implements IErrorHandler {
  throw(message: string, errorType: IErrorHandler.ErrorTypes): Error {
    throw new LocalError(message, errorType);
  }
}

export default LocalErrorHandlerAdapter;
