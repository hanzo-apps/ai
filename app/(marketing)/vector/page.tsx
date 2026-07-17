'use client'

import {
  Boxes,
  Cloud,
  Search,
  BrainCircuit,
  Sparkles,
  Filter,
  Layers,
  Gauge,
  Network,
  KeyRound,
  Rocket,
} from 'lucide-react'
import { ProductLanding } from '@/components/product/ProductLanding'
import { ProductFooter } from '@/components/products/ProductFooter'

const DOCS = 'https://docs.hanzo.ai/vector'
const GITHUB = 'https://github.com/hanzoai/vector'
const CONSOLE = 'https://console.hanzo.ai'

export default function VectorPage() {
  return (
    <>
      <ProductLanding
        badge="Hanzo Vector · Data Cloud"
        badgeIcon={Boxes}
        title="Vector search, production-ready"
        lede="Store and search high-dimensional embeddings for semantic search, RAG, and recommendations — a managed, horizontally-scalable vector database with a clean API and one-command deploy."
        ctas={[
          { label: 'Start free', href: CONSOLE, icon: Rocket },
          { label: 'Read the docs', href: DOCS },
          { label: 'View on GitHub', href: GITHUB },
        ]}
        note={{ icon: Cloud, text: 'Open source (Apache-2.0), built on Qdrant. Self-host anywhere or run managed on Hanzo Cloud.' }}
        what={{
          eyebrow: 'What is Hanzo Vector',
          title: 'Embeddings in, relevant results out',
          sub: 'One index powers the three workloads modern AI apps depend on — search, retrieval, and recommendations — behind a single API and one key.',
          pillars: [
            {
              icon: Search,
              title: 'Semantic search',
              body: 'Search by meaning, not keywords — approximate nearest-neighbor over your embeddings with rich payload filtering and hybrid scoring.',
            },
            {
              icon: BrainCircuit,
              title: 'RAG memory',
              body: 'The retrieval layer for grounded LLM apps: attach real source passages to every answer and keep hallucination in check.',
            },
            {
              icon: Sparkles,
              title: 'Recommendations',
              body: '“More like this,” dedup, and candidate generation at scale — similarity and personalization served from the same collection.',
            },
          ],
        }}
        features={{
          eyebrow: 'Capabilities',
          title: 'Everything you need to ship retrieval',
          items: [
            { icon: Gauge, title: 'HNSW indexing', body: 'Fast approximate nearest-neighbor with tunable recall vs. latency, scaling to billions of vectors per collection.' },
            { icon: Filter, title: 'Metadata filtering', body: 'Rich payload filters — geo, ranges, keywords — applied inside the ANN search, not bolted on afterward.' },
            { icon: Layers, title: 'Hybrid search', body: 'Combine dense vectors with sparse and keyword signals for precision on the queries pure vectors miss.' },
            { icon: Boxes, title: 'Quantization', body: 'Scalar and product quantization cut memory and cost dramatically without collapsing recall.' },
            { icon: KeyRound, title: 'One key for embed + store', body: 'Pair with Hanzo’s OpenAI-compatible embeddings API — one API key to embed, upsert, and search.' },
            { icon: Network, title: 'Horizontal scale', body: 'Sharding and replication for high availability; snapshots for backup and point-in-time restore.' },
          ],
        }}
        finalCta={{
          icon: Boxes,
          title: 'Ship semantic search this week',
          sub: 'Spin up a managed collection on Hanzo Cloud, or self-host the open-source engine anywhere.',
          buttons: [
            { label: 'Deploy on Hanzo Cloud', href: CONSOLE, icon: Rocket },
            { label: 'Read the docs', href: DOCS },
            { label: 'GitHub', href: GITHUB },
          ],
        }}
      />
      <ProductFooter slug="vector" name="Vector" />
    </>
  )
}
