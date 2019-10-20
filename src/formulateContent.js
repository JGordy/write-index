const chalk = require('chalk');
const exportItem = require('./exportItem');

const boldSuccess = chalk.green.bold;

// TODO: WIP on to/from correct importing
const formulateContent = (files, entryFile, fromDir) => {
    // Init fileContent
    const fileBanner = '// Do not update this file manually\n// Use the command "npm run build-index"\n\n';
    let fileContent = fileBanner;

    // Loop through file names
    for (var i = 0; i < files.length; i++) {
        // Exclude the entryFile
        if (entryFile !== files[i]) {
            const line = exportItem(files[i], fromDir);
            console.log(`Exporting ${boldSuccess(files[i])}...`);
            fileContent += line;
        }
    }

    return fileContent;
};

module.exports = formulateContent;