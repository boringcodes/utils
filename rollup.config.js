import fs from 'fs';
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

(() => {
  const dir = 'dist';
  const files = ['CHANGELOG.md', 'LICENSE', 'package.json', 'README.md'];

  fs.mkdirSync(dir);
  files.map((file) => {
    fs.writeFileSync(`${dir}/${file}`, fs.readFileSync(file, 'utf-8'), 'utf-8');

    console.info(`${file} → ${dir}/${file}`);
  });
})();

export default [
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
    input: 'src/errorHandler.ts',
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
    input: 'src/index.ts',
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
];
