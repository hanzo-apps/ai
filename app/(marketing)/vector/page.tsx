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

const DOCS = 'https://docs.hanzo.ai/docs/vector'
const GITHUB = 'https://github.com/hanzoai'
const CONSOLE = 'https://console.hanzo.ai'

export default function VectorPage() {
  return (
    <>
      <ProductLanding
        badge="Hanzo Vector · Data Cloud"
        badgeIcon={Boxes}
        title="A database for embeddings"
        lede="Vector stores embeddings and returns the ones nearest a query, in the order they are near it. Each point carries a payload beside its vector — ids, tags, timestamps, geography — and a filter on that payload is applied during the search rather than after it, so a filtered query still comes back with a full page of results."
        ctas={[
          { label: 'Start free', href: CONSOLE, icon: Rocket },
          { label: 'Read the docs', href: DOCS },
          { label: 'View on GitHub', href: GITHUB },
        ]}
        note={{ icon: Cloud, text: 'Open source (Apache-2.0), built on Qdrant. Self-host anywhere or run managed on Hanzo Cloud.' }}
        mockup={{
          slug: 'vector',
          alt: 'A result table: neighbours returned for a query, ordered by score.',
        }}
        what={{
          eyebrow: 'What is Hanzo Vector',
          title: 'Put vectors in, get neighbours out',
          sub: 'One collection behind semantic search, retrieval for grounded answers, and recommendations — the same API over REST or gRPC, and one key for all three.',
          pillars: [
            {
              icon: Search,
              title: 'Semantic search',
              body: 'Embed the question, find the nearest points, and narrow by payload inside the same search. Cosine, dot product, Euclidean or Manhattan distance — whichever your model was trained against.',
            },
            {
              icon: BrainCircuit,
              title: 'Retrieval for grounded answers',
              body: 'The passages an answer stands on, found by meaning rather than by keyword, each one arriving with the id and metadata you stored beside it — so the citation is already in hand when the answer is written.',
            },
            {
              icon: Sparkles,
              title: 'Recommendations',
              body: 'More like this, and less like that. Recommend takes positive and negative examples instead of a query vector; discover steers a search using pairs of them. Candidate generation and dedup come out of the collection you already search.',
            },
          ],
        }}
        features={{
          eyebrow: 'Capabilities',
          title: 'Everything you need to ship retrieval',
          items: [
            { icon: Gauge, title: 'HNSW, with the filter inside it', body: 'Approximate nearest-neighbour over a navigable small-world graph, with recall traded against latency by a parameter you set per query. Payload conditions are checked during the graph walk rather than applied to whatever it returned.' },
            { icon: Filter, title: 'Indexes on the fields you filter', body: 'Keyword, integer and float ranges, boolean, geographic, full-text and nested-object indexes, plus faceting to count matches per value. Index the field you filter on and the filter stops being a scan.' },
            { icon: Layers, title: 'Dense and sparse, merged', body: 'Run a dense vector query and a sparse keyword query as prefetches and fuse the two rankings — reciprocal rank fusion or distribution-based score fusion, weighted if you want. The exact-term match that embeddings alone walk past comes back.' },
            { icon: Boxes, title: 'Three ways to shrink a vector', body: 'Scalar quantization keeps a byte per dimension. Product quantization replaces blocks of dimensions with codebook entries. Binary quantization keeps one bit each, with hand-written kernels for AVX2, NEON and SSE. You choose where memory and recall meet.' },
            { icon: KeyRound, title: 'One key to embed and to store', body: 'Hanzo’s embeddings API and this index take the same key, so turning text into vectors and putting them somewhere searchable is one credential and one bill rather than two of each.' },
            { icon: Network, title: 'Shards, replicas, snapshots', body: 'A collection is split into shards — automatically, or by a key you pick — and each shard is copied as many times as you ask. A write-ahead log per shard covers the crash; snapshots, whole-collection or per-shard, cover everything else.' },
          ],
        }}
        finalCta={{
          icon: Boxes,
          title: 'Put a collection up',
          sub: 'Create one on Hanzo Cloud, or run the open-source engine yourself. Upsert a few thousand points and search them.',
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
