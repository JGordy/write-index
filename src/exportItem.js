// TODO: Fix import path when not a sibling file
// Path.relative(from, to) ???
const exportItem = (file) => {
    const name = file.split('.')[0];

    return `export { default as ${name} } from './${name}';\n`;
};

module.exports = exportItem;