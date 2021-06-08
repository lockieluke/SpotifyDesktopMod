import $ = require('jquery');
import { initAuthInfo } from './authInfo';
import initDomClock from './dom/domClock';
import SpotifyEventListener from './events';
import SPDMPrefs from './prefs';

window.onload = function () {
    // Spotify bootstrap routine
    SpotifyEventListener.emit('init-frame');
    initAuthInfo();
    SPDMPrefs.init();
    initDomClock();

    SpotifyEventListener.once('upgraded-btn-added', () => alert("Not Premium"))
}