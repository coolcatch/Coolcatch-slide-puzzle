#!/usr/bin/env python3
"""
Fetch and optimize artwork images for Museum Tiles.

Downloads each image from Wikimedia Commons, resizes to 1000px wide
JPEG (quality 85), and saves to images/{id}.jpg.

Usage:
    pip3 install Pillow
    python3 scripts/fetch-images.py

Run from the repo root (folder containing index.html).
"""
import os
import sys
import urllib.request
from io import BytesIO

try:
    from PIL import Image
except ImportError:
    print("Pillow not installed. Run: pip3 install Pillow")
    sys.exit(1)

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(REPO_ROOT, "images")
TARGET_WIDTH = 1000
JPEG_QUALITY = 85
USER_AGENT = "MuseumTiles/1.0 (https://github.com/coolcatch/Coolcatch-slide-puzzle)"

# id -> original (non-thumbnail) Wikimedia Commons URL
SOURCES = {
    "mona-lisa": "https://upload.wikimedia.org/wikipedia/commons/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
    "winged-victory": "https://upload.wikimedia.org/wikipedia/commons/e/ee/Nike_of_Samothrake_Louvre_Ma2369_n2.jpg",
    "liberty-leading": "https://upload.wikimedia.org/wikipedia/commons/a/a7/Eug%C3%A8ne_Delacroix_-_La_libert%C3%A9_guidant_le_peuple.jpg",
    "venus-de-milo": "https://upload.wikimedia.org/wikipedia/commons/c/c2/Front_views_of_the_Venus_de_Milo.jpg",
    "wedding-at-cana": "https://upload.wikimedia.org/wikipedia/commons/e/e0/Paolo_Veronese_008.jpg",
    "water-lilies": "https://upload.wikimedia.org/wikipedia/commons/1/14/Claude_Monet_-_Water_Lilies_-_Google_Art_Project.jpg",
    "the-young-girls-at-piano": "https://upload.wikimedia.org/wikipedia/commons/7/73/Auguste_Renoir_-_Young_Girls_at_the_Piano_-_Google_Art_Project.jpg",
    "moulin-rouge": "https://upload.wikimedia.org/wikipedia/commons/2/27/Henri_de_Toulouse-Lautrec_-_At_the_Moulin_Rouge_-_Google_Art_Project.jpg",
    "paul-guillaume-novo-pilota": "https://upload.wikimedia.org/wikipedia/commons/4/46/Amedeo_Modigliani_-_Paul_Guillaume%2C_Novo_Pilota_-_Google_Art_Project.jpg",
    "apples-and-oranges": "https://upload.wikimedia.org/wikipedia/commons/5/5c/Paul_C%C3%A9zanne_-_Pommes_et_oranges_%28RMN%29.jpg",
    "the-west-wind": "https://upload.wikimedia.org/wikipedia/commons/6/66/Tom_Thomson_-_The_West_Wind_-_Google_Art_Project.jpg",
    "lake-and-mountains": "https://upload.wikimedia.org/wikipedia/commons/e/e6/Lawren_Harris_-_Lake_and_Mountains.jpg",
    "assiniboine-hunting-buffalo": "https://upload.wikimedia.org/wikipedia/commons/1/11/Kane_Assiniboine_hunting_buffalo.jpg",
    "the-garden-of-earthly-delights": "https://upload.wikimedia.org/wikipedia/commons/9/96/The_Garden_of_earthly_delights.jpg",
    "the-jack-pine": "https://upload.wikimedia.org/wikipedia/commons/d/d0/The_Jack_Pine%2C_by_Tom_Thomson.jpg",
    "starry-night": "https://upload.wikimedia.org/wikipedia/commons/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    "girl-with-pearl-earring": "https://upload.wikimedia.org/wikipedia/commons/0/0f/1665_Girl_with_a_Pearl_Earring.jpg",
    "great-wave": "https://upload.wikimedia.org/wikipedia/commons/a/a5/Tsunami_by_hokusai_19th_century.jpg",
    "the-kiss": "https://upload.wikimedia.org/wikipedia/commons/4/40/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg",
    "cafe-terrace-at-night": "https://upload.wikimedia.org/wikipedia/commons/2/21/Vincent_Willem_van_Gogh_-_Cafe_Terrace_at_Night_%28Yorck%29.jpg",
    "birth-of-venus": "https://upload.wikimedia.org/wikipedia/commons/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg",
    "night-watch": "https://upload.wikimedia.org/wikipedia/commons/5/5a/The_Night_Watch_-_HD.jpg",
    "sunday-on-la-grande-jatte": "https://upload.wikimedia.org/wikipedia/commons/7/7d/A_Sunday_on_La_Grande_Jatte%2C_Georges_Seurat%2C_1884.jpg",
    "the-scream": "https://upload.wikimedia.org/wikipedia/commons/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg",
    "arnolfini-portrait": "https://upload.wikimedia.org/wikipedia/commons/3/33/Van_Eyck_-_Arnolfini_Portrait.jpg",
}

os.makedirs(OUT_DIR, exist_ok=True)
print(f"Fetching {len(SOURCES)} artworks...\n")

ok = fail = 0
total_kb = 0

for artwork_id, url in SOURCES.items():
    out_path = os.path.join(OUT_DIR, f"{artwork_id}.jpg")
    if os.path.exists(out_path):
        kb = os.path.getsize(out_path) // 1024
        print(f"[{artwork_id}] already exists ({kb} KB), skipping")
        ok += 1
        total_kb += kb
        continue
    print(f"[{artwork_id}]")
    try:
        req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
        with urllib.request.urlopen(req, timeout=60) as r:
            data = r.read()
        img = Image.open(BytesIO(data)).convert("RGB")
        w, h = img.size
        if w > TARGET_WIDTH:
            new_h = int(h * TARGET_WIDTH / w)
            img = img.resize((TARGET_WIDTH, new_h), Image.LANCZOS)
        img.save(out_path, "JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True)
        kb = os.path.getsize(out_path) // 1024
        total_kb += kb
        print(f"  OK {img.size[0]}x{img.size[1]}  {kb} KB")
        ok += 1
    except Exception as e:
        print(f"  FAIL: {e}")
        fail += 1

print(f"\nDone. {ok} succeeded, {fail} failed. Total: {total_kb/1024:.1f} MB")
if fail:
    sys.exit(1)
