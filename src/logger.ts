const doLog = (fn: Function, prefix: string, args: any): void => {
  fn(`${prefix}:${Date.now()}`, ...args);
};

const log = (...args: any): void => doLog(console.log, 'LOG', args);
const info = (...args: any): void => doLog(console.info, 'INF', args);
const warn = (...args: any): void => doLog(console.warn, 'WRN', args);
const error = (...args: any): void => doLog(console.error, 'ERR', args);

export { log, info, warn, error };
export default { log, info, warn, error };
