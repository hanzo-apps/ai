'use client'

import { useEffect, useState } from 'react'
import { Check, Copy, Download, ChevronDown, ArrowUpRight } from 'lucide-react'
import { Mockup } from '@/components/product/Mockup'
import { current, EDITORS, INSTALL, type Platform } from '@/lib/platform'
import { Box } from '@hanzo/ui'

/**
 * The three doors into Dev, each showing the surface it opens.
 *
 * WHAT THE READER IS OFFERED FOLLOWS THE MACHINE THEY ARE READING ON. The
 * command, the button and the card's own heading all come from `lib/platform`'s
 * one table, so a Windows visitor is never told to `curl | bash` and a phone is
 * never offered a tarball it cannot open. Detection resolves after hydration —
 * this is a static export, one HTML file served to every device, so the server
 * cannot know and must not guess. Until it resolves the middle card shows the
 * releases page: correct everywhere, best nowhere, and never wrong.
 *
 * The pictures are the PRODUCT, running. `<Mockup>` plays the films
 * `film/mock` already renders per catalog slug — cli (a terminal), desktop
 * (a chat surface), ide (an editor) — so these three cards cost no new film
 * and cannot drift from the product they depict. A still ships and the film
 * is fetched only when motion is welcome and the card is near the viewport.
 */
export function GetStarted() {
  // `null` until mounted, and that is the whole SSR story: `current()` reads
  // `navigator`, which does not exist while the export is being written.
  const [platform, setPlatform] = useState<Platform | null>(null)
  useEffect(() => setPlatform(current()), [])

  const install = platform ? INSTALL[platform] : null

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <Box className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Choose how to get started with Dev
        </h2>
        <p className="mt-4 text-base leading-relaxed text-neutral-400">
          Dev runs in your terminal, in your editor, and in the cloud. Work beside it
          locally, or hand it the task and let it keep going while you step away.
        </p>
      </Box>

      <Box className="mt-12 grid gap-4 md:grid-cols-3">
        <Card title="Install the CLI" slug="cli" alt="Hanzo Dev running in a terminal">
          {/* The command is the action here, so the pill IS the control — there
              is nowhere else to click and nothing to read twice.

              A phone has no shell, and `command` is empty to say so. Printing
              one anyway would be an instruction the reader cannot follow on the
              device they are holding. */}
          {install && !install.command ? (
            <Note>Dev needs a terminal. Open this page on your computer to install it.</Note>
          ) : (
            <>
              <Command text={install?.command ?? 'curl -fsSL hanzo.sh | bash'} />
              <Note>Works the same in bash, zsh and fish.</Note>
            </>
          )}
        </Card>

        {/* The middle card is the emphasised one, and the emphasis is a lighter
            ground and a brighter edge — never a hue. Hanzo's chrome is
            monochrome; a coloured button here would be the only saturated
            pixel on the page. */}
        <Card
          title={install?.card ?? 'Download the binary'}
          slug="desktop"
          alt="The Hanzo desktop surface"
          featured
        >
          <a
            href={install?.href ?? 'https://github.com/hanzoai/dev/releases/latest'}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-black transition-opacity hover:opacity-85"
          >
            <Download className="h-4 w-4" aria-hidden />
            {install?.action ?? 'Download Dev'}
          </a>
          <Note>{install?.note ?? 'macOS, Windows and Linux builds in every release.'}</Note>
        </Card>

        <Card title="Run it in your IDE" slug="ide" alt="Hanzo Dev reviewing a diff in an editor">
          <Editors />
          <Note>Runs in the terminal your editor already has.</Note>
        </Card>
      </Box>
    </section>
  )
}

