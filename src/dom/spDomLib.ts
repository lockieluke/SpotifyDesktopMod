import $ = require('jquery');

export enum SpotifyDOM {
    AppRoot = `#main > div > div.Root__top-container`,
    UpgradeButton = `#main > div > div.Root__top-container > div.Root__top-bar > header > button._3f37264be67c8f40fa9f76449afdb4bd-scss._110dbc41d89af63f97cdd8b7cd7fea47-scss._186766435454b6e18fec29440fbb9fc4-scss`
}

export function getSpotifyDOM(domName: SpotifyDOM): HTMLElement {
    return $(domName.toString()).get(0);
}