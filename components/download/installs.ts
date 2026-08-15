/**
 * Every place this page can send someone, in one list.
 *
 * The asset names are the ones the release actually publishes. That is not a
 * detail: the page shipped a button pointing at
 * `latest/download/Hanzo-Dev-darwin-arm64.dmg`, which has never existed on any
 * release and answers 404, while the hero's two buttons carried no href at all
 * and did nothing when clicked. Naming the targets once, beside the platform
 * they serve, is what makes a dead link visible instead of plausible.
 *
 * `latest/download/<asset>` rather than a pinned tag, so a new release is picked
 * up without an edit here and a reader never gets yesterday's binary.
 */

const RELEASES = 'https://github.com/hanzoai/dev/releases'
const asset = (name: string) => `${RELEASES}/latest/download/${name}`

export interface Target {
  /** What a reader calls the thing they are on. */
  name: string
  href: string
  /** The word on the action. */
  verb?: string
}

/**
 * The desktop app, per platform — the page's ONE download moment.
 *
 * Apple Silicon leads because it is what most visitors are on, and the order
 * after it is the order people look: the other Mac, then Windows, then Linux.
 */
export const PLATFORMS: Target[] = [
  { name: 'macOS (Apple Silicon)', href: asset('dev-darwin-arm64.tar.gz') },
  { name: 'macOS (Intel)', href: asset('dev-darwin-amd64.tar.gz') },
  { name: 'Windows', href: asset('dev-x86_64-pc-windows-msvc.exe.zip') },
  { name: 'Linux (x86_64)', href: asset('dev-linux-amd64.tar.gz') },
  { name: 'Linux (arm64)', href: asset('dev-linux-arm64.tar.gz') },
]

/** Every build, checksums included, for anyone who wants to pick. */
export const ALL_BUILDS = RELEASES

/**
 * The surfaces Hanzo installs into beside the app.
 *
 * One destination each, and it is the extension's own home rather than a store
 * listing, because the store URLs are not ours to invent — the page previously
 * drew six browsers and eight IDEs as checklists behind buttons that carried no
 * href, which reads as fourteen installs and offers none.
 */
const EXTENSION = 'https://github.com/hanzoai/extension'

export const SURFACES: { label: string; items: Target[] }[] = [
  {
    label: 'Browser',
    items: [
      { name: 'Chrome', href: EXTENSION },
      { name: 'Firefox', href: EXTENSION },
      { name: 'Safari', href: EXTENSION },
      { name: 'Edge', href: EXTENSION },
    ],
  },
  {
    label: 'Editor',
    items: [
      { name: 'VS Code', href: EXTENSION },
      { name: 'Cursor', href: EXTENSION },
      { name: 'Windsurf', href: EXTENSION },
      { name: 'JetBrains', href: EXTENSION },
    ],
  },
]

/**
 * The platform a visitor is most likely on, read from the browser.
 *
 * A guess, and it says so by leaving every platform listed one scroll below. It
 * runs after mount — a static export has no request to read — so the button
 * ships naming the most common target and corrects itself if it is wrong.
 *
 * It answers OS and NOT the Mac's architecture, because the browser will not
 * say: every Mac reports "Intel Mac OS X" whatever silicon it runs on, kept that
 * way for compatibility. Guessing off that string would send half of all Mac
 * visitors the wrong binary with confidence. Apple Silicon is the honest
 * default, and the Intel build is a row away.
 */
export function platformHere(): Target {
  const ua = typeof navigator === 'undefined' ? '' : navigator.userAgent
  if (/Win/i.test(ua)) return PLATFORMS[2]
  if (/Linux/i.test(ua) && !/Android/i.test(ua)) return PLATFORMS[3]
  return PLATFORMS[0]
}
