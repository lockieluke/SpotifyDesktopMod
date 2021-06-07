import * as fs from 'fs';
import * as path from 'path';
import unzip = require('extract-zip');

const createLogger = require('logging');
const log = createLogger.default('Unpack SPA');

if (process.argv.length < 5)
    log.error("Error parsing arguments, not enough arguments");

const targetSPA: string = process.argv[4].toString();
const distFolder: string = path.join(process.cwd(), 'base', path.basename(targetSPA).replace(path.extname(targetSPA), ''));

if (!fs.existsSync(targetSPA))
    log.error("The target SPA file does not exist");

if (path.extname(targetSPA) !== '.spa')
    log.error("The target file is not a SPA file");

if (!fs.existsSync(distFolder)) fs.mkdirSync(distFolder, {recursive: true});

unzip(targetSPA, {
    dir: distFolder
});