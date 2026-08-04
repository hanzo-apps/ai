'use client'

/**
 * Command palette — ⌘K.
 *
 * Written against React directly rather than `cmdk`. cmdk was this repo's ONLY
 * path to `@radix-ui/*` — 16 packages, pulled in for a dialog and a portal this
 * component never used, since it renders inline and owns its own open state.
 * What cmdk actually contributed here was a filter and arrow-key navigation;
 * both are below, and `@radix-ui` is now absent from the lockfile entirely.
 *
 * The items are DATA, not markup. The previous version repeated a nine-line
 * `<Command.Item>` block eleven times, and the keyboard contract was half
 * present: cmdk bound the arrows, but `onSelect` was wired to receive an id and
 * cmdk passes it the item's VALUE, so Enter navigated to `/dashboard` with
 * whatever the label lowercased to. Selection now reads the id from the list.
 *
 * Class names are carried over unchanged. This file is not part of the gui-prop
 * conversion (see CLAUDE.md, "Tailwind is NOT gone") — it is the Radix removal,
 * and mixing the two would make neither reviewable.
 */
import React, { useState, useEffect, useMemo, useRef } from 'react'
import {
  Search,
  Bot,
  LayoutGrid,
  ChartBar,
  Settings,
  PlusCircle,
  PlayCircle,
  PauseCircle,
  Database,
  RefreshCw,
  Server,
  type LucideIcon,
} from 'lucide-react'

import { DummyAgentData } from './data'

type Item = {
  id: string
  label: string
  /** Secondary text after the label — the agent rows show their type. */
  hint?: string
  group: (typeof GROUPS)[number]
  icon: LucideIcon
  keywords: string[]
  /** Right-aligned icon — the agent rows show run/pause state. */
  trailing?: LucideIcon
}

/** Group order is authored, not derived from the items. */
const GROUPS = ['Navigation', 'Actions', 'Manage Agents', 'Resources'] as const

/** Where each command sends the browser. One table, so a route rename is one edit. */
const HREF: Record<string, string> = {
  'view-board': '/dashboard?view=board',
  'view-agents': '/dashboard?view=agents',
  'view-analytics': '/dashboard?view=analytics',
  'new-agent': '/dashboard?action=new-agent',
  'new-task': '/dashboard?action=new-task',
  refresh: '/dashboard?action=refresh',
  settings: '/dashboard?view=settings',
  'data-sources': '/dashboard?view=data-sources',
  infrastructure: '/dashboard?view=infrastructure',
}

const STATIC_ITEMS: Item[] = [
  { id: 'view-board', label: 'View Kanban Board', group: 'Navigation', icon: LayoutGrid, keywords: ['kanban', 'board', 'tasks'] },
  { id: 'view-agents', label: 'View Agents', group: 'Navigation', icon: Bot, keywords: ['agents', 'ai', 'list'] },
  { id: 'view-analytics', label: 'View Analytics', group: 'Navigation', icon: ChartBar, keywords: ['analytics', 'stats', 'metrics'] },
  { id: 'new-agent', label: 'Create New Agent', group: 'Actions', icon: PlusCircle, keywords: ['create', 'agent', 'new', 'add'] },
  { id: 'new-task', label: 'Create New Task', group: 'Actions', icon: PlusCircle, keywords: ['create', 'task', 'new', 'add'] },
  { id: 'refresh', label: 'Refresh Dashboard', group: 'Actions', icon: RefreshCw, keywords: ['refresh', 'reload', 'update'] },
  { id: 'settings', label: 'Open Settings', group: 'Actions', icon: Settings, keywords: ['settings', 'preferences', 'config'] },
  { id: 'data-sources', label: 'Manage Data Sources', group: 'Resources', icon: Database, keywords: ['data', 'sources', 'database', 'vector', 'rag'] },
  { id: 'infrastructure', label: 'View Infrastructure', group: 'Resources', icon: Server, keywords: ['infrastructure', 'server', 'deploy', 'resources'] },
]

