# Masum Galaxy Desktop

A matching Windows 11 taskbar, animated star overlay, and 12-scene Chrome new tab by Masum Billah.

## What is included

| Folder | What it does | Requires |
| --- | --- | --- |
| `taskbar/` | Neon glass taskbar, glow around native app icons, active app indicator, original galaxy Start icon | Windhawk + Windows 11 Taskbar Styler |
| `rainmeter/` | Animated taskbar stars and a separate Galaxy Command Center with clock, date, system stats, weather and shortcuts | Rainmeter |
| `chrome-new-tab/` | 12 space scenes rotating every 5 seconds, particles and shortcut editor | Chrome |
| `launcher/` | F8 Galaxy Launcher for apps, folders, links and web search | AutoHotkey v2 |
| `android-theme/` | Matching portrait home and lock wallpapers, 16 cyan/violet PNG icons and optional classic video wallpaper | Android phone; custom image icons need a compatible launcher |
| `modes/` | F9 Study / Coding / Gaming desktop profiles, wallpapers, shortcuts and optional timers | AutoHotkey v2 on Windows 11 |
| `bridge/` | Private Wi-Fi laptop ↔ Android text, link and file exchange with PIN | Python 3.9+ on Windows; phone browser |
| `lock-screen/` | Matching Moon and galaxy lock-screen wallpapers for Windows and Android | Windows 11 or Android |
| `rgb-profile/` | Galaxy lighting palette, interactive keyboard preview, and device-aware setup guide | Browser; compatible RGB device/software for actual lighting |

## Matching RGB profile

Open [`rgb-profile/preview.html`](rgb-profile/preview.html) for five animated color previews, then use the [Bengali setup guide](rgb-profile/SETUP-BN.md) to set matching colors on compatible RGB hardware. The JSON is a palette reference, not a device-driver import file. ONIKUMA G55 software control has not been confirmed.

## Galaxy lock screen

Set `lock-screen/windows/Galaxy-Lock-Windows.jpg` in Windows **Settings → Personalization → Lock screen → Picture**. Set `lock-screen/android/Galaxy-Lock-Android.jpg` as your phone's **Lock screen** wallpaper through Gallery or Wallpaper settings. PNG originals and detailed [Bengali setup steps](lock-screen/SETUP-BN.md) are also included. These are still images, so no extra app is needed.

## Laptop–phone bridge

Extract the [`bridge/` folder](bridge/SETUP-BN.md) and double-click `START-BRIDGE.bat` on your Windows laptop. A local IP address and a new PIN for each run appear in its window. Open the address on your Android phone on the same private Wi-Fi; transfer notes, links and files up to 25 MB in either direction. Uploaded items stay in a folder on your laptop. See the [Bengali setup guide](bridge/SETUP-BN.md) for network troubleshooting, storage and safe use.

## Study / Coding / Gaming modes

Install AutoHotkey v2, then run [`modes/Masum-Galaxy-Modes.ahk`](modes/Masum-Galaxy-Modes.ahk) with its `wallpapers` folder next to it. Press **F9** for the panel, or **Ctrl+Alt+1 / 2 / 3** to choose Study, Coding or Gaming. Profiles change wallpaper and provide relevant shortcuts and optional focus timers. The Gaming button opens Windows Game Mode settings; it does not silently change the system's Game Mode setting. See the [Bengali setup guide](modes/SETUP-BN.md) for startup and restoration.

## Matching Android theme

The [Android theme](android-theme/SETUP-BN.md) includes separate home and lock wallpapers that match the desktop's moon, stars and violet nebula. Its 16 original icon PNGs can be assigned individually in a launcher that supports user image icons. The animated video is optional and only works where the phone's wallpaper picker supports video. See the Bengali guide for the exact files, setup and removal.

## Install the one-key launcher

Install [AutoHotkey v2](https://www.autohotkey.com/), then double-click [`launcher/Masum-Galaxy-Launcher.ahk`](launcher/Masum-Galaxy-Launcher.ahk). Press **F8** to open it, type to filter Start Menu apps or your shortcuts, use **↑/↓** and **Enter** to launch, and **Esc** to close. Search queries can open a browser search; the Windows file search entry opens Windows Search. It runs independently of Rainmeter and Windhawk. See the [Bengali setup guide](launcher/SETUP-BN.md) for customization, startup, and removal.

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

## Install Galaxy Command Center

1. Copy `rainmeter/MasumGalaxyCommandCenter` into your Rainmeter Skins folder (usually `Documents\Rainmeter\Skins`). Keep `CommandCenter.ini` inside that folder.
2. Right-click the Rainmeter tray icon and choose **Refresh all**, then **Manage > MasumGalaxyCommandCenter > CommandCenter.ini > Load**. This is a separate skin, so the taskbar stars can stay loaded at the same time.
3. The dashboard appears near the upper left of your primary display. Drag it anywhere you like; refreshing resets the starting position to `24,80`.
4. Edit `[Variables]` at the top of `CommandCenter.ini` to change the name, weather city and coordinates, or the four shortcut links. Save and refresh the skin.
5. Live temperature is fetched from [Open-Meteo](https://open-meteo.com/) every 15 minutes; it needs an internet connection. The default location is **Dhaka**. CPU, RAM, battery and time are read locally. On a desktop PC without a battery, the battery row may be unavailable.

No additional Rainmeter plugins or API keys are required. **Unload** the skin in Rainmeter Manage to remove the dashboard.

## Install the Chrome new tab

1. Download this repository as a ZIP, then extract it to a permanent folder.
2. Open `chrome://extensions`, enable **Developer mode**, choose **Load unpacked**, and select the `chrome-new-tab` folder containing `manifest.json`.
3. If you previously loaded the old extension, remove it first from `chrome://extensions` to avoid conflicting new-tab overrides. Your old extension's local shortcut edits will not automatically transfer to this copy.
4. Use Chrome's address bar for web searches. More details in [`chrome-new-tab/README.txt`](chrome-new-tab/README.txt).

## Notes

Made for a standard bottom Windows 11 taskbar, primary monitor. Windows 11 updates and taskbar icon density may affect individual Windhawk targets. Rainmeter is a separate click-through window that can appear over fullscreen apps; unload the skin from Rainmeter Manage when needed. The original scene images are included for this extension; they should not be redistributed separately without checking their rights.
