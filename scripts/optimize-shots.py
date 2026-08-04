#!/usr/bin/env python3
"""
Turn the captured retina PNG plates into web-ready WebP, and emit the ONE data
module the site reads them through.

The plates are captured at device resolution — 2880x1800 (@2x desktop) and
1170x2532 (@3x phone) — which is right for capture and wrong for delivery: a
2880px PNG is megabytes, and no slot on the site is 1440 CSS px wide anyway. So
each plate is resized to the widest CSS slot it can actually land in, times its
dpr, and encoded as WebP.

Shots the manifest marks `ship: false` are NEVER written. That flag is the whole
safety interlock — a shot showing a billing notice instead of an answer, real
prod health, or a real repo inventory misrepresents the product or leaks
internals, so it must not be possible to ship one by forgetting.
"""
import json
import pathlib
import sys

from PIL import Image

SRC = pathlib.Path(sys.argv[1])
OUT_IMG = pathlib.Path(sys.argv[2])
OUT_TS = pathlib.Path(sys.argv[3])

# Widest CSS slot each plate lands in, times its capture dpr. The desktop frame
# is capped by the page's content column (~1200px), so 2400 is the honest
# ceiling and 2880 was 20% of bytes nobody could see. The phone plate is already
# exactly 390*3.
DESKTOP_W, DESKTOP_DPR = 2400, 2
MOBILE_W, MOBILE_DPR = 1170, 3
QUALITY = 82

manifest = json.loads((SRC / "manifest.json").read_text())
OUT_IMG.mkdir(parents=True, exist_ok=True)


def encode(png: pathlib.Path, target_w: int, dest: pathlib.Path):
    im = Image.open(png).convert("RGB")
    if im.width > target_w:
        h = round(im.height * target_w / im.width)
        im = im.resize((target_w, h), Image.LANCZOS)
    im.save(dest, "WEBP", quality=QUALITY, method=6)
    return im.width, im.height, dest.stat().st_size


entries, skipped, saved_before, saved_after = [], [], 0, 0

for shot in manifest["shots"]:
    if not shot.get("ship", False):
        # `review` is the editorial pass's reason and outranks the capture's own
        # `notes`, which describe the plate rather than the decision.
        skipped.append((shot["name"], shot.get("review") or shot.get("notes") or "flagged ship:false"))
        continue

    e = {
        "name": shot["name"],
        "category": shot.get("category"),
        "primary": bool(shot.get("primary")),
        "alt": shot["alt"],
        "url": shot.get("url"),
    }

    for key, plate_key, w, dpr in (
        ("desktop", "file_1440", DESKTOP_W, DESKTOP_DPR),
        ("mobile", "file_390", MOBILE_W, MOBILE_DPR),
    ):
        fn = shot.get(plate_key)
        if not fn:
            continue
        png = SRC / fn
        if not png.exists():
            print(f"  WARN missing plate {fn}", file=sys.stderr)
            continue
        dest = OUT_IMG / (pathlib.Path(fn).stem + ".webp")
        ow, oh, size = encode(png, w, dest)
        saved_before += png.stat().st_size
        saved_after += size
        e[key] = {"src": f"/shots/{dest.name}", "width": ow, "height": oh, "dpr": dpr}

    if "desktop" not in e:
        skipped.append((shot["name"], "no desktop plate"))
        continue
    entries.append(e)


def ts_plate(p):
    return (
        f"{{ src: '{p['src']}', width: {p['width']}, height: {p['height']}, dpr: {p['dpr']} }}"
    )


lines = [
    "/**",
    " * Product shots — the generated index the site reads screenshots through.",
    " *",
    " * GENERATED from the capture manifest by scripts/optimize-shots.py. Do not",
    " * hand-edit: the plates, their intrinsic dimensions and this file have to agree",
    " * or <ProductShot> reserves the wrong aspect ratio and the page shifts as the",
    " * bytes land.",
    " *",
    " * Shots the manifest flags `ship: false` are ABSENT here by construction — a",
    " * chat view whose bubble is a billing notice, the real prod status board, and a",
    " * real repo inventory each misrepresent the product or leak internals, so the",
    " * generator refuses to emit them rather than trusting anyone to remember.",
    " */",
    "",
    "export interface ShotPlate {",
    "  src: string",
    "  width: number",
    "  height: number",
    "  dpr: number",
    "}",
    "",
    "export interface ProductShotEntry {",
    "  name: string",
    "  /** The `/products/<category>` slug this shot illustrates, or 'hero'. */",
    "  category: string",
    "  primary: boolean",
    "  alt: string",
    "  desktop: ShotPlate",
    "  mobile?: ShotPlate",
    "}",
    "",
    "export const productShots: ProductShotEntry[] = [",
]

for e in entries:
    lines.append("  {")
    lines.append(f"    name: '{e['name']}',")
    lines.append(f"    category: '{e['category']}',")
    lines.append(f"    primary: {'true' if e['primary'] else 'false'},")
    alt = e["alt"].replace("\\", "\\\\").replace("'", "\\'")
    lines.append(f"    alt: '{alt}',")
    lines.append(f"    desktop: {ts_plate(e['desktop'])},")
    if "mobile" in e:
        lines.append(f"    mobile: {ts_plate(e['mobile'])},")
    lines.append("  },")

lines += [
    "]",
    "",
    "/** The primary shot for a `/products/<slug>` category, if one was captured. */",
    "export const shotForCategory = (slug: string): ProductShotEntry | undefined =>",
    "  productShots.find((s) => s.category === slug && s.primary)",
    "",
    "/**",
    " * The landing hero shot — a shot of the CONSOLE, and nothing else.",
    " *",
    " * No fallback on purpose. Falling back to 'the first primary' would drop a",
    " * category shot onto the front door, and the substitute that was actually",
    " * captured for this slot was cloud.hanzo.ai's own landing page — i.e. the very",
    " * page the hero sits on. An empty slot is honest; a page illustrated with",
    " * itself is not.",
    " */",
    "export const heroShot: ProductShotEntry | undefined =",
    "  productShots.find((s) => s.category === 'hero')",
    "",
]

OUT_TS.write_text("\n".join(lines))

print(f"shipped {len(entries)} shots -> {OUT_IMG}")
print(f"bytes {saved_before/1e6:.1f}MB PNG -> {saved_after/1e6:.1f}MB WebP "
      f"({100 - saved_after/max(saved_before,1)*100:.0f}% smaller)")
for name, why in skipped:
    print(f"  WITHHELD {name}: {why}")
