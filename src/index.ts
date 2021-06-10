import $ = require("jquery");
import AuthInfo from "./authInfo";
import Development from "./dev";
import initDomClock from "./dom/domClock";
import SpotifyEventListener from "./events";
import SpotifyPluginLoader from "./plugins";
import SPDMPrefs from "./prefs";

window.onload = function () {
  // Spotify bootstrap routine
  SpotifyEventListener.emit("init-frame");
  Development.initDevelopment();
  AuthInfo.init();
  SPDMPrefs.init();
  initDomClock();
  SpotifyPluginLoader.loadPlugins();

  console.log("[Initialized SpotifyDesktopMod]");
};

