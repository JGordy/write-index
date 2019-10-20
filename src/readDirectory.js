const fs = require('fs');

const readDirectory = (dirname) => {
    try {
        const files = fs.promises.readdir(dirname);
        return files;
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = readDirectory;