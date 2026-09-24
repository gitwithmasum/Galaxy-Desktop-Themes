# Masum Galaxy Desktop

A matching Windows 11 taskbar, animated star overlay, and 12-scene Chrome new tab by Masum Billah.

## What is included

| Folder | What it does | Requires |
| --- | --- | --- |
| `taskbar/` | Neon glass taskbar, glow around native app icons, active app indicator, original galaxy Start icon | Windhawk + Windows 11 Taskbar Styler |
| `rainmeter/` | 32 twinkling stars and small `MASUM BILLAH` label over a bottom taskbar | Rainmeter |
| `chrome-new-tab/` | 12 space scenes rotating every 5 seconds, particles and shortcut editor | Chrome |

## Set up the taskbar

1. Install [Windhawk](https://windhawk.net/) and enable **Windows 11 Taskbar Styler**.
2. Open the mod's **Settings > Textual mode**. Replace the old theme text with everything in [`taskbar/Masum-Galaxy-Dock-v2.txt`](taskbar/Masum-Galaxy-Dock-v2.txt); choose **Save settings**.
3. After publishing this repository at `gitwithmasum/Galaxy-Desktop-Themes`, you can switch to [`taskbar/Masum-Galaxy-Dock-v2-GitHub-Start.txt`](taskbar/Masum-Galaxy-Dock-v2-GitHub-Start.txt) to use the original galaxy Start icon. That variant loads its PNG from GitHub and needs a network connection. For offline use, change `ImageSource` to the full local path of [`galaxy-start.png`](taskbar/assets/galaxy-start.png).
4. To revert, paste the earlier theme or disable the Windhawk mod.

App icons retain their own images and usual click actions. This theme styles their backdrop, hover state and active indicator. It does not replace every installed app's icon.

## Add stars and your name

1. Install [Rainmeter](https://www.rainmeter.net/).
2. Copy the `rainmeter/MasumGalaxyTaskbarStars` folder into Rainmeter's Skins folder (usually `Documents\Rainmeter\Skins`).
3. Right-click Rainmeter's tray icon, select **Refresh all**, then in **Manage** load `MasumGalaxyTaskbarStars > TaskbarStars.ini`.
4. In the skin file, edit `NameText=MASUM BILLAH` and refresh if you want another name. The stars sit above the bar and let mouse clicks pass through.

## Install the Chrome new tab

1. Download this repository as a ZIP, then extract it to a permanent folder.
2. Open `chrome://extensions`, enable **Developer mode**, choose **Load unpacked**, and select the `chrome-new-tab` folder containing `manifest.json`.
3. If you previously loaded the old extension, remove it first from `chrome://extensions` to avoid conflicting new-tab overrides. Your old extension's local shortcut edits will not automatically transfer to this copy.
4. Use Chrome's address bar for web searches. More details in [`chrome-new-tab/README.txt`](chrome-new-tab/README.txt).

## Notes

Made for a standard bottom Windows 11 taskbar, primary monitor. Windows 11 updates and taskbar icon density may affect individual Windhawk targets. Rainmeter is a separate click-through window that can appear over fullscreen apps; unload the skin from Rainmeter Manage when needed. The original scene images are included for this extension; they should not be redistributed separately without checking their rights.
