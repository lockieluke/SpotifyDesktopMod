import HideUpgradeButton from "./HideUpgradeButton";

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

        this.plugins.forEach(plugin => {
            plugin.load();
        })
    }

}