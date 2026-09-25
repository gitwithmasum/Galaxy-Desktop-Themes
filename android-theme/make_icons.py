"""Draw the original Galaxy glyph icons as transparent 512 px PNGs."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter
import math

OUT = Path(__file__).parent / "icons"
OUT.mkdir(exist_ok=True)
N = 512
CYAN = (109, 231, 255, 255)
WHITE = (223, 244, 255, 255)
VIOLET = (161, 119, 255, 255)


def icon(name):
    im = Image.new("RGBA", (N, N))
    halo = Image.new("RGBA", (N, N))
    h = ImageDraw.Draw(halo)
    h.ellipse((62, 62, 450, 450), outline=(78, 202, 255, 170), width=12)
    im.alpha_composite(halo.filter(ImageFilter.GaussianBlur(28)))
    d = ImageDraw.Draw(im)
    d.rounded_rectangle((60, 60, 452, 452), radius=116, fill=(8, 17, 40, 245), outline=(59, 110, 158, 230), width=4)
    d.arc((80, 80, 432, 432), 195, 318, fill=CYAN, width=12)
    d.arc((80, 80, 432, 432), 20, 135, fill=VIOLET, width=9)
    d.ellipse((110, 105, 119, 114), fill=WHITE)
    d.ellipse((389, 371, 397, 379), fill=WHITE)
    return im, d


def line(d, points, color=CYAN, width=20, joint="curve"):
    d.line(points, fill=color, width=width, joint=joint)


def draw_glyph(name, d):
    if name == "phone":
        line(d, [(188, 191), (183, 238), (207, 288), (254, 326), (311, 332)], CYAN, 27)
        line(d, [(196, 172), (168, 199), (194, 228), (221, 205)], WHITE, 21)
        line(d, [(295, 304), (322, 281), (352, 307), (321, 344)], WHITE, 21)
    elif name == "messages":
        d.rounded_rectangle((150, 168, 362, 326), 37, outline=CYAN, width=20)
        line(d, [(203, 325), (181, 357), (265, 326)], CYAN, 17)
        for x in (211, 256, 301): d.ellipse((x-8, 239, x+8, 255), fill=WHITE)
    elif name == "browser":
        d.ellipse((161, 161, 351, 351), outline=CYAN, width=16)
        d.arc((212, 161, 300, 351), 90, 270, fill=WHITE, width=14)
        d.arc((212, 161, 300, 351), 270, 90, fill=WHITE, width=14)
        line(d, [(164, 256), (348, 256)], WHITE, 14)
    elif name == "camera":
        d.rounded_rectangle((143, 192, 369, 331), 24, outline=CYAN, width=18)
        d.ellipse((219, 218, 296, 295), outline=WHITE, width=17)
        d.rounded_rectangle((184, 166, 239, 194), 8, fill=CYAN)
        d.ellipse((321, 218, 333, 230), fill=VIOLET)
    elif name == "gallery":
        d.rounded_rectangle((150, 164, 362, 348), 19, outline=CYAN, width=18)
        d.ellipse((189, 189, 220, 220), fill=WHITE)
        line(d, [(169, 319), (228, 250), (268, 291), (301, 245), (347, 306)], WHITE, 16)
    elif name == "music":
        line(d, [(247, 209), (330, 183), (330, 295)], CYAN, 19)
        line(d, [(247, 209), (247, 321)], CYAN, 19)
        d.ellipse((189, 302, 256, 346), fill=WHITE)
        d.ellipse((274, 277, 340, 322), fill=WHITE)
    elif name == "settings":
        d.ellipse((183, 183, 329, 329), outline=CYAN, width=19)
        d.ellipse((228, 228, 284, 284), outline=WHITE, width=17)
        for i in range(8):
            a = i * math.pi / 4
            line(d, [(256+math.cos(a)*81,256+math.sin(a)*81),(256+math.cos(a)*110,256+math.sin(a)*110)], VIOLET, 18)
    elif name == "files":
        d.rounded_rectangle((144, 202, 368, 338), 17, outline=CYAN, width=18)
        line(d, [(152, 207), (199, 207), (222, 183), (316, 183)], CYAN, 17)
        line(d, [(186, 260), (324, 260)], WHITE, 13)
    elif name == "github":
        d.arc((174, 189, 338, 338), 0, 180, fill=CYAN, width=19)
        line(d, [(178, 266), (178, 215), (212, 184), (228, 210)], CYAN, 18)
        line(d, [(334, 266), (334, 215), (300, 184), (284, 210)], CYAN, 18)
        d.ellipse((216, 258, 228, 270), fill=WHITE)
        d.ellipse((284, 258, 296, 270), fill=WHITE)
        line(d, [(256, 308), (256, 344)], WHITE, 17)
    elif name == "ai":
        d.rounded_rectangle((145, 174, 367, 321), 31, outline=CYAN, width=18)
        line(d, [(203, 322), (184, 354), (260, 320)], CYAN, 16)
        line(d, [(256, 200), (272, 238), (310, 254), (272, 269), (256, 308), (240, 269), (201, 254), (240, 238), (256, 200)], WHITE, 11)
    elif name == "video":
        d.rounded_rectangle((141, 186, 371, 326), 34, outline=CYAN, width=19)
        d.polygon([(230, 214), (230, 298), (301, 256)], fill=WHITE)
    elif name == "maps":
        line(d, [(256, 353), (194, 262)], CYAN, 19)
        line(d, [(256, 353), (318, 262)], CYAN, 19)
        d.ellipse((187, 150, 325, 288), outline=CYAN, width=18)
        d.ellipse((236, 198, 276, 238), fill=WHITE)
    elif name == "calendar":
        d.rounded_rectangle((156, 179, 356, 346), 15, outline=CYAN, width=18)
        line(d, [(158, 227), (355, 227)], WHITE, 14)
        line(d, [(208, 158), (208, 203)], VIOLET, 16)
        line(d, [(306, 158), (306, 203)], VIOLET, 16)
        for x in (210, 255, 300):
            for y in (268, 309): d.ellipse((x-7, y-7, x+7, y+7), fill=WHITE)
    elif name == "clock":
        d.ellipse((158, 158, 354, 354), outline=CYAN, width=18)
        line(d, [(256, 203), (256, 259), (299, 281)], WHITE, 17)
        d.ellipse((247, 247, 265, 265), fill=VIOLET)
    elif name == "store":
        d.polygon([(183, 151), (183, 361), (352, 256)], outline=CYAN)
        line(d, [(185, 156), (185, 356), (348, 256), (185, 156)], CYAN, 17)
        line(d, [(185, 156), (278, 256), (185, 356)], WHITE, 13)
    elif name == "terminal":
        d.rounded_rectangle((141, 182, 371, 329), 19, outline=CYAN, width=18)
        line(d, [(175, 225), (210, 255), (175, 286)], WHITE, 17)
        line(d, [(238, 287), (327, 287)], VIOLET, 16)


for name in ("phone", "messages", "browser", "camera", "gallery", "music", "settings", "files", "github", "ai", "video", "maps", "calendar", "clock", "store", "terminal"):
    im, drawer = icon(name)
    draw_glyph(name, drawer)
    im.save(OUT / f"{name}.png")
print(f"Created {len(list(OUT.glob('*.png')))} icons in {OUT}")
