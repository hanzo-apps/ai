import { test, expect } from '@playwright/test';
import { execSync } from 'node:child_process';

// Walks EVERY page of the real static export (out/) at 390px and asserts the
// document cannot scroll sideways. Serve out/ first:
//   python3 -m http.server 8090 -d out   (BASE_URL=http://localhost:8090)
const BASE = process.env.EXPORT_URL || 'http://localhost:8090';

const routes: string[] = execSync('find out -name "*.html" | sort', {
  cwd: process.cwd() + '/..' === '/' ? process.cwd() : process.cwd(),
})
  .toString()
  .trim()
  .split('\n')
  .map((f) => '/' + f.replace(/^out\//, ''));

test('no horizontal scroll at 390px on any exported page', async ({ page }) => {
  test.setTimeout(30 * 60 * 1000);
  await page.setViewportSize({ width: 390, height: 844 });
  const bad: string[] = [];
  const redirected: string[] = [];
  for (const route of routes) {
    // a page's client-side redirect can abort the next goto — bounded retries
    let landed = false;
    for (let i = 0; i < 4 && !landed; i++) {
      try {
        await page.goto(BASE + route, { waitUntil: 'domcontentloaded' });
        landed = true;
      } catch {
        await page.waitForTimeout(300);
      }
    }
    if (!landed) {
      bad.push(`${route} NAVIGATION FAILED`);
      continue;
    }
    // A handful of routes are REDIRECT STUBS (`/status` forwards to
    // status.hanzo.ai). They navigate out from under this evaluate, which
    // throws "Execution context was destroyed" — and because that escaped the
    // loop, ONE such page aborted the whole 775-page sweep and the run reported
    // a single failure that looked like a layout bug. A page that leaves cannot
    // scroll sideways; skip it and keep auditing the rest.
    let r: { scrollX: number; overflow: number } | null = null;
    try {
      r = await page.evaluate(async () => {
        // UN-CLIP BEFORE MEASURING. globals.css sets `overflow-x: clip` on both
        // html and body — that is what guarantees the page cannot scroll
        // sideways, and it is also why this test could not fail: with clip on,
        // documentElement.scrollWidth NEVER exceeds clientWidth and scrollX is
        // pinned to 0, whatever the content does. Verified by injecting a
        // 1400px-wide div into a real exported page: scrollWidth stayed 390 and
        // the sweep stayed green across all 775 routes.
        //
        // So the measurement asks the question the invariant was written for —
        // "would this page overflow if it were not being clipped" — because a
        // clipped overflow is still content the reader cannot reach. Restore
        // the styles afterwards so nothing downstream sees a mutated page.
        const d = document.documentElement;
        const prevHtml = d.style.overflowX;
        const prevBody = document.body.style.overflowX;
        d.style.overflowX = 'visible';
        document.body.style.overflowX = 'visible';
        // Force layout before reading, or the old clipped metrics come back.
        void d.offsetWidth;
        const vw = d.clientWidth;

        // Measure TEXT-BEARING overflow only. Un-clipping alone reports the
        // decoration the design clips ON PURPOSE — the 800px radial glow on
        // /about is centred with -translate-x-1/2 and is 205px past the
        // viewport by construction. Those are not defects; a reader loses
        // nothing. What a reader DOES lose is text pushed outside a viewport
        // that cannot scroll: on /models/openai/* a Go sample in a <code>
        // block runs 105px past the edge, and with `overflow-x: clip` there is
        // no way to reach it. Wide content is supposed to scroll inside its
        // OWN container (globals.css says so) — this is the check that it does.
        //
        // 8px of slack absorbs sub-pixel rounding and the `whileInView` x:20
        // enter animation, which is briefly wider than the viewport on purpose.
        // Content inside a horizontally SCROLLABLE ancestor is not lost — that
        // is precisely the sanctioned pattern ("wide content scrolls inside its
        // own container"), and a naive check condemns it: flagging every <code>
        // block that correctly lives in an `overflow-x: auto` wrapper reported
        // ~40 pages as broken when they were doing exactly the right thing.
        // Only content no ancestor can scroll to is actually unreachable.
        const reachable = (el: Element) => {
          for (let p = el.parentElement; p; p = p.parentElement) {
            const ox = getComputedStyle(p).overflowX;
            if ((ox === 'auto' || ox === 'scroll') && p.scrollWidth > p.clientWidth + 1) return true;
          }
          return false;
        };

        const SLACK = 8;
        let worst = 0;
        for (const el of Array.from(document.querySelectorAll('*'))) {
          const text = (el.textContent || '').trim();
          if (!text) continue;
          const r = el.getBoundingClientRect();
          if (r.width <= 0) continue;
          const past = Math.round(r.right - vw);
          if (past > SLACK && past > worst && !reachable(el)) worst = past;
        }

        window.scrollTo(100, 0);
        const out = { scrollX: window.scrollX, overflow: worst };
        d.style.overflowX = prevHtml;
        document.body.style.overflowX = prevBody;
        return out;
      });
    } catch (e) {
      if (!/Execution context was destroyed|navigation/i.test(String(e))) throw e;
      redirected.push(route);
      continue;
    }
    if (r.scrollX > 0 || r.overflow > 0) {
      bad.push(`${route} scrollX=${r.scrollX} overflow=${r.overflow}px`);
    }
  }
  // Report what was NOT audited, so a growing set of skipped routes cannot
  // quietly shrink this sweep's coverage while it still reports green.
  if (redirected.length) console.log(`skipped ${redirected.length} redirect stub(s): ${redirected.join(', ')}`);
  expect(bad, `pages with horizontal scroll:\n${bad.join('\n')}`).toEqual([]);
});
