#!/usr/bin/env node

const fs = require('fs');
const chalk = require('chalk');
const _has = require('lodash/has');
const _merge = require('lodash/merge');

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

// Determine if this package is already installed (useful for CI pipelines)
if( _has(projPackageJson, `config.${packageJson.name}.installed`) ){
  console.log(chalk.green(packageJson.name+' is already configured... skipping.\n'));
  process.exit(0);
}

process.stdout.write(chalk.green('Adding additional config from your package... '));

// Merge config settings into the projects package json
_merge(projPackageJson, {
  husky: {
    hooks: {
      'commit-msg': `commitlint -E HUSKY_GIT_PARAMS --config=\"./node_modules/${packageJson.name}/.commitlintrc.js\"`
    }
  },
  config: {
    [packageJson.name] : {
      installed: true
    },
    commitizen: {
      path: 'cz-conventional-changelog'
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
try {
  fs.copyFileSync('./config/.gitlab-ci.yml', `${initCwd}/.gitlab-ci.yml`, fs.constants.COPYFILE_EXCL)
} catch(err) {
  console.log(chalk.yellow('GitLab pipeline file exists, skipping.\n'));
}
