/* The seven product surfaces.
   Each builder fills the shared app window and adds its motion to the timeline.
   Frame 0 shows the product already running; the film adds work and settles.
   Nothing here can render a product name — the name is not a variable. */

function svg(tag, attrs) {
  var n = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for (var k in attrs) n.setAttribute(k, attrs[k]);
  return n;
}

/* Sidebar nav: icon + a label-width bar. Structure, never words. */
function sidebar(ctx, selectedAt) {
  var s = el("div", "side");
  s.appendChild(el("div", "s on", { width: "96px", height: "12px", marginBottom: "10px" }));
  for (var i = 0; i < 9; i++) {
    var nav = el("div", "nav" + (i === selectedAt ? " sel" : ""));
    nav.appendChild(el("span", "ico"));
    var b = el("span", "s" + (i === selectedAt ? "" : " lo"));
    b.style.width = Math.round(58 + ctx.r() * 78) + "px";
    b.style.height = "9px";
    nav.appendChild(b);
    s.appendChild(nav);
  }
  ctx.app.querySelector(".body").insertBefore(s, ctx.main);
  return s;
}

/* Column headers as bars: the shape of a header row without its words. */
function header(ctx, widths) {
  var h = el("div", "head");
  for (var i = 0; i < widths.length; i++) {
    var b = el("span", "s lo", { width: widths[i] + "px", height: "9px" });
    h.appendChild(b);
  }
  ctx.main.appendChild(h);
  return h;
}

/* The film opens on a product mid-work: the first rows are already there,
   the rest arrive. Both stills read as the running product. */
function reveal(ctx, items, alreadyOn) {
  var late = items.slice(alreadyOn);
  if (!late.length) return;
  for (var i = 0; i < late.length; i++) late[i].style.opacity = "0";
  ctx.tl.to(late, {
    opacity: 1,
    duration: 0.45,
    stagger: 3.6 / late.length,
    ease: "power1.out",
  }, 0.35);
}

