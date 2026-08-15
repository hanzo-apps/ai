// Many machines, one cloud — the hero's own sentence, shown as the console.
//
//   node film.mjs
//
// The fold claims the cloud is "composed from any combination of bare metal,
// your own cloud accounts, and the hyperscalers' regions and services". This is
// that claim as the PRODUCT: the console's own Clouds page, with each substrate
// listed as a row that names the route it is folded in through.
//
// IT IS A MOCKUP, NOT A TITLE CARD. The first cut set three columns of words on
// black, which reads as a slide however nice the type is. A picture of a product
// has to look like the product, so everything here lives inside the window.
//
// WHAT MAY BE IN IT. The providers are the four `apps/venue` actually links —
// digitalocean, aws, gcp, azure — spelled as the catalog and the API spell them.
// No count, no capacity, no latency: this film states WHAT composes, never HOW
// MUCH, because a quantity here would be a claim the product has not made. And
// no invented resource names: every row is a substrate and a route, both real.

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
  { head: "Your cloud accounts", route: "/v1/cloud", items: ["aws", "gcp", "azure", "digitalocean"] },
  { head: "Your Kubernetes", route: "/v1/k8s", items: ["clusters", "nodes", "namespaces", "workloads"] },
  { head: "Your machines", route: "/v1/machines", items: ["bare metal", "GPUs", "workers", "fleet"] },
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Same geometry as film/cloud, so every window on this site is the same window.
const FRAMES = {
  tall: { w: 1080, h: 1920, win: 862, winH: 940, top: 490 },
  wide: { w: 1920, h: 1080, win: 1480, winH: 700, top: 190 },
};

const page = (f) => {
  const rows = SOURCES.map(
    (s, i) => `
              <div class="row" id="r${i}">
                <div class="left">
                  <div class="head">${esc(s.head)}</div>
                  <div class="route">${esc(s.route)}</div>
                </div>
                <div class="tags">
                  ${s.items.map((n) => `<span>${esc(n)}</span>`).join("")}
                </div>
              </div>`,
  ).join("");

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
      .glow { position: absolute; left: 50%; top: ${Math.round(f.top - f.h * 0.06)}px;
        width: ${Math.round(f.w * 1.05)}px; height: ${Math.round(f.h * 0.5)}px;
        margin-left: ${-Math.round(f.w * 0.525)}px; border-radius: 9999px;
        background: rgba(255,255,255,0.05); filter: blur(200px); }

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

      .rows { margin-top: 22px; display: flex; flex-direction: column; gap: 11px; }
      .row { display: flex; align-items: center; gap: 20px; padding: 16px 18px;
        border: 1px solid #1a1a1a; border-radius: 11px; background: #0a0a0a; opacity: 0; }
      .left { width: 260px; flex: none; }
      .head { font-size: 19px; color: #ededed; }
      .route { margin-top: 4px; font-family: "Geist Mono", monospace; font-size: 15px; color: #5f5f5f; }
      .tags { display: flex; flex-wrap: wrap; gap: 8px; }
      .tags span { font-family: "Geist Mono", monospace; font-size: 15px; color: #8a8a8a;
        border: 1px solid #232323; border-radius: 999px; padding: 5px 12px; background: #0d0d0d; }

      /* The one plane they compose into, stated as the console's own footer. */
      .plane { margin-top: 22px; display: flex; align-items: center; gap: 12px;
        padding: 14px 18px; border: 1px solid #303030; border-radius: 11px; background: #111;
        opacity: 0; }
      .plane .dot { width: 9px; height: 9px; border-radius: 999px; background: #fff; flex: none; }
      .plane .name { font-size: 19px; color: #fff; }
      .plane .addr { margin-left: auto; font-family: "Geist Mono", monospace; font-size: 16px; color: #8f8f8f; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${DUR}" data-width="${f.w}" data-height="${f.h}" data-fps="${FPS}">
      <div class="bg"></div>
      <div class="glow"></div>
      <div class="win">
        <div class="bar">
          <div class="dots"><i></i><i></i><i></i></div>
          <div class="crumb">Hanzo Cloud &middot; Infrastructure</div>
          <div class="who">z@hanzo.ai</div>
        </div>
        <div class="body">
          <div class="side">
            <a class="on">Clouds</a>
            <a>Kubernetes</a>
            <a>Machines</a>
            <a>Regions</a>
          </div>
          <div class="main">
            <div class="h">Clouds</div>
            <div class="sub">Everything this org runs on, folded in under one address.</div>
            <div class="rows">${rows}</div>
            <div class="plane" id="plane">
              <span class="dot"></span>
              <span class="name">One cloud</span>
              <span class="addr">api.hanzo.ai/v1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <script>
      // y and opacity only — a layout property snaps to integer device pixels
      // and stutters under the frame-seek capture engine.
      const tl = gsap.timeline();
      for (let i = 0; i < ${SOURCES.length}; i++) {
        tl.fromTo("#r" + i, { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0.5 + i * 0.42);
      }
      tl.fromTo("#plane", { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 2.3);
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
