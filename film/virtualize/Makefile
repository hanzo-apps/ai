# The ten-layer platform film, end to end.
#
#   make            compose, render both frames, cut the stills, publish to public/
#
# `@hanzo/frame` resolves six files from one prefix, so the names below are the
# contract and not a preference: <BASE>-{tall,wide}.mp4 and, for each, a -first
# and a -last still. Change a name here and the section goes blank.

BASE  := cloud-virtualize
OUT   := ../../public
# --no-browser-gpu forces SwiftShader. With host GPU auto-probing, capture
# calibration fails on this hardware and the render dies at frame 0 with
# "drawElement canvas not initialized" — a compositor problem, not a scene one.
HF    := npx --yes @hanzo/frames@0.7.83
FLAGS := --quality high --no-browser-gpu --workers 1

.PHONY: all compose render stills publish clean
all: publish

# One generator writes both frames from the catalog — see the head of film.mjs.
compose:
	node film.mjs

render: compose
	cd tall && $(HF) render $(FLAGS) --output virtualize-tall.mp4
	cd wide && $(HF) render $(FLAGS) --output virtualize-wide.mp4

# Frame 0 is the poster a motion viewer sees before the player takes over, so it
# has to be the frame the film opens on. The LAST frame is what a reduced-motion
# viewer is served instead of the film, so it has to be the whole stack standing
# — `-sseof` seeks from the end, the only way to name it without knowing the
# frame count.
# stills DEPENDS on render, or `make` walks all -> publish -> stills, re-cuts
# jpgs from whatever mp4 is already on disk and publishes a stale film as success.
stills: render
	ffmpeg -y -loglevel error -i tall/virtualize-tall.mp4 -vf "select=eq(n\,0)" -vframes 1 -q:v 3 tall/first.jpg
	ffmpeg -y -loglevel error -sseof -0.1 -i tall/virtualize-tall.mp4 -update 1 -q:v 3 tall/last.jpg
	ffmpeg -y -loglevel error -i wide/virtualize-wide.mp4 -vf "select=eq(n\,0)" -vframes 1 -q:v 3 wide/first.jpg
	ffmpeg -y -loglevel error -sseof -0.1 -i wide/virtualize-wide.mp4 -update 1 -q:v 3 wide/last.jpg

publish: stills
	cp tall/virtualize-tall.mp4 $(OUT)/$(BASE)-tall.mp4
	cp wide/virtualize-wide.mp4 $(OUT)/$(BASE)-wide.mp4
	cp tall/first.jpg $(OUT)/$(BASE)-tall-first.jpg
	cp tall/last.jpg  $(OUT)/$(BASE)-tall-last.jpg
	cp wide/first.jpg $(OUT)/$(BASE)-wide-first.jpg
	cp wide/last.jpg  $(OUT)/$(BASE)-wide-last.jpg
	@ls -la $(OUT)/$(BASE)-*

clean:
	rm -rf tall wide
