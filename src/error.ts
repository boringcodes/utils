import { isDev } from '.';

/**
 * Custom Error that has additional arg 'operational'
 * to distinguish operational vs programmer errors
 */
class MyError extends Error {
  readonly isOperational?: boolean;

  constructor(err: any, isOperational = false) {
    super();

    this.name =
      err instanceof Error || typeof err === 'object' ? err.name : 'Error';
    this.message =
      err instanceof Error || typeof err === 'object' ? err.message : err;
    this.isOperational = isOperational;

    // Restore prototype chain
    Object.setPrototypeOf(this, new.target.prototype);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MyError);
    }
  }
}

/**
 * HttpError that takes the first parameter as an Http Status Code
 */
class HttpError extends MyError {
  readonly code: number;

  constructor(code: number, err: any) {
    super(err, true);

    this.code = code;
    this.name = 'HttpError';
  }

  toJSON() {
    const content = {
      code: this.code,
      message: this.message,
    };

    return !isDev() ? content : { ...content, error: this.stack };
  }
}

export { MyError, HttpError };
