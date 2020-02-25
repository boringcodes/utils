import * as redis from 'redis';

import logger from './logger';
import errorHandler from './errorHandler';

const host = process.env.REDIS_HOST || 'localhost';
const port = +(process.env.REDIS_PORT || 0) || 6379;
const db = process.env.REDIS_DB_NAME || 0;
const password = process.env.REDIS_PASSWORD;

const client = redis.createClient({
  host,
  port,
  db,
  password,
});

client.on('connect', () => {
  logger.info('> Redis connected');
});

client.on('reconnecting', (err: any) => {
  logger.error('> Redis is reconnecting', err);
});

client.on('error', (err: any) => {
  logger.error('> Redis failed to connect', err);
  errorHandler.handle(err);
});

client.on('end', (err: any) => {
  logger.error('> Redis connection ended', err);
  errorHandler.handle(err);
});

const searchByKey = async (pattern: string): Promise<any> => {
  return await new Promise((resolve, reject) => {
    client.keys(pattern, (err: any, result: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const get = async (key: string, parseJSON = false): Promise<any> => {
  return await new Promise((resolve, reject) => {
    client.get(key, (err: any, result: any) => {
      if (err) {
        reject(err);
      } else {
        if (parseJSON) {
          resolve(JSON.parse(result));

          return;
        }

        resolve(result);
      }
    });
  });
};

const set = async (key: string, data: any): Promise<any> => {
  return await new Promise((resolve, reject) => {
    // tslint:disable-next-line:no-identical-functions
    client.set(key, data, (err: any, result: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export {
  searchByKey,
  get,
  set,
};
