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
#
# The rendered films are COMMITTED, under public/mock. `pnpm build` copies
# public/ and never runs a renderer, so a fresh clone builds a site whose films
# all resolve, with no Chrome and no ffmpeg on the runner and nothing added to
# build time. Run this target when the catalog changes or a surface is edited,
# and commit what it writes. e2e/gates/mock.spec.ts asserts, against the export
# that ships, that every slug a page wires has all three of its files — an
# uncommitted render fails there rather than in a visitor's browser.

OUT := ../../public/mock

.PHONY: all clean
all:
	node film.mjs --out $(OUT) $(if $(ONLY),--only $(ONLY)) $(if $(FORCE),--force)

clean:
	rm -rf $(OUT)
