#!/usr/bin/env node

const colors = require('colors');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const packageJson = require('../package.json');
const initPath = process.env.INIT_CWD;

// Define an array of dev dependencies
const devDependencies = [];

// Get config files from package JSON
const { config: { files: configFiles } } = packageJson;

// Map dev dependencies to CLI format
for (const [key, value] of Object.entries(packageJson.config.devDependencies)) {
  devDependencies.push(`${key}@${value}`);
}

/**
 * Init the installation
 * @author Josh Smith <josh@batch.nz>
 * @return void
 */
async function init() {
  process.stdout.write(colors.green(`Installing development dependencies... `));

  // 1. Install dev dependencies in parent package.json
  const { err } = await exec(`cd ${initPath} && npm install --save-dev ${devDependencies.join(' ')}`);
  if (err) console.log(colors.red(`error: ${err.message}`));

  process.stdout.write(colors.green("done!\n\n"));

  // 2. configure packages by copying across config files
  console.log(colors.green("Configuring packages..."));

  // Copy each config file to the parent repo
  configFiles.forEach((filename) => {
    fs.copyFile(`./config/${filename}`, `${initPath}/${filename}`, (err) => {
      if (err) {
        console.log(colors.red(`error: ${err}`));
        return;
      }
      console.log(colors.yellow(`${filename} was copied.`));
    });
  });
}

console.log(colors.rainbow(`Batch \`${packageJson.name}\` v${packageJson.version}\n`));

init();
