import * as path from "path";

export const bundlePath: string = path.join(process.cwd(), 'dist');
export const baseBundlePath: string = path.join(process.cwd(), 'base');

const winPath: string = path.join(process.env['APPDATA'] || "", "Spotify", "Spotify.exe");
const macPath: string = path.join(process.env['HOME'] || "~", "Applications", "Spotify.app", "Contents", "MacOS", "Spotify");
export const spotifyPath: string = process.platform === 'win32' ? winPath : macPath;
export const spotifyGlobPrefPath: string = path.join(path.dirname(spotifyPath), 'prefs');
export const tempMakeBundlePath: string = path.join(bundlePath, 'bundle-make', 'xpui');
export const spotifyXpuiPath: string = path.join(path.dirname(spotifyPath), 'Apps', 'xpui.spa');