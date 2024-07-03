export class CustomError extends Error {
  public code: number;
  constructor(
    message: string = 'Something went wrong, please try again later',
    status: number = 500
  ) {
    super(message);
    this.message = message;
    this.code = status;
  }
}
