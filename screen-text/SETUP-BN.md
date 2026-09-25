# Ctrl+Alt+S — Galaxy Screen Text

এই shortcut স্ক্রিনে থাকা ছবি, PDF, video frame বা app থেকে লেখা কপি করতে PowerToys **Text Extractor** চালু করে। OCR করার কাজ PowerToys করে; AutoHotkey script শুধু `Ctrl+Alt+S` থেকে PowerToys-এর default `Win+Shift+T` shortcut পাঠায়।

## সেটআপ

1. Microsoft-এর [PowerToys installation guide](https://learn.microsoft.com/en-us/windows/powertoys/install) অনুসারে PowerToys install করুন।
2. PowerToys খুলে **Text Extractor** চালু করুন। Activation shortcut **Win+Shift+T** রাখুন। **PowerToys যেন background-এ চালু থাকে।**
3. [AutoHotkey v2](https://www.autohotkey.com/) install করে `Masum-Galaxy-Screen-Text.ahk` ডাবল ক্লিক করুন। আগের Galaxy launcher বা F10 Clipboard-এর জন্য AutoHotkey v2 থাকলে নতুন করে install করতে হবে না।
4. যে লেখা কপি করতে চান সেটি স্ক্রিনে দেখিয়ে **Ctrl+Alt+S** চাপুন। Mouse drag করে লেখার জায়গাটি নির্বাচন করুন। PowerToys লেখা চিনে **clipboard**-এ কপি করবে; **Ctrl+V** দিয়ে paste করুন। `Esc` চাপলে selection বন্ধ হবে।

Galaxy Clipboard F10 script চালু থাকলে নতুন কপি হওয়া লেখাটি তার history-তেও দেখা যাবে। ছবি বা video file নয়, শনাক্ত হওয়া text-ই history-তে যায়। ভুল OCR হলে paste করার পর যাচাই করে নিন। বাংলা text চিনতে Windows-এর প্রয়োজনীয় OCR language pack লাগতে পারে; PowerToys settings-এ language নির্বাচন করুন।

**কাজ না করলে:** প্রথমে নিজে **Win+Shift+T** চাপুন। যদি overlay না আসে, PowerToys-এর Text Extractor চালু আছে কি না এবং তার activation shortcut পাল্টেছে কি না দেখুন। চাইলে PowerToys-এর Text Extractor settings-এ সরাসরি **Ctrl+Alt+S** সেট করতে পারেন; সে ক্ষেত্রে এই `.ahk` script চালানোর দরকার নেই।

বন্ধ করতে tray-তে AutoHotkey icon right click → **Exit**। Windows চালুর সঙ্গে চাইলে script shortcut `Win+R` → `shell:startup`-এ রাখুন।

Microsoft documentation: https://learn.microsoft.com/en-us/windows/powertoys/text-extractor
