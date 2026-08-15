// The Open AI Cloud as it is actually shaped: ten layers, integrated, Apps on top.
//
//   node film.mjs     writes tall/index.html and wide/index.html
//
// EVERY WORD IN THIS FILM IS THE CATALOG'S. The ten layers, their labels, their
// order and the product names on each slab are read from lib/data/catalog.json,
// which `scripts/sync-catalog.mjs` re-fetches from commerce on every build. So
// the film cannot disagree with the mega-menu, the /products pages or the
// pricing beside it — and when a product lands, it appears here on the next
// render with nothing to edit.
//
// DEPTH IS ITS OWN FACT, and the catalog does not carry it. The catalog's
// `order` is the MENU order — what the Products dropdown shows first, which is
// AI because AI is the headline. A stack asks a different question: what does
// each layer STAND ON. Reading the menu order as depth put settlement ninth and
// AI at the bottom, which is not how any of it is built.
//
// So the depth is declared once, here, in STACK — and only the depth. Labels,
// names and membership stay the catalog's. One new fact, stated in one place,
// rather than a second taxonomy.
//
// The chain is the ground: value settles on it, and everything above it is
// something we run. Compute, data and network are the substrate over that;
// security and the deploy plane are how it is operated; observe and dev are how
// it is watched and driven; AI is what it is for; apps are what a person opens.
// Apps is the crown — the layer someone touches, standing on nine they do not
// have to think about.
//
// No count appears anywhere. Membership is whatever answered at build time, so
// a number painted into a film is a fact about that morning that outlives it.
//
// Two masters from one generator, because a phone is 0.56 wide-to-tall and a
// laptop 1.78, and @hanzo/frame paints `object-fit: cover` edge to edge.

