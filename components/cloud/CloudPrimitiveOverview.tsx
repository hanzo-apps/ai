import Link from 'next/link'
import { ArrowRight, BookOpen, Check, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { POSITIONING, type CloudCategory, type Primitive } from '@/lib/data/cloud-primitives'

const STATUS_LABEL: Record<NonNullable<Primitive['status']>, string> = {
  ga: 'Generally available',
  beta: 'Beta',
  coming: 'Coming soon',
}

/**
 * Canonical overview page for any cloud primitive that doesn't have a bespoke
 * marketing page yet. Data-driven, monochrome, and self-contained so every
 * mega-menu leaf resolves to a real, unique page — never a 404, never an empty
 * stub. One component renders them all (DRY).
 */
export function CloudPrimitiveOverview({
  primitive,
  category,
}: {
  primitive: Primitive
  category?: CloudCategory
}) {
  const Icon = primitive.icon

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="mx-auto max-w-5xl px-6 pt-28 pb-24">
        {/* Breadcrumb — reads like a cloud console path */}
        <nav className="mb-10 flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/products" className="transition-colors hover:text-foreground">
            Cloud
          </Link>
          {category && (
            <>
              <span aria-hidden>/</span>
              <span className="text-foreground/70">{category.title}</span>
            </>
          )}
        </nav>

        {/* Hero */}
        <div className="flex items-start gap-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-neutral-900">
            <Icon className="h-7 w-7 text-foreground" />
          </div>
          <div className="min-w-0">
            {primitive.status && (
              <span className="mb-3 inline-flex items-center rounded-full border border-border bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                {STATUS_LABEL[primitive.status]}
              </span>
            )}
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{primitive.title}</h1>
            {primitive.tagline && <p className="mt-3 text-lg text-muted-foreground">{primitive.tagline}</p>}
          </div>
        </div>

        {/* Open-source + on-chain chips */}
        <div className="mt-6 flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-md border border-border px-2.5 py-1 text-muted-foreground">Open source</span>
          <span className="rounded-md border border-border px-2.5 py-1 text-muted-foreground">On-chain settlement</span>
        </div>

        {/* Description */}
        {primitive.description && (
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-foreground/80">{primitive.description}</p>
        )}

        {/* Features */}
        {primitive.features && primitive.features.length > 0 && (
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {primitive.features.map((feature) => (
              <div
                key={feature}
                className="flex items-start gap-3 rounded-xl border border-border bg-neutral-900/40 p-4"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground" />
                <span className="text-sm text-foreground/80">{feature}</span>
              </div>
            ))}
          </div>
        )}

        {/* Positioning line */}
        <p className="mt-14 text-sm text-muted-foreground">{POSITIONING}</p>

        {/* CTAs */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/signup">
              Get started
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-border bg-transparent text-foreground/80 hover:bg-accent hover:text-foreground"
          >
            <Link href="/contact/sales">Talk to us</Link>
          </Button>
          {primitive.github && (
            <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground">
              <a href={primitive.github} target="_blank" rel="noopener noreferrer">
                <Github className="mr-1.5 h-4 w-4" />
                Source
              </a>
            </Button>
          )}
          {primitive.docs && (
            <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground">
              <a href={primitive.docs} target="_blank" rel="noopener noreferrer">
                <BookOpen className="mr-1.5 h-4 w-4" />
                Docs
              </a>
            </Button>
          )}
        </div>
      </section>
    </div>
  )
}

export default CloudPrimitiveOverview
