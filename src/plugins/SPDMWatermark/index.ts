import { SpotifyPlugin } from "..";
import { getSpotifyDOM, SpotifyDOM } from "../../dom/spDomLib";
import SpotifyEventListener from "../../events";

import $ = require('jquery');

export default class SPDMWatermark implements SpotifyPlugin {

    enabled: boolean = true;
    NAME: string = "SpotifyDesktopMode Watermarks";
    DESCRIPTION: string = "Credit for SpotifyDesktopMode";

    public load() {
        SpotifyEventListener.once('playlist-folders-added', () => {
            const message: string = "Powered By SpotifyDesktopMod";
            const href: string = "#";
            const basedom: string = `<li class="GlueDropTarget GlueDropTarget--playlists GlueDropTarget--folders"><div class="c9c91e3ac3f8007893010e4484c2ef7d-scss" draggable="true" data-testid="rootlist-item" style="--indentation:0;"><a class="standalone-ellipsis-one-line _9a78420cc4a863b2f413ce55e759a321-scss" draggable="false" tabindex="-1" href="${href}"><span class="bd0f04911fe4adb022e666269a90a739-scss _2002bac6ea2fc1db22e491bd0d24f1ee-scss" as="span" dir="auto">${message}</span></a><div class="ea5753b342cd7d8290d6c85d3978456b-scss"></div></div></li>`;

            $(basedom).attr('title', "This Spotify Desktop instance is modded with SpotifyDesktopMod which enables plugins and themes to the client").css('pointer-events', 'none').css('width', 'max-content').appendTo(getSpotifyDOM(SpotifyDOM.PlaylistFolder));
        })
    }
}