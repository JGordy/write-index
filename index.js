const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const config = require('rc')('idx', {
    dirs: [],
    entryFile: 'index.js',
});

const {
    createFile,
    readDirectory,
} = require('./src/index.js');

// Get paths from config file
const {
    dirs: directories,
    entryFile,
} = config;

const { basename } = path;

// TODO: Fix import path when not a sibling file
// Path.relative(from, to) ???
const exportItem = (file) => {
    const name = file.split('.')[0];

    return `export { default as ${name} } from './${name}';\n`;
};

const writeToFile = (path, content) => {
    fs.writeFile(path, content, (err) => {
        if (err) throw err;
        console.log(`Done updating ${entryFile} file at: ${path} `);
    });
};

// TODO: WIP on to/from correct importing
const updateEntry = (path, files) => {
    // Init fileContent
    const fileBanner = '// Do not update this file manually\n// Use the command "npm run build-index"\n\n';
    let fileContent = fileBanner;

    // Loop through file names
    for (var i = 0; i < files.length; i++) {
        // Exclude the entryFile
        if (entryFile !== files[i]) {
            const line = exportItem(files[i]);
            console.warn(`Exporting ${files[i]}...`);
            fileContent += line;
        }
    }

    // Write contents
    writeToFile(path, fileContent);
};

const addSlash = (string) => {
    return string.endsWith('/') ? string : `${string}/`;
}

// Loop through directories
const writeIndex = async () => {
    if (!config || !config.dirs) {
        throw new Error(chalk.red('Must include an .idxrc file'));
    }

    for (let i = 0; i < directories.length; i++) {
        // In each directory:
        const dir = directories[i];
        let path = addSlash(dir.pathToIndex);
        let importFrom = addSlash(dir.importFrom);
        const readFilesFromDir = importFrom || path;

        createFile(`${path}${entryFile}`);

        // Read sibling files from directory
        const files = await readDirectory(readFilesFromDir);
        updateEntry(path + entryFile, files);
    };
};

module.exports = writeIndex;
