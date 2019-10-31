const chalk = require('chalk');
const config = require('rc')('idx', {
    dirs: [],
    entryFile: 'index.js',
});

const getConfigOptions = () => {
    if (!config || !config.dirs) throw new Error(chalk.red('Must include an .idxrc file'));
    return {
        directories: config.dirs,
        entryFile: config.entryFile,
    };
}

module.exports = getConfigOptions;