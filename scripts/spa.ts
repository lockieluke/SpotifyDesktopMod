import * as path from 'path';
import * as fs from 'fs-extra';
import { baseBundlePath, bundlePath, spotifyXpuiPath, tempMakeBundlePath, } from "./sharedPaths";
import rimraf = require('rimraf');

export function patchSPA(mode: 'development' | 'production') {
    fs.copySync(path.join(baseBundlePath, 'xpui'), tempMakeBundlePath, { recursive: true });
    fs.copyFileSync(path.join(bundlePath, 'mod-sp-bundle.js'), path.join(tempMakeBundlePath, 'mod-sp-bundle.js'));

    const indexHTML: string = path.join(tempMakeBundlePath, 'index.html');
    const indexHTMLcontent: string = fs.readFileSync(indexHTML, { encoding: 'utf8' });
    if (!indexHTMLcontent.includes('<script src="./mod-sp-bundle.js"></script>'))
        fs.writeFileSync(indexHTML, indexHTMLcontent.replace('<script defer="defer" src="/xpui.js"></script>', mode === 'development' ? '<script defer="defer" src="/xpui.js"></script><script id="mod-sp" src="http://localhost:19132/mod-sp-bundle.js"></script>' : '<script id="mod-sp" src="./mod-sp-bundle.js"></script><script defer="defer" src="/xpui.js"></script>'));
}

export function installToSpotify() {
    fs.copySync(path.join(bundlePath, 'xpui.spa'), spotifyXpuiPath, { overwrite: true });
    fs.rmSync(path.join(bundlePath, 'xpui.spa'));
}

export function cleanBuildDirs() {
    rimraf.sync(tempMakeBundlePath);
    rimraf.sync(path.resolve(tempMakeBundlePath, '..'));
}