# Masum Galaxy RGB — keyboard/mouse lighting guide

`preview.html` ব্রাউজারে খুলে পাঁচটি profile-এর রং ও চলমান preview দেখুন। `galaxy-rgb.json` রং ও brightness-এর তালিকা; এটি কোনো keyboard driver-এ সরাসরি import হয় না।

## Windows 11 Dynamic Lighting

1. RGB keyboard বা mouse সংযুক্ত রেখে **Settings → Personalization → Dynamic lighting** খুলুন।
2. আপনার ডিভাইস তালিকায় থাকলে **Use Dynamic Lighting on my devices** চালু করুন।
3. `Moonlight`/`Focus`-এর জন্য **Solid color** এবং guide-এর HEX রং দিন। `Nebula`-র জন্য **Breathing**; `Meteor`/`Gaming`-এর জন্য **Wave** বেছে নিন। আপনার Windows সংস্করণ বা ডিভাইসে সব effect/একাধিক রং নাও থাকতে পারে।
4. Brightness guide অনুযায়ী সাজান। চাইলে **Match my Windows accent color** ব্যবহার করুন।

**ONIKUMA G55:** এই মডেলের Dynamic Lighting বা custom software support নিশ্চিত করা যায়নি। Settings-এ ডিভাইস দেখা না গেলে এই file দিয়ে সেটি নিয়ন্ত্রণ করা যাবে না। কিবোর্ডের নিজস্ব lighting preset থাকলে onboard controls দিয়ে cyan/violet-এর কাছাকাছি preset বেছে নিতে পারেন; নির্দিষ্ট shortcut যাচাই ছাড়া এখানে দেওয়া হচ্ছে না। অন্যান্য software-এ রং বসাতে পারলে নিচের HEX ব্যবহার করুন।

| Profile | Best for | Effect | Brightness | Colors |
| --- | --- | --- | --- | --- |
| Moonlight | Daily use | Solid | 40% | `#54D8FF` |
| Nebula | Galaxy atmosphere | Slow breathing | 55% | `#44D8FF` → `#8065FF` → `#C067F5` |
| Meteor | Animated stars | Medium wave | 65% | `#152A69` → `#36D7FF` → `#9254FF` |
| Focus | Study/coding | Solid | 25% | `#638DFF` |
| Gaming | Games | Medium wave | 75% | `#12D4FC` → `#A244FF` |

Windows guide: https://support.microsoft.com/en-us/windows/hardware/input-devices/control-dynamic-lighting-devices-in-windows
