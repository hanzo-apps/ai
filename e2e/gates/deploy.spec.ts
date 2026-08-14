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
  // The floor, scoped to when it can mean something. "No reference is
  // unresolved" is satisfied perfectly by a workflow set that reads nothing, so
  // a set that PASSES values between steps has to prove it still reads them.
  // A set that passes none has nothing to lose track of: the publishable key is
  // now declared rather than fetched, so no step writes an output at all, and
  // demanding a read here would fail a pipeline whose wiring is simply gone.
  // What replaced this control is stronger and runs in `deploy.yml` before
  // publish: it greps the built `out/` for a `pk-` key and refuses to ship a
  // bundle carrying none, then asks the ingest door whether that key still
  // resolves. Both hold however the key reaches the build.
  if (wrote.size > 0) {
    expect(read.length, 'a workflow writes a step output that nothing reads').toBeGreaterThan(0)
  }
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
 * How the apex PUBLISHES. It is a Sites-plane deploy, not an image push: the
 * export goes to `POST /v1/projects/hanzo-ai/deploy` through hanzoai/ci's
 * sitedeploy action, so there is no `push: true` in the apex lane any more.
 *
 * This is matched by the ACTION, not by a name in prose. The previous version
 * looked for the string `ghcr.io/hanzoai/hanzo-ai-www` anywhere in a workflow,
 * which kept matching after the image lane was gone — deploy.yml still NAMES that
 * image, in the comment explaining what it replaced. A gate keyed on a word that
 * can appear in a sentence fails whenever someone documents the history, which is
 * exactly what it did. `uses:` is a line only a real step can carry.
 *
 * Scope boundary: cloud.hanzo.ai ships a DIFFERENT artifact from the same export
 * (cloud.yml → ghcr.io/hanzoai/cloud-www) and is still an image, still ungated —
 * a real gap, and one that belongs to that host rather than to this file.
 */
const PUBLISH = 'hanzoai/ci/.github/actions/sitedeploy'

test('the workflow that publishes the apex runs the gates before it publishes', () => {
  // Workflows on one trigger do not order themselves. cicd.yml (which runs
  // `hanzo.yml`'s gates) and deploy.yml both fire on push to main, neither waits
  // for the other, and there is no cross-workflow `needs:`. A red gate in one
  // therefore does not stop the other publishing. So the check has to sit in the
  // job that publishes, and this says it does — the ordering, not merely the
  // presence, because a gate that runs after the publish is a report.
  const publishing = workflows().filter(({ text }) =>
    new RegExp(`^\\s*uses:\\s*${PUBLISH}@`, 'm').test(text),
  )
  expect(publishing.map(({ name }) => name), `no workflow publishes the apex via ${PUBLISH}`).not.toEqual([])
  for (const { name, text } of publishing) {
    const gates = text.indexOf('pnpm gates')
    const publish = text.search(new RegExp(`^\\s*uses:\\s*${PUBLISH}@`, 'm'))
    expect(gates, `${name} publishes the apex and never runs the gates`).toBeGreaterThan(-1)
    expect(gates, `${name} runs the gates AFTER it publishes, which is a report`).toBeLessThan(publish)
  }
})

test('the apex publish pins the action and carries the one credential it needs', () => {
  const [apex] = workflows().filter(({ text }) =>
    new RegExp(`^\\s*uses:\\s*${PUBLISH}@`, 'm').test(text),
  )
  // A floating action ref is the same defect as a floating image tag: the build
  // that ships becomes unnameable. bin/sitedeploy resolves the action ref as its
  // OWN script ref, so @v1 is what makes "which publisher ran" answerable.
  expect(apex.text, `${apex.name} must pin the sitedeploy action to a ref`).toMatch(
    new RegExp(`uses:\\s*${PUBLISH}@v\\d`),
  )
  // ONE credential. The 202 returns a prefix-scoped, short-lived presigned POST
  // grant, so CI needs no bucket key — SITES_S3_* is the standing shared-bucket
  // credential the grant replaced, and any repo holding it could overwrite every
  // other org's site.
  //
  // It arrives as a step output because it is READ FROM KMS at run time. This
  // gate used to demand the opposite — `secrets.HANZO_DEPLOY_TOKEN`, a forge
  // secret — and so it pinned the credential to the one place that cannot say
  // whether the key inside it is still alive. The key in it resolved to no
  // principal, cloud answered 403, and the publish was the single red step under
  // every green gate including this one.
  expect(apex.text, `${apex.name} publishes without HANZO_DEPLOY_TOKEN`).toMatch(
    /HANZO_DEPLOY_TOKEN:\s*\$\{\{\s*steps\.[\w-]+\.outputs\.[\w-]+\s*\}\}/,
  )
  expect(apex.text, `${apex.name} does not read the deploy key from KMS`).toMatch(
    /\/v1\/kms\/secrets\/HANZO_DEPLOY_TOKEN/,
  )
  // The interpolation form, not the bare name — for the reason spelled out below
  // about SITES_S3_*. This workflow's comments carry the bare name, in the lines
  // that explain where the key moved and why.
  expect(apex.text, `${apex.name} takes the deploy key from a forge secret again`).not.toMatch(
    /\$\{\{\s*secrets\.HANZO_DEPLOY_TOKEN\s*\}\}/,
  )
  // `secrets.SITES_S3_`, not the bare name. The bare name is how the previous
  // version of the test above went wrong: it keyed on a string that a COMMENT can
  // legitimately contain — and this file's own workflow contains it, in the line
  // telling the next reader not to add it. A gate must match the thing, not the
  // word for the thing, or documenting a rule becomes a way to break it.
  expect(apex.text, `${apex.name} reintroduces SITES_S3_* — the grant replaced it`).not.toMatch(
    /\$\{\{\s*secrets\.SITES_S3_/,
  )
})
