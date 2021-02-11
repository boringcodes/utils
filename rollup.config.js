import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

import pkg from './package.json';

const getConfig = (inputFile) => ({
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [nodeResolve(), commonjs(), typescript()],
  input: inputFile,
  output: [
    {
      dir: 'build',
      format: 'cjs',
      sourcemap: true,
      exports: 'auto',
    },
  ],
});

export default [
  getConfig('src/error.ts'),
  getConfig('src/errorHandler.ts'),
  getConfig('src/express.ts'),
  getConfig('src/index.ts'),
  getConfig('src/logger.ts'),
];
