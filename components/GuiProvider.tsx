'use client'

/**
 * The gui runtime, mounted once.
 *
 * gui's atomic CSS does NOT come from here. It is generated from `gui.config.ts`
 * into `app/gui.css` by `prebuild` (scripts/gen-gui-css.mjs) and imported by the
 * root layout, so Next fingerprints it and the browser caches it once.
 *
 * This used to hand `config.getCSS()` to `useServerInsertedHTML`, which Next runs
 * on EVERY streaming flush — and since getCSS() returns the whole accumulated
 * sheet each time, the homepage shipped thirteen byte-identical copies: 591,305
 * of its 638,443 bytes, uncacheable, re-sent on every navigation. `href` +
 * `precedence` do not fix it either, because useServerInsertedHTML injects into
 * the stream outside the React tree, where hoisting never reconciles.
 *
 * `disableInjectCSS` is what keeps that from coming back: with the sheet supplied
 * statically, a second copy from the runtime would be pure duplication.
 */

import * as React from 'react'
import { GuiProvider as Gui } from '@hanzo/gui'
import { useTheme } from 'next-themes'
import config from '@/gui.config'

export function GuiProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme()

  return (
    <Gui
      config={config}
      defaultTheme={resolvedTheme === 'light' ? 'light' : 'dark'}
      disableRootThemeClass
      disableInjectCSS
    >
      {children}
    </Gui>
  )
}
