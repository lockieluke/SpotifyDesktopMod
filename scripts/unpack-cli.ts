import * as fs from 'fs';
import * as path from 'path';
import unzip = require('extract-zip');
import { spotifyPath } from './sharedPaths';

const createLogger = require('logging');
const log = createLogger.default('Unpack SPA');

const spotifySPADir: string = path.join(path.dirname(path.dirname(spotifyPath)), 'Resources', 'Apps');

fs.readdirSync(spotifySPADir).forEach(moduleName => {
    log.info(`Unpacking ${moduleName} from Spotify`)
    unpackSPA(path.join(spotifySPADir, moduleName));
})
log.info(`Finished unpacking SPA modules to ${path.join(process.cwd(), 'base')}`)

function unpackSPA(targetSPA: string) {
    const distFolder: string = path.join(process.cwd(), 'base', path.basename(targetSPA).replace(path.extname(targetSPA), ''));

    if (!fs.existsSync(distFolder)) fs.mkdirSync(distFolder, {recursive: true});
    
    unzip(targetSPA, {
        dir: distFolder
    });
}