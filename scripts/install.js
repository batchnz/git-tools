#!/usr/bin/env node

const fs = require('fs');
const chalk = require('chalk');
const _merge = require('lodash/merge');
const { exec } = require('child_process');

const initCwd = process.env.INIT_CWD;
const packageJson = require('../package.json');
const projPackageJson = require(`${initCwd}/package.json`);

process.stdout.write(chalk.green('Adding additional config from your package... '));

// Merge config settings into the projects package json
_merge(projPackageJson, {
  husky: {
    hooks: {
      'commit-msg': `commitlint -E HUSKY_GIT_PARAMS --config=\"./node_modules/${packageJson.name}/.commitlintrc.js\"`
    }
  },
  config: {
    commitizen: {
      path: `./node_modules/${packageJson.name}/node_modules/cz-conventional-changelog`
    }
  },
  scripts: {
    commit: 'batch-commit'
  },
  release: {
    extends: '@batch/semantic-release-gitlab-config'
  }
});

console.log(chalk.green('done!\n'));

// Write back the json file
fs.writeFileSync(`${initCwd}/package.json`, JSON.stringify(projPackageJson));

// Copy the GitLab pipeline to the project
fs.copyFileSync('./config/.gitlab-ci.yml', `${initCwd}/.gitlab-ci.yml`, fs.constants.COPYFILE_EXCL);

console.log(chalk.green('Installing Husky...\n'));

// Run the husky installation
exec('node ./node_modules/husky/husky install', (error, stdout, stderr) => console.log(stdout));