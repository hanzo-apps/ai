/**
 * The research library, as this site reads it.
 *
 * `papers.json` is written by `scripts/sync-papers.mjs` at prebuild from
 * papers.hanzo.ai, which is where a paper is actually published. This file only
 * gives that snapshot a type and a name — it owns no titles and no prose, the
 * way `cloud-primitives.ts` owns prose and never membership.
 */
import snapshot from './papers.json' with { type: 'json' }

export interface Paper {
  /** The library's own path segment: papers.hanzo.ai/<slug>/ */
  slug: string
  title: string
  /** The author's one-line statement of what the paper is. */
  subtitle: string
  /** As the library prints it, e.g. `Jun 2026`. */
  date: string
  tags: string[]
  /** Absolute on the library's host, e.g. `/pdfs/<id>.pdf`. */
  pdf: string
}

export interface Library {
  /** The host the snapshot came from — every link on this site is built off it. */
  source: string
  /** ISO date of the fetch. A snapshot that cannot say how old it is rots invisibly. */
  fetched: string
  papers: Paper[]
}

export const papers: Library = snapshot as Library

export const PAPERS: Paper[] = papers.papers
