/**
 * Check if the current environment is development
 * @returns boolean
 */

const isDev = (): boolean => {
  return (
    process.env.NODE_ENV === null ||
    process.env.NODE_ENV === undefined ||
    !['test', 'staging', 'production'].includes(process.env.NODE_ENV)
  );
};

const isTest = (): boolean => {
  return process.env.NODE_ENV === 'test';
};

const isStaging = (): boolean => {
  return process.env.NODE_ENV === 'staging';
};

const isProduction = (): boolean => {
  return process.env.NODE_ENV === 'production';
};

export { isDev, isTest, isStaging, isProduction };
export default { isDev, isTest, isStaging, isProduction };
