import * as path from "path";

export const bundlePath: string = path.join(process.cwd(), 'dist');
export const baseBundlePath: string = path.join(process.cwd(), 'base');

const winPath: string = path.join(process.env['APPDATA'] || "", "Spotify", "Spotify.exe");
const macPath: string = path.join("/", "Applications", "Spotify.app", "Contents", "MacOS", "Spotify");
export const spotifyPath: string = process.platform === 'win32' ? winPath : macPath;
export const spotifyGlobPrefPath: string = process.platform === 'win32' ? path.join(path.dirname(spotifyPath), 'prefs') : path.join(process.env['HOME'], "Library", "Application Support", "Spotify", "prefs");
export const tempMakeBundlePath: string = path.join(bundlePath, 'bundle-make', 'xpui');
export const spotifyXpuiPath: string = process.platform === 'win32' ? path.join(path.dirname(winPath), "Apps", "xpui.spa") : path.join(path.dirname(path.dirname(spotifyPath)), 'Resources', 'Apps', 'xpui.spa');