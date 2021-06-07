// import { getSpotifyDOM, SpotifyDOM } from "./sp-dom-lib"
import $ = require('jquery');
import { addScript } from "./internal-dom-helper";

window.onload = function () {
    addScript('https://code.jquery.com/jquery-3.6.0.min.js');
    // $(getSpotifyDOM(SpotifyDOM.UpgradeButton)).hide();
}