const path = require('path');

const { relative } = path;

const {
    createFile,
    formulateContent,
    getWriteParameters,
    readDirectory,
    writeToFile,
} = require('./src/index.js');

const addSlash = (string) => {
    return string.endsWith('/') ? string : `${string}/`;
}

// Loop through directories
const writeIndex = async (...args) => {
    const command = args.pop();
    const { directories, entryFile } = getWriteParameters(command, args);

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
