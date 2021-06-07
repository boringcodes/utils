import { Request, Response, NextFunction, Router } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import { MyError, HttpError } from './error';
import errorHandler from './errorHandler';

// ---------------------------------------------------
// -----------------Express Middleware----------------
// ---------------------------------------------------

/**
 * An Express RequestHandler that handles the 404 Not Found error
 * @param _ Express Request object
 * @param __ Express Response object
 * @param next Express Next function
 */
const handleNotFound = (_: Request, __: Response, next: NextFunction): void => {
  next(new HttpError(StatusCodes.NOT_FOUND, 'Resource not found'));
};

/**
 * An Express RequestHandler that responses error info to the client
 * @param err Http Error object
 * @param _ Express Request object
 * @param res Express Response object
 * @param __ Express Next function
 */
const handleErrors = (
  err: MyError | HttpError,
  _: Request,
  res: Response,
  __: NextFunction,
): void => {
  errorHandler.handle(err);

  try {
    // check if status code exists, error thrown if doesn't
    getReasonPhrase((err as HttpError).code);

    res.status((err as HttpError).code).send(err);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

/**
 * An Express RequestHandler that responses OK for health checking
 * @param _ Express Request object
 * @param res Express Response object
 */
const handleHealthCheck = (_: Request, res: Response): void => {
  res.status(StatusCodes.OK).send('OK');
};

/**
 * An Express Middleware mounted /health endpoint for health checking
 */
const health = (): Router => {
  const router = Router();

  router.get('/health', handleHealthCheck);

  return router;
};

export { handleNotFound, handleErrors, handleHealthCheck, health };
