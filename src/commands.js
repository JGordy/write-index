#!/usr/bin/env node

const commander = require('commander');
// const chalk = require('chalk');
const pkg = require('../package.json');

const writeIndex = require('../index');

const program = new commander.Command();

program.version(pkg.version, '-v, --version', 'output the current version');

program
    .option('-c, --config', 'use config file arguments')
    .action(writeIndex)
    // .option('-d, --debug', 'output extra debugging')
    .option('-e, --entry', 'what to call the entry file { default: index.js }', 'index.js')
// .option('-p, --pizza-type <type>', 'flavour of pizza');

program
    .arguments('<pathToIndex> <importFrom>')
    .description('creates index.js from sibling files or directory specified')
    .option('-c, --config', 'use config file arguments')
    .action(writeIndex)

program.parse(process.argv);
