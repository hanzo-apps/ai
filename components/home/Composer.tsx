'use client'

import { useRef, useState, type FormEvent } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@hanzo/ui'
import { useAnalytics } from '@hanzo/event/react'
import { EVENTS } from '@hanzo/event'
import { useVoice, Voice } from '@hanzo/voice'
import { ArrowUp, Boxes, Cloud, MessageSquare, Mic, Plus } from 'lucide-react'
import { APP, CLOUD, goToChat } from './nav-data'
import { Box } from '@hanzo/ui'

/**
 * The front door, docked to the bottom of the viewport.
 *
 * ONE LINE, and that is structural rather than styled: the field is an
 * `<input>`, which has no second row to grow into. The predecessor was a
 * `<textarea rows={1}>` with a `max-h-40`, which is a two-part agreement
 * between a component and a stylesheet that a long prompt breaks — and this bar
 * rides the viewport, where a box that grows eats the page behind it. An input
 * cannot wrap, so nothing has to remember not to let it.
 *
 * The shape of the row is `[+] … [mic] [send]`, three 30px circles around a
 * field, and the 30 is deliberate — hanzo.app's are 36 because its composer is
 * a paragraph box with a control row UNDER it, and these have to fit inside a
 * single line's height. `.hz-composer .hz-round` in app/globals.css carries the
 * shape and states why the thumb floor is lifted for exactly these three.
 *
 * WHAT EACH ONE HONESTLY DOES, since this site owns no session, no model and no
 * upload:
 *
 *   [+]   the three things you can start from here. These were three pills
 *         under the old hero composer; they are the same three destinations,
 *         moved into the control that exists to hold them, so the fold is the
 *         picture and the bar is the whole front door.
 *   [mic] dictation, through `@hanzo/voice` — the same microphone hanzo.chat
 *         and hanzo.app draw, on its browser leg, so no credential is invented
 *         here. It writes what it hears into the field and STOPS there. That is
 *         the one place this surface departs from the package's advice to send
 *         each utterance through the composer's submit path: "send" here is a
 *         cross-origin navigation to hanzo.chat, and being carried off the site
 *         by a pause in speech is not a thing anyone asked for. When voice
 *         cannot run the button stays, disabled, wearing the reason.
 *   [↑]   hands the prompt to hanzo.chat. hanzo.ai never implements a chat
 *         client; `goToChat` is the ONE hand-off and it carries the text.
 */

interface Start {
  label: string
  icon: typeof MessageSquare
  /** Submit the current field value to hanzo.chat, carrying whatever is typed. */
  chat?: boolean
  /** Or leave for another surface. */
  href?: string
}

const STARTS: Start[] = [
  { label: 'Chat with Enso', icon: MessageSquare, chat: true },
  { label: 'Build with the Hanzo app', icon: Boxes, href: APP },
  { label: 'Deploy on Hanzo Cloud', icon: Cloud, href: CLOUD },
]

export default function Composer() {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const analytics = useAnalytics()

  // Dictation writes the field; the person still presses send. `onPartial` and
  // `onUtterance` therefore say the same thing — the running transcript IS the
  // draft — and the second is only the point at which it stops moving.
  const voice = useVoice({
    onPartial: setValue,
    onUtterance: (text) => {
      setValue(text)
      inputRef.current?.focus()
    },
  })

  // The hand-off is a cross-origin navigation, which no pageview on the far
  // side can be joined to, so the intent is captured HERE and the beacon flush
  // on unload delivers it as the browser leaves.
  const submit = (e: FormEvent) => {
    e.preventDefault()
    analytics.capture(EVENTS.CHAT_STARTED, { source: 'composer', hasPrompt: value.trim().length > 0 })
    goToChat(value)
  }

  const start = (item: Start) => {
    analytics.capture(EVENTS.FEATURE_USED, { feature: 'composer-start', label: item.label })
    if (item.chat) {
      analytics.capture(EVENTS.CHAT_STARTED, { source: 'start', hasPrompt: value.trim().length > 0 })
      goToChat(value)
      return
    }
    if (item.href) window.location.href = item.href
  }

  // The side inset is `--page-gutter`, carried by `.hz-dock` in app/globals.css
  // — the same column the header and its drapes stand in.
  return (
    <div className="hz-dock">
      <form onSubmit={submit} className="hz-composer mx-auto w-full max-w-xl">
        {/* Glass, the same material as the header at the other edge —
            `.hz-glass` (app/globals.css). The pill carries it ALONE: the band it
            sits in is transparent, because tinting the full width to hold one
            centred control drew a shade across the bottom of every page. Chrome
            where there is a control; nothing where there is not. */}
        {/* ONE EDGE, DRAWN ONCE. @hanzo/composer already rings this pill — a
            1.5px conic band on `.hz-composer::before`, masked to the perimeter,
            brighter where the light would fall and dimmer where it would not.
            A flat `border-white/[0.07]` on top of it was a second stroke doing
            the first one's job, and two strokes on one edge is what makes a
            control read as an outline drawn around a hole rather than as a
            surface with a lit rim. The band is the edge; the fill and the blur
            under it are the rest. */}
        <Box className="hz-glass flex items-center gap-1.5 rounded-full p-[4px]">
          {/* Opens UPWARD — the bar lives at the bottom of the viewport, so
              `top-start` is the only placement with room to render into. */}
          <DropdownMenu placement="top-start">
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label="Start something"
                className="hz-round bg-neutral-800 text-neutral-300 transition-colors hover:bg-neutral-700 hover:text-white"
              >
                <Plus className="h-[15px] w-[15px]" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent minWidth={248}>
              {STARTS.map((item) => {
                const Icon = item.icon
                return (
                  <DropdownMenuItem key={item.label} gap="$2" onClick={() => start(item)}>
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Ask Hanzo anything"
            aria-label="Ask Hanzo anything"
            className="min-w-0 flex-1 bg-transparent px-2 text-[14px] text-white placeholder-neutral-500 outline-none"
          />

          <Voice
            voice={voice}
            className="hz-round bg-neutral-800 text-neutral-300 transition-colors hover:bg-neutral-700 hover:text-white disabled:opacity-40"
          >
            {(state) => <Mic className="h-[15px] w-[15px]" fill={state === 'idle' ? 'none' : 'currentColor'} />}
          </Voice>

          <button
            type="submit"
            aria-label="Send"
            className="hz-round bg-white text-black transition-opacity hover:opacity-90"
          >
            <ArrowUp className="h-[15px] w-[15px]" strokeWidth={2.5} />
          </button>
        </Box>
      </form>
    </div>
  )
}
