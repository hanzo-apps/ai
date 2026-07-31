// Regenerate app/gui.css — the whole @hanzo/gui atomic sheet, as a real static asset.
//
// gui builds its atomic CSS as components are constructed, so the sheet only exists
// once something has rendered. The obvious way to get it into a statically exported
// document is useServerInsertedHTML — and that was the bug: Next runs that callback
// on EVERY streaming flush and getCSS() returns the entire accumulated sheet each
// time, so hanzo.ai's homepage shipped thirteen byte-identical copies, 591,305 of
// its 638,443 bytes. Inline, it is also uncacheable and re-sent on every navigation.
//
// Generating it here instead makes it an ordinary stylesheet: Next fingerprints it,
// the browser caches it once, and every page after the first pays nothing. GuiProvider
// renders with disableInjectCSS so this file is the ONE source of gui styles.
//
// Wired to `prebuild`, so it cannot drift from gui.config.ts.
import { execFileSync } from 'node:child_process'
import { writeFileSync, rmSync } from 'node:fs'

const bundle = new URL('../.guicfg.gen.mjs', import.meta.url)

// gui.config.ts is TypeScript and pulls in the @hanzogui graph, so it has to be
// bundled before Node can import it. react-native is aliased to react-native-web
// for the same reason the Next build does it: the bare specifier resolves to the
// native implementation, which has no business running here.
execFileSync(
  'esbuild',
  [
    'gui.config.ts',
    '--bundle',
    '--format=esm',
    '--platform=node',
    '--external:react',
    '--external:react-dom',
    '--external:react-native',
    '--alias:react-native=react-native-web',
    `--outfile=${new URL('../.guicfg.gen.mjs', import.meta.url).pathname}`,
    '--log-level=error',
  ],
  { stdio: 'inherit', cwd: new URL('..', import.meta.url).pathname },
)

const { default: config } = await import(bundle)
const css = config.getCSS()
writeFileSync(new URL('../app/gui.css', import.meta.url), css)
rmSync(bundle)
console.log(`app/gui.css regenerated — ${css.length.toLocaleString()} bytes`)