import { mkdirSync, writeFileSync, copyFileSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const FPS = 30;
// The film's length, declared on #root where the renderer reads it. The GSAP
// timeline below must END at or before this, or the tail is cut.
const DUR = 10.2;

// ── the product, as the catalog states it ──────────────────────────────────
const catalog = JSON.parse(
  readFileSync(join(here, "..", "..", "lib", "data", "catalog.json"), "utf8"),
);

/** Depth, base to crown. The one fact the catalog does not state. */
const STACK = [
  "web3",           // the chain everything settles on
  "compute",
  "data",
  "network",
  "security",
  "infrastructure", // the deploy plane — PaaS is a layer, not the platform
  "observe",
  "dev",
  "ai",
  "apps",           // what a person opens
];

const LAYERS = STACK.map((id) => {
  const c = catalog.categories.find((x) => x.id === id);
  if (!c) throw new Error(`STACK names ${id}, which the catalog does not carry`);
  return c;
})
  .map((c) => ({
    id: c.id,
    label: c.label,
    // The products the catalog files under this category, in ITS order. A slab
    // shows what fits; the film says "and more" nowhere, because a slab that is
    // visibly a sample does not need to apologise for being one.
    items: catalog.products
      .filter((p) => p.category === c.id)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((p) => p.name),
  }));

if (LAYERS.length !== 10) {
  // Ten slabs is the composition — the geometry below divides the column by it.
  throw new Error(`the stack is composed for ten layers; STACK names ${LAYERS.length}`);
}
// A category the catalog carries and STACK forgets would be a layer this film
// silently omits, which is worse than a crooked one.
for (const c of catalog.categories) {
  if (!STACK.includes(c.id)) throw new Error(`the catalog carries ${c.id}, which STACK does not place`);
}

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// ── the two frames ─────────────────────────────────────────────────────────
// `col` is the stack's width and `top` where its crown sits. The slab pitch is
// derived from the column so the ten always fill the same optical block in both
// masters, and `chips` is how many product names a slab can hold at that width
// before the row wraps and the slab stops reading as one band.
const FRAMES = {
  tall: { w: 1080, h: 1920, col: 820, top: 300, slab: 132, gap: 14, base: 21, chips: 4 },
  wide: { w: 1920, h: 1080, col: 1180, top: 70, slab: 80, gap: 8, base: 17, chips: 6 },
};

const slabs = (f) =>
  LAYERS.map((L, i) => {
    // i = 0 is the catalog's first row and sits at the BASE, so the crown is
    // drawn from the far end of the column.
    const fromTop = LAYERS.length - 1 - i;
    const y = f.top + fromTop * (f.slab + f.gap);
    // Luminance carries depth instead of colour. The house rule is that colour
    // on this site means something is TALKING; a layer is structure, not
    // traffic, so the stack separates by light alone and stays monochrome.
    const lift = i / (LAYERS.length - 1); // 0 at the base, 1 at the crown
    const fill = 5 + Math.round(lift * 21); // #050505 at the base -> #1a1a1a at the crown
    const edge = 22 + Math.round(lift * 50); // hairline brightens with height
    const ink = 92 + Math.round(lift * 143); // label brightens with height
    return `
      <div class="slab" id="s${i}" style="top:${y}px; height:${f.slab}px;
           background:rgb(${fill},${fill},${fill}); border-color:rgb(${edge},${edge},${edge});">
        <div class="lab" style="color:rgb(${ink},${ink},${ink})">${esc(L.label)}</div>
        <div class="chips">
          ${L.items
            .slice(0, f.chips)
            .map((n) => `<span>${esc(n)}</span>`)
            .join("")}
        </div>
      </div>`;
  }).join("");

const page = (f) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=${f.w}, height=${f.h}" />
    <title>The Open AI Cloud</title>
    <script src="./assets/gsap.min.js"></script>
    <style>
      /* The two faces @hanzo/design allows, self-hosted so the render never
         waits on a network headless Chrome may not have. */
      @font-face { font-family: "Geist"; src: url("./assets/geist.woff2") format("woff2"); font-weight: 100 900; font-display: block; }
      @font-face { font-family: "Geist Mono"; src: url("./assets/geist-mono.woff2") format("woff2"); font-weight: 100 900; font-display: block; }

      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: ${f.w}px; height: ${f.h}px; overflow: hidden; background: #000; }
      body { font-family: "Geist", system-ui, sans-serif; color: #ededed; -webkit-font-smoothing: antialiased; }
      #root { position: relative; width: ${f.w}px; height: ${f.h}px; overflow: hidden; }

      /* A full-bleed fill lives on a CHILD, never on the root. */
      .bg { position: absolute; inset: 0; background: #000; }
      .glow {
        position: absolute; left: 50%; top: ${Math.round(f.top - f.h * 0.1)}px;
        width: ${Math.round(f.w * 1.1)}px; height: ${Math.round(f.h * 0.62)}px;
        margin-left: ${-Math.round(f.w * 0.55)}px; border-radius: 9999px;
        background: rgba(255,255,255,0.05); filter: blur(200px);
      }

      .stack { position: absolute; left: 50%; top: 0; width: ${f.col}px; margin-left: ${-f.col / 2}px; height: ${f.h}px; }

      .slab {
        position: absolute; left: 0; width: ${f.col}px;
        border: 1px solid; border-radius: ${Math.round(f.base * 0.62)}px;
        display: flex; align-items: center; gap: ${f.base}px;
        padding: 0 ${Math.round(f.base * 1.5)}px;
        box-shadow: 0 ${Math.round(f.base)}px ${Math.round(f.base * 2.6)}px rgba(0,0,0,0.75);
        opacity: 0;
      }
      .lab {
        font-size: ${Math.round(f.base * 1.32)}px; font-weight: 500; letter-spacing: -0.01em;
        width: ${Math.round(f.col * 0.24)}px; flex: none;
      }
      .chips { display: flex; gap: ${Math.round(f.base * 0.5)}px; flex-wrap: nowrap; overflow: hidden; }
      .chips span {
        font-family: "Geist Mono", monospace; font-size: ${Math.round(f.base * 0.8)}px;
        color: #7c7c7c; border: 1px solid #212121; border-radius: 999px;
        padding: ${Math.round(f.base * 0.28)}px ${Math.round(f.base * 0.62)}px;
        white-space: nowrap;
      }

      /* The seam that makes ten slabs one platform. It is drawn UNDER the stack
         and revealed upward as the layers land, so integration is something the
         film shows rather than a word it prints. */
      .seam {
        position: absolute; left: 50%; margin-left: -1px; width: 2px;
        top: ${f.top}px; height: ${LAYERS.length * (f.slab + f.gap) - f.gap}px;
        background: linear-gradient(to top, rgba(255,255,255,0.03), rgba(255,255,255,0.30));
        transform-origin: 50% 100%; transform: scaleY(0);
      }

      .word {
        position: absolute; left: 0; width: ${f.w}px; text-align: center;
        top: ${f.top + LAYERS.length * (f.slab + f.gap) + Math.round(f.base * 1.6)}px;
        font-size: ${Math.round(f.base * 1.05)}px; color: #6a6a6a; letter-spacing: 0.01em;
        opacity: 0;
      }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${DUR}" data-width="${f.w}" data-height="${f.h}" data-fps="${FPS}">
      <div class="bg"></div>
      <div class="glow"></div>
      <div class="stack">
        <div class="seam" id="seam"></div>
        ${slabs(f)}
      </div>
      <div class="word" id="word">One cloud. Ten layers. Yours to run.</div>
    </div>
    <script>
      // A slab arrives by RISING into place, base first, because that is what a
      // stack does. Nothing scales and nothing rotates: a layer that zooms reads
      // as a card in a carousel, which is the opposite of what this says.
      const tl = gsap.timeline();
      const N = ${LAYERS.length};

      for (let i = 0; i < N; i++) {
        tl.fromTo("#s" + i,
          { opacity: 0, y: ${Math.round(f.slab * 0.7)} },
          { opacity: 1, y: 0, duration: 0.62, ease: "power3.out" },
          0.35 + i * 0.5);
      }

      // The seam draws upward THROUGH the settled stack, so it reads as the
      // layers being joined rather than as a line that was always there.
      tl.to("#seam", { scaleY: 1, duration: 1.5, ease: "power2.inOut" }, 0.9);
      tl.to("#word", { opacity: 1, duration: 0.8, ease: "power2.out" }, 5.9);

      // The film ends on the whole platform, standing. That final frame is what
      // every reduced-motion viewer is served instead of the film, so it has to
      // be the thing itself and not a transition caught mid-way.
      tl.to({}, { duration: 3.4 });

      // The renderer reads the film's length off this timeline, so the two
      // masters cannot come out different lengths.
      window.__timelines = window.__timelines || {};
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>`;

for (const [name, f] of Object.entries(FRAMES)) {
  const dir = join(here, name);
  mkdirSync(join(dir, "assets"), { recursive: true });
  for (const a of readdirSync(join(here, "assets"))) {
    copyFileSync(join(here, "assets", a), join(dir, "assets", a));
  }
  writeFileSync(join(dir, "index.html"), page(f));
  console.log(`  ${name}: ${f.w}x${f.h}  ${DUR}s  ${LAYERS.length} layers`);
}
console.log(`  base -> crown: ${LAYERS.map((l) => l.label).join(" · ")}`);
