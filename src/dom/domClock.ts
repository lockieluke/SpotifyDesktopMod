import SpotifyEventListener from "../events";
import { SpotifyDOM } from "./spDomLib";
import AuthInfo from "../authInfo";

export default class DomClock {

    private static domClock: MutationObserver = null;

    public static initGlobalDomHooks() {
        this.domClock = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                const addedDOM = mutation.addedNodes;
                if (addedDOM) {
                    for (let i = 0; i < addedDOM.length; i++) {
                        for (const dom in SpotifyDOM) {
                            if (document.contains(document.querySelector(SpotifyDOM[dom].toString()))) {
                                switch (SpotifyDOM[dom]) {
                                    case SpotifyDOM.AppRoot:
                                        SpotifyEventListener.emit('init-approot');
                                        break;
        
                                    case SpotifyDOM.UpgradeButton:
                                        SpotifyEventListener.emit('upgraded-btn-added');
                                        AuthInfo.set({
                                            isPremium: false
                                        })
                                        break;
        
                                    case SpotifyDOM.FriendPane:
                                        SpotifyEventListener.emit('friend-pane-added');
                                        break;
        
                                    case SpotifyDOM.PlaylistFolder:
                                        SpotifyEventListener.emit('playlist-folders-added');
                                        break;
        
                                    case SpotifyDOM.AdiFrames:
                                        SpotifyEventListener.emit('ad-iframes-added');
                                        break;
        
                                    case SpotifyDOM.AdTrackingPixel:
                                        SpotifyEventListener.emit('ad-tracking-pixel-added');
                                        break;
        
                                    case SpotifyDOM.AdBanner:
                                        SpotifyEventListener.emit('ad-banner-added');
                                        break;

                                    case SpotifyDOM.AvatarMenu:
                                        SpotifyEventListener.emit('avatar-menu-opened');
                                        break;
                                }
                            }
                        }
                    }
                }
            })
        });

        this.domClock.observe(document, {attributes: false, childList: true, characterData: false, subtree:true})
    }

    public static disconnectDomClock() {
        this.domClock.disconnect();
        this.domClock = null;
    }

}