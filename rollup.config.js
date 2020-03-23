import fs from 'fs';
import ms from 'pretty-ms';
import color from 'colorette';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import async from 'rollup-plugin-async';
import sourceMaps from 'rollup-plugin-sourcemaps';

import pkg from './package.json';

const inputDir = 'src';
const inputFiles = fs.readdirSync(inputDir).map(file => `${inputDir}/${file}`);
const otherFiles = ['CHANGELOG.md', 'LICENSE', 'package.json', 'README.md'];
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

(function() {
  const start = Date.now();

  fs.mkdirSync(outputDir);
  otherFiles.map(file => {
    fs.writeFileSync(
      `${outputDir}/${file}`,
      fs.readFileSync(file, 'utf-8'),
      'utf-8',
    );

    console.log(
      color.cyan(`${color.bold(file)} → ${color.bold(outputDir)}...`),
    );
  });

  console.log(
    color.greenBright(
      `created ${color.bold(outputDir)} in ${color.bold(
        ms(Date.now() - start),
      )}`,
    ),
  );
})();

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
