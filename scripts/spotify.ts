import cross_spawn = require('cross-spawn');
import * as child_process from 'child_process';
import { spotifyPath } from './sharedPaths';

const createLogger = require('logging');

export default function startSpotifyDev() {
    const log = createLogger.default('Spotify Launcher');

    const debugPort: number = 8080;
    const chromeDebugArg: string = `--remote-debugging-port=${debugPort.toString()}`;

    (process.platform === 'win32' ? cross_spawn : child_process.spawn)(spotifyPath, [chromeDebugArg]).once('exit', exitCode => {
        log.info("Spotify exited");
        process.exit(exitCode);
    });
}