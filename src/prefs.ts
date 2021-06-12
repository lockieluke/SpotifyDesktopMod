import { SPDM } from "./authInfo";

declare let spdm: SPDM;

export interface ISPDMPrefKeys {
    hidePremiumBtn: boolean,
    removeAdiFrames: boolean,
    removeBannerAds: boolean,
    showClock: boolean
}

export default class SPDMPrefs {

    public static init() {
        spdm.prefs = {
            hidePremiumBtn: true,
            removeAdiFrames: true,
            removeBannerAds: true,
            showClock: true
        };
        if (window.sessionStorage.getItem('spdm-prefs')) {
            spdm.prefs = JSON.parse(window.sessionStorage.getItem('spdm-prefs'));
        }
        window.sessionStorage.setItem('spdm-prefs', JSON.stringify(spdm.prefs));
    }

    public static set(prefs: Partial<ISPDMPrefKeys>) {
        spdm = {
            ...spdm,
            ...prefs
        };
        window.sessionStorage.setItem('spdm-prefs', JSON.stringify(spdm.prefs));
    }

    public static get() {
        return spdm.prefs;
    }

}