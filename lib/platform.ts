/**
 * Which machine is reading the page, and what it can actually install.
 *
 * ONE detector for the whole site. There were two: this module's predecessor
 * and `DesktopAppBanner`, which read the deprecated `navigator.platform`, knew
 * only Mac-versus-everything-else, and offered a `.dmg` that has never existed
 * in any release — a 404 shipped on /ai. A second detector is how a site comes
 * to disagree with itself about what it publishes.
 *
 * `platformOf` is pure and takes the three fields it reads, so it is testable
 * without a browser; `current()` is the one place a real `navigator` is touched.
 *
 * WHAT WE ACTUALLY PUBLISH, measured against the release rather than assumed:
 * mac (arm64 + x64), Windows (x64) and Linux (x64 + arm64) get a real binary;
 * `hanzo.sh` resolves the arch itself. There is no installer package (no .dmg,
 * .msi, .deb or .AppImage), no App Store build and no Play build, so a phone is
 * offered the web app — the honest native surface — and never a download that
 * would 404 on arrival.
 */

export type Platform = 'mac' | 'windows' | 'linux' | 'ios' | 'android'

/** The three fields detection reads. A `Navigator` satisfies it structurally. */
export type Agent = {
  userAgent: string
  /** `navigator.userAgentData.platform` where it exists — Chromium only. */
  hint?: string
  /** `navigator.maxTouchPoints`. The one thing that separates an iPad from a Mac. */
  touch?: number
}

/**
 * ORDER IS THE ALGORITHM, and two rungs are load-bearing:
 *
 * - **Android before Linux.** Every Android user-agent contains "Linux", so the
 *   looser test has to run second or every phone is a desktop.
 * - **iPad before Mac.** iPadOS reports a desktop macOS user-agent on purpose
 *   and there is no string that gives it away. A pointer-coarse touch count is
 *   what remains: a Mac reports 0, an iPad reports 5. Getting this wrong offers
 *   a tarball to a tablet that cannot open one.
 *
 * The client hint is preferred where the browser sends it because it is stated
 * rather than sniffed; everything below it is a fallback, and unknown resolves
 * to linux — the platform whose instructions are the most portable.
 */
export function platformOf({ userAgent, hint, touch = 0 }: Agent): Platform {
  const h = (hint ?? '').toLowerCase()
  if (h) {
    if (h.includes('android')) return 'android'
    if (h.includes('win')) return 'windows'
    if (h.includes('mac')) return touch > 1 ? 'ios' : 'mac'
    if (h.includes('linux') || h.includes('chrome os')) return 'linux'
  }

  const ua = userAgent.toLowerCase()
  if (ua.includes('android')) return 'android'
  if (/iphone|ipod/.test(ua)) return 'ios'
  if (ua.includes('ipad')) return 'ios'
  if (ua.includes('win')) return 'windows'
  if (ua.includes('mac')) return touch > 1 ? 'ios' : 'mac'
  return 'linux'
}

/** The live reading. `null` before hydration, so the server renders no guess. */
export function current(): Platform | null {
  if (typeof navigator === 'undefined') return null
  const data = (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData
  return platformOf({
    userAgent: navigator.userAgent,
    hint: data?.platform,
    touch: navigator.maxTouchPoints,
  })
}

const RELEASE = 'https://github.com/hanzoai/dev/releases/latest/download'

/** What a platform is offered, and what it is called while being offered it. */
export type Install = {
  /** The platform's own name, for a button: "macOS", "Windows". */
  label: string
  /** The install one-liner, or '' where there is no terminal to type it into. */
  command: string
  /** Where the primary action leads. */
  href: string
  /** What the primary action is called. */
  action: string
  /** The line under the button — the second architecture, or why there is none. */
  note: string
  /**
   * What the download card is HEADED on this platform. It travels with the rest
   * because it changes with them: a phone is not offered a binary, so a card
   * still titled "Download the binary" would be describing the button it is no
   * longer showing.
   */
  card: string
}

/**
 * `curl | bash` on every Unix because `hanzo.sh` resolves the architecture
 * itself, which is one fewer thing for a reader to get wrong than a pair of
 * links. Windows has no such installer, so it gets npm — the package manager
 * it is most likely to already have.
 *
 * A phone gets neither. Both mobile entries point at the web app rather than a
 * store, because we ship no store build; naming one would be the same defect
 * this module exists to remove.
 */
export const INSTALL: Record<Platform, Install> = {
  mac: {
    label: 'macOS',
    command: 'curl -fsSL hanzo.sh | bash',
    href: `${RELEASE}/dev-darwin-arm64.tar.gz`,
    action: 'Download for macOS',
    note: 'Apple Silicon. Intel build in the release.',
    card: 'Download the binary',
  },
  windows: {
    label: 'Windows',
    command: 'npm i -g @hanzo/dev',
    href: `${RELEASE}/dev-windows-amd64.tar.gz`,
    action: 'Download for Windows',
    note: 'x64. Also on npm and winget.',
    card: 'Download the binary',
  },
  linux: {
    label: 'Linux',
    command: 'curl -fsSL hanzo.sh | bash',
    href: `${RELEASE}/dev-linux-amd64.tar.gz`,
    action: 'Download for Linux',
    note: 'x64. arm64 and musl in the release.',
    card: 'Download the binary',
  },
  ios: {
    label: 'iOS',
    command: '',
    href: 'https://hanzo.app',
    action: 'Open Hanzo App',
    note: 'Dev runs on a machine with a shell. Build from your phone in the browser.',
    card: 'Build in the browser',
  },
  android: {
    label: 'Android',
    command: '',
    href: 'https://hanzo.app',
    action: 'Open Hanzo App',
    note: 'Dev runs on a machine with a shell. Build from your phone in the browser.',
    card: 'Build in the browser',
  },
}

/** Every editor Dev runs inside, and the browser for the machines without one. */
export const EDITORS = [
  { id: 'vscode', label: 'VS Code', href: 'https://code.visualstudio.com' },
  { id: 'cursor', label: 'Cursor', href: 'https://cursor.com' },
  { id: 'jetbrains', label: 'JetBrains', href: 'https://www.jetbrains.com' },
  { id: 'warp', label: 'Warp', href: 'https://www.warp.dev' },
  { id: 'browser', label: 'In your browser', href: 'https://hanzo.app' },
] as const
