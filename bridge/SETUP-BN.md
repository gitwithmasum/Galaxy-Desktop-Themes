# Masum Galaxy Bridge — laptop ↔ Android phone

একই **private Wi-Fi**-তে laptop ও Android ফোন থেকে text, link, photo বা অন্য file আদানপ্রদানের জন্য Galaxy-styled local page। কোনো account বা cloud service লাগে না। Windows laptop-এ Python script চলতে থাকবে; ফোনে browser দিয়ে address খুলবে। ফোনের mobile data বা অন্য Wi-Fi-তে থাকলে এটি চলবে না।

## চালু করো

1. ZIP extract করো এবং `bridge` folder-এর সব ফাইল একই জায়গায় রাখো। Laptop-এ [Python 3.9+](https://www.python.org/downloads/) install থাকতে হবে।
2. Windows-এ `START-BRIDGE.bat` double-click করো। কালো window-তে **Phone: `http://...:8765/`** এবং প্রতিবার নতুন **6-digit PIN** দেখাবে; laptop-এর browser page-ও খুলবে।
3. Windows Firewall প্রথমবার জিজ্ঞেস করলে **Private networks**-এ Python-কে অনুমতি দাও। Public network-এ চালিও না।
4. ফোনটিকে laptop-এর একই Wi-Fi-তে রাখো। Chrome-এর address bar-এ কালো window-তে দেখানো **Phone** address লিখে যাও; PIN দিয়ে unlock করো। Laptop browser-এও একই PIN দাও।
5. যেকোনো ডিভাইস থেকে লেখা/link পাঠাও বা **25 MB পর্যন্ত** একটি file upload করো। অন্য ডিভাইসে পেজটি কয়েক সেকেন্ডের মধ্যে আপডেট হবে। File-এর **DOWNLOAD** button দিয়ে save করো।

**ফোনের Home screen-এ shortcut:** Chrome-এ Bridge page খোলা অবস্থায় তিন বিন্দুর menu → **Add to Home screen** / **Create shortcut**। Laptop বন্ধ থাকলে বা bridge window বন্ধ করলে shortcut খুললেও server পাওয়া যাবে না।

## ফাইল কোথায় যায়?

Laptop-এর `C:\Users\<your-user>\Masum-Galaxy-Bridge\files` folder-এ uploaded file থাকে এবং `items.json`-এ note ও file তালিকা থাকে। একই PIN জানা অন্য ডিভাইস shared item দেখতে ও মুছতে পারবে। **DELETE** চাপলে Bridge-এর তালিকা থেকে item সরে যায়; uploaded file হলে laptop-এ রাখা তার copy-ও মুছে যায়। Download করা অন্য copy মোছে না।

## সংযোগ না হলে

- দুই ডিভাইস একই private Wi-Fi-তে আছে কি না যাচাই করো; guest Wi-Fi-তে device isolation থাকলে তারা একে অপরকে দেখতে পায় না।
- কালো window খোলা রাখো। নতুন করে চালু করলে **নতুন PIN** নিতে হবে। Laptop-এর local IP বদলালে **Phone** address-ও বদলাতে পারে।
- Windows Firewall-এ Python-কে **Private** network-এ allow করো; port 8765 অন্য software ব্যবহার করলে bridge চালু হবে না।
- ফোনে VPN চালু থাকলে সাময়িক বন্ধ করে আবার চেষ্টা করো।

## নিরাপত্তা ও বন্ধ করা

এটি **local HTTP**—যোগাযোগ encrypted নয়। নিজের বিশ্বাসযোগ্য private Wi-Fi-তেই ব্যবহার করো; public hotspot বা সংবেদনশীল password/financial নথি পাঠিও না। PIN স্ক্রিনে অন্যকে দেখিও না। Link internet-এ খোলা যেতে পারে, কিন্তু Bridge নিজে তোমার file cloud-এ পাঠায় না।

Bridge বন্ধ করতে laptop-এর কালো window-তে **Ctrl+C** চাপো। `START-BRIDGE.bat` startup-এ নিজে থেকে যোগ করা হয় না। সব জমা file সরাতে আগে প্রয়োজনীয়গুলি অন্যত্র copy করো, তারপর `Masum-Galaxy-Bridge` folder delete করো।

GitHub: https://github.com/gitwithmasum/Galaxy-Desktop-Themes
