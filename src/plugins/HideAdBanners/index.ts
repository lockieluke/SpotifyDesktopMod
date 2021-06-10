import { SpotifyPlugin } from "..";
import { getSpotifyDOM, SpotifyDOM } from "../../dom/spDomLib";
import SpotifyEventListener from "../../events";

import SPDMPrefs from "../../prefs";

export default class HideAdBanners implements SpotifyPlugin {

    enabled: boolean = false;
    NAME: string = "HideAdBanners";
    DESCRIPTION: string = "Hide the Spotify ad banners";

    public load() {
        if (SPDMPrefs.get()['removeBannerAds']) this.enabled = true;
        SpotifyEventListener.on('init-approot', () => {
            if (this.enabled)
                setInterval(() => {
                    getSpotifyDOM(SpotifyDOM.AdBanner).style.display = 'none';
                }, 200);
        })
    }
}