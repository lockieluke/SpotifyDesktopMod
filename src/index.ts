import $ = require('jquery');
import { addScript } from "./dom/internal-dom-helper";
import { getSpotifyDOM, SpotifyDOM } from './dom/sp-dom-lib';
import SpotifyEventListener from './events';

window.onload = function () {
    // Spotify bootstrap routine
    SpotifyEventListener.emit('init-frame');
    $('body').one('DOMNodeInserted', () => console.log("Element added"));
}