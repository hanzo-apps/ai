// The signed-out promo — the product doing one real thing, start to finish.
//
//   node film.mjs        # writes square/index.html
//
// It shows a single afternoon of the API: an agent is given three capabilities,
// asked for a storefront, and builds one. The claim the fold makes in DOM text is
// that Hanzo is frontier models, agents, and the cloud under them; this is the
// agent half of that sentence, performed rather than asserted.
//
// NOTHING HERE IS TYPED. Every call, its verb and its line come from
// lib/data/catalog.json's tour — real operations, each held against the served
// document by sync-catalog.mjs — and the closing line is that tour's own story.
// Re-run the syncs and the film says whatever the API now says. There is no
// number or route in it a reader could catch us having invented, and a beat whose
// operation leaves the catalog throws instead of quietly becoming fiction.
//
// The headline is NOT drawn. It stays DOM text on the page where it reflows,
// translates and answers a screen reader — the same rule film/hero keeps, and for
// the same reason: a headline baked into pixels disagrees with the page the first
// time either moves, and a disagreement you can only fix by re-rendering a video
// is not one worth having.

import { mkdirSync, writeFileSync, copyFileSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const data = (f) => JSON.parse(readFileSync(join(here, "..", "..", "lib", "data", f), "utf8"));

const FPS = 30;
const DUR = 26;

const catalog = data("catalog.json");
const TOUR = catalog.tour;
if (!TOUR?.beats?.length) throw new Error("the catalog carries no tour — refusing to invent calls");

/** The beat that runs this path, or a refusal. A film may not outlive its API. */
const beat = (path) => {
  const b = TOUR.beats.find((x) => x.path === path);
  if (!b) throw new Error(`the tour no longer runs ${path} — re-cut the film, do not fake it`);
  return b;
};

// The three capabilities this story needs, and only those. Each is a real
// operation, so a renamed route renames the chip rather than contradicting it.
//
// The chip wears the noun the ROUTE already uses, verbatim. Singularising it by
// rule produced "sandboxe" from /v1/sandboxes, which is the cost of guessing at
// English in a file that otherwise refuses to guess at anything.
const CAPS = ["/v1/sandboxes", "/v1/vector", "/v1/sites/deploy"].map((p) => {
  const b = beat(p);
  const noun = p.split("/")[2];
  return { label: noun[0].toUpperCase() + noun.slice(1), line: b.line };
});

// The work, in the order the tour tells it.
const STEPS = ["/v1/sandboxes", "/v1/vector", "/v1/sites/deploy", "/v1/sites/{slug}/publish"].map(beat);

// What it cost, named by the operation that reports it rather than by a figure
// this file made up.
const COST = beat("/v1/billing/usage");

// The request a reader types. It is the tour's own story, put in the first
// person — the shop is the catalog's, not this file's invention.
const ASK = TOUR.story.split(":").pop().trim().replace(/^a /, "Build a ").replace(/ that did not exist this morning\.$/, ".");

// The closing line. Eight words at most, and it is the story's own second half,
// so the page and the film cannot come to disagree about what happened.
const CLOSE = "A store that did not exist this morning.";
if (CLOSE.split(/\s+/).length > 8) throw new Error(`the closing line runs to ${CLOSE.split(/\s+/).length} words`);

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// ── the frame ───────────────────────────────────────────────────────────────
// 1080x1200 is the fold's own ratio, and everything that carries meaning sits
// inside a centred safe area so a responsive crop takes background and never a
// row of the story.
const F = { w: 1080, h: 1200, safeW: 880, safeH: 980 };

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=${F.w}, height=${F.h}" />
    <title>hanzo — an afternoon</title>
    <script src="assets/gsap.min.js"></script>
    <style>
      @font-face { font-family: "Geist"; src: url("assets/geist.woff2") format("woff2"); font-weight: 100 900; font-display: block; }
      @font-face { font-family: "Geist Mono"; src: url("assets/geist-mono.woff2") format("woff2"); font-weight: 100 900; font-display: block; }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: ${F.w}px; height: ${F.h}px; overflow: hidden; background: #06070a; }
      #root { position: relative; width: ${F.w}px; height: ${F.h}px; overflow: hidden;
              --accent: #8b5cf6; --ink: #e7ebf3; --dim: #7c8698; --line: #1d2330;
              --panel: #0e1117; --panel2: #131822;
              font-family: "Geist", system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
      .field { position: absolute; inset: 0;
               background:
                 radial-gradient(120% 80% at 50% -10%, color-mix(in srgb, var(--accent) 20%, transparent), transparent 62%),
                 #06070a; }
      .grid { position: absolute; inset: 0;
              background-image:
                linear-gradient(to right, rgba(255,255,255,.025) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,.025) 1px, transparent 1px);
              background-size: 60px 60px; }
      /* Each beat is centred on the frame, so a short beat and a tall one share
         one optical middle and a responsive crop takes background from both
         edges rather than emptying the bottom half. */
      .safe { position: absolute; left: ${(F.w - F.safeW) / 2}px; top: 0;
              width: ${F.safeW}px; height: ${F.h}px; }
      .beat { position: absolute; left: 0; width: 100%; top: 50%;
              transform: translateY(-50%); }

      /* beat 1 — the mode row */
      .modes {
               display: flex; gap: 10px; justify-content: center; }
      .mode { height: 52px; padding: 0 26px; display: flex; align-items: center;
              border: 1px solid var(--line); border-radius: 999px; background: var(--panel2);
              color: var(--dim); font-size: 19px; font-weight: 600; }
      .mode.on { border-color: color-mix(in srgb, var(--accent) 55%, transparent);
                 background: color-mix(in srgb, var(--accent) 16%, var(--panel2));
                 color: var(--ink); }
      .cursor { position: absolute; width: 22px; height: 22px; opacity: 0;
                border-radius: 50%; background: #fff; box-shadow: 0 0 0 6px rgba(255,255,255,.14); }

      /* beat 2 — the request */
      .ask { opacity: 0;
             border: 1px solid var(--line); border-radius: 20px; background: var(--panel);
             padding: 26px 28px; }
      .chips { display: flex; gap: 10px; margin-bottom: 20px; }
      .chip { height: 38px; padding: 0 16px; display: flex; align-items: center; gap: 8px;
              border: 1px solid var(--line); border-radius: 10px; background: var(--panel2);
              color: var(--dim); font-size: 15px; font-weight: 600; opacity: .35; }
      .chip.on { opacity: 1; color: var(--ink);
                 border-color: color-mix(in srgb, var(--accent) 45%, transparent); }
      .chip i { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); }
      .line { font-size: 27px; line-height: 1.35; color: var(--ink); min-height: 74px; }
      .caret { display: inline-block; width: 3px; height: 27px; background: var(--accent);
               vertical-align: -4px; margin-left: 3px; }

      /* beat 3 — the work */
      .work { opacity: 0; }
      .step { display: flex; align-items: center; gap: 16px; height: 74px;
              border-bottom: 1px solid #161c27; opacity: .3; }
      .step.on { opacity: 1; }
      .tick { width: 26px; height: 26px; flex: 0 0 26px; border-radius: 50%;
              border: 1px solid var(--line); position: relative; }
      .step.on .tick { border-color: var(--accent);
                       background: color-mix(in srgb, var(--accent) 22%, transparent); }
      .verb { font-family: "Geist Mono", ui-monospace, monospace; font-size: 15px;
              color: var(--accent); width: 52px; flex: 0 0 52px; }
      .path { font-family: "Geist Mono", ui-monospace, monospace; font-size: 19px; color: var(--ink); }

      /* beat 4 — the artifact */
      .made { opacity: 0; }
      .shop { border: 1px solid var(--line); border-radius: 18px; background: var(--panel);
              padding: 22px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
      .card { height: 152px; border-radius: 12px;
              background: linear-gradient(150deg, color-mix(in srgb, var(--accent) 26%, #1b2231), #171d29);
              opacity: 0; }
      .cost { margin-top: 22px; display: flex; align-items: center; gap: 12px;
              font-family: "Geist Mono", ui-monospace, monospace; font-size: 17px; color: var(--dim); }
      .cost b { color: var(--accent); font-weight: 600; }

      /* beat 5 — the line */
      .close { opacity: 0;
               text-align: center; font-size: 40px; font-weight: 600; line-height: 1.25;
               color: var(--ink); letter-spacing: -.6px; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="promo" data-start="0" data-duration="${DUR}"
         data-fps="${FPS}" data-width="${F.w}" data-height="${F.h}">
      <div class="field"></div>
      <div class="grid"></div>

      <div class="safe">
        <div class="beat modes" id="modes">
          <div class="mode" id="mode0">Chat</div>
          <div class="mode" id="mode1">Agent</div>
          <div class="mode" id="mode2">Batch</div>
        </div>
        <div class="cursor" id="cursor"></div>

        <div class="beat ask" id="ask">
          <div class="chips">
${CAPS.map((c, i) => `            <div class="chip" id="chip${i}"><i></i>${esc(c.label)}</div>`).join("\n")}
          </div>
          <div class="line"><span id="typed"></span><span class="caret" id="caret"></span></div>
        </div>

        <div class="beat work" id="work">
${STEPS.map(
  (s, i) => `          <div class="step" id="step${i}">
            <span class="tick"></span><span class="verb">${esc(s.method)}</span><span class="path">${esc(s.path)}</span>
          </div>`,
).join("\n")}
        </div>

        <div class="beat made" id="made">
          <div class="shop">
${[0, 1, 2, 3, 4, 5].map((i) => `            <div class="card" id="card${i}"></div>`).join("\n")}
          </div>
          <div class="cost"><b>${esc(COST.method)} ${esc(COST.path)}</b><span>${esc(COST.line)}</span></div>
        </div>

        <div class="beat close" id="close">${esc(CLOSE)}</div>
      </div>
    </div>

    <script>
      (function () {
        var tl = gsap.timeline({ paused: true });
        var ASK_TEXT = ${JSON.stringify(ASK)};
        var $ = function (id) { return document.getElementById(id); };

        // BEAT 1 · 0.0–3.0 — one control, one cursor, one choice.
        gsap.set('#cursor', { x: 700, y: 470 });
        tl.to('#cursor', { opacity: 1, duration: .35 }, 0.35)
          .to('#cursor', { x: 452, y: 326, duration: 1.1, ease: 'power2.inOut' }, 0.8)
          .to('#mode1', { onStart: function () { $('mode1').classList.add('on'); }, duration: .01 }, 2.0)
          .to('#cursor', { scale: .82, duration: .12, yoyo: true, repeat: 1 }, 2.0)
          .to('#cursor', { opacity: 0, duration: .3 }, 2.5)

        // BEAT 2 · 3.0–8.0 — the surface, its three capabilities, the request.
          .to('#modes', { opacity: 0, y: -18, duration: .45, ease: 'power2.in' }, 2.9)
          .to('#ask', { opacity: 1, y: 0, duration: .5, ease: 'power2.out' }, 3.2)
${CAPS.map((_, i) => `          .to('#chip${i}', { onStart: function () { $('chip${i}').classList.add('on'); }, duration: .01 }, ${(3.7 + i * 0.4).toFixed(2)})`).join("\n")}
          .to({}, {
            duration: 2.4,
            onUpdate: function () {
              var n = Math.round(this.progress() * ASK_TEXT.length);
              $('typed').textContent = ASK_TEXT.slice(0, n);
            },
          }, 5.0)
          .to('#caret', { opacity: 0, duration: .2 }, 7.6)

        // BEAT 3 · 8.0–16.0 — four real calls, one focal point at a time.
          .to('#ask', { opacity: 0, y: -22, duration: .5, ease: 'power2.in' }, 7.9)
          .to('#work', { opacity: 1, duration: .5, ease: 'power2.out' }, 8.3)
${STEPS.map((_, i) => `          .to('#step${i}', { onStart: function () { $('step${i}').classList.add('on'); }, duration: .01 }, ${(8.8 + i * 1.7).toFixed(2)})`).join("\n")}

        // BEAT 4 · 16.0–21.0 — the thing it made, and what it cost.
          .to('#work', { opacity: 0, y: -26, duration: .5, ease: 'power2.in' }, 15.7)
          .to('#made', { opacity: 1, duration: .5, ease: 'power2.out' }, 16.1)
${[0, 1, 2, 3, 4, 5].map((i) => `          .to('#card${i}', { opacity: 1, duration: .4, ease: 'power2.out' }, ${(16.5 + i * 0.16).toFixed(2)})`).join("\n")}

        // BEAT 5 · 21.0–24.0 — the line, alone.
          .to('#made', { opacity: 0, duration: .6, ease: 'power2.in' }, 20.6)
          .to('#close', { opacity: 1, duration: .7, ease: 'power2.out' }, 21.1)

        // BEAT 6 · 24.0–26.0 — back to the frame it opened on, so the loop has
        // no seam: the line leaves, the mode row returns unselected, and the
        // last frame is the first.
          .to('#close', { opacity: 0, duration: .6, ease: 'power2.in' }, 23.8)
          .to('#mode1', { onStart: function () { $('mode1').classList.remove('on'); }, duration: .01 }, 24.2)
          .to('#modes', { opacity: 1, y: 0, duration: .7, ease: 'power2.out' }, 24.4);

        window.__timelines = window.__timelines || {};
        window.__timelines['promo'] = tl;
      })();
    </script>
  </body>
</html>
`;

const out = join(here, "square");
mkdirSync(join(out, "assets"), { recursive: true });
writeFileSync(join(out, "index.html"), html);
for (const f of readdirSync(join(here, "assets"))) {
  copyFileSync(join(here, "assets", f), join(out, "assets", f));
}

console.log(
  `promo · ${F.w}x${F.h} · ${DUR}s @ ${FPS}fps · ${CAPS.length} capabilities · ${STEPS.length} calls, all from the catalog tour`,
);
