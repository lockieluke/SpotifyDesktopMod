import HideFriendPane from "./HideFriendPane";
import HideUpgradeButton from "./HideUpgradeButton";
import SPDMWatermark from "./SPDMWatermark";

export interface SpotifyPlugin {
    NAME: string,
    DESCRIPTION: string,
    enabled: boolean,
    load(): void
}

export default class SpotifyPluginLoader {

    private static plugins: SpotifyPlugin[] = [];

    public static loadPlugins() {
        this.plugins.push(new HideUpgradeButton());
        this.plugins.push(new HideFriendPane());
        this.plugins.push(new SPDMWatermark());

        this.plugins.forEach(plugin => {
            plugin.load();
        })
    }

}