const fs = require('fs');
const chalk = require('chalk');

const success = chalk.green;
const chalkError = chalk.red;

const writeToFile = async (path, content, entryFile) => {
    console.log("Path: ", path);
    try {
        await fs.promises.writeFile(path + entryFile, content);
        console.log(`${success('Done')} updating ${success(entryFile)} file at: ${success(path)} \n`);
    } catch (err) {
        throw new Error(chalkError(err));
    }
};

module.exports = writeToFile;