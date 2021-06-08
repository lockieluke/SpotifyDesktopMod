import SpotifyEventListener from "../events";
import { SpotifyDOM } from "./spDomLib";
import { getXpathFromElement } from "./internalDomHelper";
import AuthInfo from "../authInfo";

export default function initDomClock() {
    const domClock = new MutationObserver((mutations, me) => {
        mutations.forEach(mutation => {
            const addedNodes = mutation.addedNodes;
            if (!addedNodes) return;

            for (let i = 0; i < addedNodes.length; i++) {
                const node: Node = addedNodes[i];

                for (const dom in SpotifyDOM) {
                    if (getXpathFromElement(document.querySelector(dom)) == getXpathFromElement(node)) {
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

                            default:
                                break;
                        }
                    }
                }
            }
        })
    })

    domClock.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false
    })
}