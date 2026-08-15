// Every workload type, and the real surface behind each.
//
//   node film.mjs              all three
//   node film.mjs sandboxes    one
//
// Containers, virtual machines and sandboxes are three ways to run something on
// this cloud, and each film shows the OPERATIONS that actually exist for it —
// method and path — read from GET /v1/openapi.json at compose time.
//
// SO IT CANNOT GO STALE. The document is a projection of the live router, so an
// operation added, renamed or removed appears in these films on the next render
// with nothing here to edit. That is also the only reason a film may print a
// route at all: it is quoting the API, not describing it.
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
    title: "Containers",
    // What a reader gets, in one line. The claim is about SHAPE, never speed.
    blurb: "Deploy an image, invoke it, read its logs and metrics.",
    prefix: "/v1/functions",
  },
  {
    id: "vms",
    title: "Virtual machines",
    blurb: "A whole machine, on your account or ours, with an agent on it.",
    prefix: "/v1/machines",
  },
  {
    id: "sandboxes",
    title: "Sandboxes",
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

const FRAMES = {
  tall: { w: 1080, h: 1920, base: 22, col: 860, rows: 9 },
  wide: { w: 1920, h: 1080, base: 18, col: 1180, rows: 8 },
};

const page = (f, kind) => {
  const ops = opsFor(kind.prefix);
  if (!ops.length) throw new Error(`${kind.id}: the document carries nothing under ${kind.prefix}`);
  const shown = ops.slice(0, f.rows);
  const rowH = Math.round(f.base * 2.5);
  const listY = Math.round(f.h / 2 - (shown.length * rowH) / 2 + f.base * 2.2);

  const rows = shown
    .map(
      (o, i) => `
      <div class="op" id="op${i}" style="top:${listY + i * rowH}px; height:${rowH - Math.round(f.base * 0.34)}px;">
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
    <title>${esc(kind.title)}</title>
    <script src="./assets/gsap.min.js"></script>
    <style>
      @font-face { font-family: "Geist"; src: url("./assets/geist.woff2") format("woff2"); font-weight: 100 900; font-display: block; }
      @font-face { font-family: "Geist Mono"; src: url("./assets/geist-mono.woff2") format("woff2"); font-weight: 100 900; font-display: block; }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: ${f.w}px; height: ${f.h}px; overflow: hidden; background: #000; }
      body { font-family: "Geist", system-ui, sans-serif; color: #ededed; -webkit-font-smoothing: antialiased; }
      #root { position: relative; width: ${f.w}px; height: ${f.h}px; overflow: hidden; }
      .bg { position: absolute; inset: 0; background: #000; }
      .glow { position: absolute; left: 50%; top: ${Math.round(f.h * 0.22)}px;
        width: ${Math.round(f.w * 1.05)}px; height: ${Math.round(f.h * 0.56)}px;
        margin-left: ${-Math.round(f.w * 0.525)}px; border-radius: 9999px;
        background: rgba(255,255,255,0.05); filter: blur(200px); }

      .head { position: absolute; left: 50%; width: ${f.col}px; margin-left: ${-f.col / 2}px;
        top: ${listY - Math.round(f.base * 6.2)}px; opacity: 0; }
      .head h1 { font-size: ${Math.round(f.base * 2.5)}px; font-weight: 600; letter-spacing: -0.02em; color: #fff; }
      .head p  { margin-top: ${Math.round(f.base * 0.6)}px; font-size: ${Math.round(f.base * 1.05)}px; color: #8c8c8c; }

      .op { position: absolute; left: 50%; width: ${f.col}px; margin-left: ${-f.col / 2}px;
        display: flex; align-items: center; gap: ${Math.round(f.base * 0.9)}px;
        padding: 0 ${Math.round(f.base * 1.1)}px;
        border: 1px solid #1e1e1e; border-radius: ${Math.round(f.base * 0.5)}px; background: #0a0a0a;
        opacity: 0; }
      .verbs { display: flex; gap: ${Math.round(f.base * 0.3)}px; flex: none;
        width: ${Math.round(f.col * 0.27)}px; }
      .verbs i { font-family: "Geist Mono", monospace; font-style: normal;
        font-size: ${Math.round(f.base * 0.68)}px; letter-spacing: 0.04em; color: #9a9a9a;
        border: 1px solid #262626; border-radius: ${Math.round(f.base * 0.28)}px;
        padding: ${Math.round(f.base * 0.16)}px ${Math.round(f.base * 0.42)}px; }
      .path { font-family: "Geist Mono", monospace; font-size: ${Math.round(f.base * 0.92)}px; color: #c8c8c8; }

      .foot { position: absolute; left: 0; width: ${f.w}px; text-align: center;
        top: ${listY + shown.length * rowH + Math.round(f.base * 1.6)}px;
        font-family: "Geist Mono", monospace; font-size: ${Math.round(f.base * 0.86)}px; color: #5e5e5e; opacity: 0; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${DUR}" data-width="${f.w}" data-height="${f.h}" data-fps="${FPS}">
      <div class="bg"></div>
      <div class="glow"></div>
      <div class="head" id="head">
        <h1>${esc(kind.title)}</h1>
        <p>${esc(kind.blurb)}</p>
      </div>
      ${rows}
      <div class="foot" id="foot">api.hanzo.ai${esc(kind.prefix)}</div>
    </div>
    <script>
      // y and opacity only. A layout property snaps to integer device pixels and
      // stutters under the frame-seek capture engine, which the renderer refuses
      // by name.
      const tl = gsap.timeline();
      tl.fromTo("#head", { opacity: 0, y: ${Math.round(f.base * 1.1)} },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.25);
      for (let i = 0; i < ${shown.length}; i++) {
        tl.fromTo("#op" + i, { opacity: 0, y: ${Math.round(f.base * 0.9)} },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 0.85 + i * 0.19);
      }
      tl.fromTo("#foot", { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.85 + ${shown.length} * 0.19);
      // Held on the whole surface — the frame a reduced-motion viewer is served.
      tl.to({}, { duration: 3.4 });
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
