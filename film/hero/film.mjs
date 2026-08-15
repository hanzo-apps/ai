// The apex trailer — what Hanzo is, shown as the thing itself.
//
//   node film.mjs        # writes tall/index.html and wide/index.html
//
// hanzo.ai says "Frontier models, agents, and the cloud under them." This film
// is that sentence as the PRODUCT, in three movements of one console: the model
// catalog, an afternoon of real calls, and the ten layers those calls land on.
// The sentence itself is never drawn — it stays DOM text on the page, where it
// reflows, translates and answers a screen reader. The last apex film baked its
// headline into the pixels and then disagreed with the list beneath it, and a
// disagreement you can only fix by re-rendering a video is not a disagreement
// worth having.
//
// NOTHING HERE IS TYPED. The models and the two counts come from
// lib/data/pricing.json, the same snapshot every price on this site reads. The
// calls are lib/data/catalog.json's tour — real operations, each one verified
// against GET /v1/openapi.json when the snapshot was written. The layers and
// their products are that same catalog's categories. Re-run the syncs and the
// film says whatever the API now says; there is no number in it a reader could
// catch us having invented.
//
// TWO MASTERS, ONE SOURCE. A phone is 0.56 wide-to-tall and a laptop 1.78, and
// @hanzo/frame paints whichever master fits `object-fit: cover`. Hand-keeping
// two HTML files drifts the first time a line moves, so the beats are written
// once and only the density differs.

