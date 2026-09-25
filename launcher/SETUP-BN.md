# Masum Galaxy Launcher — setup

এটি Windows 11-এর জন্য একটি **F8 one-key launcher**। Rainmeter বা Windhawk লাগে না।

1. [AutoHotkey](https://www.autohotkey.com/) থেকে **v2** ইনস্টল করো। v1 দিয়ে স্ক্রিপ্ট চলবে না।
2. ZIP extract করে `Masum-Galaxy-Launcher.ahk`-এ double-click করো। Taskbar-এর notification area-তে AutoHotkey icon থাকবে।
3. **F8** চাপো। নাম লিখে app বা link খুঁজে নাও। **↑/↓** দিয়ে ফল বদলাও, **Enter** দিয়ে খোলো, **Esc** দিয়ে বন্ধ করো। ফলের ওপর ক্লিক করলেও খুলবে।
4. Launcher-এ Start Menu-র app shortcut-গুলো নিজে থেকে আসে। Chrome-এর মতো app না দেখালে Windows Start Menu-তে সেই app-এর shortcut আছে কি না দেখে নাও।
5. কিছু না মিললে **Search web for** ফলটি দেখাবে। **Windows file search** বেছে নিলে Windows Search খুলবে, সেখানে ফাইলের নাম লিখতে পারো।

## নিজের shortcut যোগ করা

`Masum-Galaxy-Launcher.ahk` Notepad-এ খুলে `BuildItems()`-এর শুরুতে `AllItems := [` তালিকায় এই ধরনের আরেকটি line যোগ করো:

```ahk
{name: "My project", type: "FOLDER", target: "C:\Users\YourName\Projects"},
{name: "My site", type: "WEB", target: "https://example.com/"},
```

নিজের Windows user name দিয়ে folder path পাল্টাও। ফাইল save করার পর notification area-তে সবুজ AutoHotkey icon-এ right-click করে **Reload Script** বেছে নাও। F8 অন্য software-এ প্রয়োজন হলে `F8::TogglePalette()` line-এ `F8` বদলে `^!g` করলে **Ctrl+Alt+G** হবে।

## Windows চালু হলেই launcher চালু করতে

**Win+R** → `shell:startup` → Enter। ওই folder-এ `.ahk` ফাইলটির **shortcut** রাখো। আসল `.ahk` ফাইলটি স্থায়ী জায়গায় রাখবে।

## বন্ধ বা সরাতে

Notification area-তে AutoHotkey icon-এ right-click → **Exit**। স্থায়ীভাবে বন্ধ করতে `shell:startup`-এর shortcut মুছে ফেলো; তারপর `.ahk` ফাইল delete করতে পারো।

GitHub: https://github.com/gitwithmasum/Galaxy-Desktop-Themes
