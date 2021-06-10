import { SpotifyPlugin } from "..";
import { getSpotifyDOM, SpotifyDOM } from "../../dom/spDomLib";
import SpotifyEventListener from "../../events";

import $ = require('jquery');
import SPDMPrefs from "../../prefs";

export default class HideFriendPane implements SpotifyPlugin {

    enabled: boolean = false;
    NAME: string = "HideFriendPane";
    DESCRIPTION: string = "Hide the Spotify friend panel";

    public load() {
        if (SPDMPrefs.get()['hideFriendPane']) this.enabled = true;
        SpotifyEventListener.on('friend-pane-added', () => {
            if (this.enabled)
                $(getSpotifyDOM(SpotifyDOM.FriendPane)).hide();
        })
    }
}