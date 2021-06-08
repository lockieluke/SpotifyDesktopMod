import * as path from 'path';
import * as fs from 'fs-extra';
import * as child_process from 'child_process';
import * as rimraf from 'rimraf';
import webpack = require('webpack');
import { COMPRESSION_LEVEL, zip } from 'zip-a-folder';
import { baseBundlePath, bundlePath, spotifyPath } from './sharedPaths';

const createLogger = require('logging');
const log = createLogger.default('Spotify Dev Mode');

log.info("Checking project structure");

const tempMakeBundlePath: string = path.join(bundlePath, 'bundle-make', 'xpui');

if (!fs.existsSync(baseBundlePath))
    log.error("Spotify base bundle not found, please run unpack before proceeding");

log.info("Checking for a Spotify installation");

const spotifyXpuiPath: string = path.join(path.dirname(spotifyPath), 'Apps', 'xpui.spa');
const debugPort: number = 8080;
const chromeDebugArg: string = `--remote-debugging-port=${debugPort.toString()}`;

if (!fs.existsSync(spotifyPath)) log.error(process.platform === 'win32' ? "Error finding Spotify executable, make sure you are using the Win32 version of Spotify(Not the one from Microsoft Store)" : "Spotify not found");

log.info("Building JS bundles with Webpack");
webpack(require(path.join(process.cwd(), 'webpack.config.js')), (err, stats) => {
    if (err || stats.hasErrors()) {
        log.error("Error building JS bundles with Webpack")
    }
    log.info("Finished building JS bundles, copying bundles to make directory");

    fs.copySync(path.join(baseBundlePath, 'xpui'), tempMakeBundlePath, { recursive: true });
    fs.copyFileSync(path.join(bundlePath, 'mod-sp-bundle.js'), path.join(tempMakeBundlePath, 'mod-sp-bundle.js'));

    log.info("Patching base bundles");

    const indexHTML: string = path.join(tempMakeBundlePath, 'index.html');
    const indexHTMLcontent: string = fs.readFileSync(indexHTML, { encoding: 'utf8' }).replace('<script defer="defer" src="/xpui.js"></script>', '<script defer="defer" src="/xpui.js"></script><script src="./mod-sp-bundle.js"></script>');
    fs.writeFileSync(indexHTML, indexHTMLcontent);

    log.info("Building SPAs with modified code");

    zip(tempMakeBundlePath, path.join(bundlePath, 'xpui.spa'), COMPRESSION_LEVEL.high).then(() => {
        log.info("Cleaning make directories");
        rimraf.sync(tempMakeBundlePath);
        rimraf.sync(path.resolve(tempMakeBundlePath, '..'));
        log.info("Backing up original bundles");
        fs.copySync(spotifyXpuiPath, spotifyXpuiPath.replace(path.basename(spotifyXpuiPath), 'xpui.spa.backup'), { overwrite: true });
        log.info("Copying modified bundles to Spotify executable");
        fs.copySync(path.join(bundlePath, 'xpui.spa'), spotifyXpuiPath, { overwrite: true });

        log.info("Starting Spotify in Dev Mode");
        child_process.spawn(spotifyPath, [chromeDebugArg]);

        log.info("Open chrome://inspect/#devices in your Chromium-based browser(e.g. Google Chrome)");
    })
})