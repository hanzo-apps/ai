// Capture BEFORE-state evidence of the four live bugs on https://hanzo.ai.
// Run: node explore-verification/capture-before.mjs
import { chromium } from '@playwright/test'
import { mkdirSync } from 'node:fs'

const OUT = new URL('./before-shots/', import.meta.url).pathname
mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

// 1) Homepage nav — flat "Try Zen5" link (no dropdown) + legacy "Log in"
await page.goto('https://hanzo.ai', { waitUntil: 'networkidle' })
const nav = page.locator('nav').first()
await nav.screenshot({ path: OUT + '01-nav-before.png' })

// Evidence: Try Zen5 is a flat <a>, Log in points at legacy /login
const tryZen = page.locator('a:has-text("Try Zen")').first()
const login = page.locator('a:has-text("Log in")').first()
const evidence = {
  tryZen: {
    tag: await tryZen.evaluate(el => el.tagName),
    href: await tryZen.getAttribute('href'),
    hasChevron: await tryZen.locator('[class*="chevron" i]').count() > 0,
    ariaHaspopup: await tryZen.getAttribute('aria-haspopup'),
  },
  login: {
    tag: await login.evaluate(el => el.tagName).catch(() => null),
    href: await login.getAttribute('href').catch(() => null),
  },
}

// 2) Hover Try Zen5 — prove nothing opens (it's a link, not a dropdown)
await tryZen.hover()
await page.waitForTimeout(500)
await nav.screenshot({ path: OUT + '02-tryzen-hover-no-dropdown.png' })

// 3) /agents — a product page that exists in source but falls back to the
//    homepage shell on the live (stale) deploy.
await page.goto('https://hanzo.ai/agents', { waitUntil: 'networkidle' })
evidence.agentsTitle = await page.title()
await page.screenshot({ path: OUT + '03-agents-stale-fallback.png', fullPage: false })

// 4) Login click target — the legacy hanzo.id/login redirect.
evidence.loginIsLegacyPath = (evidence.login.href || '').includes('/login?redirect_uri=')

console.log(JSON.stringify(evidence, null, 2))
await browser.close()
