import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { OWNED, goImport, repoOf } from '@/lib/go-modules'

type Params = { params: Promise<{ mod: string }> }

export function generateStaticParams() {
  return OWNED.map((mod) => ({ mod }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { mod } = await params
  return {
    title: `hanzo.ai/${mod}`,
    description: `The Go module hanzo.ai/${mod}, and where its source lives.`,
    other: goImport(mod),
  }
}

// One page per Go module, at the import path itself. It answers two callers with
// one artifact: the go tool reads the meta tag above and needs nothing else, and
// a person who followed the import out of a stack trace lands somewhere that
// says what the module is and where to read it.
export default async function ModulePage({ params }: Params) {
  const { mod } = await params
  if (!(OWNED as readonly string[]).includes(mod)) notFound()

  const repo = repoOf(mod)
  const path = `hanzo.ai/${mod}`

  return (
    <main className="min-h-screen bg-[var(--black)] text-[var(--white)] px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">{path}</h1>
        <p className="mt-3 text-[var(--muted-foreground)]">
          A Go module. The import path is this address; the source is on GitHub.
        </p>

        <pre className="mt-8 overflow-x-auto rounded-lg border border-white/10 bg-white/[0.03] p-4 text-sm">
          <code>{`go get ${path}`}</code>
        </pre>

        <dl className="mt-8 grid gap-4 text-sm">
          <div>
            <dt className="text-[var(--muted-foreground)]">Source</dt>
            <dd><a className="underline" href={repo}>{repo}</a></dd>
          </div>
          <div>
            <dt className="text-[var(--muted-foreground)]">Reference</dt>
            <dd>
              <a className="underline" href={`https://pkg.go.dev/${path}`}>
                pkg.go.dev/{path}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </main>
  )
}
