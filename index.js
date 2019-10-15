const fs = require('fs');
// const path = require('path');

let config = require('rc')('index', {
    dirs: [],
    entryFile: 'index.js',
});

// Get paths from config file
const directories = config.dirs;
const entryFile = config.entryFile;

const createFile = (file) => {
    fs.writeFile(file, '', (err) => {
        if (err) {
            console.log(err);
        }
        console.log(`File '${file}' was created!`);
        return;
    });
};

const findOrCreateFile = (file) => {
    fs.access(file, fs.F_OK, (err) => {
        if (err) {
            console.error(`${file} not found -- We're creating one for you`);
            createFile(file);
        }
        return;
    });
}

// TODO: Fix import path when not a sibling file
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

const updateEntry = (path, files) => {
    // Init fileContent
    const fileBanner = '// Do not update this file manually\n// Use the command "npm run build-index"\n\n';
    let fileContent = fileBanner;

    // Loop through file names
    for (var i = 0; i < files.length; i++) {
        // Exclude the entryFile
        if (!files[i].includes(entryFile)) {
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
const writeIndex = () => {
    if (!config || !config.dirs) {
        throw new Error('Must include an index.config.js file');
    }

    for (let i = 0; i < directories.length; i++) {
        // In each directory:
        const dir = directories[i];
        let path = addSlash(dir.pathToIndex);
        let importFrom = addSlash(dir.importFrom);
        const readFilesFromDir = importFrom || path;

        // Check for entryFile to update, create if not found
        findOrCreateFile(`${path}${entryFile}`);

        // Read sibling files from directory
        fs.readdir(readFilesFromDir, (err, files) => {
            if (err) throw err;
            updateEntry(path + entryFile, files);
        })
    };
};

module.exports = writeIndex;
