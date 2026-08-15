# One film per layer, for the ten /products/<id> pages.
#
#   make              compose, render, cut stills, publish all ten
#   make one L=security
#
# WIDE ONLY, deliberately: a category page embeds through <Mockup>, which
# resolves `<base>.mp4` + `<base>-first.jpg` + `<base>-last.jpg` and is
# aspect-video. There is no portrait consumer, so rendering a tall master would
# double the time to produce a file nothing asks for.

LAYERS := web3 compute data network security infrastructure observe dev ai apps
OUT    := ../../public/layer
HF     := npx --yes @hanzo/frames@0.7.83
# --no-browser-gpu: with GPU auto-probe the capture calibration fails on this
# hardware and the render dies at frame 0 ("drawElement canvas not initialized").
FLAGS  := --quality high --no-browser-gpu --workers 1

.PHONY: all compose publish clean $(LAYERS)
all: compose $(LAYERS)

compose:
	node film.mjs
	@mkdir -p $(OUT)

# Each layer renders, cuts its two stills and publishes, so an interrupted run
# leaves every finished layer already published rather than nothing.
$(LAYERS):
	cd $@/wide && $(HF) render $(FLAGS) --output $@.mp4
	ffmpeg -y -loglevel error -i $@/wide/$@.mp4 -vf "select=eq(n\,0)" -vframes 1 -q:v 3 $@/wide/first.jpg
	ffmpeg -y -loglevel error -sseof -0.1 -i $@/wide/$@.mp4 -update 1 -q:v 3 $@/wide/last.jpg
	cp $@/wide/$@.mp4   $(OUT)/$@-wide.mp4
	cp $@/wide/first.jpg $(OUT)/$@-wide-first.jpg
	cp $@/wide/last.jpg  $(OUT)/$@-wide-last.jpg
	@echo "  published $@"

one:
	node film.mjs $(L)
	@$(MAKE) $(L)

clean:
	rm -rf $(LAYERS)
