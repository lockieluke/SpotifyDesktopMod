import * as path from "path";

export const bundlePath: string = path.join(process.cwd(), 'dist');
export const baseBundlePath: string = path.join(process.cwd(), 'base');

const winPath: string = path.join(process.env['APPDATA'] || "", "Spotify", "Spotify.exe");
const macPath: string = path.join(process.env['HOME'] || "~", "Applications", "Spotify.app", "Contents", "MacOS", "Spotify");
export const spotifyPath: string = process.platform === 'win32' ? winPath : macPath;