const chalk = require('chalk');
const path = require('path');
const config = require('rc')('idx', {
    dirs: [],
    entryFile: 'index.js',
});

const { relative, resolve } = path;

const {
    createFile,
    formulateContent,
    readDirectory,
    writeToFile,
} = require('./src/index.js');

// Get paths from config file
const {
    dirs: directories,
    entryFile,
} = config;

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
        const path = addSlash(dir.pathToIndex);
        const fromDir = addSlash(dir.importFrom) || path;

        const relativePath = addSlash(`./${relative(path, fromDir)}`);

        await createFile(`${path}${entryFile}`);

        // Read sibling files from directory
        const files = await readDirectory(fromDir);

        // Formulate content
        const fileContent = formulateContent(files, entryFile, relativePath);

        // Write content to file
        await writeToFile(path, fileContent, entryFile);
    };
};

module.exports = writeIndex;
