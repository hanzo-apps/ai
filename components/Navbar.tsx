'use client'

import { useState, useEffect, useCallback } from 'react'
import { HanzoHeader } from '@hanzogui/shell'
import AccountControl from './navigation/AccountControl'
import CommandPalette from './CommandPalette'

/**
 * Navbar — the unified Hanzo shell header for hanzo.ai.
 *
 * The header (brand, local nav, Meet-Hanzo menu, secondary/primary CTAs) is the
 * `HanzoHeader` from `@hanzogui/shell`, driven entirely by the `"hanzo.ai"`
 * surface in the shell registry — the single source of truth. The only local
 * pieces are the IAM `AccountControl` (account slot) and the ⌘K `CommandPalette`,
 * which the shell opens via `onAskHanzo`.
 */
const Navbar = () => {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)

  const openCommandPalette = useCallback(() => setIsCommandPaletteOpen(true), [])
  const closeCommandPalette = useCallback(() => setIsCommandPaletteOpen(false), [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsCommandPaletteOpen((prev) => !prev)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <HanzoHeader
        surface="hanzo.ai"
        account={<AccountControl />}
        onAskHanzo={openCommandPalette}
      />
      <CommandPalette isOpen={isCommandPaletteOpen} onClose={closeCommandPalette} />
    </>
  )
}

export default Navbar
