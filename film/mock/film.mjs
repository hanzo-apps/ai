#!/usr/bin/env node
/* Render one mockup film per catalog product.
 *
 * The catalog is the source of truth for which products exist. This file only
 * decides which surface each one is drawn as, and it answers for a product it
 * has never seen by falling back to the category. A rename in the catalog
 * changes the film's identity hash and re-renders it; nothing here is a list
 * of products to maintain.
 *
 *   node bin/build.mjs                 every product, skipping ones already current
 *   node bin/build.mjs --only cli,kms  just these
 *   node bin/build.mjs --force         re-render even if current
 */

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync, existsSync, statSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const CLI = process.env.FRAMES_CLI ?? "hyperframes@0.7.108";
const CATALOG = process.env.CATALOG_URL ?? "https://api.hanzo.ai/v1/commerce/catalog?brand=hanzo";

/* Tailwind 500s — the same ramp the site's brandColor names refer to. */
const HEX = {
  violet: "#8b5cf6", blue: "#3b82f6", purple: "#a855f7", cyan: "#06b6d4",
  red: "#ef4444", orange: "#f97316", sky: "#0ea5e9", amber: "#f59e0b",
  lime: "#84cc16", slate: "#8798b5", teal: "#14b8a6", indigo: "#6366f1",
  pink: "#ec4899", green: "#22c55e", rose: "#f43f5e",
};

/* Which surface a product is drawn as.
 *
 * Most cloud products are a resource list, so `table` is the honest default and
 * the largest group. Only products whose real surface is something else are
 * named here; anything unlisted falls through to its category, and a product
 * added to the catalog tomorrow still renders. */
const SURFACE = {
  terminal: ["cli", "api", "functions", "builds", "crawl", "logs", "indexer", "embeddings"],
  editor: ["prompts", "sql", "docdb", "authz", "sdks", "ide", "score-configs"],
  chat: ["chat", "bot", "playground", "inference", "sessions", "desktop"],
  graph: ["agents", "edge", "clusters", "gateway", "nodes", "vpc", "cdn",
          "load-balancer", "service-mesh", "mpc", "zero-trust", "pipelines",
          "networks", "oracles"],
  grid: ["models", "applications", "integrations", "projects", "marketplace", "studio"],
  dashboard: ["gpus", "overview", "metrics", "ai-metrics", "dashboards", "billing",
              "status", "plans", "experiments", "scores", "wallet", "referrals", "console"],
};
const BY_ID = new Map();
for (const [surface, ids] of Object.entries(SURFACE)) for (const id of ids) BY_ID.set(id, surface);

/* A product the map has never seen still gets a sensible surface. */
const BY_CATEGORY = {
  AI: "chat", Compute: "table", Data: "table", Network: "graph", Security: "table",
  Dev: "terminal", Infrastructure: "table", Observe: "dashboard", Web3: "table", Apps: "grid",
};

const surfaceOf = (p) => BY_ID.get(p.id) ?? BY_CATEGORY[p.category] ?? "table";

/* Stable per-product variation: same product, same film, whatever the order. */
const seedOf = (id) => parseInt(createHash("sha256").update(id).digest("hex").slice(0, 8), 16) % 100000;

const arg = (name) => {
  const i = process.argv.indexOf(name);
  return i === -1 ? null : process.argv[i + 1];
};
const has = (name) => process.argv.includes(name);

async function catalog() {
  const cached = join(ROOT, ".catalog.json");
  if (has("--offline") && existsSync(cached)) return JSON.parse(readFileSync(cached, "utf8"));
  const res = await fetch(CATALOG);
  if (!res.ok) throw new Error(`catalog ${res.status} ${res.statusText}`);
  const body = await res.json();
  mkdirSync(dirname(cached), { recursive: true });
  writeFileSync(cached, JSON.stringify(body, null, 2));
  return body;
}

function ffmpeg(args) {
  execFileSync("ffmpeg", ["-nostdin", "-loglevel", "error", "-y", ...args], { stdio: "inherit" });
}

/* Frame 0 is the poster the player opens on; the final frame is what a
 * reduced-motion viewer gets instead of the film. Both come out of the file
 * that shipped, so neither can drift from it. */