import { mkdirSync, writeFileSync, copyFileSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const data = (f) => JSON.parse(readFileSync(join(here, "..", "..", "lib", "data", f), "utf8"));

const FPS = 30;
const DUR = 21;

const catalog = data("catalog.json");
const pricing = data("pricing.json");

// ── movement 1 · the catalog ───────────────────────────────────────────────
// The house family first, then the models the gateway is asked for by name.
// `featured` is the catalog's own flag, so which models lead is commerce's
// answer and not this file's taste.
const strip = (s) => s.split(": ").pop();
const MODELS = [
  ...pricing.hanzoModels.filter((m) => m.family === "enso").map((m) => [m.fullName, m.name]),
  ...pricing.thirdPartyModels.filter((m) => m.featured).map((m) => [strip(m.name), m.id]),
];
if (MODELS.length < 8) throw new Error(`only ${MODELS.length} models to show — the snapshot is wrong`);
const { totalModels, providers } = pricing.summary;

// ── movement 2 · the afternoon ─────────────────────────────────────────────
// One org building a whole business out of the API, one real call at a time.
// The story and every operation are the catalog's; sync-catalog.mjs already
// held each path against the served document, so a call here cannot be one the
// API does not answer.
const TOUR = catalog.tour;
if (!TOUR?.beats?.length) throw new Error("the catalog carries no tour — refusing to invent calls");

// ── movement 3 · the cloud under them ──────────────────────────────────────
// Menu order, which is the order the sidebar beside it uses and the order
// CloudCategories renders on the page below. Depth (lib/data/stack.json) is a
// fact about the STACK diagram — film/stack and film/layer stand on it — and a
// console index is not a diagram.
const LAYERS = [...catalog.categories]
  .sort((a, b) => a.order - b.order)
  .map((c) => ({
    label: c.label,
    items: catalog.products
      .filter((p) => p.category === c.id)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((p) => p.name),
  }));

// The console's own nav. Overview, then every category the catalog carries — so
// the sidebar cannot name fewer layers than the pane beneath it lists, which is
// exactly how the previous apex film came to contradict its own page.
const NAV = ["Overview", ...LAYERS.map((l) => l.label)];
const AT_AI = 1 + LAYERS.findIndex((l) => l.label === "AI");
const AT_DEV = 1 + LAYERS.findIndex((l) => l.label === "Dev");
if (AT_AI === 0 || AT_DEV === 0) throw new Error("the catalog carries no AI or Dev category");

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// ── the two frames ─────────────────────────────────────────────────────────
// The window geometry is film/cloud's, unchanged, because every window on this
// site has to be the same window. What differs is DENSITY, and `s` is the whole
// of it: the tall master is 1080 across and a 390px phone shows it at 0.44, so
// type set for the wide frame arrives at eight pixels and reads as grey noise
// rather than as a console. The tall frame sets its own type a fifth larger and
// carries fewer rows for it — same window, right distance.
//
// `mono` is the ONE size `s` may not touch. The longest route the tour quotes is
// 38 characters, and the tall pane is 574px wide: at anything past 20px it runs
// out of the window, and a truncated route is a route the film got wrong.
const FRAMES = {
  tall: { w: 1080, h: 1920, win: 862, winH: 940, top: 490, s: 1.2, rows: 9, mrow: 64, call: 57, lrow: 54, mono: 20, id: 18, verb: 90, lab: 168, chips: 3 },
  wide: { w: 1920, h: 1080, win: 1480, winH: 700, top: 190, s: 1.0, rows: 8, mrow: 49, call: 41, lrow: 35, mono: 20, id: 16, verb: 78, lab: 168, chips: 5 },
};

const NAVH = 44;

/** A type size at this frame's density. */
const px = (f, n) => Math.round(n * f.s);

const page = (f) => {
  const models = MODELS.slice(0, f.rows);

  const modelRows = models
    .map(
      ([name, id], i) => `
                  <div class="mrow" id="m${i}"><span class="n">${esc(name)}</span><span class="id">${esc(id)}</span></div>`,
    )
    .join("");

  const callRows = TOUR.beats
    .map(
      (b, i) => `
                  <div class="call" id="c${i}"><i>${esc(b.method)}</i><span>${esc(b.path)}</span></div>`,
    )
    .join("");

  const layerRows = LAYERS.map(
    (l, i) => `
                  <div class="lrow" id="l${i}"><span class="lab">${esc(l.label)}</span><span class="chips">${l.items
                    .slice(0, f.chips)
                    .map((n) => `<b>${esc(n)}</b>`)
                    .join("")}</span></div>`,
  ).join("");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=${f.w}, height=${f.h}" />
    <title>Hanzo</title>
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
      .glow { position: absolute; left: 50%; top: ${Math.round(f.top - f.h * 0.14)}px;
        width: ${Math.round(f.w * 1.15)}px; height: ${Math.round(f.h * 0.55)}px;
        margin-left: ${-Math.round(f.w * 0.575)}px; border-radius: 9999px;
        background: rgba(255,255,255,0.055); filter: blur(200px); }

      .win { position: absolute; left: 50%; top: ${f.top}px; width: ${f.win}px; height: ${f.winH}px;
        margin-left: ${-f.win / 2}px; background: #050505;
        border: 1px solid #1f1f1f; border-radius: 16px; overflow: hidden;
        box-shadow: 0 40px 120px rgba(0,0,0,0.9), inset 0 1px 0 0 rgba(255,255,255,0.05); }
      .bar { display: flex; align-items: center; gap: 14px; height: 54px; padding: 0 20px; border-bottom: 1px solid #171717; background: #0a0a0a; }
      .dots { display: flex; gap: 8px; }
      .dots i { width: 11px; height: 11px; border-radius: 999px; background: #232323; display: block; }
      /* Three crumbs stacked, one per movement. They cross-fade with their pane
         rather than being rewritten by a callback: a seek lands on a frame, and
         a frame has to be able to state itself without having watched the ones
         before it. */
      .crumbs { position: relative; flex: 1; height: 54px; }
      .crumb { position: absolute; left: 0; top: 0; height: 54px; display: flex; align-items: center;
        font-size: ${px(f, 18)}px; color: #8a8a8a; white-space: nowrap; }
      .bar .who { font-family: "Geist Mono", monospace; font-size: ${px(f, 17)}px; color: #777777; }

      .body { display: grid; grid-template-columns: 232px 1fr; height: calc(100% - 54px); }
      .side { position: relative; border-right: 1px solid #171717; padding: 18px 12px; background: #030303; }
      /* The highlight is ONE element that slides down the nav in y. A second
         copy of the list per movement would be the same list three times. */
      .pill { position: absolute; left: 12px; top: 18px; width: 208px; height: ${NAVH}px;
        border-radius: 9px; background: #171717; }
      .side a { position: relative; display: flex; align-items: center; height: ${NAVH}px;
        padding: 0 14px; border-radius: 9px; font-size: ${px(f, 19)}px; color: #ffffff; opacity: 0.55; }

      .main { position: relative; height: 100%; }
      .pane { position: absolute; inset: 0; padding: 26px 28px; overflow: hidden; }
      .h { font-size: ${px(f, 30)}px; font-weight: 600; color: #fff; letter-spacing: -0.6px; }
      .sub { margin-top: 8px; font-size: ${px(f, 18)}px; color: #8a8a8a; }
      .count { margin-top: 6px; font-family: "Geist Mono", monospace; font-size: ${px(f, 18)}px; color: #777777; }

      /* FRAME 0 IS THE POSTER. <Frame> ships the first frame as the still, so a
         film that builds its content up from nothing publishes an empty console
         to every reader who has not yet loaded the video. Every row is present
         from the first frame and only BRIGHTENS. */
      .rows { margin-top: 20px; display: flex; flex-direction: column; }

      .mrow { display: flex; align-items: center; justify-content: space-between; gap: 20px;
        height: ${f.mrow}px; padding: 0 16px; margin-bottom: 8px; border: 1px solid #1a1a1a;
        border-radius: 10px; background: #0a0a0a; opacity: 0.55; }
      .mrow .n { font-size: ${px(f, 20)}px; color: #ededed; white-space: nowrap; }
      .mrow .id { font-family: "Geist Mono", monospace; font-size: ${f.id}px; color: #7d7d7d;
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

      .call { display: flex; align-items: center; gap: 16px; height: ${f.call}px; opacity: 0.55; }
      .call i { font-family: "Geist Mono", monospace; font-style: normal; font-size: ${px(f, 14)}px;
        letter-spacing: 0.04em; color: #9a9a9a; border: 1px solid #262626; border-radius: 6px;
        padding: 3px 9px; width: ${f.verb}px; text-align: center; flex: none; }
      .call span { font-family: "Geist Mono", monospace; font-size: ${f.mono}px; color: #c8c8c8; white-space: nowrap; }

      .lrow { display: flex; align-items: center; gap: 16px; height: ${f.lrow}px; padding: 0 14px;
        margin-bottom: ${f.lrow > 40 ? 8 : 5}px; border: 1px solid #1a1a1a; border-radius: 10px;
        background: #0a0a0a; opacity: 0.55; }
      .lrow .lab { width: ${f.lab}px; flex: none; font-size: ${px(f, 19)}px; color: #ededed; }
      .lrow .chips { display: flex; gap: 7px; overflow: hidden; }
      .lrow .chips b { font-family: "Geist Mono", monospace; font-weight: 400; font-size: ${px(f, 15)}px;
        color: #8a8a8a; border: 1px solid #232323; border-radius: 999px; padding: 4px ${f.s > 1 ? 9 : 11}px;
        white-space: nowrap; }

      /* What the ten add up to, stated as the console's own footer. */
      .plane { display: flex; align-items: center; gap: 12px; margin-top: 18px; padding: 14px 18px;
        border: 1px solid #303030; border-radius: 11px; background: #111; opacity: 0.55; }
      .plane .dot { width: 9px; height: 9px; border-radius: 999px; background: #fff; flex: none; }
      .plane .name { font-size: ${px(f, 19)}px; color: #fff; }
      .plane .addr { margin-left: auto; font-family: "Geist Mono", monospace; font-size: ${px(f, 16)}px; color: #8f8f8f; }

      /* The movement the film opens on is PAINTED; the other two are not. */
      #p2, #p3, #k2, #k3 { opacity: 0; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${DUR}" data-width="${f.w}" data-height="${f.h}" data-fps="${FPS}">
      <div class="bg"></div>
      <div class="glow"></div>
      <div class="win">
        <div class="bar">
          <div class="dots"><i></i><i></i><i></i></div>
          <div class="crumbs">
            <div class="crumb" id="k1">Hanzo Cloud &middot; AI &middot; Models</div>
            <div class="crumb" id="k2">Hanzo Cloud &middot; Dev &middot; API</div>
            <div class="crumb" id="k3">Hanzo Cloud &middot; Overview</div>
          </div>
          <div class="who">z@hanzo.ai</div>
        </div>
        <div class="body">
          <div class="side">
            <div class="pill" id="pill"></div>
            ${NAV.map((n, i) => `<a id="n${i}">${esc(n)}</a>`).join("\n            ")}
          </div>
          <div class="main">
            <div class="pane" id="p1">
              <div class="h">Models</div>
              <div class="sub">The house Enso family, and every model the gateway serves.</div>
              <div class="count">${totalModels} models &middot; ${providers} providers</div>
              <div class="rows">${modelRows}</div>
            </div>

            <div class="pane" id="p2">
              <div class="h">API</div>
              <div class="sub">${esc(TOUR.story)}</div>
              <div class="rows">${callRows}</div>
            </div>

            <div class="pane" id="p3">
              <div class="h">Overview</div>
              <div class="sub">Every layer of the cloud, behind one address.</div>
              <div class="rows">${layerRows}</div>
              <div class="plane" id="plane">
                <span class="dot"></span>
                <span class="name">One cloud</span>
                <span class="addr">api.hanzo.ai/v1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <script>
      // y and opacity only. A layout property snaps to integer device pixels and
      // stutters under the frame-seek capture engine, which the renderer refuses
      // by name (gsap_non_transform_motion).
      const tl = gsap.timeline();
      const IN = "power3.out";
      const H = ${NAVH};

      // The nav highlight rides down to Dev and back up to Overview, which is
      // the film's whole shape: into one layer, across the surface, then out to
      // see all ten.
      gsap.set("#pill", { y: ${AT_AI} * H });
      gsap.set("#n${AT_AI}", { opacity: 1 });

      // ── movement 1 · the catalog ────────────────────────────────────────
      ${models
        .map(
          (_, i) =>
            `tl.fromTo("#m${i}", { opacity: 0.55, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: IN }, ${(0.35 + i * 0.17).toFixed(2)});`,
        )
        .join("\n      ")}

      // ── movement 2 · the afternoon ──────────────────────────────────────
      tl.to("#p1", { opacity: 0, duration: 0.4 }, 6.2);
      tl.to("#k1", { opacity: 0, duration: 0.25 }, 6.2);
      tl.to("#n${AT_AI}", { opacity: 0.55, duration: 0.4 }, 6.2);
      tl.to("#pill", { y: ${AT_DEV} * H, duration: 0.6, ease: "power2.inOut" }, 6.3);
      tl.to("#n${AT_DEV}", { opacity: 1, duration: 0.4 }, 6.6);
      tl.to("#k2", { opacity: 1, duration: 0.3 }, 6.6);
      tl.to("#p2", { opacity: 1, duration: 0.4 }, 6.65);
      ${TOUR.beats
        .map(
          (_, i) =>
            `tl.fromTo("#c${i}", { opacity: 0.55, y: 10 }, { opacity: 1, y: 0, duration: 0.42, ease: IN }, ${(7.05 + i * 0.42).toFixed(2)});`,
        )
        .join("\n      ")}

      // ── movement 3 · the cloud under them ───────────────────────────────
      tl.to("#p2", { opacity: 0, duration: 0.4 }, 12.9);
      tl.to("#k2", { opacity: 0, duration: 0.25 }, 12.9);
      tl.to("#n${AT_DEV}", { opacity: 0.55, duration: 0.4 }, 12.9);
      tl.to("#pill", { y: 0, duration: 0.7, ease: "power2.inOut" }, 13.0);
      tl.to("#n0", { opacity: 1, duration: 0.4 }, 13.4);
      tl.to("#k3", { opacity: 1, duration: 0.3 }, 13.4);
      tl.to("#p3", { opacity: 1, duration: 0.45 }, 13.35);
      ${LAYERS.map(
        (_, i) =>
          `tl.fromTo("#l${i}", { opacity: 0.55, y: 12 }, { opacity: 1, y: 0, duration: 0.45, ease: IN }, ${(13.8 + i * 0.26).toFixed(2)});`,
      ).join("\n      ")}
      tl.fromTo("#plane", { opacity: 0.55, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: IN }, ${(13.8 + LAYERS.length * 0.26).toFixed(2)});

      // ── the hold ────────────────────────────────────────────────────────
      // The last motion lands at ${(13.8 + LAYERS.length * 0.26 + 0.6).toFixed(2)} and the console then simply stays,
      // whole, for the remaining ${(DUR - (13.8 + LAYERS.length * 0.26 + 0.6)).toFixed(1)}s. That final frame is what every
      // reduced-motion reader is served instead of the film, so it has to be the
      // product at rest rather than a beat caught halfway.
      tl.to({}, { duration: ${(DUR - (13.8 + LAYERS.length * 0.26 + 0.6)).toFixed(2)} });
      window.__timelines = window.__timelines || {};
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>`;
};

for (const [name, f] of Object.entries(FRAMES)) {
  const dir = join(here, name);
  mkdirSync(join(dir, "assets"), { recursive: true });
  for (const a of readdirSync(join(here, "assets"))) copyFileSync(join(here, "assets", a), join(dir, "assets", a));
  writeFileSync(join(dir, "index.html"), page(f));
  console.log(`  ${name}  ${f.w}x${f.h}  ${DUR}s  ${Math.min(MODELS.length, f.rows)} models · ${TOUR.beats.length} calls · ${LAYERS.length} layers`);
}
