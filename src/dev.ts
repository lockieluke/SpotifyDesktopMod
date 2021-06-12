import { getSpotifyDOM, SpotifyDOM } from "./dom/spDomLib";
import $ = require('jquery');

export default class Development {

    public static ifDev(): boolean {
        return !$(getSpotifyDOM(SpotifyDOM.SPDMBundleScript)).attr('src').includes('./mod-sp-bundle.js');
    }

    public static initDevelopment() {
        if (!this.ifDev()) return;
    }

}