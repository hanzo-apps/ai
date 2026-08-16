#!/usr/bin/env node
/**
 * Emit the machine-readable face of this site, derived from the export.
 *
 *   out/<route>.md      every published page as markdown
 *   out/llms.txt        the index — one line per page, title + description
 *   out/llms-full.txt   every page's markdown, concatenated
 *
 * Derived, never listed: it reads the HTML the build just wrote, so a page
 * cannot be missing from it and a retired page cannot linger. `policy()` is the
 * same gate the sitemap uses, so nothing withheld from indexing is published
 * here either.
 *
 * The markdown comes from `<main>` alone — the chrome is navigation, and a
 * reader that wanted the nav would read the sitemap.
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync, statSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { indexable } from '../lib/publish.ts'

const OUT = 'out'
const SITE = 'https://hanzo.ai'

const BLOCK =
  'p|div|section|article|header|footer|nav|ul|ol|li|h[1-6]|br|hr|tr|td|th|blockquote|pre|table|button|summary|dt|dd|figcaption|label|option'

const decode = (s) =>
  s
    .replace(/&(?:#39|apos|rsquo);/g, "'")
    .replace(/&(?:#8220|#8221|ldquo|rdquo|quot);/g, '"')
    .replace(/&(?:mdash|#8212);/g, '—')
    .replace(/&(?:ndash|#8211);/g, '–')
    .replace(/&(?:nbsp|#160);/g, ' ')
    .replace(/&(?:amp|#38);/g, '&')
    .replace(/&(?:lt|#60);/g, '<')
    .replace(/&(?:gt|#62);/g, '>')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))

/** `<main>`'s inner HTML, or null when a page has none (a redirect shell). */
const mainOf = (html) => {
  const open = html.search(/<main[^>]*>/)
  if (open === -1) return null
  const start = html.indexOf('>', open) + 1
  let depth = 1
  const re = /<(\/?)main\b[^>]*>/g
  re.lastIndex = start
  for (let m; (m = re.exec(html)); ) {
    depth += m[1] ? -1 : 1
    if (!depth) return html.slice(start, m.index)
  }
  return html.slice(start)
}

/**
 * HTML → markdown, deliberately small. Headings, links, list items, code and
 * paragraphs are what a page's prose is made of; a general converter would be a
 * dependency for the ten per cent it handles better.
 */
const toMarkdown = (html) =>
  decode(
    html
      .replace(/<(script|style|svg|noscript|template)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
      .replace(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi, (_, n, t) => `\n\n${'#'.repeat(+n)} ${strip(t)}\n\n`)
      .replace(/<li\b[^>]*>([\s\S]*?)<\/li>/gi, (_, t) => `\n- ${strip(t)}`)
      .replace(/<pre\b[^>]*>([\s\S]*?)<\/pre>/gi, (_, t) => `\n\n\`\`\`\n${strip(t)}\n\`\`\`\n\n`)
      .replace(/<code\b[^>]*>([\s\S]*?)<\/code>/gi, (_, t) => `\`${strip(t)}\``)
      .replace(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, t) => {
        const label = strip(t)
        return label ? `[${label}](${href.startsWith('/') ? SITE + href : href})` : ''
      })
      .replace(new RegExp(`</(?:${BLOCK})>`, 'gi'), '\n\n')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<[^>]+>/g, ''),
  )
    .replace(/[ \t]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()

const strip = (s) => decode(s.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim()

const meta = (html, name) => {
  const m = html.match(new RegExp(`<meta name="${name}" content="([^"]*)"`))
  return m ? decode(m[1]) : ''
}

const pages = []
const walk = (dir) => {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) walk(p)
    else if (e.name.endsWith('.html')) pages.push(p)
  }
}
walk(OUT)

let written = 0
const index = []
const full = []

for (const file of pages.sort()) {
  const html = readFileSync(file, 'utf8')
  const route = '/' + relative(OUT, file).replace(/\.html$/, '').replace(/^index$/, '')
  // Anything withheld from indexing is withheld here too — one gate, one answer.
  // Asked of the ROUTE, which is where the answer lives, rather than read back
  // off the tag in the built page: the tag is one rendering of this decision,
  // and matching it here would be a second spelling to keep in step.
  if (!indexable(route)) continue

  const body = mainOf(html)
  if (!body) continue
  const md = toMarkdown(body)
  if (md.length < 200) continue // a shell, not a page

  const title = strip((html.match(/<title>([^<]*)<\/title>/) || [, ''])[1])
  const description = meta(html, 'description')

  const target = join(OUT, relative(OUT, file).replace(/\.html$/, '.md'))
  mkdirSync(dirname(target), { recursive: true })
  writeFileSync(target, `# ${title}\n\n${description ? `> ${description}\n\n` : ''}${md}\n`)
  written++

  // Point the page at its own markdown. An agent that reads the head finds the
  // plain-text body without guessing a URL convention.
  const link = `<link rel="alternate" type="text/markdown" href="${route}.md"/>`
  if (!html.includes(link)) writeFileSync(file, html.replace('</head>', `${link}</head>`))

  index.push(`- [${title}](${SITE}${route}.md)${description ? `: ${description}` : ''}`)
  full.push(`# ${title}\n\nURL: ${SITE}${route}\n\n${md}\n`)
}

const header = readFileSync('public/llms.txt', 'utf8').split(/\n## /)[0].trim()

writeFileSync(
  join(OUT, 'llms.txt'),
  `${header}\n\n## Pages\n\nEvery page is also served as markdown at the same path with a \`.md\` suffix.\n\n${index.join('\n')}\n`,
)
writeFileSync(join(OUT, 'llms-full.txt'), full.join('\n---\n\n'))

const size = (p) => (statSync(p).size / 1024).toFixed(0)
console.log(
  `[llms] ${written} pages as markdown · llms.txt ${size(join(OUT, 'llms.txt'))} KB · llms-full.txt ${size(join(OUT, 'llms-full.txt'))} KB`,
)
