#!/usr/bin/env node

const commander = require('commander');
// const chalk = require('chalk');
const pkg = require('../package.json');

const writeIndex = require('../index');

const program = new commander.Command();

program
    .description('Creates index.js from sibling files or directory specified')
    .version(pkg.version, '-v, --version', 'output the current version')
    .option('-c, --config', 'use config file arguments')
    .option('-e, --entryFile <name>', 'specify entry file name', 'index.js')
    .arguments('[importFrom] [pathToIndex]')
    .action(writeIndex)

program.parse(process.argv);

// console.log('Program: ', program);
