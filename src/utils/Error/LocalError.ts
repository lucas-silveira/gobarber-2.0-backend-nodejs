class LocalError extends Error {
  public readonly message: string;

  public readonly errorType: string;

  constructor(message: string, errorType: string) {
    super(message);
    this.message = message;
    this.errorType = errorType;
  }
}

export default LocalError;
