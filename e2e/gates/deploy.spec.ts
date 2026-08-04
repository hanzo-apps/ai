import { test, expect } from '@playwright/test'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './export'

/**
 * The pipeline, as a subject a gate can read.
 *
 * Every other spec here asserts against `out/`, because the bytes that ship are
 * the only honest subject. These three assert against the workflow that ships
 * them, for the reason `publish.spec.ts` reads `app/robots.ts`: some defects are
 * a NAME that resolves to nothing, and nothing downstream can see the
 * difference between a name that resolves to nothing and a value that is
 * legitimately absent.
 *
 * Both defects below were live in `.hanzo/workflows/deploy.yml` and both were
 * silent. Actions substitutes an unknown `steps.<id>.outputs.<name>` with the
 * empty string and BuildKit warns-and-ignores an unknown `--build-arg`, so a run
 * carrying neither the key it fetched nor the argument it meant to pass is a
 * green run. The KMS step goes to some length to make an ABSENT key loud — three
 * `::error::` branches — and then the value it fetched was dropped twice on one
 * line. A control that reports success while carrying nothing is the failure
 * mode; these say the wiring resolves.
 */
const DIR = join(ROOT, '.hanzo', 'workflows')

type Workflow = { name: string; text: string }

const workflows = (): Workflow[] =>
  readdirSync(DIR)
    .filter((name) => name.endsWith('.yml'))
    .map((name) => ({ name, text: readFileSync(join(DIR, name), 'utf8') }))

/** A job's steps. Six spaces then `- ` is a step; a `run:` body is indented deeper. */
const steps = (text: string): string[] => text.split(/\n {6}- /)

test('every step output a workflow reads is one some step writes', () => {
  const wrote = new Map<string, Set<string>>()
  const read: { where: string; ref: string }[] = []
  const anonymous: string[] = []
  for (const { name, text } of workflows()) {
    for (const step of steps(text)) {
      const id = /^\s*id:\s*(\S+)/m.exec(step)?.[1]
      const written = [...step.matchAll(/([A-Za-z_]\w*)=[^\n]*>>\s*"?\$GITHUB_OUTPUT/g)].map((m) => m[1])
      if (written.length === 0) continue
      // An output written by a step with no `id:` is unreachable by definition —
      // there is no name to read it under.
      if (!id) anonymous.push(`${name}: writes ${written.join(', ')} in a step with no id`)
      else wrote.set(`${name}#${id}`, new Set([...(wrote.get(`${name}#${id}`) ?? []), ...written]))
    }
    for (const m of text.matchAll(/steps\.([A-Za-z_][\w-]*)\.outputs\.([A-Za-z_][\w-]*)/g)) {
      read.push({ where: `${name}#${m[1]}`, ref: m[2] })
    }
  }
  expect(anonymous, anonymous.join('\n')).toEqual([])
  // The floor. Every assertion below is "no reference is unresolved", which a
  // workflow set that reads nothing satisfies perfectly.
  expect(read.length, 'the workflows must actually read step outputs').toBeGreaterThan(0)
  const unresolved = read
    .filter(({ where, ref }) => !wrote.get(where)?.has(ref))
    .map(({ where, ref }) => `${where}.outputs.${ref} — written by no step (Actions substitutes "")`)
  expect(unresolved, unresolved.join('\n')).toEqual([])
})

test('every build-arg a workflow passes names an ARG its Dockerfile declares', () => {
  const passed: { where: string; key: string }[] = []
  const declared = new Map<string, string[]>()
  for (const { name, text } of workflows()) {
    const blocks = [...text.matchAll(/\n[ \t]*build-args:[ \t]*\|[ \t]*\n((?:[ \t]+\S[^\n]*\n)+)/g)]
    if (blocks.length === 0) continue
    const file = /^\s*file:\s*\.?\/?(\S+)/m.exec(text)?.[1] ?? 'Dockerfile'
    const path = join(ROOT, file)
    expect(existsSync(path), `${name} builds ${file}, which is not in the tree`).toBe(true)
    declared.set(
      name,
      [...readFileSync(path, 'utf8').matchAll(/^ARG[ \t]+([A-Za-z_]\w*)/gm)].map((m) => m[1]),
    )
    for (const block of blocks) {
      for (const m of block[1].matchAll(/^[ \t]*([A-Za-z_]\w*)=/gm)) passed.push({ where: name, key: m[1] })
    }
  }
  expect(passed.length, 'the workflows must actually pass build args').toBeGreaterThan(0)
  const undeclared = passed
    .filter(({ where, key }) => !declared.get(where)?.includes(key))
    .map(({ where, key }) => `${where} passes --build-arg ${key}, which its Dockerfile declares no ARG for`)
  expect(undeclared, undeclared.join('\n')).toEqual([])
})

/**
 * The image this repo's apex publishes. Named once, here, because it is the
 * scope boundary: cloud.hanzo.ai ships a DIFFERENT image from the same export
 * (cloud.yml, SITE_ROOT=cloud) and is not gated either — a real gap, and one
 * that belongs to that host rather than to this fix.
 */
const APEX = 'ghcr.io/hanzoai/hanzo-ai-www'

test('the workflow that publishes the apex runs the gates before it pushes', () => {
  // Workflows on one trigger do not order themselves. cicd.yml (which runs
  // `hanzo.yml`'s gates) and deploy.yml both fire on push to main, neither
  // waits for the other, and there is no cross-workflow `needs:`. A red gate in
  // one therefore does not stop the other publishing. So the check has to sit
  // in the job that pushes, and this says it does — the ordering, not merely
  // the presence, because a gate that runs after the push is a report.
  const publishing = workflows().filter(({ text }) => text.includes(APEX))
  expect(publishing.map(({ name }) => name), `no workflow publishes ${APEX}`).not.toEqual([])
  for (const { name, text } of publishing) {
    const gates = text.indexOf('pnpm gates')
    const push = text.indexOf('push: true')
    expect(gates, `${name} publishes ${APEX} and never runs the gates`).toBeGreaterThan(-1)
    expect(push, `${name} must actually push`).toBeGreaterThan(-1)
    expect(gates, `${name} runs the gates AFTER it pushes, which is a report`).toBeLessThan(push)
  }
})
