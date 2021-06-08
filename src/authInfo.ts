import { ISPDMPrefKeys } from "./prefs";

export interface SPDM {
    isPremium: boolean,
    prefs: ISPDMPrefKeys
}

declare let spdm: SPDM;

export default class AuthInfo {

    public static init() {
        (window as any).spdm = {};
        spdm = {
            isPremium: true,
            prefs: {} as ISPDMPrefKeys
        };
    }

    public static set(info: Partial<SPDM>) {
        spdm = {
            ...spdm,
            ...info
        };
    }

    public static get(): SPDM {
        return spdm;
    }

}