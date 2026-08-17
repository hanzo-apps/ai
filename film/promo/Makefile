# The signed-out promo, end to end.
#
#   make            compose, render, cut the stills, publish to public/
#
# `@hanzo/frame` resolves a film from one prefix, so the names below are the
# contract and not a preference: <BASE>.mp4 with a -first and a -last still.
# Change a name here and the fold goes blank.

BASE  := promo
OUT   := ../../public
HF    := npx --yes @hanzo/frames@0.7.83
# --no-browser-gpu forces SwiftShader. With host GPU auto-probing the capture
# calibration fails on this hardware and the render dies at frame 0 with
# "drawElement canvas not initialized" — a compositor problem, not a scene one.
FLAGS := --quality high --no-browser-gpu --workers 1

.PHONY: all compose render stills publish clean
all: publish

compose:
	node film.mjs

render: compose
	cd square && $(HF) render $(FLAGS) --output $(BASE).mp4

# Frame 0 is the poster the player opens on, so it has to be the frame the film
# opens on. The LAST frame is what a reduced-motion reader gets instead of the
# film — and because this one loops, it is the same picture as the first.
stills: render
	ffmpeg -nostdin -loglevel error -y -i square/$(BASE).mp4 -frames:v 1 -q:v 3 square/first.jpg
	ffmpeg -nostdin -loglevel error -y -sseof -0.1 -i square/$(BASE).mp4 -frames:v 1 -q:v 3 square/last.jpg

publish: stills
	cp square/$(BASE).mp4 $(OUT)/$(BASE).mp4
	cp square/first.jpg $(OUT)/$(BASE)-first.jpg
	cp square/last.jpg $(OUT)/$(BASE)-last.jpg

clean:
	rm -rf square
