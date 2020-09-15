#!/usr/bin/env node
"use strict";

const bootstrap = require('commitizen/dist/cli/git-cz').bootstrap;

bootstrap({
  cliPath: './node_modules/commitizen',
  config: {
    path: 'cz-conventional-changelog'
  }
});