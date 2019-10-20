const chalk = require('chalk');
const config = require('rc')('idx', {
    dirs: [],
    entryFile: 'index.js',
});

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
        const importFrom = addSlash(dir.importFrom);
        const readFilesFromDir = importFrom || path;

        createFile(`${path}${entryFile}`);

        // Read sibling files from directory
        const files = await readDirectory(readFilesFromDir);

        // Formulate content
        const fileContent = formulateContent(files, entryFile);

        // Write content to file
        await writeToFile(path, fileContent, entryFile);
    };
};

module.exports = writeIndex;
