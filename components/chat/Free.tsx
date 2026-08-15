'use client'

// What the free tier has to say for itself, in one place for both surfaces that
// offer it (/chat and the try-it box on /models).
//
// Free costs nothing and in exchange it is data-shared. The Terms ask for
// agreement before the first free request, so `Gate` asks once and records it;
// `Notice` then stands above the thread for as long as free is what answers, so
// a visitor who agreed weeks ago still sees what they agreed to.
//
// The words and the record both come from @hanzo/ai, so this surface, hanzo.chat
// and hanzo.app say the same sentence and store the same consent.

import { useEffect, useState, type ReactNode } from 'react'
import Link from 'next/link'
import { Chat } from '@hanzo/chat'
import { freeCopy, hasConsent, grantConsent } from '@hanzo/ai'
import { YStack } from '@hanzo/gui'
import { useAi } from '@/hooks/useAi'

const store = () => (typeof window === 'undefined' ? null : window.localStorage)

/**
 * The free chat a signed-out visitor gets: agree once, then a bounded thread on
 * the free pool with the notice standing over it. Renders nothing until the
 * browser has it (the export prerenders signed-out) or when no widget key was
 * built in, so the page falls back to whatever it shows instead.
 */
export function Try({ placeholder }: { placeholder: string }) {
  const { client, model, free, ready } = useAi()
  if (!ready || !free || !client) return null

  return (
    <Gate>
      <YStack
        height={620}
        width="100%"
        maxWidth={880}
        marginHorizontal="auto"
        className="overflow-hidden rounded-2xl border border-border bg-secondary/20"
      >
        <Chat client={client} model={model} placeholder={placeholder} />
      </YStack>
      <Notice />
    </Gate>
  )
}

/** The standing line. Links to this site's own privacy route. */
export function Notice() {
  return (
    <p className="px-1 py-3 text-center text-xs text-muted-foreground">
      {freeCopy.notice}{' '}
      <Link href="/privacy" className="underline underline-offset-2 hover:text-foreground">
        {freeCopy.noticeCta}
      </Link>
    </p>
  )
}

/**
 * Shows `children` once the visitor has agreed to free's data sharing, and the
 * agreement itself until then. Declining is simply not agreeing — the chat does
 * not open, and nothing is sent.
 */
export function Gate({ children }: { children: ReactNode }) {
  const [agreed, setAgreed] = useState(false)
  useEffect(() => {
    const s = store()
    if (s && hasConsent(s)) setAgreed(true)
  }, [])

  if (agreed) return <>{children}</>

  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-border bg-secondary/20 p-8 text-center">
      <h3 className="mb-3 text-lg font-medium">{freeCopy.consentTitle}</h3>
      <p className="mb-5 text-sm text-muted-foreground">{freeCopy.consentBody}</p>
      <ul className="mb-6 space-y-2 text-left text-sm text-muted-foreground">
        {freeCopy.consentPoints.map((point) => (
          <li key={point} className="flex gap-2">
            <span aria-hidden>·</span>
            {point}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => {
          const s = store()
          if (s) grantConsent(s)
          setAgreed(true)
        }}
        className="rounded-full bg-white px-8 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90"
      >
        {freeCopy.consentAgreeCta}
      </button>
      <p className="mt-5 text-xs text-muted-foreground">
        {freeCopy.termsText.replace(/\.$/, '')} —{' '}
        <Link href="/terms" className="underline underline-offset-2">
          Terms
        </Link>
        {' · '}
        <Link href="/privacy" className="underline underline-offset-2">
          Privacy
        </Link>
      </p>
    </div>
  )
}
