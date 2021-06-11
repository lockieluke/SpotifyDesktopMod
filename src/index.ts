import AuthInfo from "./authInfo";
import Development from "./dev";
import DomClock from "./dom/domClock";
import SpotifyEventListener from "./events";
import SpotifyPluginLoader from "./plugins";
import SPDMPrefs from "./prefs";

window.onload = function () {
  // Spotify bootstrap routine
  SpotifyEventListener.emit("init-frame");
  Development.initDevelopment();
  AuthInfo.init();
  SPDMPrefs.init();
  DomClock.initGlobalDomHooks();
  SpotifyPluginLoader.loadPlugins();

  console.log("[Initialized SpotifyDesktopMod]");
};

