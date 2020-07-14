import { ICustomError } from './Error.interface';

class CustomError extends Error {
  public errorType: ICustomError.ErrorTypes;

  constructor(errorType: ICustomError.ErrorTypes, message: string) {
    super(message);
    this.errorType = errorType;
  }
}

export default CustomError;
