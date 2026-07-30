'use client'

/**
 * The gui runtime, mounted once.
 *
 * `@hanzo/gui` generates atomic CSS as components are constructed. On a
 * statically exported site the prerender happens on the server, so those rules
 * have to be handed to the document during that render — `useServerInsertedHTML`
 * is the App Router hook that does it. Without this the first paint of every
 * page ships markup whose classes have no rules, and the styling only appears
 * after hydration.
 */

import * as React from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { GuiProvider as Gui } from '@hanzo/gui'
import { useTheme } from 'next-themes'
import config from '@/gui.config'

export function GuiProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme()

  useServerInsertedHTML(() => (
    <style
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: config.getCSS() }}
    />
  ))

  return (
    <Gui config={config} defaultTheme={resolvedTheme === 'light' ? 'light' : 'dark'} disableRootThemeClass>
      {children}
    </Gui>
  )
}
