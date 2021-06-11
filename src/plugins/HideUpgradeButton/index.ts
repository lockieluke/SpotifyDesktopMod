import { SpotifyPlugin } from "..";
import { getSpotifyDOM, SpotifyDOM } from "../../dom/spDomLib";
import SpotifyEventListener from "../../events";

import $ = require('jquery');
import SPDMPrefs from "../../prefs";

export default class HideUpgradeButton implements SpotifyPlugin {

    enabled: boolean = false;
    NAME: string = "HidePremiumButton";
    DESCRIPTION: string = "Hide the Spotify upgrade button";

    public load() {
        if (SPDMPrefs.get()['hidePremiumBtn']) this.enabled = true;
        SpotifyEventListener.on('upgraded-btn-added', () => {
            if (this.enabled)
                $(getSpotifyDOM(SpotifyDOM.UpgradeButton)).hide();
        })
    }
}