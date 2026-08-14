#!/usr/bin/env node
/**
 * Refresh the committed research snapshot from the library that owns it.
 *
 * papers.hanzo.ai is where a paper is published, and it is the only place a
 * title, a subtitle or a PDF exists. This site's job is to be the way IN, so it
 * reads that library rather than restating it — a second copy of a paper list
 * in a marketing repo is a copy that starts wrong the first time a paper lands.
 *
 * The read cannot happen in the browser: `output: 'export'` ships static HTML,
 * so the fetch has to happen at BUILD time and the answer has to be committed.
 * `prebuild` runs this, the same as pricing and the catalog.
 *
 * The subject is the rendered page, because the library publishes no JSON. That
 * is fine and it is not scraping in the fragile sense: the fields taken are the
 * ones the page is FOR — the article, its heading, its subheading, its PDF —
 * and if that markup changes the parse yields nothing, which the third rule
 * below turns into a loud refusal rather than an empty section.
 *
 * Three rules, the same three as sync-pricing.mjs and sync-catalog.mjs:
 *
 *   NEVER FAIL THE BUILD on an unreachable library. The committed snapshot is
 *   the designed fallback. A marketing site must not need another site up in
 *   order to deploy.
 *
 *   NEVER REGRESS. A page that parses to FEWER papers than are committed is far
 *   more likely to be a degraded response or a markup change than the research
 *   group retracting work, and writing it would quietly empty the section. It
 *   is refused, and what it would have dropped is printed. A genuine retraction
 *   is accepted by deleting those rows from the snapshot — the next run then
 *   sees no shrink.
 *
 *   NEVER GO QUIET. Every run prints how many papers answered and which ones
 *   are new, because the failure mode here is a section that is quietly a
 *   month behind and looks perfectly fine.
 *
 * Usage:
 *   node scripts/sync-papers.mjs
 *   node scripts/sync-papers.mjs --dry-run
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SNAPSHOT = resolve(ROOT, "lib/data/papers.json");
const LIBRARY = process.env.PAPERS_URL || "https://papers.hanzo.ai";
const DRY_RUN = process.argv.includes("--dry-run");

const text = (html) =>
  html
    .replace(/<[^>]+>/g, "")
    .replace(/<!--.*?-->/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const one = (html, re) => {
  const m = html.match(re);
  return m ? text(m[1]) : "";
};

/**
 * The papers a rendered library page states.
 *
 * One `<article>` per paper, and within it the four things a card on another
 * site can honestly carry: what it is called, what it is about in one line, when
 * it was published, and where to read it. The abstract is deliberately NOT
 * taken — a paragraph written for a library card is not a paragraph for a
 * landing page, and quoting three lines of one is how a summary drifts from the
 * paper it summarises.
 */
function parse(html) {
  return [...html.matchAll(/<article[\s\S]*?<\/article>/g)]
    .map((m) => m[0])
    .map((card) => ({
      slug: (card.match(/<h2[^>]*>\s*<a href="\/([^/"]+)\/?"/) || [])[1] || "",
      title: one(card, /<h2[^>]*>\s*<a[^>]*>([\s\S]*?)<\/a>/),
      subtitle: one(card, /<h3[^>]*>([\s\S]*?)<\/h3>/),
      date: one(card, /<time[^>]*>([\s\S]*?)<\/time>/),
      tags: [...card.matchAll(/<span class="px-2[^"]*">([\s\S]*?)<\/span>/g)].map((t) => text(t[1])),
      pdf: (card.match(/href="(\/pdfs\/[^"]+\.pdf)"/) || [])[1] || "",
    }))
    .filter((p) => p.slug && p.title);
}

async function main() {
  const committed = JSON.parse(readFileSync(SNAPSHOT, "utf8"));

  let html;
  try {
    const res = await fetch(LIBRARY, { signal: AbortSignal.timeout(15000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    html = await res.text();
  } catch (e) {
    console.log(`papers: ${LIBRARY} unreachable (${e.message}) — keeping the committed ${committed.papers.length}`);
    return;
  }

  const papers = parse(html);
  if (papers.length < committed.papers.length) {
    const gone = committed.papers.filter((p) => !papers.some((q) => q.slug === p.slug)).map((p) => p.slug);
    console.log(
      `papers: ${LIBRARY} rendered ${papers.length} against ${committed.papers.length} committed — refusing.` +
        (gone.length ? ` It would have dropped: ${gone.join(", ")}` : ""),
    );
    return;
  }

  const fresh = papers.filter((p) => !committed.papers.some((q) => q.slug === p.slug)).map((p) => p.slug);
  console.log(`papers: ${papers.length} published${fresh.length ? ` · new: ${fresh.join(", ")}` : ""}`);

  const next = { source: LIBRARY, fetched: new Date().toISOString().slice(0, 10), papers };
  if (DRY_RUN) {
    console.log(JSON.stringify(next, null, 2));
    return;
  }
  writeFileSync(SNAPSHOT, JSON.stringify(next, null, 2) + "\n");
}

await main();
