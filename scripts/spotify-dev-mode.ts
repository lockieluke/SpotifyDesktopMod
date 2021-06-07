import * as path from 'path';
import * as fs from 'fs-extra';
import * as child_process from 'child_process';
import * as rimraf from 'rimraf';
import { COMPRESSION_LEVEL, zip } from 'zip-a-folder';

const createLogger = require('logging');
const log = createLogger.default('Spotify Dev Mode');

log.info("Checking project structure");

const bundlePath: string = path.join(process.cwd(), 'dist');
const baseBundlePath: string = path.join(process.cwd(), 'base');
const tempMakeBundlePath: string = path.join(bundlePath, 'bundle-make', 'xpui');

if (!fs.existsSync(bundlePath))
    log.error("Webpack JavaScript Bundle could not be found, please run 'yarn webpack' at project root before proceeding");

if (!fs.existsSync(baseBundlePath))
    log.error("Spotify base bundle not found, please run unpack before proceeding");

log.info("Checking for a Spotify installation");

const winPath: string = path.join(process.env['APPDATA'] || "", "Spotify", "Spotify.exe");
const macPath: string = path.join(process.env['HOME'] || "~", "Applications", "Spotify.app", "Contents", "MacOS", "Spotify");
const spotifyPath: string = process.platform === 'win32' ? winPath : macPath;
const spotifyXpuiPath: string = path.join(path.dirname(spotifyPath), 'Apps', 'xpui.spa');
const debugPort: number = 8080;
const chromeDebugArg: string = `--remote-debugging-port=${debugPort.toString()}`;

if (!fs.existsSync(winPath)) log.error("Error finding Spotify executable, make sure you are using the Win32 version of Spotify(Not the one from Microsoft Store)");

log.info("Copying SPA bundles to make directory");

fs.copySync(path.join(baseBundlePath, 'xpui'), tempMakeBundlePath, {recursive: true});
fs.copyFileSync(path.join(bundlePath, 'mod-sp-bundle.js'), path.join(tempMakeBundlePath, 'mod-sp-bundle.js'));

log.info("Patching base bundles");

const indexHTML: string = path.join(tempMakeBundlePath, 'index.html');
const indexHTMLcontent: string = fs.readFileSync(indexHTML, {encoding: 'utf8'}).replace('<script defer="defer" src="/xpui.js"></script>', '<script defer="defer" src="/xpui.js"></script><script src="./mod-sp-bundle.js"></script>');
fs.writeFileSync(indexHTML, indexHTMLcontent);

log.info("Building SPAs with modified code");

zip(tempMakeBundlePath, path.join(bundlePath, 'xpui.spa'), COMPRESSION_LEVEL.high).then(() => {
    log.info("Cleaning make directories");
    rimraf.sync(tempMakeBundlePath);
    rimraf.sync(path.resolve(tempMakeBundlePath, '..'));
    log.info("Backing up original bundles");
    fs.copySync(spotifyXpuiPath, spotifyXpuiPath.replace(path.basename(spotifyXpuiPath), 'xpui.spa.backup'), {overwrite: true});
    log.info("Copying modified bundles to Spotify executable");
    fs.copySync(path.join(bundlePath, 'xpui.spa'), spotifyXpuiPath, {overwrite: true});

    log.info("Starting Spotify in Dev Mode");
    child_process.spawn(spotifyPath, [chromeDebugArg]);

    log.info("Open chrome://inspect/#devices in your Chromium-based browser(e.g. Google Chrome)");
})