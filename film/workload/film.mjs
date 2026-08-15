// Every workload type, shown as the console that runs it.
//
//   node film.mjs              all three
//   node film.mjs sandboxes    one
//
// Containers, virtual machines and sandboxes are three ways to run something on
// this cloud, and each film shows THE PRODUCT looking at one of them: real
// window chrome, the real left nav, and the operations that kind actually has
// listed the way a console lists them.
//
// IT IS A MOCKUP, NOT A TITLE CARD. The first cut of this film set the same
// words in large type on black, which reads as a slide even inside a browser
// frame — a picture of a product has to look like the product. Nothing here is
// laid over the window; every word sits inside it.
//
// SO IT CANNOT GO STALE. The rows come from GET /v1/openapi.json at compose
// time, a projection of the live router, so an operation added, renamed or
// removed appears on the next render with nothing here to edit. That is also
// the only reason a film may print a route at all: it is quoting the API.
//
// The cached copy is a FALLBACK, never the source. If the fetch fails and there
// is no cache, this stops — a film that invents an endpoint is worse than no
// film, and there is no third option that is honest.

import { mkdirSync, writeFileSync, copyFileSync, readdirSync, readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const FPS = 30;
const DUR = 9.4;
const DOC = "https://api.hanzo.ai/v1/openapi.json";
const CACHE = join(here, ".openapi.json");

/** The three ways to run something, and the prefix each one's operations live under. */
const KINDS = [
  {
    id: "containers",
    nav: "Containers",
    // What a reader gets, in one line, INSIDE the window as a subtitle.
    blurb: "Deploy an image, invoke it, read its logs and metrics.",
    prefix: "/v1/functions",
  },
  {
    id: "vms",
    nav: "Virtual machines",
    blurb: "A whole machine, on your account or ours, with an agent on it.",
    prefix: "/v1/machines",
  },
  {
    id: "sandboxes",
    nav: "Sandboxes",
    blurb: "An isolated filesystem and shell, leased for as long as the work runs.",
    prefix: "/v1/sandboxes",
  },
];

// ── the surface, as the API states it ──────────────────────────────────────
let doc;
try {
  const res = await fetch(DOC, { signal: AbortSignal.timeout(90000) });
  if (!res.ok) throw new Error(`${res.status}`);
  doc = await res.json();
  writeFileSync(CACHE, JSON.stringify(doc));
  console.log(`  read the live document: ${Object.keys(doc.paths).length} paths`);
} catch (err) {
  if (!existsSync(CACHE)) {
    throw new Error(`cannot reach ${DOC} (${err.message}) and no cached document — refusing to invent one`);
  }
  doc = JSON.parse(readFileSync(CACHE, "utf8"));
  console.log(`  live document unreachable (${err.message}); using the cached one`);
}

const VERBS = ["get", "post", "put", "patch", "delete"];
const opsFor = (prefix) =>
  Object.entries(doc.paths)
    .filter(([p]) => p === prefix || p.startsWith(`${prefix}/`))
    .sort(([a], [b]) => a.length - b.length || a.localeCompare(b))
    .map(([p, item]) => ({
      path: p,
      verbs: VERBS.filter((v) => item[v]).map((v) => v.toUpperCase()),
    }))
    .filter((o) => o.verbs.length);

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Same geometry as film/cloud, so every window on this site is the same window.
const FRAMES = {
  tall: { w: 1080, h: 1920, win: 862, winH: 940, top: 490, rows: 7 },
  wide: { w: 1920, h: 1080, win: 1480, winH: 700, top: 190, rows: 6 },
};

const page = (f, kind) => {
  const ops = opsFor(kind.prefix);
  if (!ops.length) throw new Error(`${kind.id}: the document carries nothing under ${kind.prefix}`);
  const shown = ops.slice(0, f.rows);

  const rows = shown
    .map(
      (o, i) => `
              <div class="row" id="r${i}">
                <span class="verbs">${o.verbs.map((v) => `<i>${v}</i>`).join("")}</span>
                <span class="path">${esc(o.path)}</span>
              </div>`,
    )
    .join("");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=${f.w}, height=${f.h}" />
    <title>${esc(kind.nav)}</title>
    <script src="./assets/gsap.min.js"></script>
    <style>
      @font-face { font-family: "Geist"; src: url("./assets/geist.woff2") format("woff2"); font-weight: 100 900; font-display: block; }
      @font-face { font-family: "Geist Mono"; src: url("./assets/geist-mono.woff2") format("woff2"); font-weight: 100 900; font-display: block; }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: ${f.w}px; height: ${f.h}px; overflow: hidden; background: #000; }
      body { font-family: "Geist", system-ui, sans-serif; color: #ededed; -webkit-font-smoothing: antialiased; }
      #root { position: relative; width: ${f.w}px; height: ${f.h}px; overflow: hidden; }
      .bg { position: absolute; inset: 0; background: #000; }
      .glow { position: absolute; left: 50%; top: ${Math.round(f.top - f.h * 0.06)}px;
        width: ${Math.round(f.w * 1.05)}px; height: ${Math.round(f.h * 0.5)}px;
        margin-left: ${-Math.round(f.w * 0.525)}px; border-radius: 9999px;
        background: rgba(255,255,255,0.05); filter: blur(200px); }

      /* The window. Identical to film/cloud's, because a second window shape
         would read as a second product. */
      .win { position: absolute; left: 50%; top: ${f.top}px; width: ${f.win}px; height: ${f.winH}px;
        margin-left: ${-f.win / 2}px; background: #050505;
        border: 1px solid #1f1f1f; border-radius: 16px; overflow: hidden;
        box-shadow: 0 40px 120px rgba(0,0,0,0.9), inset 0 1px 0 0 rgba(255,255,255,0.05); }
      .bar { display: flex; align-items: center; gap: 14px; height: 54px; padding: 0 20px; border-bottom: 1px solid #171717; background: #0a0a0a; }
      .dots { display: flex; gap: 8px; }
      .dots i { width: 11px; height: 11px; border-radius: 999px; background: #232323; display: block; }
      .bar .crumb { font-size: 18px; color: #8a8a8a; }
      .bar .who { margin-left: auto; font-family: "Geist Mono", monospace; font-size: 17px; color: #777777; }
      .body { display: grid; grid-template-columns: 232px 1fr; height: calc(100% - 54px); }
      .side { border-right: 1px solid #171717; padding: 18px 12px; background: #030303; }
      .side a { display: block; padding: 11px 14px; border-radius: 9px; font-size: 19px; color: #8a8a8a; text-decoration: none; }
      .side a.on { background: #171717; color: #fff; }
      .main { padding: 26px 28px; overflow: hidden; }
      .h { font-size: 26px; font-weight: 600; color: #fff; }
      .sub { margin-top: 7px; font-size: 17px; color: #7e7e7e; }
      /* Frame 0 is the POSTER: <Frame> ships the first frame as the still, so a
         film that animates its content in from nothing publishes an EMPTY
         console to every reader before the video loads — and on a page that
         calls this a mockup, empty reads as broken. The rows are therefore
         present from the first frame and only BRIGHTEN, so every frame of this
         film, including the one that is a picture, looks used. */
      .rows { margin-top: 22px; display: flex; flex-direction: column; gap: 9px; }
      .row { display: flex; align-items: center; gap: 18px; height: 52px; padding: 0 16px;
        border: 1px solid #1a1a1a; border-radius: 10px; background: #0a0a0a; opacity: 0.55; }
      .verbs { display: flex; gap: 6px; width: 210px; flex: none; }
      .verbs i { font-family: "Geist Mono", monospace; font-style: normal; font-size: 14px;
        letter-spacing: 0.04em; color: #9a9a9a; border: 1px solid #262626; border-radius: 6px;
        padding: 3px 9px; }
      .path { font-family: "Geist Mono", monospace; font-size: 18px; color: #c8c8c8; }
      .foot { margin-top: 20px; font-family: "Geist Mono", monospace; font-size: 16px; color: #5e5e5e; opacity: 0; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${DUR}" data-width="${f.w}" data-height="${f.h}" data-fps="${FPS}">
      <div class="bg"></div>
      <div class="glow"></div>
      <div class="win">
        <div class="bar">
          <div class="dots"><i></i><i></i><i></i></div>
          <div class="crumb">Hanzo Cloud &middot; Compute</div>
          <div class="who">z@hanzo.ai</div>
        </div>
        <div class="body">
          <div class="side">
            ${KINDS.map((k) => `<a class="${k.id === kind.id ? "on" : ""}">${esc(k.nav)}</a>`).join("\n            ")}
          </div>
          <div class="main">
            <div class="h">${esc(kind.nav)}</div>
            <div class="sub">${esc(kind.blurb)}</div>
            <div class="rows">${rows}</div>
            <div class="foot" id="foot">api.hanzo.ai${esc(kind.prefix)}</div>
          </div>
        </div>
      </div>
    </div>
    <script>
      // y and opacity only. A layout property snaps to integer device pixels and
      // stutters under the frame-seek capture engine, which the renderer refuses
      // by name.
      const tl = gsap.timeline();
      for (let i = 0; i < ${shown.length}; i++) {
        tl.fromTo("#r" + i, { opacity: 0.55, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 0.45 + i * 0.2);
      }
      tl.fromTo("#foot", { opacity: 0.4 }, { opacity: 1, duration: 0.6 }, 0.45 + ${shown.length} * 0.2);
      // Held on the populated console — the frame a reduced-motion viewer gets,
      // and it has to look used.
      tl.to({}, { duration: 3.6 });
      window.__timelines = window.__timelines || {};
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>`;
};

const only = process.argv[2];
const targets = only ? KINDS.filter((k) => k.id === only) : KINDS;
if (!targets.length) throw new Error(`no workload: ${only}`);

for (const kind of targets) {
  for (const [name, f] of Object.entries(FRAMES)) {
    const dir = join(here, kind.id, name);
    mkdirSync(join(dir, "assets"), { recursive: true });
    for (const a of readdirSync(join(here, "assets"))) {
      copyFileSync(join(here, "assets", a), join(dir, "assets", a));
    }
    writeFileSync(join(dir, "index.html"), page(f, kind));
  }
  console.log(`  ${kind.id.padEnd(12)} ${opsFor(kind.prefix).length} operations under ${kind.prefix}`);
}
