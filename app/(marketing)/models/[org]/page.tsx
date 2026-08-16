import type { Metadata } from 'next'
import Link from 'next/link'
import { ProviderMark } from '@/components/models/ProviderMark'
import {
  fetchModels,
  getOrgAndSlug,
  canonicalOrg,
  orgDisplayName,
  formatContext,
  getModelContext,
  MODALITY_STYLES,
  modelPagePath,
} from '@/lib/models'
import { Box } from '@hanzo/ui'

export const revalidate = 3600

interface Props {
  params: Promise<{ org: string }>
}

export async function generateStaticParams() {
  const data = await fetchModels()
  const orgs = new Set<string>()
  for (const model of data.models) {
    const { org } = getOrgAndSlug(model.id)
    orgs.add(canonicalOrg(org))
  }
  return Array.from(orgs).map((org) => ({ org }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { org } = await params
  const data = await fetchModels()
  const models = data.models.filter((m) => {
    const { org: mOrg } = getOrgAndSlug(m.id)
    return canonicalOrg(mOrg) === org
  })
  const providerName = orgDisplayName(org)
  const count = models.length
  return {
    title: `${providerName} Models via Hanzo AI — ${count} models`,
    description: `Access all ${count} ${providerName} model${count !== 1 ? 's' : ''} through Hanzo's OpenAI-compatible API. Single API key, unified billing, no rate limit juggling.`,
    openGraph: {
      title: `${providerName} Models via Hanzo AI`,
      description: `${count} ${providerName} models via one OpenAI-compatible API.`,
      url: `https://hanzo.ai/models/${org}`,
      siteName: 'Hanzo AI',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${providerName} Models via Hanzo AI`,
      description: `${count} ${providerName} models. One API key.`,
    },
  }
}

function ModalityBadge({ modality }: { modality: string }) {
  const style = MODALITY_STYLES[modality] ?? { bg: 'bg-secondary', text: 'text-muted-foreground' }
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wide ${style.bg} ${style.text}`}
    >
      {modality}
    </span>
  )
}

export default async function OrgPage({ params }: Props) {
  const { org } = await params
  const data = await fetchModels()

  const orgModels = data.models.filter((m) => {
    const { org: mOrg } = getOrgAndSlug(m.id)
    return canonicalOrg(mOrg) === org
  })

  const providerName = orgDisplayName(org)

  if (orgModels.length === 0) {
    return (
      <Box className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <Box className="text-center">
          <h1 className="text-2xl font-bold mb-2">Provider not found</h1>
          <Link href="/models" className="text-muted-foreground hover:underline">
            ← Back to all models
          </Link>
        </Box>
      </Box>
    )
  }

  return (
    <Box className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <section className="pt-24 pb-12 px-4 border-b border-border">
        <Box className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/models" className="hover:text-foreground transition-colors">
              Models
            </Link>
            <span>/</span>
            <span className="text-foreground">{providerName}</span>
          </nav>

          <Box className="flex items-center gap-4 mb-6">
            <ProviderMark org={org} size={48} />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{providerName} Models via Hanzo AI</h1>
              <p className="text-muted-foreground mt-1">{orgModels.length} models available</p>
            </div>
          </Box>

          <p className="text-muted-foreground max-w-2xl">
            Access all {orgModels.length} {providerName} model{orgModels.length !== 1 ? 's' : ''} through
            Hanzo's OpenAI-compatible API. Single API key, unified billing, no rate limit juggling.
          </p>

          <Box className="flex flex-wrap gap-3 mt-6">
            <Link
              href="/signup"
              className="px-5 py-2.5 rounded-lg bg-foreground text-background font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Get API Access
            </Link>
            <Link
              href="https://docs.hanzo.ai"
              className="px-5 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-secondary/50 transition-colors"
            >
              API Docs
            </Link>
          </Box>
        </Box>
      </section>

      {/* Model grid */}
      <section className="py-12 px-4">
        <Box className="max-w-5xl mx-auto">
          <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {orgModels.map((model) => {
              const ctx = getModelContext(model)
              return (
                <Link
                  key={model.id}
                  href={modelPagePath(model.id)}
                  className="p-4 rounded-xl border border-border bg-secondary/30 hover:bg-secondary/50 transition-all group flex flex-col gap-3"
                >
                  <Box className="flex items-start justify-between gap-2">
                    <Box className="font-medium text-sm leading-snug group-hover:text-foreground/80 transition-colors">
                      {model.name}
                    </Box>
                    {ctx && (
                      <span className="shrink-0 text-xs text-muted-foreground bg-secondary rounded px-1.5 py-0.5">
                        {formatContext(ctx)}
                      </span>
                    )}
                  </Box>

                  {model.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {model.description}
                    </p>
                  )}

                  <Box className="flex flex-wrap gap-1 mt-auto">
                    {(model.modalities ?? []).slice(0, 3).map((m) => (
                      <ModalityBadge key={m} modality={m} />
                    ))}
                  </Box>
                </Link>
              )
            })}
          </Box>
        </Box>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 border-t border-border bg-secondary/10">
        <Box className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">Use {providerName} models via Hanzo</h2>
          <p className="text-muted-foreground mb-6">
            One API key. Unified billing. OpenAI-compatible. Works with every existing SDK.
          </p>
          <Box className="flex flex-wrap justify-center gap-3">
            <Link
              href="/signup"
              className="px-6 py-3 rounded-lg bg-foreground text-background font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Start Free
            </Link>
            <Link
              href="/models"
              className="px-6 py-3 rounded-lg border border-border text-sm font-medium hover:bg-secondary/50 transition-colors"
            >
              Browse All Models
            </Link>
          </Box>
        </Box>
      </section>
    </Box>
  )
}