var KIT = {
  terminal: function (ctx) {
    var t = el("div", "term");
    ctx.main.appendChild(t);
    var rows = [];
    for (var i = 0; i < 20; i++) {
      var prompt = i === 0 || ctx.r() > 0.74;
      var ln = el("div", "ln");
      var sig = el("span", "sig" + (prompt ? "" : ctx.r() > 0.78 ? " ok" : " mut"));
      sig.textContent = prompt ? "$" : ctx.r() > 0.78 ? "✓" : "›";
      ln.appendChild(sig);
      var parts = prompt ? 2 + Math.floor(ctx.r() * 2) : 2 + Math.floor(ctx.r() * 4);
      for (var j = 0; j < parts; j++) {
        var b = el("span", "s" + (prompt ? "" : " lo"), {
          width: Math.round(52 + ctx.r() * (prompt ? 160 : 230)) + "px",
          height: "10px",
        });
        if (prompt && j === 0) b.classList.add("on");
        ln.appendChild(b);
      }
      t.appendChild(ln);
      rows.push(ln);
    }
    var cur = el("div", "ln");
    var cs = el("span", "sig");
    cs.textContent = "$";
    cur.appendChild(cs);
    var caret = el("span", "caret");
    cur.appendChild(caret);
    t.appendChild(cur);
    rows.push(cur);
    reveal(ctx, rows, 15);
    pulse(ctx.tl, caret, 1, 0.06, 1.5, ctx.dur);
  },

  dashboard: function (ctx) {
    sidebar(ctx, 0);
    var tiles = el("div", "tiles");
    ctx.main.appendChild(tiles);
    var fills = [];
    for (var i = 0; i < 4; i++) {
      var tile = el("div", "tile");
      tile.appendChild(el("span", "s lo", { width: Math.round(56 + ctx.r() * 40) + "px", height: "9px" }));
      tile.appendChild(el("span", "s", { width: Math.round(96 + ctx.r() * 66) + "px", height: "22px" }));
      var m = el("span", "meter");
      var fill = el("i");
      fill.style.transform = "scaleX(" + (0.24 + ctx.r() * 0.6).toFixed(3) + ")";
      m.appendChild(fill);
      tile.appendChild(m);
      tiles.appendChild(tile);
      fills.push(fill);
    }
    var plot = el("div", "plot");
    ctx.main.appendChild(plot);
    var W = 1352, H = 470, n = 54;
    var s = svg("svg", { viewBox: "0 0 " + W + " " + H, preserveAspectRatio: "none" });
    var bars = [];
    var bw = W / n;
    for (var k = 0; k < n; k++) {
      var hgt = Math.round(H * (0.18 + ctx.r() * 0.62));
      var rect = svg("rect", {
        x: (k * bw + bw * 0.18).toFixed(2),
        y: (H - hgt).toFixed(2),
        width: (bw * 0.64).toFixed(2),
        height: hgt,
        rx: 3,
        fill: k > n - 9 ? "var(--accent)" : "#2f3a4f",
        opacity: k > n - 9 ? 0.95 : 0.8,
      });
      rect.style.transformOrigin = (k * bw + bw * 0.5).toFixed(2) + "px " + H + "px";
      s.appendChild(rect);
      bars.push(rect);
    }
    plot.appendChild(s);
    ctx.tl.from(bars, { scaleY: 0.05, duration: 0.7, stagger: 3.3 / n, ease: "power2.out" }, 0.3);
    for (var f = 0; f < fills.length; f++) {
      ctx.tl.from(fills[f], { scaleX: 0.04, duration: 1.1, ease: "power2.out" }, 0.3 + f * 0.13);
    }
  },

  table: function (ctx) {
    sidebar(ctx, 1);
    header(ctx, [120, 92, 78, 104]);
    var wrap = el("div", "rows");
    ctx.main.appendChild(wrap);
    var rows = [];
    for (var i = 0; i < 15; i++) {
      var tr = el("div", "tr");
      tr.appendChild(el("span", "s on", { width: "13px", height: "13px", borderRadius: "4px" }));
      tr.appendChild(el("span", "s", { width: Math.round(170 + ctx.r() * 210) + "px", height: "10px" }));
      var g = el("span", "s lo grow", { height: "10px" });
      tr.appendChild(g);
      tr.appendChild(el("span", "s lo", { width: Math.round(72 + ctx.r() * 60) + "px", height: "10px" }));
      var u = ctx.r();
      tr.appendChild(el("span", "chip" + (u > 0.82 ? " warn" : u > 0.2 ? " ok" : "")));
      wrap.appendChild(tr);
      rows.push(tr);
    }
    reveal(ctx, rows, 10);
  },

  chat: function (ctx) {
    sidebar(ctx, 2);
    var th = el("div", "thread");
    ctx.main.appendChild(th);
    var bubs = [];
    for (var i = 0; i < 8; i++) {
      var mine = i % 2 === 1;
      var b = el("div", "bub" + (mine ? " me" : ""));
      var lines = mine ? 1 + Math.floor(ctx.r() * 2) : 2 + Math.floor(ctx.r() * 3);
      for (var j = 0; j < lines; j++) {
        b.appendChild(el("span", "s", {
          width: Math.round(200 + ctx.r() * 400) + "px",
          height: "10px",
        }));
      }
      th.appendChild(b);
      bubs.push(b);
    }
    for (var k = 0; k < bubs.length; k++) {
      if (k < 5) continue;
      bubs[k].style.opacity = "0";
      ctx.tl.fromTo(bubs[k], { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.6 + (k - 5) * 1.3);
    }
  },

  editor: function (ctx) {
    sidebar(ctx, 3);
    var c = el("div", "code");
    ctx.main.appendChild(c);
    var lines = [];
    for (var i = 0; i < 22; i++) {
      var cl = el("div", "cl");
      cl.appendChild(el("span", "gut"));
      var indent = Math.floor(ctx.r() * 3) * 30;
      if (indent) cl.appendChild(el("span", "", { width: indent + "px", flex: "0 0 " + indent + "px" }));
      var toks = 2 + Math.floor(ctx.r() * 4);
      for (var j = 0; j < toks; j++) {
        var cls = ctx.r() > 0.72 ? "s on" : ctx.r() > 0.4 ? "s" : "s lo";
        cl.appendChild(el("span", cls, { width: Math.round(42 + ctx.r() * 150) + "px", height: "10px" }));
      }
      c.appendChild(cl);
      lines.push(cl);
    }
    reveal(ctx, lines, 15);
  },

  graph: function (ctx) {
    sidebar(ctx, 5);
    header(ctx, [112, 84]);
    var cv = el("div", "canvas");
    ctx.main.appendChild(cv);
    var W = 1408, H = 790;
    var s = svg("svg", { viewBox: "0 0 " + W + " " + H });
    var cols = 5, rowsN = 5, nodes = [];
    for (var cI = 0; cI < cols; cI++) {
      for (var rI = 0; rI < rowsN; rI++) {
        if (ctx.r() > 0.93) continue;
        nodes.push({
          x: 132 + cI * ((W - 264) / (cols - 1)) + (ctx.r() - 0.5) * 40,
          y: 96 + rI * ((H - 192) / (rowsN - 1)) + (ctx.r() - 0.5) * 40,
          c: cI,
        });
      }
    }
    /* Links only reach the next tier, and only to a near neighbour, so the
       topology reads as a system rather than a tangle. */
    var edges = [];
    for (var a = 0; a < nodes.length; a++) {
      for (var b = 0; b < nodes.length; b++) {
        if (nodes[b].c !== nodes[a].c + 1) continue;
        if (Math.abs(nodes[b].y - nodes[a].y) > 200) continue;
        if (ctx.r() > 0.72) continue;
        var ln = svg("line", {
          x1: nodes[a].x.toFixed(1), y1: nodes[a].y.toFixed(1),
          x2: nodes[b].x.toFixed(1), y2: nodes[b].y.toFixed(1),
          stroke: "#33405a", "stroke-width": 2,
        });
        s.appendChild(ln);
        edges.push({ el: ln, a: nodes[a], b: nodes[b] });
      }
    }
    var marks = [];
    for (var n2 = 0; n2 < nodes.length; n2++) {
      var live = n2 % 3 === 0;
      var g = svg("g", {});
      var halo = svg("circle", {
        cx: nodes[n2].x.toFixed(1), cy: nodes[n2].y.toFixed(1), r: 23,
        fill: "var(--accent)", opacity: live ? 0.14 : 0.06,
      });
      g.appendChild(halo);
      g.appendChild(svg("circle", {
        cx: nodes[n2].x.toFixed(1), cy: nodes[n2].y.toFixed(1), r: 11,
        fill: live ? "var(--accent)" : "#3d4964",
        stroke: "#0e1117", "stroke-width": 3,
      }));
      s.appendChild(g);
      marks.push({ g: g, halo: halo, live: live });
    }
    cv.appendChild(s);

    /* Most of the topology is already up at frame 0; the film brings the rest
       online and moves traffic across it. */
    for (var e = Math.floor(edges.length * 0.6); e < edges.length; e++) {
      ctx.tl.from(edges[e].el, { opacity: 0, duration: 0.5, ease: "none" }, 0.4 + e * 0.14);
    }
    for (var d = Math.floor(marks.length * 0.65); d < marks.length; d++) {
      ctx.tl.from(marks[d].g, { opacity: 0, duration: 0.45, ease: "power1.out" }, 0.5 + d * 0.18);
    }
    for (var h = 0; h < marks.length; h++) {
      if (marks[h].live) pulse(ctx.tl, marks[h].halo, 0.14, 0.34, 3, ctx.dur);
    }
    for (var t = 0; t < Math.min(4, edges.length); t++) {
      var eg = edges[(t * 3) % edges.length];
      var mv = svg("circle", { cx: eg.a.x.toFixed(1), cy: eg.a.y.toFixed(1), r: 5, fill: "var(--accent)" });
      s.appendChild(mv);
      ctx.tl.fromTo(mv, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "none" }, 0.9 + t * 0.4);
      ctx.tl.fromTo(mv, { x: 0, y: 0 },
        { x: eg.b.x - eg.a.x, y: eg.b.y - eg.a.y, duration: 2.6, ease: "none" }, 0.9 + t * 0.4);
    }
  },

  grid: function (ctx) {
    sidebar(ctx, 4);
    header(ctx, [140, 88]);
    var g = el("div", "cards");
    ctx.main.appendChild(g);
    var cards = [];
    for (var i = 0; i < 8; i++) {
      var c = el("div", "card");
      c.appendChild(el("div", "thumb"));
      c.appendChild(el("span", "s", { width: Math.round(88 + ctx.r() * 96) + "px", height: "11px" }));
      c.appendChild(el("span", "s lo", { width: Math.round(58 + ctx.r() * 74) + "px", height: "9px" }));
      g.appendChild(c);
      cards.push(c);
    }
    for (var k = 0; k < cards.length; k++) {
      if (k < 4) continue;
      cards[k].style.opacity = "0";
      ctx.tl.fromTo(cards[k], { opacity: 0, scale: 0.94 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }, 0.5 + (k - 4) * 0.75);
    }
  },
};
