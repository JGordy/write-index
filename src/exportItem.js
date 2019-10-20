const exportItem = (file, fromDir) => {
    const name = file.split('.')[0];

    return `export { default as ${name} } from '${fromDir}${name}';\n`;
};

module.exports = exportItem;