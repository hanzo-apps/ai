// Deterministic e2e verification of the four fixes against the LOCAL build.
// Serves out/ on :4457, drives a fresh isolated Chromium (no shared tabs),
// blocks 3rd-party analytics (CORS noise), captures AFTER screenshots.
//
// Run: node explore-verification/verify-fixes.mjs
import { chromium } from '@playwright/test'
import { mkdirSync } from 'node:fs'
import { setTimeout as sleep } from 'node:timers/promises'

const OUT = new URL('./after-shots/', import.meta.url).pathname
mkdirSync(OUT, { recursive: true })

// Assumes a static server is already serving out/ on PORT (started separately).
const PORT = Number(process.env.VERIFY_PORT || 4457)
const srv = { kill() {} }

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
// Block 3rd-party analytics/insights so they don't interfere with hydration/timing.
await ctx.route(/insights\.hanzo\.ai|analytics\.hanzo\.ai|umami/i, (r) => r.abort())
const page = await ctx.newPage()

const results = {}
try {
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' })
  // Wait for React hydration (button becomes interactive)
  const tryZenBtn = page.locator('button[aria-haspopup="menu"]')
  await tryZenBtn.waitFor({ state: 'visible', timeout: 10000 })

  // ---- FIX #4: Try Zen is a dropdown trigger ----
  results.tryZenTag = await tryZenBtn.evaluate((el) => el.tagName)
  results.tryZenAriaBefore = await tryZenBtn.getAttribute('aria-expanded')

  // (a) HOVER opens (primary interaction)
  await tryZenBtn.hover()
  await sleep(400)
  results.tryZenAriaAfterHover = await tryZenBtn.getAttribute('aria-expanded')
  results.panelHasZenAI = await page.locator('text=Zen AI').first().isVisible().catch(() => false)
  results.panelHasChatWithZen5 = await page.locator('a[href="https://hanzo.chat/?model=zen5"]').first().isVisible().catch(() => false)
  results.panelHasApps = await page.getByText('Apps', { exact: true }).first().isVisible().catch(() => false)
  await page.locator('nav').first().screenshot({ path: OUT + '01-tryzen-dropdown-open.png' })
  // Full top-right crop showing the open panel (nav + dropdown).
  await page.screenshot({ path: OUT + '01b-tryzen-panel.png', clip: { x: 980, y: 0, width: 460, height: 560 } })

  // (b) move mouse away then CLICK opens (touch/click users)
  await page.mouse.move(200, 400)
  await sleep(300)
  results.tryZenAriaAfterMouseAway = await tryZenBtn.getAttribute('aria-expanded')
  await tryZenBtn.click()
  await sleep(300)
  results.tryZenAriaAfterClick = await tryZenBtn.getAttribute('aria-expanded')

  // (c) Escape closes
  await page.keyboard.press('Escape')
  await sleep(300)
  results.tryZenAriaAfterEsc = await tryZenBtn.getAttribute('aria-expanded')

  // ---- FIX #3: Login triggers IAM OIDC redirect (no legacy /login link) ----
  const loginBtn = page.locator('button', { hasText: /^Log in$/ }).first()
  results.loginTag = await loginBtn.evaluate((el) => el.tagName).catch(() => 'NOT FOUND')
  // Click and capture where it navigates (should hit iam.hanzo.ai authorize with PKCE).
  let navUrl = null
  page.on('framenavigated', (f) => { if (f === page.mainFrame()) navUrl = f.url() })
  await loginBtn.click().catch(() => {})
  await sleep(2500)
  navUrl = page.url()
  results.loginNavUrl = navUrl
  results.loginHitsIam = /iam\.hanzo\.ai/.test(navUrl) && /client_id=hanzo-ai/.test(navUrl)
  results.loginUsesPKCE = /code_challenge=/.test(navUrl) && /code_challenge_method=S256/.test(navUrl)
  results.loginNoLegacyPath = !/\/login\?redirect_uri=/.test(navUrl)
  await page.screenshot({ path: OUT + '02-login-iam-redirect.png', fullPage: false })

  // ---- FIX #1: product pages render real content (not homepage fallback) ----
  for (const slug of ['agents', 'ai-studio', 'mcp', 'vector']) {
    const p = await ctx.newPage()
    await p.goto(`http://localhost:${PORT}/${slug}`, { waitUntil: 'domcontentloaded' })
    const title = await p.title()
    results[`page_${slug}_title`] = title
    results[`page_${slug}_unique`] = title !== 'Hanzo — Open-source cloud for AI agents'
    await p.close()
  }

  // ---- FIX #2: footer links corrected ----
  const f = await ctx.newPage()
  await f.goto(`http://localhost:${PORT}/`, { waitUntil: 'domcontentloaded' })
  results.footerChatHref = await f.locator('footer a', { hasText: /^Hanzo Chat$/ }).first().getAttribute('href').catch(() => null)
  results.footerMcpHref = await f.locator('footer a', { hasText: /^Hanzo MCP$/ }).first().getAttribute('href').catch(() => null)
  results.footerHasDumpSolutions = await f.locator('footer a[href="/solutions/capabilities"]').count()
  await f.close()
} finally {
  console.log(JSON.stringify(results, null, 2))
  await browser.close()
  srv.kill()
}
