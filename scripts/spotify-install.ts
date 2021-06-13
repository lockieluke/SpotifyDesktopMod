import { COMPRESSION_LEVEL, zip } from "zip-a-folder";
import { bundlePath, tempMakeBundlePath } from "./sharedPaths";
import { cleanBuildDirs, installToSpotify, patchSPA } from "./spa";
import { preprocessDirs } from "./spotify";
import { buildWithWebpack } from "./webpack";

import * as path from 'path';

const createLogger = require('logging');
const log = createLogger.default('Spotify Installer');

preprocessDirs();

buildWithWebpack('production', () => {
    log.info("Patching base bundles");
    patchSPA('production');
    log.info("Building SPAs with modified code");
    zip(tempMakeBundlePath, path.join(bundlePath, 'xpui.spa'), COMPRESSION_LEVEL.high).then(() => {
        log.info("Copying modified bundles to Spotify executable");
        installToSpotify();
        log.info("Cleaning make directories");
        cleanBuildDirs();
        log.info("Finished installing");
    })
})