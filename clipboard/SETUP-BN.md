# F10 Galaxy Clipboard

## চালু করুন

1. Windows-এ [AutoHotkey v2](https://www.autohotkey.com/) install করুন। আগের F8/F9 script চালিয়ে থাকলে সেটিই যথেষ্ট।
2. `Masum-Galaxy-Clipboard.ahk` ডাবল ক্লিক করুন। Tray-তে AutoHotkey icon থাকবে।
3. কিছু লেখা বা link **Ctrl+C** দিয়ে কপি করুন। **F10** চাপলে সাম্প্রতিক কপি করা ৩০টি text entry দেখাবে। সার্চ করে কোনো row-তে ডাবল ক্লিক বা **Enter** চাপলে আগের অ্যাপে paste হবে। **COPY ONLY** দিলে শুধু clipboard-এ যাবে।
4. কিছু compact keyboard-এ F10 ব্যবহার করতে **Fn+F10** চাপতে হয়।

## Privacy এবং controls

- কপি করা **text/link** রাখা হয়; ছবি/ফাইল রাখা হয় না। ২০,০০০ অক্ষরের বেশি লেখা বাদ যায়।
- History শুধু script-এর RAM-এ থাকে; disk বা GitHub-এ clipboard content লেখা হয় না। Script বন্ধ বা PC restart হলে history হারাবে।
- Password বা ব্যক্তিগত লেখা কপি করলে সেটিও history-তে আসতে পারে। Panel-এর **CLEAR ALL** history মুছে দেয়; Windows-এর চলতি clipboard আলাদাভাবে থাকে।
- বন্ধ করতে taskbar tray-তে AutoHotkey icon-এ right click করে **Exit** দিন। স্বয়ংক্রিয়ভাবে চালু করতে script-এর shortcut `Win+R` → `shell:startup` ফোল্ডারে রাখুন।
- এটি Windows-এর নিজস্ব **Win+V** clipboard history-এর বিকল্প panel; Win+V বদলায় না।

F8 Galaxy Launcher ও F9 Modes-এর সঙ্গে একই সময়ে চালানো যায়। কোনো PIN বা password script-এ রাখবেন না।
