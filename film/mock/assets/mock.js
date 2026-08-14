/* Shared runtime for the product mockups.
   Every value that varies per product comes from composition variables.
   `name` is deliberately absent from the variable set, so no composition
   can render a product name even by accident. */

/* Deterministic PRNG. Render workers initialise independently, so any
   unseeded randomness would diverge between frame chunks of one video. */
function rng(seed) {
  let a = (seed >>> 0) + 0x6d2b79f5;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* The runtime global is __hyperframes in the skill docs and __frames in the
   package docs; accept either, and fall back to declared defaults so the
   file still opens in a plain browser. */
function vars() {
  const g = window.__hyperframes || window.__frames;
  if (g && typeof g.getVariables === "function") return g.getVariables();
  const decl = document.documentElement.getAttribute("data-composition-variables");
  const out = {};
  if (decl) for (const v of JSON.parse(decl)) out[v.id] = v.default;
  return out;
}

function el(tag, cls, css) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (css) Object.assign(n.style, css);
  return n;
}

/* A run of skeleton bars standing in for a line of UI text.
   Widths are seeded, so a line looks written rather than uniform. */
function line(parent, r, opts) {
  const o = opts || {};
  const row = el("div", "row");
  Object.assign(row.style, {
    display: "flex",
    alignItems: "center",
    gap: (o.gap || 10) + "px",
    height: (o.h || 30) + "px",
  });
  const n = o.n || 3 + Math.floor(r() * 3);
  for (let i = 0; i < n; i++) {
    const b = el("span", "s" + (o.cls ? " " + o.cls : ""));
    b.style.width = Math.round((o.min || 40) + r() * (o.max || 140)) + "px";
    b.style.height = (o.bh || 10) + "px";
    if (o.accentFirst && i === 0) b.classList.add("on");
    row.appendChild(b);
  }
  parent.appendChild(row);
  return row;
}

/* Seamless ambient loop: translate a column by exactly one repeating unit,
   so the last rendered frame matches the first and <video loop> is invisible. */
function scroll(tl, target, distance, duration) {
  tl.fromTo(target, { y: 0 }, { y: -distance, duration: duration, ease: "none" }, 0);
}

/* A finite repeat that lands exactly on the composition duration.
   floor, never ceil — ceil overshoots data-duration and trips lint. */
function cycles(duration, cycle) {
  return Math.max(0, Math.floor(duration / cycle) - 1);
}

/* Every composition ends where it began, so the loop has no seam. */
function pulse(tl, target, from, to, cycle, duration) {
  tl.fromTo(
    target,
    { opacity: from },
    {
      opacity: to,
      duration: cycle / 2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: cycles(duration, cycle / 2),
    },
    0,
  );
}
