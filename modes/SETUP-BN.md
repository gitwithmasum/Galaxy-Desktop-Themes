# Study / Coding / Gaming modes — Masum Galaxy Desktop

Windows 11-এর জন্য তিনটি desktop profile, **AutoHotkey v2** দিয়ে। এই mode switcher আগের F8 launcher-এর পাশাপাশি চলতে পারে। Rainmeter লাগবে না।

| Mode | Desktop | Shortcut button | Timer |
| --- | --- | --- | --- |
| Study | Moon | Google Calendar | 50 মিনিট |
| Coding | Futuristic Earth | VS Code | 25 মিনিট |
| Gaming | Mars | Windows Game Mode settings | নেই |

Mode বদলালে wallpaper বদলাবে; খোলা app বা browser tab বন্ধ হবে না। **Gaming mode চাপলেই Windows-এর Game Mode on/off হয় না**—প্যানেলের button settings খুলে দেয়, সেখান থেকে নিজে ঠিক করতে পারো। `NOTIFICATIONS` button Windows notification settings খোলে; Study timer নিজে থেকে Do Not Disturb চালু করে না। Windows-এর নিজস্ব Focus session চালু করলে Do Not Disturb স্বয়ংক্রিয়ভাবে চালু হতে পারে।

## Install

1. [AutoHotkey v2](https://www.autohotkey.com/) install করো।
2. ZIP extract করে `Masum-Galaxy-Modes.ahk` ও পাশের `wallpapers` folder **একসঙ্গে** স্থায়ী জায়গায় রাখো। `.ahk`-এ double-click করো।
3. **F9** চাপলে panel খুলবে। **Ctrl+Alt+1** Study, **Ctrl+Alt+2** Coding, **Ctrl+Alt+3** Gaming। Panel-এর mode button বা notification-area icon-এর menu থেকেও বদলাতে পারো।
4. Study/Coding-এর `START ... MIN` চাপলে timer চলে। Timer শেষ হলে beep ও message দেখাবে। অন্য mode বেছে নিলে timer বন্ধ হবে।
5. `RESTORE WALLPAPER` চাপলে প্রথমবার mode চালুর আগে যে ছবিটি সেট করা ছিল সেটি ফিরবে। আগে Windows Spotlight/slideshow থাকলে Windows-এর **Wallpaper & style** থেকে সেটি আবার বেছে নাও।

## Windows চালু হলেই চালাতে

**Win+R → `shell:startup` → Enter**। ওই folder-এ `.ahk` ফাইলের shortcut রাখো। আসল script ও wallpapers একই folder-এ রাখবে। সরাতে startup shortcut delete করো এবং notification area-তে AutoHotkey icon-এ right-click করে **Exit** বেছে নাও।

## নিজের মতো বদলাও

- অন্য background চাইলে `wallpapers/Study-Moon.jpg`, `Coding-Earth.jpg` বা `Gaming-Mars.jpg` একই filename রেখে নিজের ছবি দিয়ে বদলাতে পারো।
- VS Code standard path-এ না থাকলে `.ahk`-এর `OpenVSCode()`-এর `candidates` তালিকায় তোমার `Code.exe` path যোগ করো।
- F9 অন্য সফটওয়্যারে লাগে? Script-এর `F9::ToggleModePanel()` line-এ `F9` বদলে `^!m` দিলে **Ctrl+Alt+M** হবে।

Project: https://github.com/gitwithmasum/Galaxy-Desktop-Themes