const AGENT_ITEMS: Item[] = DummyAgentData.map((agent) => ({
  id: `toggle-agent-${agent.id}`,
  label: agent.name,
  hint: `(${agent.type})`,
  group: 'Manage Agents',
  icon: Bot,
  keywords: [agent.name, agent.type, agent.status, 'toggle', 'agent'],
  trailing: agent.status === 'running' ? PauseCircle : PlayCircle,
}))

/** Flat and in group order — this IS the arrow-key sequence, so it has to match
    the render order exactly or the highlight jumps. */
const ALL: Item[] = GROUPS.flatMap((g) => [...STATIC_ITEMS, ...AGENT_ITEMS].filter((i) => i.group === g))

const CommandPalette: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [active, setActive] = useState(0)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((v) => !v)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  /** Opening starts from a clean slate — a stale query is never what ⌘K meant. */
  useEffect(() => {
    if (open) {
      setSearch('')
      setActive(0)
    }
  }, [open])

  const matches = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return ALL
    return ALL.filter(
      (i) => i.label.toLowerCase().includes(q) || i.keywords.some((k) => k.toLowerCase().includes(q)),
    )
  }, [search])

  /** The highlight is an INDEX into a list that shrinks as you type. Clamp it,
      or Enter fires on nothing. */
  useEffect(() => {
    setActive((i) => (matches.length === 0 ? 0 : Math.min(i, matches.length - 1)))
  }, [matches.length])

  /** Keep the highlighted row in view when arrowing past the scroll edge. */
  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>('[data-active="true"]')
      ?.scrollIntoView({ block: 'nearest' })
  }, [active, matches])

  const select = (id: string) => {
    setOpen(false)
    const href = HREF[id]
    if (href) {
      window.location.href = href
      return
    }
    if (id.startsWith('toggle-agent-')) {
      window.location.href = `/dashboard?action=toggle-agent&id=${id.slice('toggle-agent-'.length)}`
    }
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => (matches.length ? (i + 1) % matches.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => (matches.length ? (i - 1 + matches.length) % matches.length : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const item = matches[active]
      if (item) select(item.id)
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-[var(--black)]/60 backdrop-blur-sm flex items-start justify-center pt-[20vh]"
      onClick={() => setOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="w-full max-w-2xl bg-[var(--black)] text-[var(--white)] border border-neutral-800 rounded-lg shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-neutral-800 p-2 flex items-center">
          <Search className="ml-2 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={onKeyDown}
            role="combobox"
            aria-expanded="true"
            aria-controls="command-palette-list"
            aria-activedescendant={matches[active] ? `command-${matches[active].id}` : undefined}
            className="w-full bg-transparent border-none focus:outline-none px-2 py-1.5 text-neutral-200 placeholder-neutral-500"
            placeholder="Search commands..."
            autoFocus
          />
          <kbd className="mr-2 px-1.5 py-0.5 text-xs rounded bg-neutral-800 text-muted-foreground">Esc</kbd>
        </div>

        <div id="command-palette-list" role="listbox" ref={listRef} className="max-h-80 overflow-auto p-2">
          {matches.length === 0 && (
            <div className="py-6 text-center text-muted-foreground">No results found.</div>
          )}

          {GROUPS.map((group) => {
            const rows = matches.filter((i) => i.group === group)
            if (rows.length === 0) return null
            return (
              <div key={group} role="group" aria-label={group} className="pb-2">
                <div className="px-2 py-1 text-xs text-muted-foreground">{group}</div>
                {rows.map((item) => {
                  const Icon = item.icon
                  const Trailing = item.trailing
                  const isActive = matches[active]?.id === item.id
                  return (
                    <div
                      key={item.id}
                      id={`command-${item.id}`}
                      role="option"
                      aria-selected={isActive}
                      data-active={isActive}
                      onMouseMove={() => setActive(matches.indexOf(item))}
                      onClick={() => select(item.id)}
                      className={`flex items-center justify-between px-2 py-1.5 rounded cursor-pointer text-neutral-200 ${
                        isActive ? 'bg-neutral-800' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        <span>{item.label}</span>
                        {item.hint && <span className="text-muted-foreground text-xs">{item.hint}</span>}
                      </div>
                      {Trailing && <Trailing className="h-4 w-4 text-muted-foreground" />}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CommandPalette
