import { getSpotifyDOM, SpotifyDOM } from "./dom/spDomLib";
import $ = require('jquery');
import platform = require('platform');

export default class Development {

    public static ifDev(): boolean {
        return !$(getSpotifyDOM(SpotifyDOM.SPDMBundleScript)).attr('src').includes('./mod-sp-bundle.js');
    }

    public static initDevelopment() {
        if (!this.ifDev()) return;

        // Reload script with dev-server
        $(document.body).on('keydown', event => {
            const isMac: boolean = platform.os.family === 'OS X';
            if (event.key === 'g' && (isMac ? event.metaKey : event.ctrlKey)) {
                event.preventDefault();
                window.location.reload();
            }
        })
    }

}