#!/usr/bin/env node

const fs = require('fs');
const chalk = require('chalk');
const _omit = require('lodash/omit');

const initCwd = process.env.INIT_CWD;
const projPackageJson = require(`${initCwd}/package.json`);

process.stdout.write(chalk.green('Removing additional config from your package... '));

// Remove config options
const newProjPackageJson = _omit(projPackageJson, 'husky', 'scripts.commit', 'config.commitizen', 'release');

console.log(chalk.green('done!\n'));

// Write back the json file
fs.writeFileSync(`${initCwd}/package.json`, JSON.stringify(newProjPackageJson));

// Remove the GitLab pipeline
fs.unlink(`${initCwd}/.gitlab-ci.yml`, (err) => {
  if (err) throw err;
});