#!/usr/bin/env python3
"""
Fetch and optimize artwork images for Museum Tiles.

Reads the ARTWORKS array in index.html, downloads each image from its
Wikimedia Commons source, resizes to 1000px wide JPEG, and saves to
images/{id}.jpg.

Usage:
    python3 scripts/fetch-images.py

Requirements:
    pip3 install Pillow

Run from the repo root (the folder containing index.html).
"""
import os
import re
import sys
import urllib.request
from io import BytesIO

try:
    from PIL import Image
except ImportError:
    print("Pillow not installed. Run: pip3 install Pillow")
    sys.exit(1)

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INDEX_HTML = os.path.join(REPO_ROOT, "index.html")
OUT_DIR = os.path.join(REPO_ROOT, "images")
TARGET_WIDTH = 1000
JPEG_QUALITY = 85
USER_AGENT = "MuseumTiles/1.0 (https://github.com/coolcatch/Coolcatch-slide-puzzle)"

os.makedirs(OUT_DIR, exist_ok=True)

with open(INDEX_HTML, encoding="utf-8") as f:
    html = f.read()

pattern = re.compile(r'\{id:"([^"]+)"[^}]*?image:"([^"]+)"\}')
matches = pattern.findall(html)
print(f"Found {len(matches)} artworks to process\n")

def to_original(url):
    m = re.match(
        r"(https://upload\.wikimedia\.org/wikipedia/commons)/thumb/"
        r"([a-z0-9]/[a-z0-9]{2}/[^/]+)/\d+px-[^/]+$",
        url,
    )
    return f"{m.group(1)}/{m.group(2)}" if m else url

ok, fail = 0, 0
total_kb = 0

for artwork_id, url in matches:
    src = to_original(url)
    print(f"[{artwork_id}]")
    try:
        req = urllib.request.Request(src, headers={"User-Agent": USER_AGENT})
        with urllib.request.urlopen(req, timeout=60) as r:
            data = r.read()
        img = Image.open(BytesIO(data)).convert("RGB")
        w, h = img.size
        if w > TARGET_WIDTH:
            new_h = int(h * TARGET_WIDTH / w)
            img = img.resize((TARGET_WIDTH, new_h), Image.LANCZOS)
        out_path = os.path.join(OUT_DIR, f"{artwork_id}.jpg")
        img.save(out_path, "JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True)
        kb = os.path.getsize(out_path) // 1024
        total_kb += kb
        print(f"  OK {img.size[0]}x{img.size[1]}  {kb} KB  ->  images/{artwork_id}.jpg")
        ok += 1
    except Exception as e:
        print(f"  FAIL: {e}")
        fail += 1

print(f"\nDone. {ok} succeeded, {fail} failed. Total: {total_kb/1024:.1f} MB")
if fail:
    sys.exit(1)
