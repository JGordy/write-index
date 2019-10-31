const getConfigOptions = require('./getConfigOptions');

const getWriteParameters = (command, args) => {
    let directories = [{ pathToIndex: args[1], importFrom: args[0] }];
    let entryFile = command.entryFile;

    if (args.every((entry) => entry === undefined)) {
        let cwd = process.cwd();
        directories = [{ pathToIndex: cwd, importFrom: cwd }];
    }

    if (!!command.config) {
        ({ directories, entryFile } = getConfigOptions());
    }

    return {
        directories,
        entryFile,
    }
};

module.exports = getWriteParameters;