import { SpotifyPlugin } from "..";
import { getSpotifyDOM, SpotifyDOM } from "../../dom/spDomLib";
import SpotifyEventListener from "../../events";

import $ = require('jquery');
import SPDMPrefs from "../../prefs";

export default class RemoveAdiFrames implements SpotifyPlugin {

    enabled: boolean = true;
    NAME: string = "RemoveAdiFrames";
    DESCRIPTION: string = "Remove all Spotify iframes containing tracking and ads";

    public load() {
        if (SPDMPrefs.get()['removeAdiFrames']) this.enabled = true;
        SpotifyEventListener.once('ad-iframes-added', () => {
            if (this.enabled)
                $(getSpotifyDOM(SpotifyDOM.AdiFrames)).remove();
        })

        SpotifyEventListener.once('ad-tracking-pixel-added', () => {
            if (this.enabled)
                $(getSpotifyDOM(SpotifyDOM.AdTrackingPixel)).remove();
        })
    }
}