import cross_spawn = require('cross-spawn');
import * as fs from 'fs-extra';
import * as child_process from 'child_process';
import { baseBundlePath, spotifyGlobPrefPath, spotifyPath } from './sharedPaths';

const createLogger = require('logging');

export default function startSpotifyDev() {
    const log = createLogger.default('Spotify Launcher');

    const debugPort: number = 8080;
    const chromeDebugArg: string = `--remote-debugging-port=${debugPort.toString()}`;

    switchSpotifyDevMode(true);

    (process.platform === 'win32' ? cross_spawn : child_process.spawn)(spotifyPath, [chromeDebugArg], {
        windowsHide: false
    }).once('exit', exitCode => {
        log.info("Spotify exited");
        process.exit(exitCode);
    });
}

export function switchSpotifyDevMode(enable: boolean) {
    // Should be a function that Spotify employees use to debug the app but we found this out when we attempted to reverse enginner Spotify Desktop with IDA
    // Add config `app.enable-developer-mode=true`
    let prefs: string = fs.readFileSync(spotifyGlobPrefPath, {
        encoding: 'utf-8'
    });
    const switchToApply = (enable: boolean) => {
        return `app.enable-developer-mode=${enable ? "true" : "false"}`;
    };

    // Remove previous settings
    if (prefs.includes(switchToApply(!enable)))
        prefs = prefs.replace(`${switchToApply(!enable)}`, '');

    if (!prefs.includes(switchToApply(enable)))
        prefs += `\r\n${switchToApply(enable)}`;

    fs.writeFileSync(spotifyGlobPrefPath, prefs);
}

export function preprocessDirs() {
    const log = createLogger.default('SPDM Preprocessor');
    log.info("Checking project structure");

    if (!fs.existsSync(baseBundlePath))
        log.error("Spotify base bundle not found, please run unpack before proceeding");

    log.info("Checking for a Spotify installation");

    if (!fs.existsSync(spotifyPath)) log.error(process.platform === 'win32' ? "Error finding Spotify executable, make sure you are using the Win32 version of Spotify(Not the one from Microsoft Store)" : "Spotify not found");
}