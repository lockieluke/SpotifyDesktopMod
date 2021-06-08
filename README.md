# SpotifyDesktopMod

SpotifyDesktopMod provides the capabilities to modify Spotify Desktop client to enable themes and plugins support for the client with the easiest and most user-friendly way available.

### ⚠ Warning: Your Spotify account can possibly be banned because of the use of third-party modifications to the client, aka violation of TOS.  We do not take any responsibility, use it at your own risk.

#### This currently works on Windows and macOS(untested) only.

1. Clone the repository

   ```bash
   git clone https://github.com/lockieluke/SpotifyDesktopMod.git
   ```

2. Change directory

   ```bash
   cd SpotifyDesktopMod
   ```

3. Install dependencies with **Yarn**

   ```bash
   yarn install
   ```

4. Unpack SPA files(aka originally Spotify's JavaScript bundles), make sure you have Spotify Desktop installed.  On Windows, you must have the Win32 version installed.

   ```bash
   yarn sp-unpack
   ```

5. Start Spotify in Dev Mode via our script(automatically compilation and injection)

   ```bash
   yarn sp-dev
   ```

6. Spotify is started in dev mode.  Go to `chrome://inspect/#devices` and open DevTools for Spotify Desktop
7. Check and see if the message "Powered by SpotifyDesktopMod" is in the playlist folder

