#!/usr/bin/env node
"use strict";

const chalk = require('chalk');
const _has = require('lodash/has');

const initCwd = process.env.INIT_CWD;
const bootstrap = require('commitizen/dist/cli/git-cz').bootstrap;
let projPackageJson;

try {
  projPackageJson = require(`${initCwd}/package.json`);
} catch(err) {
  console.log(chalk.red('Error: Missing package.json'));
  process.exit(1);
}

let commitizenConfig = 'cz-conventional-changelog';
if( _has(projPackageJson, `config.commitizen.path`) ){
    commitizenConfig = projPackageJson.config.commitizen.path;
}

bootstrap({
  cliPath: './node_modules/commitizen',
  config: {
    path: commitizenConfig,
  },
});