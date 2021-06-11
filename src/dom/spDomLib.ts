import $ = require('jquery');

export enum SpotifyDOM {
    AppRoot = '#main > div > div.Root__top-container',
    FriendPane = '#main > div > div.Root__top-container > aside',
    UpgradeButton = '#main > div > div.Root__top-container > div.Root__top-bar > header > button._3f37264be67c8f40fa9f76449afdb4bd-scss._110dbc41d89af63f97cdd8b7cd7fea47-scss._186766435454b6e18fec29440fbb9fc4-scss',
    PlaylistFolder = '#main > div > div.Root__top-container > nav > div.e628850198dd4b611f8d7ebc057a4734-scss > div.bbba02db95e363ecc51e2aa98adfd6a6-scss > div > div.os-host.os-host-foreign.os-theme-spotify.os-host-resize-disabled.os-host-scrollbar-horizontal-hidden._9921e51b5b554df14ba83705a29399d0-scss.os-host-scrollbar-vertical-hidden.os-host-transition > div.os-padding > div > div > ul',
    AdiFrames = '.ad-iframe',
    AdTrackingPixel = '#ad-tracking-pixel',
    AdBanner = '#main > div > div.Root__top-container > div.Root__main-view > div:nth-child(2) > div',
    SPDMBundleScript = '#mod-sp',
    AvatarMenu = '#main > div > div.Root__top-container > div.Root__top-bar > header > div:last-child'
}

export function getSpotifyDOM(domName: SpotifyDOM): HTMLElement {
    return $(domName.toString()).get(0);
}