function stills(mp4, base) {
  ffmpeg(["-i", mp4, "-frames:v", "1", "-q:v", "3", `${base}-first.jpg`]);
  ffmpeg(["-sseof", "-0.1", "-i", mp4, "-frames:v", "1", "-q:v", "3", `${base}-last.jpg`]);
}

const main = async () => {
  const outDir = resolve(arg("--out") ?? join(ROOT, "..", "..", "public", "mock"));
  const quality = arg("--quality") ?? "standard";
  const concurrency = arg("--concurrency") ?? "3";
  const only = arg("--only")?.split(",").map((s) => s.trim()).filter(Boolean);

  const { products } = await catalog();
  let rows = products.map((p) => ({
    slug: p.slug ?? p.id,
    archetype: surfaceOf(p),
    accent: HEX[p.brandColor] ?? HEX.slate,
    seed: seedOf(p.id),
  }));
  if (only) rows = rows.filter((r) => only.includes(r.slug));
  if (!rows.length) throw new Error("no products matched");

  mkdirSync(outDir, { recursive: true });

  /* The film is a pure function of its row plus the composition that draws it,
   * so a film is current when its inputs hash to what produced it. */
  const art = createHash("sha256");
  for (const f of ["index.html", "assets/kit.js", "assets/ui.css", "assets/mock.js"]) {
    art.update(readFileSync(join(ROOT, f)));
  }
  const artHash = art.digest("hex").slice(0, 12);

  const statePath = join(ROOT, ".state.json");
  const state = existsSync(statePath) ? JSON.parse(readFileSync(statePath, "utf8")) : {};
  const idOf = (r) => createHash("sha256").update(JSON.stringify(r) + artHash).digest("hex").slice(0, 12);

  const todo = has("--force")
    ? rows
    : rows.filter((r) => state[r.slug] !== idOf(r) || !existsSync(join(outDir, `${r.slug}-wide.mp4`)));

  console.log(`${rows.length} products · ${todo.length} to render · composition ${artHash}`);
  if (!todo.length) return;

  const batchPath = join(ROOT, ".rows.json");
  mkdirSync(dirname(batchPath), { recursive: true });
  writeFileSync(batchPath, JSON.stringify(todo, null, 2));

  const started = Date.now();
  execFileSync("npx", ["--yes", CLI, "render", ROOT,
    "--batch", batchPath,
    "--output", join(outDir, "{slug}-wide.mp4"),
    "--quality", quality,
    "--batch-concurrency", concurrency,
    "--strict-variables",
    "--quiet",
  ], { stdio: "inherit" });

  /* The batch writes its own manifest beside the output. Read it before
   * trusting the run, then take it back out — public/ is the published site,
   * not a place to leave build state. */
  const manifestPath = join(outDir, "manifest.json");
  if (existsSync(manifestPath)) {
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    const failed = manifest.rows.filter((row) => row.status !== "completed");
    if (failed.length) {
      throw new Error(`${failed.length} row(s) failed: ${failed.map((row) => row.error).join("; ")}`);
    }
    rmSync(manifestPath);
  }

  let bytes = 0;
  for (const r of todo) {
    const mp4 = join(outDir, `${r.slug}-wide.mp4`);
    if (!existsSync(mp4)) throw new Error(`missing render: ${r.slug}`);
    stills(mp4, join(outDir, `${r.slug}-wide`));
    bytes += statSync(mp4).size
      + statSync(join(outDir, `${r.slug}-wide-first.jpg`)).size
      + statSync(join(outDir, `${r.slug}-wide-last.jpg`)).size;
    state[r.slug] = idOf(r);
  }
  writeFileSync(statePath, JSON.stringify(state, null, 2));

  const secs = (Date.now() - started) / 1000;
  console.log(`${todo.length} films · ${secs.toFixed(1)}s · ${(bytes / 1e6).toFixed(1)} MB`
    + ` · ${(secs / todo.length).toFixed(1)}s and ${(bytes / todo.length / 1024).toFixed(0)} KB each`);
};

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
