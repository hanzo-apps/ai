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
    const r = await page.evaluate(async () => {
      window.scrollTo(100, 0);
      const d = document.documentElement;
      return {
        scrollX: window.scrollX,
        overflow: d.scrollWidth - d.clientWidth,
      };
    });
    if (r.scrollX > 0 || r.overflow > 0) {
      bad.push(`${route} scrollX=${r.scrollX} overflow=${r.overflow}px`);
    }
  }
  expect(bad, `pages with horizontal scroll:\n${bad.join('\n')}`).toEqual([]);
});