/** One door: the surface it opens, what it is called, and the way in. */
function Card({
  title,
  slug,
  alt,
  featured,
  children,
}: {
  title: string
  slug: string
  alt: string
  featured?: boolean
  children: React.ReactNode
}) {
  return (
    <div
      className={`flex flex-col rounded-2xl border p-3 ${
        featured ? 'border-white/20 bg-white/[0.06]' : 'border-white/10 bg-white/[0.02]'
      }`}
    >
      {/* A PLATE UNDER THE FILM. The mockups are dark chrome on a dark card, so
          on this ground they read as three grey rectangles. The reference lifts
          its stills off a bright panel; ours does it with the prism already in
          the design system — the same linear ramp `--glass-prism` spends on a
          glass edge, widened into a field. Linear, not conic: a conic gradient
          distributes unevenly across a rectangle and pools in one corner. */}
      <Box className="relative overflow-hidden rounded-xl p-px">
        <Box
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(135deg, rgb(120 170 255 / .38) 0%, rgb(178 142 255 / .34) 26%,' +
              ' rgb(255 146 198 / .30) 52%, rgb(255 190 124 / .32) 76%, rgb(138 228 208 / .36) 100%)',
          }}
        />
        <div className="relative overflow-hidden rounded-[11px] bg-black">
          <Mockup slug={slug} alt={alt} />
        </div>
      </Box>
      <h3 className="px-2 pb-5 pt-6 text-center text-xl font-semibold text-white">{title}</h3>
      {/* The actions sit on ONE line across the row. `mt-auto` alone did not do
          it: the middle card carries a note under its button, so its action
          block was taller and its button rode higher than the other two. Every
          card now renders the same two slots — control, then note — and a card
          with nothing to add still reserves the line. */}
      <Box className="mt-auto px-2 pb-2">{children}</Box>
    </div>
  )
}

/** The line under a control. Present on every card so the buttons align. */
function Note({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 min-h-8 text-center text-xs leading-4 text-neutral-500">{children}</p>
}

/** The install line, and one button that puts it on the clipboard. */
function Command({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  // The confirmation is a timer, and a timer outlives the component that set
  // it unless it is cleared — the same leak `useCopy` exists to close in pay.
  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 1400)
    return () => clearTimeout(t)
  }, [copied])

  return (
    <button
      type="button"
      // `navigator.clipboard` is UNDEFINED outside a secure context, so a bare
      // call throws there rather than failing to copy; where it exists the
      // promise still rejects on a denied permission. Both are the same
      // outcome to a reader — nothing was copied — so both leave `copied` false.
      onClick={() => {
        navigator.clipboard?.writeText(text).then(
          () => setCopied(true),
          () => undefined,
        )
      }}
      aria-label={copied ? 'Copied' : `Copy: ${text}`}
      className="flex min-h-11 w-full items-center justify-between gap-3 rounded-full border border-white/10 bg-black px-5 text-left transition-colors hover:border-white/20"
    >
      <code className="truncate font-mono text-sm text-neutral-300">
        <span className="text-neutral-500">$ </span>
        {text}
      </code>
      {copied ? (
        <Check className="h-4 w-4 shrink-0 text-white" aria-hidden />
      ) : (
        <Copy className="h-4 w-4 shrink-0 text-neutral-500" aria-hidden />
      )}
    </button>
  )
}

/**
 * Where Dev runs. Every one of these is an editor with a terminal in it, which
 * is the honest claim: there is no published marketplace extension, and the
 * link that said there was answered 404. The browser is last because it is the
 * one entry that is not an editor — it is the way in from a machine that has
 * no terminal at all.
 */
function Editors() {
  const [open, setOpen] = useState(false)

  return (
    <Box className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-white/15 px-5 text-sm font-medium text-white transition-colors hover:bg-white/5"
      >
        Try in your IDE
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>

      {open ? (
        <ul className="absolute bottom-full left-0 right-0 z-10 mb-2 overflow-hidden rounded-xl border border-white/10 bg-black/90 backdrop-blur-xl">
          {EDITORS.map((e) => (
            <li key={e.id}>
              <a
                href={e.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center justify-between gap-2 px-4 text-sm text-neutral-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                {e.label}
                <ArrowUpRight className="h-3.5 w-3.5 text-neutral-500" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </Box>
  )
}
