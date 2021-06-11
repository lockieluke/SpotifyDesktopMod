import { SpotifyPlugin } from "..";
import SpotifyEventListener from "../../events";
import { getSpotifyDOM, SpotifyDOM } from "../../dom/spDomLib";

import $ = require('jquery');
import SPDMPrefs from "../../prefs";

export default class SPDMAvatarInjection implements SpotifyPlugin {

    enabled: boolean = true;
    NAME: string = "SpotifyDesktopMod Avatar Menu";
    DESCRIPTION: string = "Avatar Menu for SpotifyDesktopMode";

    public load() {
        let lastOpen: number = 0;
        const delay: number = 200;
        SpotifyEventListener.on('avatar-menu-opened', () => {
            if ($(getSpotifyDOM(SpotifyDOM.AppRoot)).has(getSpotifyDOM(SpotifyDOM.AvatarMenu))) {
                // Prevent from triggering this too often
                if (lastOpen >= (Date.now() - delay)) return;
                lastOpen = Date.now();
                if (SPDMPrefs.get()['hidePremiumBtn']) this.removeItem(3); // Remove upgrade to spotify
                this.addItem("SPDM Preferences", () => {
                    const baseModel: string = `<div class="GenericModal__overlay GenericModal__overlay--animated GenericModal__overlay--afterOpen"><div class="GenericModal GenericModal--animated GenericModal--afterOpen" tabindex="-1" role="dialog" aria-label="About Spotify" aria-modal="true"><div class="_5f3ae45df63d4ee59322de5a5fbf008e-scss"><main class="fe68565ece4eb5033e161a0988785b16-scss"><div class="logo"><svg viewBox="0 0 1134 340" class="spotify-logo--text"><title>Spotify</title><path fill="currentColor" d="M8 171c0 92 76 168 168 168s168-76 168-168S268 4 176 4 8 79 8 171zm230 78c-39-24-89-30-147-17-14 2-16-18-4-20 64-15 118-8 162 19 11 7 0 24-11 18zm17-45c-45-28-114-36-167-20-17 5-23-21-7-25 61-18 136-9 188 23 14 9 0 31-14 22zM80 133c-17 6-28-23-9-30 59-18 159-15 221 22 17 9 1 37-17 27-54-32-144-35-195-19zm379 91c-17 0-33-6-47-20-1 0-1 1-1 1l-16 19c-1 1-1 2 0 3 18 16 40 24 64 24 34 0 55-19 55-47 0-24-15-37-50-46-29-7-34-12-34-22s10-16 23-16 25 5 39 15c0 0 1 1 2 1s1-1 1-1l14-20c1-1 1-1 0-2-16-13-35-20-56-20-31 0-53 19-53 46 0 29 20 38 52 46 28 6 32 12 32 22 0 11-10 17-25 17zm95-77v-13c0-1-1-2-2-2h-26c-1 0-2 1-2 2v147c0 1 1 2 2 2h26c1 0 2-1 2-2v-46c10 11 21 16 36 16 27 0 54-21 54-61s-27-60-54-60c-15 0-26 5-36 17zm30 78c-18 0-31-15-31-35s13-34 31-34 30 14 30 34-12 35-30 35zm68-34c0 34 27 60 62 60s62-27 62-61-26-60-61-60-63 27-63 61zm30-1c0-20 13-34 32-34s33 15 33 35-13 34-32 34-33-15-33-35zm140-58v-29c0-1 0-2-1-2h-26c-1 0-2 1-2 2v29h-13c-1 0-2 1-2 2v22c0 1 1 2 2 2h13v58c0 23 11 35 34 35 9 0 18-2 25-6 1 0 1-1 1-2v-21c0-1 0-2-1-2h-2c-5 3-11 4-16 4-8 0-12-4-12-12v-54h30c1 0 2-1 2-2v-22c0-1-1-2-2-2h-30zm129-3c0-11 4-15 13-15 5 0 10 0 15 2h1s1-1 1-2V93c0-1 0-2-1-2-5-2-12-3-22-3-24 0-36 14-36 39v5h-13c-1 0-2 1-2 2v22c0 1 1 2 2 2h13v89c0 1 1 2 2 2h26c1 0 1-1 1-2v-89h25l37 89c-4 9-8 11-14 11-5 0-10-1-15-4h-1l-1 1-9 19c0 1 0 3 1 3 9 5 17 7 27 7 19 0 30-9 39-33l45-116v-2c0-1-1-1-2-1h-27c-1 0-1 1-1 2l-28 78-30-78c0-1-1-2-2-2h-44v-3zm-83 3c-1 0-2 1-2 2v113c0 1 1 2 2 2h26c1 0 1-1 1-2V134c0-1 0-2-1-2h-26zm-6-33c0 10 9 19 19 19s18-9 18-19-8-18-18-18-19 8-19 18zm245 69c10 0 19-8 19-18s-9-18-19-18-18 8-18 18 8 18 18 18zm0-34c9 0 17 7 17 16s-8 16-17 16-16-7-16-16 7-16 16-16zm4 18c3-1 5-3 5-6 0-4-4-6-8-6h-8v19h4v-6h4l4 6h5zm-3-9c2 0 4 1 4 3s-2 3-4 3h-4v-6h4z"></path></svg></div><div class="_36160e9cf22868d9f7ea43507de33116-scss"><div class="_4c126d28d9673829a2ecbb917a010475-scss"><div>1.1.61.583.gad060c66-a</div></div><button title="Copy version info" class="e3d210deee82ba14222df586edbfb5e0-scss">⎘</button></div><div class="_1273f09aa2b1a4e43939e13d1aabded9-scss _5f899d811cf206c5925f6450626fb0aa-scss" as="div"><p class="b213fdb265434b511f0c0e5b4b695863-scss"><span class="_8a9c5cc886805907de5073b8ebc3acd8-scss" as="span">Copyright © 2021 Spotify AB.</span><span class="_8a9c5cc886805907de5073b8ebc3acd8-scss" as="span">Spotify® is a registered trademark of the Spotify Group.</span></p><div><p>Content provided by</p><div class="_3b5114640efa9f84a5751166e36b9b01-scss"><img src="/images/warner.png" alt="Warner"><img src="/images/emi.png" alt="Emi"><img src="/images/merlin.png" alt="Merlin"><img src="/images/moviebuff.png" alt="Moviebuff"><img src="/images/orchard.png" alt="Orchard"><img src="/images/rovi.png" alt="Rovi"><img src="/images/sony.png" alt="Sony"><img src="/images/universal.png" alt="Universal"></div></div></div></main><button aria-label="Close" class="_6c4db41eb4f2d53ae13515c176438921-scss"><svg height="24" role="img" width="24" viewBox="0 0 24 24"><path d="M4.93,4.93,19.07,19.07m-14.14,0L19.07,4.93" fill="none" stroke="currentColor" stroke-miterlimit="10"></path></svg></button></div></div></div>`;
                    $(baseModel).hide().fadeIn('fast').appendTo('body > div:nth-child(7)');
                    $('body > div:nth-child(7) > div > div > div > main > div._36160e9cf22868d9f7ea43507de33116-scss').remove();
                    $('body > div:nth-child(7) > div > div > div > main > div._1273f09aa2b1a4e43939e13d1aabded9-scss._5f899d811cf206c5925f6450626fb0aa-scss > div').remove();
                    $('body > div:nth-child(7) > div > div > div > main > div._1273f09aa2b1a4e43939e13d1aabded9-scss._5f899d811cf206c5925f6450626fb0aa-scss > p > span:nth-child(2)').remove();
                    $('body > div:nth-child(7) > div > div > div > main > div._1273f09aa2b1a4e43939e13d1aabded9-scss._5f899d811cf206c5925f6450626fb0aa-scss > p > span:nth-child(1)').text("Client modified and enchanced by SpotifyDesktopMod").after($('<a></a>').text("Open source on GitHub").attr('href', 'https://github.com/lockieluke/SpotifyDesktopMod'));
                    $('body > div:nth-child(7) > div > div > div > button').one('click', () => {
                        $('body > div:nth-child(7) > div').fadeOut('fast', () => {
                            $('body > div:nth-child(7) > div').remove();
                        });
                    });
                })
            }
        })
    }

    public addItem(name: string, onclick?: (dom: JQuery<this>) => void) {
        const menuRoot = $(getSpotifyDOM(SpotifyDOM.AvatarMenu)).children().first().children().first().children().first();
        $(`<li role="presentation" class="b46bba08e80cdd2d0da8cca1e49c7440-scss"><a class="d2a8e42f26357f2d21c027f30d93fb64-scss d8298bd279d997e25cc981a71a6f28bf-scss" role="menuitem" tabindex="-1"><span class="ellipsis-one-line f3fc214b257ae2f1d43d4c594a94497f-scss" as="span" dir="auto">${name}</span></a></li>`).one('click', () => {
            $('#main > div > div.Root__top-container > div.Root__top-bar > header > button._3e75c7f07bdce28b37b45a5cd74ff371-scss').trigger('click');
            onclick($(this))
        }).appendTo(menuRoot.before().before());
    }

    public removeItem(index: number) {
        $(`#context-menu > div > ul > li:nth-child(${index.toString()})`).remove();
    }
}