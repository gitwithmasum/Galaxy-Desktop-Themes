# Masum Galaxy · Android theme

Desktop-এর moon/nebula theme-এর সঙ্গে মিলিয়ে বানানো Android asset pack। **APK নয়**—wallpaper ছবিগুলো সরাসরি ব্যবহার করা যায়; app icon বদলাতে এমন launcher লাগবে যা নিজের ছবি থেকে icon নির্বাচন করতে দেয়।

## ফাইলগুলো

- `wallpapers/Galaxy-Home.jpg` — home screen; app icon ও dock-এর জন্য নিচে গাঢ় জায়গা। ZIP-এ বড় PNG কপিও আছে।
- `wallpapers/Galaxy-Lock.jpg` — lock screen; clock ও notification-এর জন্য ওপরে খালি জায়গা। ZIP-এ বড় PNG কপিও আছে।
- `wallpapers/Galaxy-Animated-Classic.mp4` — ZIP-এ আগের animated moon wallpaper; ফোনে video wallpaper সমর্থিত হলে ঐচ্ছিকভাবে ব্যবহার করো। এটি নতুন দুই ছবির চেয়ে আলাদা composition।
- `icons/` — ১৬টি নিজস্ব 512×512 PNG। App logo নকল না করে একই cyan/violet galaxy style-এ আঁকা।
- `Icon-Preview.jpg` — icon তালিকার preview।

## ফোনে সেট করো

1. ZIP ফোনে পাঠিয়ে extract করো। **Home screen-এর খালি জায়গায় long press → Wallpaper & style → Change wallpaper/Photos** থেকে `Galaxy-Home.jpg` বেছে home screen-এ লাগাও। `Galaxy-Lock.jpg` lock screen-এ লাগাও। ফোনভেদে menu-এর নাম সামান্য বদলাবে।
2. **Dark mode** চালু করো। Wallpaper-এর violet/cyan রঙ মানানসই accent বা color palette হিসেবে বেছে নাও, যদি ফোনে ওই option থাকে।
3. Home screen-এর layout সাজাও: উপর দিকে clock/weather widget, মাঝের moon-এর ওপর যতটা সম্ভব icon কম, নিচে চারটি shortcut—Phone, Messages, Browser, Camera। দ্বিতীয় পেজে Files, GitHub, AI, Maps, Music, Calendar রাখতে পারো।
4. নিজের PNG icon বসাতে ছবি থেকে custom icon সমর্থন করে এমন launcher-এর icon edit menu ব্যবহার করো। সাধারণত icon **long press → Edit → icon image → Gallery/Photos → ZIP-এর `icons` folder থেকে PNG**। তোমার launcher-এ Gallery option না থাকলে তার built-in icon theme ব্যবহার করো। Original app/icon মুছে যাবে না।
5. ফোন video wallpaper সমর্থন করলে `Galaxy-Animated-Classic.mp4` Gallery থেকে wallpaper হিসেবে try করতে পারো। Animation চালু থাকলে battery বেশি খরচ হতে পারে; static PNG সহজ বিকল্প।

**Samsung Galaxy:** Galaxy Themes-এর icon menu-তে নিজের PNG সরাসরি ব্যবহার করা যায় না। তাই `icons` folder-এর ছবি দিতে individual icon-image সমর্থন করে এমন launcher প্রয়োজন। Samsung-এর wallpaper guide: https://www.samsung.com/us/support/answer/ANS10001632/ ।

**Pixel/অন্যান্য Android:** Wallpaper & style থেকে নিজের ছবি বেছে নেওয়ার Google নির্দেশনা: https://support.google.com/pixelphone/answer/7289143 ।

## ফেরত যেতে

Wallpaper & style-এ আগের ছবি বেছে নাও। Custom launcher ব্যবহার করলে Android **Settings → Apps → Default apps → Home app** থেকে আগের launcher ফেরত নাও। ZIP বা unpacked asset মুছে ফেললে তোমার installed apps মুছবে না।

Source: https://github.com/gitwithmasum/Galaxy-Desktop-Themes
