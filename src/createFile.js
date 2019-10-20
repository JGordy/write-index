const fs = require('fs');
const chalk = require('chalk');

const createFile = async (file) => {
    // Looking for file
    const fileFound = await fs.promises.access(file, fs.F_OK)
        .then(() => true).catch(() => false);

    if (fileFound) return;

    // File not found then create one
    console.error(`${file} not found -- We're creating one for you`);
    try {
        await fs.promises.writeFile(file, '');
        console.log(chalk.green(`File '${file}' was created!`));
    } catch (err) {
        console.log(chalk.red(err));
    }
};

module.exports = createFile;