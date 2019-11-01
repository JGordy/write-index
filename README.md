# write-index

[![npm](https://badge.fury.io/js/%2Fwrite-index.svg)](https://badge.fury.io/js/%2Fwrite-index)
[![Downloads](https://img.shields.io/npm/dw/write-index.svg)](https://img.shields.io/npm/dw/write-index)

> `write-index` creates and writes index.js files in specified directories that imports and exports sibling files in ES6 format.

## Examples

---

### Directory with sibling files

```shell
utils-/
    - bar.js
    - foo.js
```

#### Run command `idx-compose` (with no arguments)

#### Finds or creates index.js, then outputs the file exports as such

```shell
utils-/
    - bar.js
    - foo.js
    - index.js (newly created)

/* utils/index.js contents */
export { default as bar } from './bar.js';
export { default as foo } from './foo.js';
```

### When you need to import from another directory

 > In this example we want to import all files from our utils into the root index.js

```shell
-/ (project root)
    - index.js
    - utils-/
        - bar.js
        - foo.js
```

#### Run command `idx-compose fromDir toDir`

> In this case `idx-compose ./utils/ ./`

#### Updates this index.js file with

```shell
/* ./index.js contents */
export { default as baz } from './utils/baz.js';
export { default as barf } from './utils/barf.js';
```

## Usage

---

### Installation

```shell
npm install write-index
```

### Cli options

```shell
Usage: idx-compose [options] [importFrom] [pathToIndex]

Example: idx-compose -e whatever.js ./utils ./

Creates index.js from sibling files or directory specified

Options:
  -v, --version           output the current version

  -c, --config            use config file arguments
                          - ignores cli arguments in favor of an .idxrc file

  -e, --entryFile <name>  specify entry file name
                          - default: "index.js"

  -h, --help              output usage information
```

## Changing the entryFile

---

> By default we create or update index.js, but you can override this behavior with the -e or --entryFile options \
using the command `idx-compose -e <name>.js`

## Config file

---

> This allows you to specifiy multiple directories to update using \
`idx-compose -c` or `idx-compose --config`

### Create an `.idxrc` file in the root of your project

> Note: This ignores any other arguments coming from the cli

#### Arguments

- dirs: An array of specified directories to update on command
  - pathToIndex - where to create and/or update the index.js files
  - importFrom - the directory location we want to import files from
- entryFile: name to call the entryFile if you want to override index.js

### Example .idxrc file

```shell
{
    "dirs": [
        {
            "pathToIndex": "./",
            "importFrom": "./utils"
        },
        {
            "pathToIndex": "./utils",
            "importFrom": "./utils"
        }
    ],
    "entryFile": "index.js"
}
```

## Dependencies

---

- [commander](https://www.npmjs.com/package/commander)
- [chalk](https://www.npmjs.com/package/chalk)
- [rc](https://www.npmjs.com/package/rc)
