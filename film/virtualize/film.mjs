// Many machines, one cloud — the hero's own sentence, shown.
//
//   node film.mjs
//
// The fold claims the cloud is "composed from any combination of bare metal,
// your own cloud accounts, and the hyperscalers' regions and services". This is
// that: three columns of real sources converging into one plane, which then
// carries the ten layers.
//
// WHAT MAY BE IN IT. The providers are the four `apps/venue` actually links —
// digitalocean, aws, gcp, azure — spelled as the catalog and the API spell
// them. Bare metal is drawn as unlabelled machines because a rack has no brand
// to claim. No count, no capacity, no latency: this film states WHAT composes,
// never HOW MUCH, because a quantity here would be a claim the product has not
// made.

import { mkdirSync, writeFileSync, copyFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const FPS = 30;
const DUR = 9.6;

/**
 * The substrates a Hanzo cloud composes FROM, each with the route that proves
 * it. Every one answers on api.hanzo.ai today — measured, not aspirational.
 *
 * NOT HERE, deliberately: OCI, which apps/venue does not link, and Edge, which
 * has no /v1 route because hanzoai/edge runs on the customer's own device. A
 * substrate on this film that the API cannot fold in would be the one kind of
 * lie a picture of an API must not tell.
 */
const SOURCES = [
  {
    head: "Your cloud accounts",
    route: "/v1/cloud",
    // Spelled as apps/venue and the API spell them.
    items: ["aws", "gcp", "azure", "digitalocean"],
  },
  {
    head: "Your Kubernetes",
    route: "/v1/k8s",
    items: ["clusters", "nodes", "namespaces", "workloads"],
  },
  {
    head: "Your machines",
    route: "/v1/machines",
    items: ["bare metal", "GPUs", "workers", "fleet"],
  },
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const FRAMES = {
  tall: { w: 1080, h: 1920, base: 22, colW: 300, top: 560, gap: 26 },
  wide: { w: 1920, h: 1080, base: 18, colW: 380, top: 300, gap: 34 },
};

const page = (f) => {
  const cols = SOURCES.length;
  const spread = cols * f.colW + (cols - 1) * f.gap;
  const planeY = f.top + Math.round(f.base * 13);

  const sources = SOURCES.map((s, i) => {
    const x = Math.round(-spread / 2 + i * (f.colW + f.gap));
    return `
      <div class="src" id="src${i}" style="left:50%; margin-left:${x}px; top:${f.top}px; width:${f.colW}px;">
        <div class="shead">${esc(s.head)}</div>
        <div class="sroute">${esc(s.route)}</div>
        <div class="tiles">
          ${s.items
            .map(
              (n) =>
                `<div class="tile">${esc(n)}</div>`,
            )
            .join("")}
        </div>
      </div>`;
  }).join("");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=${f.w}, height=${f.h}" />
    <title>One cloud</title>
    <script src="./assets/gsap.min.js"></script>
    <style>
      @font-face { font-family: "Geist"; src: url("./assets/geist.woff2") format("woff2"); font-weight: 100 900; font-display: block; }
      @font-face { font-family: "Geist Mono"; src: url("./assets/geist-mono.woff2") format("woff2"); font-weight: 100 900; font-display: block; }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: ${f.w}px; height: ${f.h}px; overflow: hidden; background: #000; }
      body { font-family: "Geist", system-ui, sans-serif; color: #ededed; -webkit-font-smoothing: antialiased; }
      #root { position: relative; width: ${f.w}px; height: ${f.h}px; overflow: hidden; }
      .bg { position: absolute; inset: 0; background: #000; }
      .glow { position: absolute; left: 50%; top: ${planeY - Math.round(f.h * 0.18)}px;
        width: ${Math.round(f.w * 1.1)}px; height: ${Math.round(f.h * 0.5)}px;
        margin-left: ${-Math.round(f.w * 0.55)}px; border-radius: 9999px;
        background: rgba(255,255,255,0.05); filter: blur(200px); }

      .src { position: absolute; opacity: 0; }
      .shead { font-size: ${Math.round(f.base * 0.86)}px; letter-spacing: 0.1em; text-transform: uppercase;
        color: #6f6f6f; margin-bottom: ${Math.round(f.base * 0.28)}px; }
      /* The route is what makes the column checkable rather than decorative. */
      .sroute { font-family: "Geist Mono", monospace; font-size: ${Math.round(f.base * 0.74)}px;
        color: #4a4a4a; margin-bottom: ${Math.round(f.base * 0.8)}px; }
      .tiles { display: grid; grid-template-columns: 1fr 1fr; gap: ${Math.round(f.base * 0.55)}px; }
      .tile { height: ${Math.round(f.base * 2.9)}px; border: 1px solid #262626; border-radius: ${Math.round(f.base * 0.5)}px;
        background: #0b0b0b; display: flex; align-items: center; justify-content: center;
        font-family: "Geist Mono", monospace; font-size: ${Math.round(f.base * 0.78)}px; color: #8a8a8a; }

      /* The one plane everything composes into. */
      .plane { position: absolute; left: 50%; top: ${planeY}px; width: ${spread}px; margin-left: ${-spread / 2}px;
        border: 1px solid #3a3a3a; border-radius: ${Math.round(f.base * 0.8)}px; background: #121212;
        box-shadow: 0 ${f.base * 2}px ${f.base * 5}px rgba(0,0,0,0.9);
        padding: ${Math.round(f.base * 1.4)}px ${Math.round(f.base * 1.6)}px;
        display: flex; align-items: center; gap: ${Math.round(f.base * 0.9)}px;
        opacity: 0; }
      .plane .dot { width: ${Math.round(f.base * 0.5)}px; height: ${Math.round(f.base * 0.5)}px; border-radius: 999px; background: #fff; flex: none; }
      .plane .name { font-size: ${Math.round(f.base * 1.35)}px; font-weight: 500; color: #fff; }
      .plane .addr { margin-left: auto; font-family: "Geist Mono", monospace; font-size: ${Math.round(f.base * 0.9)}px; color: #8f8f8f; }

      /* What the plane then carries. Named, not counted. */
      .layers { position: absolute; left: 50%; top: ${planeY + Math.round(f.base * 5.4)}px;
        width: ${spread}px; margin-left: ${-spread / 2}px;
        display: flex; flex-wrap: wrap; gap: ${Math.round(f.base * 0.5)}px; opacity: 0; }
      .layers span { font-family: "Geist Mono", monospace; font-size: ${Math.round(f.base * 0.82)}px;
        color: #7e7e7e; border: 1px solid #232323; border-radius: 999px;
        padding: ${Math.round(f.base * 0.28)}px ${Math.round(f.base * 0.66)}px; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${DUR}" data-width="${f.w}" data-height="${f.h}" data-fps="${FPS}">
      <div class="bg"></div>
      <div class="glow"></div>
      ${sources}
      <div class="plane" id="plane">
        <span class="dot"></span>
        <span class="name">One cloud</span>
        <span class="addr">api.hanzo.ai/v1</span>
      </div>
      <div class="layers" id="layers">
        ${["Web3", "Compute", "Data", "Network", "Security", "Infrastructure", "Observe", "Dev", "AI", "Apps"]
          .map((l) => `<span>${l}</span>`)
          .join("")}
      </div>
    </div>
    <script>
      // The three arrive, then FALL INTO the plane — y and opacity only, because
      // a layout property snaps to integer device pixels and stutters under the
      // frame-seek capture engine.
      const tl = gsap.timeline();
      for (let i = 0; i < ${SOURCES.length}; i++) {
        tl.fromTo("#src" + i, { opacity: 0, y: ${Math.round(f.base * 1.6)} },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0.3 + i * 0.42);
      }
      // They do not vanish — they RECEDE. The machines are still yours; what
      // changed is that one address now answers for them.
      tl.to(".src", { opacity: 0.22, y: ${-Math.round(f.base * 0.8)}, duration: 0.9, ease: "power2.inOut" }, 2.5);
      tl.fromTo("#plane", { opacity: 0, y: ${Math.round(f.base * 2.2)} },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, 2.7);
      tl.fromTo("#layers", { opacity: 0, y: ${Math.round(f.base * 1.2)} },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 3.5);
      // Held on the composed cloud: the frame a reduced-motion viewer is served.
      tl.to({}, { duration: 5.2 });
      window.__timelines = window.__timelines || {};
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>`;
};

for (const [name, f] of Object.entries(FRAMES)) {
  const dir = join(here, name);
  mkdirSync(join(dir, "assets"), { recursive: true });
  for (const a of readdirSync(join(here, "assets"))) {
    copyFileSync(join(here, "assets", a), join(dir, "assets", a));
  }
  writeFileSync(join(dir, "index.html"), page(f));
  console.log(`  ${name}: ${f.w}x${f.h}  ${DUR}s`);
}
