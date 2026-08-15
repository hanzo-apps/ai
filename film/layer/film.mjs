// One film per layer: the whole stack, with this layer's own products on it.
//
//   node film.mjs            every layer
//   node film.mjs security   one
//
// A category page gets the SAME stack the cloud landing shows, so a visitor who
// has seen one recognises the other — and then the layer they came for lifts out
// of it and opens, naming what it holds. The stack is the context; the layer is
// the subject. That is the whole idea, and it is why this shares film/stack's
// geometry rather than inventing a second look.
//
// Every word is the catalog's, and the depth is film/stack's STACK. Neither is
// restated here: this imports both, so a layer added, renamed or re-ordered
// there moves every one of these films on the next render.

import { mkdirSync, writeFileSync, copyFileSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const FPS = 30;
const DUR = 9.0;

const catalog = JSON.parse(
  readFileSync(join(here, "..", "..", "lib", "data", "catalog.json"), "utf8"),
);

// The one declaration of depth, read from the film that owns it.
const STACK = readFileSync(join(here, "..", "stack", "film.mjs"), "utf8")
  .match(/const STACK = \[([\s\S]*?)\];/)[1]
  .split("\n")
  .map((l) => (l.match(/"([a-z0-9-]+)"/) || [])[1])
  .filter(Boolean);

if (STACK.length !== 10) throw new Error(`read ${STACK.length} layers from film/stack, expected 10`);

const LAYERS = STACK.map((id) => {
  const c = catalog.categories.find((x) => x.id === id);
  if (!c) throw new Error(`STACK names ${id}, which the catalog does not carry`);
  return {
    id,
    label: c.label,
    items: catalog.products
      .filter((p) => p.category === id)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((p) => p.name),
  };
});

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// film/stack's geometry, so the two read as one picture.
const FRAMES = {
  tall: { w: 1080, h: 1920, col: 820, top: 300, slab: 132, gap: 14, base: 21, chips: 4 },
  wide: { w: 1920, h: 1080, col: 1180, top: 70, slab: 80, gap: 8, base: 17, chips: 6 },
};

const page = (f, subject) => {
  const si = LAYERS.findIndex((l) => l.id === subject);
  const L = LAYERS[si];
  // Where the subject sits in the resting stack, and where it lifts to. It
  // rises to the optical centre and the rest of the stack dims behind it —
  // nothing slides off screen, because the point is that it is PART of this.
  const restY = f.top + (LAYERS.length - 1 - si) * (f.slab + f.gap);
  const openH = Math.round(f.slab * (f.chips > 4 ? 2.1 : 2.6));
  const openY = Math.round((f.h - openH) / 2);

  const slabs = LAYERS.map((l, i) => {
    const y = f.top + (LAYERS.length - 1 - i) * (f.slab + f.gap);
    const lift = i / (LAYERS.length - 1);
    const fill = 5 + Math.round(lift * 21);
    const edge = 22 + Math.round(lift * 50);
    const ink = 92 + Math.round(lift * 143);
    const isSubject = i === si;
    return `
      <div class="slab${isSubject ? " subject" : ""}" id="s${i}" style="top:${y}px; height:${f.slab}px;
           background:rgb(${fill},${fill},${fill}); border-color:rgb(${edge},${edge},${edge});">
        <div class="lab" style="color:rgb(${ink},${ink},${ink})">${esc(l.label)}</div>
        <div class="chips">${l.items.slice(0, f.chips).map((n) => `<span>${esc(n)}</span>`).join("")}</div>
      </div>`;
  }).join("");

  // What the opened layer says: every product it holds, not a sample. This is
  // the one film where the layer is the subject, so the slab shows its whole
  // membership.
  const full = L.items.map((n) => `<span>${esc(n)}</span>`).join("");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=${f.w}, height=${f.h}" />
    <title>${esc(L.label)}</title>
    <script src="./assets/gsap.min.js"></script>
    <style>
      @font-face { font-family: "Geist"; src: url("./assets/geist.woff2") format("woff2"); font-weight: 100 900; font-display: block; }
      @font-face { font-family: "Geist Mono"; src: url("./assets/geist-mono.woff2") format("woff2"); font-weight: 100 900; font-display: block; }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: ${f.w}px; height: ${f.h}px; overflow: hidden; background: #000; }
      body { font-family: "Geist", system-ui, sans-serif; color: #ededed; -webkit-font-smoothing: antialiased; }
      #root { position: relative; width: ${f.w}px; height: ${f.h}px; overflow: hidden; }
      .bg { position: absolute; inset: 0; background: #000; }
      .glow { position: absolute; left: 50%; top: ${Math.round(f.top - f.h * 0.1)}px;
        width: ${Math.round(f.w * 1.1)}px; height: ${Math.round(f.h * 0.62)}px;
        margin-left: ${-Math.round(f.w * 0.55)}px; border-radius: 9999px;
        background: rgba(255,255,255,0.05); filter: blur(200px); }
      .stack { position: absolute; left: 50%; top: 0; width: ${f.col}px; margin-left: ${-f.col / 2}px; height: ${f.h}px; }
      .slab { position: absolute; left: 0; width: ${f.col}px; border: 1px solid;
        border-radius: ${Math.round(f.base * 0.62)}px; display: flex; align-items: center;
        gap: ${f.base}px; padding: 0 ${Math.round(f.base * 1.5)}px;
        box-shadow: 0 ${Math.round(f.base)}px ${Math.round(f.base * 2.6)}px rgba(0,0,0,0.75); }
      .lab { font-size: ${Math.round(f.base * 1.32)}px; font-weight: 500; letter-spacing: -0.01em;
        width: ${Math.round(f.col * 0.24)}px; flex: none; }
      .chips { display: flex; gap: ${Math.round(f.base * 0.5)}px; flex-wrap: nowrap; overflow: hidden; }
      .chips span { font-family: "Geist Mono", monospace; font-size: ${Math.round(f.base * 0.8)}px;
        color: #7c7c7c; border: 1px solid #212121; border-radius: 999px;
        padding: ${Math.round(f.base * 0.28)}px ${Math.round(f.base * 0.62)}px; white-space: nowrap; }
      .seam { position: absolute; left: 50%; margin-left: -1px; width: 2px; top: ${f.top}px;
        height: ${LAYERS.length * (f.slab + f.gap) - f.gap}px;
        background: linear-gradient(to top, rgba(255,255,255,0.03), rgba(255,255,255,0.30)); }

      /* The opened layer. Same slab, more room — it does not become a card. */
      #open { position: absolute; left: 50%; margin-left: ${-f.col / 2}px; width: ${f.col}px;
        top: ${openY}px; height: ${openH}px; border: 1px solid #3d3d3d; border-radius: ${Math.round(f.base * 0.62)}px;
        background: #131313; box-shadow: 0 ${f.base * 2}px ${f.base * 5}px rgba(0,0,0,0.9);
        padding: 0 ${Math.round(f.base * 1.7)}px; display: flex; flex-direction: column;
        justify-content: center; gap: ${Math.round(f.base * 0.7)}px; opacity: 0;
      }
      #open .h { font-size: ${Math.round(f.base * 1.7)}px; font-weight: 500; letter-spacing: -0.015em; color: #fff; }
      #open .all { display: flex; flex-wrap: wrap; gap: ${Math.round(f.base * 0.45)}px; opacity: 0; }
      #open .all span { font-family: "Geist Mono", monospace; font-size: ${Math.round(f.base * 0.82)}px;
        color: #b4b4b4; border: 1px solid #2e2e2e; border-radius: 999px;
        padding: ${Math.round(f.base * 0.3)}px ${Math.round(f.base * 0.66)}px; white-space: nowrap; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${DUR}" data-width="${f.w}" data-height="${f.h}" data-fps="${FPS}">
      <div class="bg"></div>
      <div class="glow"></div>
      <div class="stack" id="stack">
        <div class="seam"></div>
        ${slabs}
      </div>
      <div id="open">
        <div class="h">${esc(L.label)}</div>
        <div class="all" id="all">${full}</div>
      </div>
    </div>
    <script>
      // The stack is already standing — this film opens on the whole platform,
      // so a viewer arriving from the cloud page recognises it before anything
      // moves. Then the layer they came for lifts out and names itself.
      const tl = gsap.timeline();
      tl.to("#stack", { opacity: 0.22, duration: 0.9, ease: "power2.inOut" }, 1.0);
      // y and opacity only. scaleY would have squashed the label and the chips
      // inside the slab, and a layout property (top, height) snaps to integer
      // device pixels and stutters under the frame-seek capture engine.
      tl.fromTo("#open", { opacity: 0, y: ${restY - openY} },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" }, 1.0);
      tl.to("#all", { opacity: 1, duration: 0.6, ease: "power2.out" }, 1.9);
      // Held on the opened layer: the frame a reduced-motion viewer is served.
      tl.to({}, { duration: 5.2 });
      window.__timelines = window.__timelines || {};
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>`;
};

const only = process.argv[2];
const targets = only ? LAYERS.filter((l) => l.id === only) : LAYERS;
if (!targets.length) throw new Error(`no layer: ${only}`);

for (const L of targets) {
  for (const [name, f] of Object.entries(FRAMES)) {
    const dir = join(here, L.id, name);
    mkdirSync(join(dir, "assets"), { recursive: true });
    for (const a of readdirSync(join(here, "assets"))) {
      copyFileSync(join(here, "assets", a), join(dir, "assets", a));
    }
    writeFileSync(join(dir, "index.html"), page(f, L.id));
  }
  console.log(`  ${L.id.padEnd(15)} ${String(L.items.length).padStart(2)} products`);
}
