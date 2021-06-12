import { SpotifyPlugin } from "..";
import { getSpotifyDOM, SpotifyDOM } from "../../dom/spDomLib";
import SpotifyEventListener from "../../events";
import SPDMPrefs from "../../prefs";

import $ = require('jquery');

export default class Clock implements SpotifyPlugin {

    enabled: boolean = false;
    NAME: string = "Clock";
    DESCRIPTION: string = "A clock on Spotify's top bar";

    private clock: JQuery;

    public load() {
        if (SPDMPrefs.get()['showClock']) this.enabled = true;
        SpotifyEventListener.once('upgraded-btn-added', () => {
            if (this.enabled) {
                this.clock = $("<h1></h1>").css({
                    'font-size': 'medium',
                    'color': '#D9D9D9'
                }).insertBefore($(getSpotifyDOM(SpotifyDOM.UpgradeButton))).text(`${new Date().getHours()}:${new Date().getMinutes()}`).hide().delay(200).fadeIn(200);
                setInterval(() => {
                    const currentTime: string = `${new Date().getHours()}:${new Date().getMinutes()}`;
                    if (this.clock.text() !== currentTime)
                        this.clock.text(currentTime);
                }, 1000);
            }
        });
    }
}