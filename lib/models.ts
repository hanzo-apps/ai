import { allModels as zenModels } from '@zenlm/models'
import type { ZenModel } from '@zenlm/models'

export interface ModelSpec {
  params?: string
  activeParams?: string
  context?: number
  arch?: string
}

export interface ModelData {
  id: string
  name: string
  fullName?: string
  provider: string
  description?: string
  context?: number
  modalities?: string[]
  status: string
  category: string
  spec?: ModelSpec
  features?: string[]
  huggingface?: string
  github?: string
  aliases?: string[]
  tier?: string
  generation?: string
}

export interface ModelsResponse {
  updated: string
  total: number
  models: ModelData[]
}

function zenToModelData(z: ZenModel): ModelData {
  return {
    id: z.id,
    name: z.name,
    fullName: z.fullName,
    provider: 'hanzo',
    description: z.description,
    context: z.spec?.context,
    modalities: z.modalities as string[],
    status: z.status,
    category: z.category,
    spec: z.spec ? {
      params: z.spec.params,
      activeParams: z.spec.activeParams ?? undefined,
      context: z.spec.context,
      arch: z.spec.arch,
    } : undefined,
    features: z.features,
    huggingface: z.huggingface ?? undefined,
    github: z.github ?? undefined,
    aliases: z.aliases,
    tier: z.tier,
    generation: z.generation,
  }
}

const STATIC_FALLBACK: ModelsResponse = {
  updated: 'static',
  total: zenModels.length,
  models: zenModels.map(zenToModelData),
}

const FETCH_TIMEOUT_MS = 5_000

let cachedResult: ModelsResponse | null = null

export async function fetchModels(): Promise<ModelsResponse> {
  if (cachedResult) return cachedResult

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

    const res = await fetch('https://models.hanzo.ai/v1/models', {
      signal: controller.signal,
      next: { revalidate: 3600 },
    })
    clearTimeout(timeout)

    if (!res.ok) {
      console.warn(`[models] API returned ${res.status}, using static fallback (${STATIC_FALLBACK.total} Zen models)`)
      cachedResult = STATIC_FALLBACK
      return STATIC_FALLBACK
    }
    const data: ModelsResponse = await res.json()
    console.log(`[models] Fetched ${data.total} models from API`)
    cachedResult = data
    return data
  } catch (err) {
    const reason = err instanceof DOMException && err.name === 'AbortError'
      ? 'timeout'
      : String(err)
    console.warn(`[models] API ${reason}, using static fallback (${STATIC_FALLBACK.total} Zen models)`)
    cachedResult = STATIC_FALLBACK
    return STATIC_FALLBACK
  }
}

export function getOrgAndSlug(modelId: string): { org: string; slug: string } {
  if (modelId.includes('/')) {
    const [org, ...rest] = modelId.split('/')
    return { org, slug: rest.join('/') }
  }
  return { org: 'hanzo', slug: modelId }
}

// Some labs reach the gateway under two namespaces — `meta-llama` and `meta`,
// `bytedance-seed` and `bytedance` — and a leading `~` marks a latest-alias
// namespace of a lab already present. Fold them onto one canonical org so
// "Browse by lab" shows one card per lab and its page serves the union. Mirrors
// ProviderMark's OF map, which folds the same aliases for the mark.
const ORG_ALIASES: Record<string, string> = {
  'meta-llama': 'meta',
  'bytedance-seed': 'bytedance',
}

export function canonicalOrg(org: string): string {
  const base = org.replace(/^~/, '')
  return ORG_ALIASES[base] ?? base
}

export function modelPagePath(modelId: string): string {
  const { org, slug } = getOrgAndSlug(modelId)
  return `/models/${org}/${slug}`
}

export function getModelContext(model: ModelData): number | undefined {
  return model.context ?? model.spec?.context
}

export function formatContext(ctx: number | undefined): string {
  if (!ctx) return 'N/A'
  if (ctx >= 1_000_000) return `${Math.round(ctx / 1_000_000)}M`
  if (ctx >= 1_000) return `${Math.round(ctx / 1000)}K`
  return String(ctx)
}

// Map org slug → display name
export const ORG_DISPLAY_NAMES: Record<string, string> = {
  hanzo: 'Hanzo',
  openai: 'OpenAI',
  anthropic: 'Anthropic',
  google: 'Google',
  'meta-llama': 'Meta',
  'x-ai': 'xAI',
  mistralai: 'Mistral',
  deepseek: 'DeepSeek',
  qwen: 'Qwen',
  nvidia: 'NVIDIA',
  'z-ai': 'Z.ai',
  'arcee-ai': 'Arcee AI',
  minimax: 'Minimax',
  allenai: 'Allen AI',
  nousresearch: 'Nous Research',
  liquid: 'Liquid AI',
  moonshotai: 'Moonshot AI',
  amazon: 'Amazon',
  perplexity: 'Perplexity',
  baidu: 'Baidu',
  cohere: 'Cohere',
  'bytedance-seed': 'ByteDance Seed',
  openrouter: 'OpenRouter',
  microsoft: 'Microsoft',
  inflection: 'Inflection',
  sao10k: 'Sao10K',
  'aion-labs': 'Aion Labs',
  thedrummer: 'TheDrummer',
  stepfun: 'StepFun',
  relace: 'Relace',
  morph: 'Morph',
  inception: 'Inception',
  neversleep: 'NeverSleep',
  upstage: 'Upstage',
  writer: 'Writer',
  xiaomi: 'Xiaomi',
  'nex-agi': 'Nex-AGI',
  essentialai: 'EssentialAI',
  'prime-intellect': 'Prime Intellect',
  deepcogito: 'DeepCogito',
  kwaipilot: 'KwaiPilot',
  'ibm-granite': 'IBM Granite',
  alibaba: 'Alibaba',
  opengvlab: 'OpenGVLab',
  meituan: 'Meituan',
  ai21: 'AI21',
  bytedance: 'ByteDance',
  switchpoint: 'Switchpoint',
  cognitivecomputations: 'Cognitive Computations',
  tencent: 'Tencent',
  tngtech: 'TNG Tech',
  eleutherai: 'EleutherAI',
  alfredpros: 'AlfredPros',
  raifle: 'Raifle',
  'anthracite-org': 'Anthracite',
  alpindale: 'Alpindale',
  mancer: 'Mancer',
  undi95: 'Undi95',
  gryphe: 'Gryphe',
  meta: 'Meta',
  inclusionai: 'inclusionAI',
  thinkingmachines: 'Thinking Machines',
  rekaai: 'Reka AI',
  sakana: 'Sakana AI',
  perceptron: 'Perceptron',
}

export function orgDisplayName(org: string): string {
  return ORG_DISPLAY_NAMES[org] ?? org
}

// Monochrome: modality badges are distinguished by their label, not by hue.
// One shared neutral style keeps the model grid on-brand (true-black + white).
const MODALITY_STYLE = { bg: 'bg-white/10', text: 'text-white/70' } as const
export const MODALITY_STYLES: Record<string, { bg: string; text: string }> = {
  text:   MODALITY_STYLE,
  vision: MODALITY_STYLE,
  code:   MODALITY_STYLE,
  audio:  MODALITY_STYLE,
  math:   MODALITY_STYLE,
  image:  MODALITY_STYLE,
  video:  MODALITY_STYLE,
}
