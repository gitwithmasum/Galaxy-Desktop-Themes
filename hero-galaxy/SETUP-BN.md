# Masum Hero Galaxy — New Tab + Animated Wallpaper

দশটি sci-fi emblem scene: Thor, Iron Man, Captain America, Hulk, Loki, Doctor Strange, Spider-Man, Black Panther, Vibranium এবং The Witcher। প্রতি ৫ সেকেন্ডে scene বদলায়; ধীরে zoom, fade ও তারার animation আছে। এখন প্রতিটি scene-এ আলাদা চলমান power effect আছে: Thor-এর lightning, Iron Man-এর repulsor, Captain-এর shield, Hulk-এর shockwave, Loki-এর illusion, Doctor Strange-এর portal, Spider-Man-এর web, Black Panther-এর kinetic claws, Vibranium core এবং Witcher-এর sword/Sign। এটি character portrait photo নয়: মূল চরিত্রের চেনা রঙ ও motif ব্যবহার করে তৈরি original vector emblem art। Galaxy landscape background আগের New Tab project থেকে এসেছে।

## Chrome New Tab

1. ZIP extract করে `hero-galaxy` folder স্থায়ী জায়গায় রাখুন।
2. Chrome-এ `chrome://extensions` খুলে **Developer mode** চালু করুন।
3. আগে ব্যবহার করা Galaxy New Tab extension-টি **off** বা **Remove** করুন; একসঙ্গে দুটি new-tab override সক্রিয় রাখা যাবে না।
4. **Load unpacked** চাপুন এবং `manifest.json` থাকা `hero-galaxy` folder বেছে নিন।
5. নতুন tab খুলুন। সার্চ বারে লিখে Enter চাপলে Google search খুলবে।

## Windows animated desktop wallpaper

1. [Lively Wallpaper](https://github.com/rocksdanister/lively) install ও চালু করুন।
2. Lively-এর **Add Wallpaper**-এ extracted `hero-galaxy/wallpaper.html` বেছে নিন। Import form-এ Title-এ **Masum Hero Galaxy** লিখে **OK** চাপুন।
3. Lively library-তে নতুন wallpaper-টি বেছে নিন। `wallpaper.html`, `app.js`, `style.css` এবং `scenes` folder একসঙ্গে রাখতে হবে।

Lively-তে fullscreen application চললে wallpaper pause করার option আছে। Remove করতে Lively-তে অন্য wallpaper বেছে নিন। Browser New Tab-এর জন্য Chrome Extensions থেকে extension off করুন। Animation Windows lock screen-এ চলে না।

ছবির জায়গায় আপনার নিজের portrait/photos বসাতে চাইলে `scenes/01-thor.jpg` থেকে `scenes/10-witcher.jpg` পর্যন্ত একই নাম রেখে replace করতে পারেন; 16:9 widescreen ছবি ভালো দেখাবে। SVG emblem-গুলোও একই base name দিয়ে বদলানো যায়।
