import { SpotifyPlugin } from "..";
import { getSpotifyDOM, SpotifyDOM } from "../../dom/spDomLib";
import SpotifyEventListener from "../../events";
import SPDMPrefs from "../../prefs";

import $ = require('jquery');

export default class HideAdBanners implements SpotifyPlugin {

    enabled: boolean = false;
    NAME: string = "HideAdBanners";
    DESCRIPTION: string = "Hide the Spotify ad banners";

    public load() {
        if (SPDMPrefs.get()['removeBannerAds']) this.enabled = true;
        SpotifyEventListener.on('ad-banner-added', () => {
            if (this.enabled)
                if ($('body').has(getSpotifyDOM(SpotifyDOM.AdBanner)))
                    $(getSpotifyDOM(SpotifyDOM.AdBanner)).hide();
        })
    }
}