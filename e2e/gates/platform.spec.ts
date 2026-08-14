import { test, expect } from '@playwright/test'
import { platformOf, INSTALL, type Platform } from '../../lib/platform'

/**
 * /dev offers the reader an install their machine can actually run.
 *
 * Two halves, and the first is where the bugs live. Detection is a pure
 * function, so it is checked directly against the strings real devices send —
 * no browser, no page, no flake. The offers are then checked for the property
 * that made the old code wrong: `DesktopAppBanner` pointed at
 * `Hanzo-Dev-darwin-arm64.dmg`, which has never existed in any release and
 * answered 404 on /ai for as long as it shipped. Nothing caught it because
 * nothing asserted that a published href is a thing we publish.
 */

/* Real user-agents. `touch` is what separates the last two, and nothing else
 * does: iPadOS sends a desktop macOS UA on purpose. */
const AGENTS: Array<[string, Platform, { userAgent: string; hint?: string; touch?: number }]> = [
  ['macBook', 'mac', {
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36',
    touch: 0,
  }],
  ['windows', 'windows', {
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36',
  }],
  ['linux', 'linux', {
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36',
  }],
  ['iphone', 'ios', {
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
    touch: 5,
  }],
  // ANDROID CONTAINS "LINUX". Test the phone before the desktop or every
  // Android reader is handed a tarball.
  ['android', 'android', {
    userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Mobile Safari/537.36',
    touch: 5,
  }],
  // THE IPAD LIE: a desktop macOS UA, given away only by the touch count.
  ['ipad', 'ios', {
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15',
    touch: 5,
  }],
  // The client hint wins where a browser sends it.
  ['hint:Windows', 'windows', { userAgent: 'irrelevant', hint: 'Windows' }],
  ['hint:Android', 'android', { userAgent: 'irrelevant', hint: 'Android' }],
]

for (const [name, want, agent] of AGENTS) {
  test(`platform: ${name} resolves to ${want}`, () => {
    expect(platformOf(agent)).toBe(want)
  })
}

test('every platform is offered something, and a shell command only where there is a shell', () => {
  for (const [platform, install] of Object.entries(INSTALL)) {
    expect(install.action, `${platform} names its action`).not.toBe('')
    expect(install.card, `${platform} titles its card`).not.toBe('')
    expect(install.href, `${platform} points somewhere`).toMatch(/^https:\/\//)

    // A phone has no terminal. An empty command is how the table says so, and
    // the card reads it to decide whether to print one at all.
    const shell = platform !== 'ios' && platform !== 'android'
    expect(Boolean(install.command), `${platform} command matches having a shell`).toBe(shell)
  }
})

test('every artifact we link is one the release actually carries', async ({ request }) => {
  // The 404 that shipped was a FILENAME, so a filename is what this checks —
  // against the live release, since that is the only thing that knows.
  const assets = new Set<string>()
  const res = await request.get('https://api.github.com/repos/hanzoai/dev/releases/latest')
  test.skip(!res.ok(), 'GitHub unreachable — this gate never fails the build on the network')
  for (const a of (await res.json()).assets ?? []) assets.add(a.name)
  expect(assets.size, 'the release has assets to check against').toBeGreaterThan(0)

  for (const [platform, install] of Object.entries(INSTALL)) {
    const file = install.href.split('/releases/latest/download/')[1]
    if (!file) continue // a page, not an artifact — nothing to match
    expect(assets, `${platform} links ${file}, which the release does not carry`).toContain(file)
  }
})
