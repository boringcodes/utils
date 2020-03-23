import { MyError } from './error';
import logger from './logger';

/**
 * Log error to destination then exit the process if programmer error
 * @param err error to be handled
 */
const handle = (err: MyError) => {
  // E.g. log to sentry
  // E.g. log to console
  logger.error(err);

  // Exit the app if this is programmer error
  if (!err.isOperational) {
    logger.info('> App exited!');

    process.exit(1);
  }
};

export { handle };
export default { handle };
