'use client'

import { useEffect, useState } from 'react'

/** Where the gateway publishes what it will actually answer for. */
const MODELS = 'https://api.hanzo.ai/v1/models'

/**
 * How many models the gateway serves, asked of the gateway.
 *
 * `lib/data/model-count.ts` counts what the CATALOG CARRIES, from a snapshot
 * taken at build time. That is a different fact from what the API WILL ANSWER,
 * and the two have come apart: the snapshot counts 432 because it counts 340
 * OpenRouter rows, that provider is switched off, and `GET /v1/models` returns
 * 112. Copy that says "one API for 400+ models" is a claim about the second
 * number wearing the first one's value, and it is false while the switch is off.
 *
 * A fresher snapshot would not fix it, because the switch is not ours to
 * predict — it can move either way between two builds, and the page would go on
 * quoting whichever number the last build happened to see. So the sentence that
 * makes the claim asks at read time, and is right the moment the switch moves,
 * with no build in between.
 *
 * `null` until the answer lands, and `null` forever if it never does. The copy
 * renders a phrase with no number in it in that case, which is the only honest
 * thing to say when you have not counted.
 *
 * It lives in `hooks/` and not beside the constants it corrects because those
 * constants are read by server components for page metadata, and a module that
 * imports `useState` cannot be pulled into that graph.
 */
export function useModelCount(): number | null {
  const [n, setN] = useState<number | null>(null)

  useEffect(() => {
    const stop = new AbortController()
    fetch(MODELS, { signal: stop.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        const list = Array.isArray(d?.data) ? d.data : null
        if (list?.length) setN(list.length)
      })
      .catch(() => {})
    return () => stop.abort()
  }, [])

  return n
}
