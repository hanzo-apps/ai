#!/usr/bin/env python3
"""Assemble public/favicon.ico (multi-resolution) from the PNG rasters that
scripts/gen-favicons.mjs renders from the canonical vector mark.

    python3 scripts/gen-favicon-ico.py

Regenerates favicon.ico so it always carries the current Hanzo mark, then
removes the intermediate 48px raster.
"""
import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUB = os.path.join(ROOT, "public")

# Largest source raster, downsampled by Pillow into each .ico frame.
src = Image.open(os.path.join(PUB, "icon-512.png")).convert("RGBA")
sizes = [(16, 16), (32, 32), (48, 48), (64, 64)]
src.save(os.path.join(PUB, "favicon.ico"), format="ICO", sizes=sizes)
print("wrote favicon.ico", sizes)

# apple-touch-icon must be opaque (no alpha) so iOS doesn't composite on black.
apple = Image.open(os.path.join(PUB, "apple-touch-icon.png")).convert("RGB")
apple.save(os.path.join(PUB, "apple-touch-icon.png"), format="PNG")
print("flattened apple-touch-icon.png to RGB")

intermediate = os.path.join(PUB, "favicon-48.png")
if os.path.exists(intermediate):
    os.remove(intermediate)
    print("removed intermediate favicon-48.png")
