import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import async from 'rollup-plugin-async';
import sourceMaps from 'rollup-plugin-sourcemaps';

import pkg from './package.json';

const common = {
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true, rollupCommonJSResolveHack: true }),
    async(),
    sourceMaps(),
  ],
};

export default [
  // utils
  {
    ...common,
    input: 'src/db.ts',
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        sourcemap: true,
      },
    ],
  },
  {
    ...common,
    input: 'src/redis.ts',
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        sourcemap: true,
      },
    ],
  },
  {
    ...common,
    input: 'src/error.ts',
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        sourcemap: true,
      },
    ],
  },
  {
    ...common,
    input: 'src/error-handler.ts',
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        sourcemap: true,
      },
    ],
  },
  {
    ...common,
    input: 'src/express.ts',
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        sourcemap: true,
      },
    ],
  },
  {
    ...common,
    input: 'src/logger.ts',
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        sourcemap: true,
      },
    ],
  },
  {
    ...common,
    input: 'src/mongoose.ts',
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        sourcemap: true,
      },
    ],
  },
  {
    ...common,
    input: 'src/index.ts',
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        sourcemap: true,
      },
    ],
  },
];
