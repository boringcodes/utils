import { Mongoose, ConnectionOptions } from 'mongoose';

import errorHandler from './error-handler';
import logger from './logger';
import { timestampsPlugin } from './mongoose';

interface MongooseOptions extends ConnectionOptions {
  readonly timestampsPlugin?: boolean;
}
interface MongooseConnect {
  readonly mongoose: Mongoose;
  readonly options?: MongooseOptions;
  readonly cb?: () => void; // tslint:disable-line: no-mixed-interface
}

const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const host = process.env.MONGO_HOST || 'localhost';
const port = +(process.env.MONGO_PORT || 0) || 27017;
const dbName = process.env.MONGO_DB_NAME || 'things';
const uri = user && password
  ? `${user}:${password}@mongodb://${host}:${port}/${dbName}`
  : `mongodb://${host}:${port}/${dbName}`;

const connect = ({ mongoose, options = {}, cb = () => {} }: MongooseConnect) => {
  const { timestampsPlugin: timestampsPluginFlag, ...connectionOptions } = options;

  if (timestampsPluginFlag) {
    mongoose.plugin(timestampsPlugin);
  }

  mongoose.connection.on('connected', () => {
    logger.info('> MongoDB connected');
  });

  mongoose.connection.on('error', (err: Error) => {
    mongoose.disconnect();

    logger.info('> MongoDB failed to start');
    errorHandler.handle(err);
  });

  mongoose.connect(uri , {
    useNewUrlParser: true,
    promiseLibrary: Promise,
    ...connectionOptions,
  }).then(cb);
};

export default { connect };
