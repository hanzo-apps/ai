# A mockup film for every product in the catalog.
#
#   make                    render whatever is out of date, into public/mock
#   make ONLY=cli,kms       just these products
#   make FORCE=1            re-render everything
#
# There is no product list here. The catalog at api.hanzo.ai answers which
# products exist, and film.mjs decides which surface each one is drawn as, so a
# product added or renamed upstream is picked up by the next run rather than by
# an edit here. A film is skipped when its inputs still hash to what produced
# it, which makes a re-run cheap and the output the same bytes.
#
# Nothing readable is drawn into these films — no headline, no tagline, no
# product name. That copy is DOM text on the page beside them, where it reflows,
# translates, and answers a screen reader. See components/product/Mockup.tsx.
#
# Three files per product, one prefix, the shape @hanzo/frame uses for the apex
# hero: <slug>-wide.mp4, <slug>-wide-first.jpg (frame 0, the poster) and
# <slug>-wide-last.jpg (the last frame, what a reduced-motion viewer is served).

OUT := ../../public/mock

.PHONY: all clean
all:
	node film.mjs --out $(OUT) $(if $(ONLY),--only $(ONLY)) $(if $(FORCE),--force)

clean:
	rm -rf $(OUT)
