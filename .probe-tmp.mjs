import { chromium } from 'playwright'
const OUT = '/private/tmp/claude-501/-Users-z-work-hanzo-base/406478ec-6343-4726-8f88-3e87db8f6e74/scratchpad'
const browser = await chromium.launch()
for (const [W, H] of [[1024, 768], [1440, 900], [1920, 1080]]) {
  const page = await browser.newPage({ viewport: { width: W, height: H } })
  await page.goto('https://cloud.hanzo.ai/', { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(4000)
  await page.screenshot({ path: `${OUT}/fold-${W}.png` })
  const v = await page.$('video')
  if (v) await v.screenshot({ path: `${OUT}/video-${W}.png` })
  await page.close()
}
await browser.close()
console.log('ok')
