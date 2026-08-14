// The cloud hero film — one story, two frames.
//
// A phone is 0.56 wide-to-tall and a laptop is 1.78, and `object-fit: cover`
// crops whichever master it is handed to whatever shape the screen is. So the
// film is composed twice, and both come from here: the beats, the copy and the
// chrome are written once and only the arrangement differs. Two hand-kept HTML
// files would drift the first time a line of copy changed.
//
// Everything on screen is the real product. The categories are the taxonomy in
// lib/data/cloud-primitives.ts, the counts are the ones lib/data/pricing.json
// publishes, the Playground's seven modes are the seven the console renders,
// and the faces are the two the design system allows. Nothing is invented: a
// number that cannot be traced to those files is not in the film.
//
// It ends on the console, running. Not on a wordmark and not on a URL — the
// visitor reading this is already here.
//
//   node film.mjs        # writes tall/index.html and wide/index.html

import { mkdirSync, writeFileSync, copyFileSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

const DUR = 18;
const FPS = 30;

// ── the product, as it really is ───────────────────────────────────────────
const DEPLOY = "npx @hanzo/cloud deploy";
// How many models we serve is owned by lib/data/pricing.json — the same
// snapshot every price on this site comes from — and is READ here rather than
// typed. A number typed into a film is a number that goes stale silently, and
// the repo already fails the build on a hand-typed count for exactly that
// reason (scripts/audit-model-counts.mjs). Re-run this generator after
// `pnpm sync:pricing` and the film says whatever the catalog now says.
const { summary } = JSON.parse(
  readFileSync(join(here, "..", "..", "lib", "data", "pricing.json"), "utf8")
);
const MODELS = summary.totalModels;
const PROVIDERS = summary.providers;
// lib/data/cloud-primitives.ts → the category titles, in order.
const NAV = ["Overview", "AI", "Compute", "Data", "Network", "Security", "Observe", "Platform"];
// The console's own model catalog: the house Enso tiers, then the families the
// gateway serves (ModelCatalogModule's subtitle names these four).
const ROWS = [
  ["Enso Flash", "hanzo", "Fast"],
  ["Enso Blend", "hanzo", "Balanced"],
  ["Enso Ultra", "hanzo", "Frontier"],
  ["Claude Sonnet", "anthropic", "Frontier"],
  ["Llama", "meta", "Open"],
  ["Qwen", "qwen", "Open"],
  ["DeepSeek", "deepseek", "Open"],
];
// PlaygroundModule's TABS, verbatim.
const MODES = ["Chat", "Completions", "Embeddings", "Image", "Video", "Audio", "Vision"];
const PROMPT = "summarise this quarter's support tickets";
const REPLY =
  "Three themes account for most of the volume: billing questions after the plan change, SSO setup on new orgs, and rate limits during batch jobs.";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// ── the two frames ─────────────────────────────────────────────────────────
// `win` is the console's width and `top` centres it. There is no caption band:
// the film speaks in the product's own chrome, so nothing is set outside the
// window to be read.
// The FRAME shape is not free — @hanzo/frame paints the film `object-fit: cover`
// edge to edge, so a master must already be the shape of the screen it serves.
// Cropping these down to the window itself sounds tidier and cuts 192px off each
// side of the console on a 390x844 phone.
// The window is sized to its CONTENT, not to the frame. An 1180px-tall console
// holding 700px of Playground ends the film on a half-empty pane — and the last
// frame is exactly the one a reduced-motion viewer is served, so it has to be
// the product looking used.
const FRAMES = {
  tall: { w: 1080, h: 1920, win: 862, winH: 940, top: 490 },
  wide: { w: 1920, h: 1080, win: 1480, winH: 700, top: 190 },
};

const page = (f) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=${f.w}, height=${f.h}" />
    <title>Hanzo Cloud</title>
    <script src="./assets/gsap.min.js"></script>
    <style>
      /* The two faces the design system allows, self-hosted so the render never
         waits on a network that headless Chrome may not have. */
      @font-face { font-family: "Geist"; src: url("./assets/geist.woff2") format("woff2"); font-weight: 100 900; font-display: block; }
      @font-face { font-family: "Geist Mono"; src: url("./assets/geist-mono.woff2") format("woff2"); font-weight: 100 900; font-display: block; }

      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: ${f.w}px; height: ${f.h}px; overflow: hidden; background: #000; }
      body { font-family: "Geist", system-ui, sans-serif; color: #ededed; -webkit-font-smoothing: antialiased; }
      #root { position: relative; width: ${f.w}px; height: ${f.h}px; overflow: hidden; }
      .clip { position: absolute; inset: 0; }

      /* A full-bleed fill lives on a CHILD, never on the root. */
      .bg { position: absolute; inset: 0; background: #000; }
      .glow {
        position: absolute; left: 50%; top: ${Math.round(f.top - f.h * 0.22)}px;
        width: ${Math.round(f.w * 1.25)}px; height: ${Math.round(f.h * 0.5)}px;
        margin-left: ${-Math.round(f.w * 0.625)}px; border-radius: 9999px;
        background: rgba(255,255,255,0.055); filter: blur(200px);
      }


      /* ── the console window ── */
      .win {
        position: absolute; left: 50%; top: ${f.top}px; width: ${f.win}px; height: ${f.winH}px;
        margin-left: ${-f.win / 2}px; background: #050505;
        border: 1px solid #1f1f1f; border-radius: 16px; overflow: hidden;
        box-shadow: 0 40px 120px rgba(0,0,0,0.9), inset 0 1px 0 0 rgba(255,255,255,0.05);
      }
      .bar { display: flex; align-items: center; gap: 14px; height: 54px; padding: 0 20px; border-bottom: 1px solid #171717; background: #0a0a0a; }
      .dots { display: flex; gap: 8px; }
      .dots i { width: 11px; height: 11px; border-radius: 999px; background: #232323; display: block; }
      .bar .who { margin-left: auto; font-family: "Geist Mono", monospace; font-size: 17px; color: #777777; }
      .bar .crumb { font-size: 18px; color: #8a8a8a; }

      .body { display: grid; grid-template-columns: 232px 1fr; height: calc(100% - 54px); }
      .side { border-right: 1px solid #171717; padding: 18px 12px; background: #030303; }
      .side a { display: block; padding: 11px 14px; border-radius: 9px; font-size: 19px; color: #8a8a8a; text-decoration: none; }
      .side a.on { background: #171717; color: #fff; }

      .main { position: relative; padding: 26px 28px; overflow: hidden; }
      .pane { position: absolute; inset: 0; padding: 26px 28px; }
      .h { font-size: 30px; font-weight: 600; color: #fff; letter-spacing: -0.6px; }
      .sub { margin-top: 8px; font-size: 19px; color: #8a8a8a; }
      .count { margin-top: 6px; font-family: "Geist Mono", monospace; font-size: 18px; color: #777777; }

      /* terminal */
      .term { font-family: "Geist Mono", monospace; font-size: 22px; line-height: 1.85; color: #ededed; padding-top: 6px; }
      .term .p { color: #777777; }
      .term .out { color: #8a8a8a; }
      .term .ok { color: #ededed; }
      #caret { display: inline-block; width: 11px; height: 24px; background: #ededed; vertical-align: -4px; margin-left: 3px; }

      /* model rows */
      .rows { margin-top: 22px; border-top: 1px solid #171717; }
      .row { display: grid; grid-template-columns: 1fr 150px 128px; align-items: center; gap: 10px; padding: 15px 4px; border-bottom: 1px solid #131313; font-size: 20px; }
      .row .n { color: #ededed; }
      .row .p { font-family: "Geist Mono", monospace; font-size: 17px; color: #777777; }
      .row .t { justify-self: end; font-size: 16px; color: #8a8a8a; border: 1px solid #232323; border-radius: 999px; padding: 4px 12px; }

      /* playground */
      .modes { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }
      .modes b { font-weight: 500; font-size: 17px; color: #8a8a8a; border: 1px solid #232323; border-radius: 999px; padding: 7px 15px; }
      .modes b.on { background: #ededed; color: #000; border-color: #ededed; }
      .ask { margin-top: 24px; border: 1px solid #232323; border-radius: 12px; padding: 16px 18px; font-size: 20px; color: #ededed; background: #0a0a0a; }
      .ask span { color: #777777; }
      .run { display: grid; grid-template-columns: 1fr 232px; gap: 26px; margin-top: 20px; }
      .reply { font-size: 20px; line-height: 1.6; color: #ededed; }
      .who2 { font-family: "Geist Mono", monospace; font-size: 16px; color: #777777; margin-bottom: 9px; }
      .rail { border: 1px solid #171717; border-radius: 12px; padding: 15px 16px; background: #0a0a0a; align-self: start; }
      .set { display: flex; justify-content: space-between; gap: 12px; padding: 8px 0; font-size: 17px; color: #8a8a8a; border-top: 1px solid #131313; }
      .set b { font-family: "Geist Mono", monospace; font-weight: 400; color: #ededed; }

      /* Frame 0 is the poster and the frame playback starts on, so the opening
         beat is PAINTED, not animated in. */
      .win, #term { opacity: 1; visibility: visible; }
      #models, #play { opacity: 0; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${DUR}" data-width="${f.w}" data-height="${f.h}" data-fps="${FPS}">
      <section id="scene" class="clip" data-start="0" data-duration="${DUR}" data-track-index="1">
        <div class="bg"></div>
        <div class="glow"></div>


        <div class="win" id="win">
          <div class="bar">
            <div class="dots"><i></i><i></i><i></i></div>
            <div class="crumb" id="crumb">Hanzo Cloud</div>
            <div class="who">z@hanzo.ai</div>
          </div>
          <div class="body">
            <div class="side" id="side">
              ${NAV.map((n, i) => `<a class="${i === 0 ? "on" : ""}" id="nav${i}">${n}</a>`).join("\n              ")}
            </div>
            <div class="main">
              <div class="pane" id="term">
                <div class="term">
                  <div><span class="p">$</span> <span id="typed"></span><i id="caret"></i></div>
                  <div class="out" id="o1">resolving org &middot; hanzo</div>
                  <div class="out" id="o2">provisioning &middot; ai &middot; data &middot; network</div>
                  <div class="ok" id="o3">ready</div>
                </div>
              </div>

              <div class="pane" id="models">
                <div class="h">Models</div>
                <div class="sub">The house Enso family plus every model the gateway serves.</div>
                <div class="count">${MODELS} models &middot; ${PROVIDERS} providers</div>
                <div class="rows">
                  ${ROWS.map(
                    ([n, p, t], i) =>
                      `<div class="row" id="r${i}"><div class="n">${n}</div><div class="p">${p}</div><div class="t">${t}</div></div>`
                  ).join("\n                  ")}
                </div>
              </div>

              <div class="pane" id="play">
                <div class="h">Playground</div>
                <div class="sub">Test models, iterate prompts, and build with real-time responses.</div>
                <div class="modes">${MODES.map((m, i) => `<b class="${i === 0 ? "on" : ""}">${m}</b>`).join("")}</div>
                <div class="ask"><span>&rsaquo;</span> <span id="ptyped" style="color:#ededed"></span></div>
                <div class="run">
                  <div class="reply" id="rep"><div class="who2">assistant</div><span id="rtyped"></span></div>
                  <!-- The rail the Playground really carries. Controls, not
                       measurements: a throughput or a cost printed here would be
                       a number this film invented. -->
                  <div class="rail" id="rail">
                    <div class="who2">Model settings</div>
                    <div class="set"><span>Model</span><b>enso-flash</b></div>
                    <div class="set"><span>Temperature</span><b>0.7</b></div>
                    <div class="set"><span>Max tokens</span><b>2048</b></div>
                    <div class="set"><span>Stream</span><b>on</b></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <script>
      window.__timelines = window.__timelines || {};
      const tl = gsap.timeline({ paused: true });
      const IN = "power3.out";
      const OUT = "power2.in";

      // A caption arrives from below and leaves upward — the same move both
      // ways, so the two never look like different kinds of event.

      // Type a string into a node by advancing an index, so every frame between
      // two keystrokes is a real state of the string and a seek lands mid-word
      // exactly where it should.
      const type = (node, text, from, to) => {
        const n = { i: 0 };
        tl.to(n, {
          i: text.length, duration: to - from, ease: "none", snap: { i: 1 },
          onUpdate() { node.textContent = text.slice(0, n.i); },
        }, from);
      };

      const $ = (s) => document.querySelector(s);

      // ── beat 1 · the command ────────────────────────────────────────────
      type($("#typed"), ${JSON.stringify(DEPLOY)}, 0.5, 2.6);
      tl.fromTo("#caret", { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.42, ease: "none", yoyo: true, repeat: 5 }, 0.5);
      tl.to("#caret", { autoAlpha: 0, duration: 0.2 }, 2.7);
      tl.fromTo("#o1", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, 2.95);
      tl.fromTo("#o2", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, 3.35);
      tl.fromTo("#o3", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, 3.8);

      // ── beat 2 · the console ────────────────────────────────────────────
      tl.to("#term", { autoAlpha: 0, duration: 0.4, ease: OUT }, 4.5);
      tl.to("#crumb", { autoAlpha: 0, duration: 0.2 }, 4.5);
      tl.call(() => { $("#crumb").textContent = "Models"; $("#nav0").classList.remove("on"); $("#nav1").classList.add("on"); }, null, 4.72);
      tl.to("#crumb", { autoAlpha: 1, duration: 0.25 }, 4.78);
      tl.fromTo("#models", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.45, ease: IN }, 4.9);
      ${ROWS.map((_, i) => `tl.fromTo("#r${i}", { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.36, ease: IN }, ${(5.3 + i * 0.19).toFixed(2)});`).join("\n      ")}

      // ── beat 3 · the playground ─────────────────────────────────────────
      tl.to("#models", { autoAlpha: 0, duration: 0.4, ease: OUT }, 8.7);
      tl.to("#crumb", { autoAlpha: 0, duration: 0.2 }, 8.7);
      tl.call(() => { $("#crumb").textContent = "Playground"; $("#nav1").classList.remove("on"); $("#nav1").classList.add("on"); }, null, 8.92);
      tl.to("#crumb", { autoAlpha: 1, duration: 0.25 }, 8.98);
      tl.fromTo("#play", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.45, ease: IN }, 9.05);
      type($("#ptyped"), ${JSON.stringify(PROMPT)}, 9.5, 11.4);
      tl.fromTo("#rep", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, 11.75);
      type($("#rtyped"), ${JSON.stringify(REPLY)}, 11.9, 15.2);

      // ── the hold ────────────────────────────────────────────────────────
      // The last motion ends at 15.2 and the console simply stays, running, for
      // the remaining ${(DUR - 15.2).toFixed(1)}s. The final frame is what a
      // reduced-motion viewer is served, so it has to be the product at rest.
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`;

for (const [name, f] of Object.entries(FRAMES)) {
  const dir = join(here, name);
  mkdirSync(join(dir, "assets"), { recursive: true });
  for (const a of readdirSync(join(here, "assets"))) copyFileSync(join(here, "assets", a), join(dir, "assets", a));
  writeFileSync(join(dir, "index.html"), page(f));
  console.log(`${name}  ${f.w}x${f.h}  ${DUR}s`);
}
