import * as path from 'path';
import * as fs from 'fs-extra';
import { COMPRESSION_LEVEL, zip } from 'zip-a-folder';
import { baseBundlePath, bundlePath, spotifyPath, tempMakeBundlePath } from './sharedPaths';
import { buildWithWebpack, startWebpackDevServer } from './webpack';
import { cleanBuildDirs, installToSpotify, patchSPA } from './spa';
import startSpotifyDev from './spotify';

const createLogger = require('logging');
const log = createLogger.default('Spotify Dev Mode');

log.info("Checking project structure");

if (!fs.existsSync(baseBundlePath))
    log.error("Spotify base bundle not found, please run unpack before proceeding");

log.info("Checking for a Spotify installation");

if (!fs.existsSync(spotifyPath)) log.error(process.platform === 'win32' ? "Error finding Spotify executable, make sure you are using the Win32 version of Spotify(Not the one from Microsoft Store)" : "Spotify not found");

buildWithWebpack('development', () => {
    log.info("Patching base bundles");
    patchSPA('development');
    log.info("Building SPAs with modified code");
    zip(tempMakeBundlePath, path.join(bundlePath, 'xpui.spa'), COMPRESSION_LEVEL.high).then(() => {
        log.info("Copying modified bundles to Spotify executable");
        installToSpotify();
        log.info("Cleaning make directories");
        cleanBuildDirs();

        log.info("Starting webpack-dev-server for serving JavaScript bundles");
        startWebpackDevServer(() => {
            log.info("Starting Spotify in Dev Mode");
            startSpotifyDev();
            log.info("Open chrome://inspect/#devices in your Chromium-based browser(e.g. Google Chrome) or use Spotify Desktop's built-in Develop menu");
        })
    })
})