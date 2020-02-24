# @boringcodes/utils

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
* Node env detector
* Custom logger
* Custom errorsavailable in Node
* Error handler
* Express middleware
* Mongoose connector & mongoose plugins
* Redis connector

## Usage

Then run the build command
```bash
yarn build
```

## Directories

``` tree
.
├── CHANGELOG.md
├── LICENSE
├── README.md
├── dist
│   ├── db.d.ts
│   ├── db.js
│   ├── db.js.map
│   ├── error-handler.d.ts
│   ├── error-handler.js
│   ├── error-handler.js.map
│   ├── error.d.ts
│   ├── error.js
│   ├── error.js.map
│   ├── express.d.ts
│   ├── express.js
│   ├── express.js.map
│   ├── index.d.ts
│   ├── index.js
│   ├── index.js.map
│   ├── logger.d.ts
│   ├── logger.js
│   ├── logger.js.map
│   ├── mongoose.d.ts
│   ├── mongoose.js
│   ├── mongoose.js.map
│   ├── redis.d.ts
│   ├── redis.js
│   └── redis.js.map
├── package.json
├── rollup.config.js
├── src
│   ├── db.ts
│   ├── error-handler.ts
│   ├── error.ts
│   ├── express.ts
│   ├── index.ts
│   ├── logger.ts
│   ├── mongoose.ts
│   └── redis.ts
├── tsconfig.json
├── tslint.json
```