#!/usr/bin/env node

const fs = require('fs');
const chalk = require('chalk');
const _omit = require('lodash/omit');

const initCwd = process.env.INIT_CWD;
let packageJson;
let projPackageJson;

try {
  packageJson = require('../package.json');
  projPackageJson = require(`${initCwd}/package.json`);
} catch(err) {
  console.log(chalk.red('Error: Missing package.json'));
  process.exit(1);
}

process.stdout.write(chalk.green('Removing additional config from your package... '));

// Remove config options
const newProjPackageJson = _omit(projPackageJson, 'husky', 'scripts.commit', 'config.commitizen', 'release');

console.log(chalk.green('done!\n'));

// Write back the json file
fs.writeFileSync(`${initCwd}/package.json`, JSON.stringify(newProjPackageJson));

// Remove the GitLab pipeline
fs.unlink(`${initCwd}/.gitlab-ci.yml`, (err) => {
  if (err && err.errno && err.errno !== -2) throw err; // Don't error if the file doesn't exist
});