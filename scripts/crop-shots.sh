#!/usr/bin/env bash
# Crop a film to the window it is a film OF.
#
# The plates are rendered into a fixed 1920x1080 frame whatever the window inside
# them measures, so most of them carry a band of page-black around the chrome:
# public/workload at 1480x700 in 1920x1080 is 46% of the pixels, public/layer at
# 1180x696 is 39%. That padding is invisible while it agrees with the box the
# site draws — and the site draws `aspect-video`, so it did agree, and the film
# simply rendered small in the middle of its own panel with dead space on four
# sides. Nobody could point at a wrong number; the picture was just adrift.
#
# So the ASSET stops carrying the padding, and <Mockup> stops imposing a shape.
# Between them the film is exactly as big as the window it shows.
#
# ffmpeg finds the box itself (cropdetect), which is what makes this safe to run
# over a directory nobody has audited: a film that is already tight reports the
# full frame and is skipped. Running it twice is therefore a no-op, and running
# it on tomorrow's render needs no list of what has been done.
#
# The two stills travel with the film. They are the poster and the reduced-motion
# ending, rendered from the same plate at the same 1920x1080, so a crop applied
# to one and not the others is a jump on first frame.
#
#   scripts/crop-shots.sh public/workload public/layer
#   scripts/crop-shots.sh                     # every -wide.mp4 under public/
set -euo pipefail
cd "$(dirname "$0")/.."

# Below this, leave it alone. public/mock renders its window edge-to-edge and
# reports 1856x1080 — 32px of rounding on each side, which computes to exactly 4%
# and is the reason this number is 6 rather than 4: at 4 the guard re-encodes 84
# binaries to shave a margin nobody can see. The real bands are far above it —
# public/layer 39%, public/workload 51% — so 6 separates "rendered with padding"
# from "rounded" without needing a list of which directory is which.
MIN_GAIN=6

targets=()
if [ $# -gt 0 ]; then for d in "$@"; do while IFS= read -r f; do targets+=("$f"); done < <(find "$d" -name '*-wide.mp4' | sort); done
else while IFS= read -r f; do targets+=("$f"); done < <(find public -name '*-wide.mp4' | sort); fi

cropped=0; skipped=0
for mp4 in "${targets[@]}"; do
  read -r W H < <(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 "$mp4" | tr ',' ' ')
  # Seek past any opening fade: a frame that is still mostly black reads as all
  # padding and would crop the film down to nothing.
  rect=$(ffmpeg -hide_banner -ss 1.5 -i "$mp4" -vf cropdetect=24:2:0 -frames:v 24 -f null - 2>&1 | grep -o 'crop=[0-9:]*' | tail -1 || true)
  [ -n "$rect" ] || { printf '  %-46s no crop detected, left alone\n' "$mp4"; skipped=$((skipped+1)); continue; }
  IFS=: read -r cw ch cx cy <<<"${rect#crop=}"

  gain=$(( 100 - (cw * ch * 100) / (W * H) ))
  if [ "$gain" -lt "$MIN_GAIN" ]; then
    printf '  %-46s already tight (%s%% padding)\n' "$mp4" "$gain"; skipped=$((skipped+1)); continue
  fi

  ffmpeg -hide_banner -loglevel error -y -i "$mp4" \
    -vf "crop=$cw:$ch:$cx:$cy" -c:v libx264 -crf 20 -preset slow \
    -pix_fmt yuv420p -an -movflags +faststart "$mp4.tmp.mp4"
  mv "$mp4.tmp.mp4" "$mp4"

  for still in "${mp4%.mp4}-first.jpg" "${mp4%.mp4}-last.jpg"; do
    [ -f "$still" ] || continue
    ffmpeg -hide_banner -loglevel error -y -i "$still" -vf "crop=$cw:$ch:$cx:$cy" -q:v 3 "$still.tmp.jpg"
    mv "$still.tmp.jpg" "$still"
  done

  printf '  %-46s %sx%s -> %sx%s  (%s%% padding removed)\n' "$mp4" "$W" "$H" "$cw" "$ch" "$gain"
  cropped=$((cropped+1))
done
echo "  cropped $cropped, left alone $skipped"
