# The three ways to run something, one film each, for cloud.hanzo.ai.
#
#   make            compose from the LIVE document, render, publish all three
#   make one K=vms
#
# WIDE ONLY: these embed through <Mockup>, which is aspect-video and resolves
# one prefix. There is no portrait consumer.

KINDS := containers vms sandboxes
OUT   := ../../public/workload
HF    := npx --yes @hanzo/frames@0.7.83
# --no-browser-gpu: with GPU auto-probe the capture calibration fails on this
# hardware and the render dies at frame 0.
FLAGS := --quality high --no-browser-gpu --workers 1

.PHONY: all compose clean $(KINDS)
all: compose $(KINDS)

# Re-composes from GET /v1/openapi.json every run, so a film cannot quote an
# operation the API has stopped serving.
compose:
	node film.mjs
	@mkdir -p $(OUT)

$(KINDS):
	cd $@/wide && $(HF) render $(FLAGS) --output $@.mp4
	ffmpeg -y -loglevel error -i $@/wide/$@.mp4 -vf "select=eq(n\,0)" -vframes 1 -q:v 3 $@/wide/first.jpg
	ffmpeg -y -loglevel error -sseof -0.1 -i $@/wide/$@.mp4 -update 1 -q:v 3 $@/wide/last.jpg
	cp $@/wide/$@.mp4    $(OUT)/$@-wide.mp4
	cp $@/wide/first.jpg $(OUT)/$@-wide-first.jpg
	cp $@/wide/last.jpg  $(OUT)/$@-wide-last.jpg
	@echo "  published $@"

one:
	node film.mjs $(K)
	@$(MAKE) $(K)

clean:
	rm -rf $(KINDS) .openapi.json
