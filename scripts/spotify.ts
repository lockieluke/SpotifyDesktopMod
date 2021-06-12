import cross_spawn = require('cross-spawn');
import * as fs from 'fs-extra';
import * as child_process from 'child_process';
import { spotifyGlobPrefPath, spotifyPath } from './sharedPaths';

const createLogger = require('logging');

export default function startSpotifyDev() {
    const log = createLogger.default('Spotify Launcher');

    const debugPort: number = 8080;
    const chromeDebugArg: string = `--remote-debugging-port=${debugPort.toString()}`;

    enableDevMode();

    (process.platform === 'win32' ? cross_spawn : child_process.spawn)(spotifyPath, [chromeDebugArg]).once('exit', exitCode => {
        log.info("Spotify exited");
        process.exit(exitCode);
    });
}

function enableDevMode() {
    // Should be a function that Spotify employees use to debug the app but we found this out when we attempted to reverse enginner Spotify Desktop with IDA
    // Add config `app.enable-developer-mode=true`
    let prefs: string = fs.readFileSync(spotifyGlobPrefPath, {
        encoding: 'utf-8'
    });
    const isDevModeEnabled: boolean = prefs.includes('app.enable-developer-mode=true');
    if (!isDevModeEnabled)
        prefs += "\r\napp.enable-developer-mode=true";

    fs.writeFileSync(spotifyGlobPrefPath, prefs);
}