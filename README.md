<div align="center">
  <h1>utils</h1>
  <p>Boring Utilities</p>

  <div>
    <a href="https://github.com/boringcodes/utils/commits" aria-label="Commitizen Friendly">
      <img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square">
    </a>
    <a href="https://github.com/boringcodes/utils" aria-label="Prettier Code Style">
      <img src="https://img.shields.io/badge/code_style-prettier-brightgreen?style=flat-square">
    </a>
    <a href="https://github.com/boringcodes/utils/actions" aria-label="GitHub Workflow Status">
      <img src="https://img.shields.io/github/workflow/status/boringcodes/utils/main?style=flat-square">
    </a>
    <a href="https://david-dm.org/boringcodes/utils" aria-label="Dependencies Status">
      <img src="https://img.shields.io/david/boringcodes/utils?style=flat-square">
    </a>
    <a href="https://www.npmjs.com/package/@boringcodes/utils" aria-label="NPM Version">
      <img src="https://img.shields.io/npm/v/@boringcodes/utils?color=brightgreen&style=flat-square">
    </a>
    <a href="https://www.npmjs.com/package/@boringcodes/utils" aria-label="NPM Downloads">
      <img src="https://img.shields.io/npm/dm/@boringcodes/utils?style=flat-square">
    </a>
    <a href="https://github.com/boringcodes/utils/blob/master/LICENSE" aria-label="MIT License">
      <img src="https://img.shields.io/github/license/boringcodes/utils?color=brightgreen&style=flat-square">
    </a>
    <a href="https://github.com/boringcodes" aria-label="BoringCodes Verified">
      <img src="https://img.shields.io/badge/boringcodes-verified-brightgreen?style=flat-square">
    </a>
  </div>
</div>

## About

This package implements a number of common `Boring Utilities`.

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 10.0 or higher is required.

Installation is done using the
[`yarn add` command](https://classic.yarnpkg.com/en/docs/install/):

```bash
$ yarn add @boringcodes/utils
```

## Features

The following modules are included:

- [x] Node env detector
- [x] Custom logger
- [x] Custom errors classes
- [x] Error handler
- [x] Express middleware

## Usage

Then run the build command

```bash
yarn build
```

## Directories

```tree
.
├── .github/workflows
│   ├── create-github-release.yml
│   ├── main.yml
│   ├── publish-npm.yml
├── dist (generated after building)
├── src
│   ├── errorHandler.ts
│   ├── error.ts
│   ├── express.ts
│   ├── index.ts
│   ├── logger.ts
├── .gitignore
├── .hustkyrc
├── .prettierrc.js
├── CHANGELOG.md
├── LICENSE
├── package.json
├── README.md
├── rollup.config.js
├── tsconfig.json
├── tslint.json
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Authors

[BoringCodes](https://github.com/boringcodes)

## License

[MIT](https://github.com/boringcodes/utils/blob/master/LICENSE)
