const fs = require('fs');
const chalk = require('chalk');

const error = chalk.red;

const readDirectory = (dirname) => {
    try {
        const files = fs.promises.readdir(dirname);
        return files;
    } catch (err) {
        throw new Error(error(err));
    }
};

module.exports = readDirectory;