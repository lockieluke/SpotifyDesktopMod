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
                }).insertBefore($(getSpotifyDOM(SpotifyDOM.UpgradeButton))).text(this.getTime()).hide().delay(200).fadeIn(200);
                setInterval(() => {
                    if (this.clock.text() !== this.getTime())
                        this.clock.text(this.getTime());
                }, 1000);
            }
        });
    }

    private getTime(): string {
        return `${new Date().getHours()}:${new Date().getMinutes().toString().length == 1 ? `0${new Date().getMinutes()}` : new Date().getMinutes()}`;
    }
}