const doLog = (fn: Function, prefix: string, args: any) => {
  fn(`${prefix}:${Date.now()}`, ...args);
};

const log = (...args: any) => doLog(console.log, 'LOG', args);
const info = (...args: any) => doLog(console.info, 'INF', args);
const warn = (...args: any) => doLog(console.warn, 'WRN', args);
const error = (...args: any) => doLog(console.error, 'ERR', args);

export { log, info, warn, error };
export default { log, info, warn, error };
