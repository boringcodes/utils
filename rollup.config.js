import fs from 'fs';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import async from 'rollup-plugin-async';
import sourceMaps from 'rollup-plugin-sourcemaps';

import pkg from './package.json';

const inputDir = 'src';
const inputFiles = fs.readdirSync(inputDir).map(file => `${inputDir}/${file}`);
const outputDir = 'dist';
const outputFormat = 'cjs';
const outputSourcemap = true;
const common = {
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      useTsconfigDeclarationDir: true,
      rollupCommonJSResolveHack: true,
    }),
    async(),
    sourceMaps(),
  ],
};

export default inputFiles.map(inputFile => ({
  ...common,
  input: inputFile,
  output: [
    {
      dir: outputDir,
      format: outputFormat,
      sourcemap: outputSourcemap,
    },
  ],
}));
