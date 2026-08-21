// `go get hanzo.ai/iam` — the import path is the site, not the host holding the code.
//
// The go tool asks for the import path with ?go-get=1 and reads one meta tag out
// of the answer. A static export has no middleware to write that tag, so it is
// page metadata, and every module below therefore needs a page at its own name.
//
// The tag points at GITHUB and not the forge, which is measured rather than
// preferred: an unauthenticated clone of git.hanzo.ai answers `could not read
// Username`, so a tag naming it would fail for everyone who is not us —
// including proxy.golang.org, which fetches anonymously and is what makes a
// module resolvable at all.
//
// A module is listed only if `github.com/hanzoai/<name>` answers 200 to an
// anonymous request AND the repository name equals the module name. Publishing a
// path that resolves to nothing is worse than publishing none: `go get` fails at
// the clone, after the tool has already told the caller the path is real.

const REPO = 'https://github.com/hanzoai'

/** Modules whose name is free at the root, so they get their own page. */
export const OWNED = [
  'age',
  'agent',
  'base-ha',
  'builder',
  'cd',
  'cek',
  'ci',
  'cpy3',
  'csqlite',
  'dashscopego',
  'dashscope-go-sdk',
  'dbx',
  'egress',
  'finance',
  'git',
  'gochimp3',
  'go-openai',
  'go-openrouter',
  'graph',
  'grpc-web',
  'ingress-parser',
  'insights-go',
  'kafka',
  'kms-operator',
  'livekit',
  'log',
  'ltx',
  'namespace',
  'notify',
  'o11y-foundry',
  'onnxgo',
  'orm',
  'otel-collector',
  'pdf',
  'proto',
  'pubsub-go',
  'replicate',
  'search-go',
  'sendgrid-go',
  'sqlcipher',
  'sqlite',
  'sqlite-vec',
  'tygoja',
  'vfs',
  'xorm',
  'yaegi',
  'zip',
] as const

/** Modules whose name is already a product page. That page carries the tag. */
export const SHARED = [
  'ai',
  'authz',
  'base',
  'cloud',
  'commerce',
  'dashboards',
  'docdb',
  'functions',
  'hsm',
  'iam',
  'idv',
  'ingress',
  'metrics',
  'o11y',
  'pubsub',
  's3',
  'status',
  'tasks',
  'visor',
] as const

export const MODULES = [...OWNED, ...SHARED]

/** The tag, defined once. `go-source` is what pkg.go.dev links "source" to. */
export function goImport(name: string) {
  const path = `hanzo.ai/${name}`
  const repo = `${REPO}/${name}`
  return {
    'go-import': `${path} git ${repo}`,
    'go-source': `${path} ${repo} ${repo}/tree/main{/dir} ${repo}/blob/main{/dir}/{file}#L{line}`,
  }
}

export const repoOf = (name: string) => `${REPO}/${name}`
