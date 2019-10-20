const fs = require('fs');
const chalk = require('chalk');

const success = chalk.green;
const update = chalk.yellow;
const error = chalk.red.bold;

const createFile = async (file) => {
    // Looking for file
    const fileFound = await fs.promises.access(file, fs.F_OK)
        .then(() => true)
        .catch(() => false);

    if (fileFound) {
        console.log(update(`-- '${file}' found! -- Updating exports...`));
        return;
    }

    // File not found then create one
    console.log(update(`${file} not found -- We're creating one for you`));
    try {
        await fs.promises.writeFile(file, '');
        console.log(success(`File '${file}' was created!`));
    } catch (err) {
        console.log(error(err));
    }
};

module.exports = createFile;