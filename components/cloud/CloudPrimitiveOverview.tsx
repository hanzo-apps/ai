import Link from 'next/link'
import { ArrowRight, BookOpen, Check, Github } from 'lucide-react'
import { Mockup } from '@/components/product/Mockup'
import { POSITIONING, type CloudCategory, type Primitive } from '@/lib/data/cloud-primitives'
import { Box } from '@hanzo/ui'

const STATUS_LABEL: Record<NonNullable<Primitive['status']>, string> = {
  ga: 'Generally available',
  beta: 'Beta',
}

/**
 * Canonical overview page for any cloud primitive that doesn't have a bespoke
 * marketing page yet. Data-driven, monochrome, and self-contained so every
 * mega-menu leaf resolves to a real, unique page — never a 404, never an empty
 * stub. One component renders them all (DRY).
 *
 * The FACTS are what keep the second half of that promise. The taxonomy is
 * hydrated from the commerce catalog now, so a product can reach this page with
 * no marketing copy written for it yet — and a page holding a name and two CTAs
 * is the empty stub this component exists to avoid. What the catalog does state
 * about every product is specific and true: the operation that answers for it,
 * and the Google Cloud service a reader may already know it by. Those go above
 * the copy, so a page without prose still says what the thing is and where its
 * API is, rather than pretending to say more.
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
    <Box className="min-h-screen bg-background text-foreground">
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
        <Box className="flex items-start gap-5">
          <Box className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-neutral-900">
            <Icon className="h-7 w-7 text-foreground" />
          </Box>
          <Box className="min-w-0">
            {primitive.status && (
              <span className="mb-3 inline-flex items-center rounded-full border border-border bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                {STATUS_LABEL[primitive.status]}
              </span>
            )}
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{primitive.title}</h1>
            {primitive.tagline && <p className="mt-3 text-lg text-muted-foreground">{primitive.tagline}</p>}
          </Box>
        </Box>

        {/* Open-source + on-chain chips */}
        <Box className="mt-6 flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-md border border-border px-2.5 py-1 text-muted-foreground">Open source</span>
          <span className="rounded-md border border-border px-2.5 py-1 text-muted-foreground">On-chain settlement</span>
        </Box>

        {/* What the catalog states — the route that answers for this product,
            and the Google Cloud service it stands in for. */}
        <dl className="mt-8 grid gap-x-10 gap-y-3 text-sm sm:grid-cols-2">
          {primitive.api && (
            <Box className="flex gap-4">
              <dt className="w-24 shrink-0 text-muted-foreground">API</dt>
              <dd className="min-w-0 font-mono text-foreground/80">{primitive.api}</dd>
            </Box>
          )}
          {primitive.gcp && (
            <Box className="flex gap-4">
              <dt className="w-24 shrink-0 text-muted-foreground">Google Cloud</dt>
              <dd className="min-w-0 text-foreground/80">{primitive.gcp}</dd>
            </Box>
          )}
        </dl>

        {/* The product's own surface, running. One film per catalog product is
            rendered by film/mock, keyed by the same slug this page is routed
            on — so a product added to the catalog arrives here with its film
            already named, and there is no second list to keep in step. */}
        <figure className="mt-10">
          <Mockup slug={primitive.slug} alt={`The ${primitive.title} surface, running.`} />
        </figure>

        {/* Description */}
        {primitive.description && (
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-foreground/80">{primitive.description}</p>
        )}

        {/* Features */}
        {primitive.features && primitive.features.length > 0 && (
          <Box className="mt-10 grid gap-3 sm:grid-cols-2">
            {primitive.features.map((feature) => (
              <Box
                key={feature}
                className="flex items-start gap-3 rounded-xl border border-border bg-neutral-900/40 p-4"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground" />
                <span className="text-sm text-foreground/80">{feature}</span>
              </Box>
            ))}
          </Box>
        )}

        {/* Positioning line */}
        <p className="mt-14 text-sm text-muted-foreground">{POSITIONING}</p>

        {/* CTAs — anchors, not `Button asChild`.
            `Button` is Tamagui, and a sub-theme makes it wrap its child in
            `<span class="t_sub_theme" style="display:contents">`. That wrapper
            needs the Tamagui provider context, which a SERVER component does not
            carry: the server wrote a bare `<a role="button">` and the client
            rendered the span, so every one of these pages failed hydration and
            regenerated its whole tree. The sibling heroes never hit it because
            both are 'use client'.

            An anchor with the page's own tokens is what CloudLanding already
            uses for exactly this row, so the shape is the house one — and it
            drops a runtime from a page that only needed four links. */}
        <Box className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/signup"
            className="inline-flex min-h-11 items-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground no-underline transition-opacity hover:opacity-90 hover:no-underline"
          >
            Get started
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
          <Link
            href="/contact/sales"
            className="inline-flex min-h-11 items-center rounded-md border border-border px-6 text-sm font-medium text-foreground/80 no-underline transition-colors hover:text-foreground hover:no-underline"
          >
            Talk to us
          </Link>
          {primitive.github && (
            <a
              href={primitive.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-md px-4 text-sm font-medium text-muted-foreground no-underline transition-colors hover:text-foreground hover:no-underline"
            >
              <Github className="mr-1.5 h-4 w-4" />
              Source
            </a>
          )}
          {primitive.docs && (
            <a
              href={primitive.docs}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-md px-4 text-sm font-medium text-muted-foreground no-underline transition-colors hover:text-foreground hover:no-underline"
            >
              <BookOpen className="mr-1.5 h-4 w-4" />
              Docs
            </a>
          )}
        </Box>
      </section>
    </Box>
  )
}

export default CloudPrimitiveOverview
