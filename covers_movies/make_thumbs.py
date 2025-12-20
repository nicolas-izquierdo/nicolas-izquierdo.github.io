import os
from pathlib import Path
from PIL import Image, ImageOps

BASE = Path("covers_movies")
SRC_DIR = BASE
DST_DIR = BASE / "thumbs"

MAX_W, MAX_H = 240, 352
QUALITY = 75

DST_DIR.mkdir(parents=True, exist_ok=True)

def is_image(p: Path) -> bool:
    return p.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}

for p in SRC_DIR.iterdir():
    if not p.is_file():
        continue
    if p.parent.name == "thumbs":
        continue
    if not is_image(p):
        continue

    out = DST_DIR / (p.stem + ".jpg")

    try:
        img = Image.open(p)
        img = ImageOps.exif_transpose(img).convert("RGB")
        img.thumbnail((MAX_W, MAX_H), Image.Resampling.LANCZOS)

        canvas = Image.new("RGB", (MAX_W, MAX_H), (245, 245, 245))
        x = (MAX_W - img.width) // 2
        y = (MAX_H - img.height) // 2
        canvas.paste(img, (x, y))

        canvas.save(out, format="JPEG", quality=QUALITY, optimize=True, progressive=True)
        print("OK:", p.name, "->", out.as_posix())
    except Exception as e:
        print("FAIL:", p.name, e)
