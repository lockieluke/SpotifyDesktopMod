import { SPDM } from "./authInfo";

declare let spdm: SPDM;

export interface ISPDMPrefKeys {
    hidePremiumBtn: boolean,
    hideFriendPane: boolean,
    removeAdiFrames: boolean,
    removeBannerAds: boolean
}

export default class SPDMPrefs {

    public static init() {
        spdm.prefs = {
            hidePremiumBtn: true,
            hideFriendPane: true,
            removeAdiFrames: true,
            removeBannerAds: true
        };
        if (window.sessionStorage.getItem('spdm-prefs')) {
            spdm.prefs = JSON.parse(window.sessionStorage.getItem('spdm-prefs'));
        }

    }

    public static set(prefs: Partial<ISPDMPrefKeys>) {
        spdm = {
            ...spdm,
            ...prefs
        };
    }

    public static get() {
        return spdm.prefs;
    }

}