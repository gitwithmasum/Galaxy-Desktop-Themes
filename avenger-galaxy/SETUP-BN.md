# Masum Avenger Galaxy — New Tab + Animated Wallpaper

দশটি galaxy scene: Thor, Iron Man, Captain America, Hulk, Loki, Doctor Strange, Spider-Man, Black Panther, Vibranium এবং The Witcher। প্রতি ৫ সেকেন্ডে scene বদলায়; ধীরে zoom, fade ও তারার animation আছে। এতে character portrait বা power-effect overlay নেই। ছবিগুলো আগের Galaxy New Tab-এর মহাকাশের দৃশ্য; প্রতিটি দৃশ্যের সঙ্গে চরিত্রের নাম দেখানো হয়।

## Chrome New Tab

1. ZIP extract করে `avenger-galaxy` folder স্থায়ী জায়গায় রাখুন।
2. Chrome-এ `chrome://extensions` খুলে **Developer mode** চালু করুন।
3. আগে ব্যবহার করা Galaxy New Tab extension-টি **off** বা **Remove** করুন; একসঙ্গে দুটি new-tab override সক্রিয় রাখা যাবে না।
4. **Load unpacked** চাপুন এবং `manifest.json` থাকা `avenger-galaxy` folder বেছে নিন।
5. Chrome bookmark access চাইলে **Allow** দিন। নতুন tab-এ **YOUR APPS** চাপলে app-style bookmark grid খুলবে। Folder tile খুলে ভিতরের bookmark দেখতে পারবেন; ওপরের search সব folder-এর bookmark খুঁজবে। `Esc` বা বাইরে click করলে বন্ধ হবে। Bookmark tile click করলে বর্তমান tab-এ site খুলবে; Ctrl/Shift দিয়ে click করলে নতুন tab-এ খুলবে। আপনার bookmark Chrome-এই থাকে।
6. নতুন tab খুলুন। Futuristic Search Console-এ লিখে **Enter** চাপুন। Google, Bing বা DuckDuckGo button দিয়ে engine বেছে নিতে পারবেন। পছন্দের engine browser-এ মনে থাকবে।
7. Keyboard থেকে `/` চাপলে search focus হবে; search-এর শুরুতে `/g`, `/b`, `/d` দিলে ঐ একবারের জন্য যথাক্রমে Google, Bing, DuckDuckGo ব্যবহার হবে। যেমন `/b iron man`। Voice icon দেখা গেলে click করে browser-কে microphone permission দিয়ে কথা বলতে পারবেন। Voice recognition Chrome-এর service ব্যবহার করতে পারে; sensitive কথা বলবেন না।

## Search result tab

Google, Bing বা DuckDuckGo-তে search result খুললে নিচের ডান দিকে ছোট **Galaxy View** panel এবং ওপরের ধার জুড়ে চলমান cyan/violet accent দেখাবে। **MINIMIZE** দিয়ে ছোট করুন, **×** দিয়ে সেই tab থেকে সরিয়ে দিন। আসল result/link একই থাকে। Chrome প্রথমবার extension-এর জন্য Google, Bing ও DuckDuckGo page-এ access দেখাতে পারে—এই content script শুধু overlay ও search box-এর focus glow যোগ করে; search query কোনো নতুন server-এ পাঠায় না।

## Windows animated desktop wallpaper

1. [Lively Wallpaper](https://github.com/rocksdanister/lively) install ও চালু করুন।
2. Lively-এর **Add Wallpaper**-এ extracted `avenger-galaxy/wallpaper.html` বেছে নিন। Import form-এ Title-এ **Masum Avenger Galaxy** লিখে **OK** চাপুন।
3. Lively library-তে নতুন wallpaper-টি বেছে নিন। `wallpaper.html`, `app.js`, `style.css` এবং `scenes` folder একসঙ্গে রাখতে হবে।

Lively-তে fullscreen application চললে wallpaper pause করার option আছে। Remove করতে Lively-তে অন্য wallpaper বেছে নিন। Browser New Tab-এর জন্য Chrome Extensions থেকে extension off করুন। Animation Windows lock screen-এ চলে না।

ছবির জায়গায় আপনার নিজের portrait/photos বসাতে চাইলে `scenes/01-thor.jpg` থেকে `scenes/10-witcher.jpg` পর্যন্ত একই নাম রেখে replace করতে পারেন; 16:9 widescreen ছবি ভালো দেখাবে। 

Search result page নির্বাচিত engine-এর নিজস্ব page-এ খুলবে। এই extension শুধু New Tab-এর search interface সাজায়; Google/Bing-এর result page-এর style বদলায় না।

আগে extension load করে থাকলে `chrome://extensions` থেকে **Reload** চাপুন। নতুন `bookmarks` permission-এর prompt এলে অনুমতি দিন।
