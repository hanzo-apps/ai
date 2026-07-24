// The Zen of Hanzo — canonical data module (single source of truth).
//
// 64 hexagrams of the I Ching (King Wen order). Every hexagram is ACTIVE: the
// condition changes, not the validity of the principle. Each classical condition
// maps to a Hanzo engineering principle, an operational rule, a diagnostic
// question and (where the source cites one) an interpretive lens.
//
// PROVENANCE ONLY — never rendered to the reader: `nameZh` (Chinese name) and
// `namePinyin`. The page shows glyph + number + English label; expanded content
// is English only. Keep the Unicode hexagram glyphs (U+4DC0–U+4DFF) and trigram
// glyphs (U+2630–U+2637): these are I-Ching symbols, not emojis.

export type TrigramKey =
  | "qian" | "dui" | "li" | "zhen" | "xun" | "kan" | "gen" | "kun";

export interface Trigram {
  key: TrigramKey;
  glyph: string; // U+2630–U+2637
  name: string; // English — the only label shown to readers
  lines: [number, number, number]; // bottom → top, 1 = yang (solid), 0 = yin (broken)
}

// The eight trigrams. A hexagram = lower trigram (bottom three lines) stacked
// under the upper trigram (top three lines).
export const TRIGRAMS: Record<TrigramKey, Trigram> = {
  qian: { key: "qian", glyph: "☰", name: "Heaven", lines: [1, 1, 1] },
  dui:  { key: "dui",  glyph: "☱", name: "Lake",   lines: [1, 1, 0] },
  li:   { key: "li",   glyph: "☲", name: "Fire",   lines: [1, 0, 1] },
  zhen: { key: "zhen", glyph: "☳", name: "Thunder",lines: [1, 0, 0] },
  xun:  { key: "xun",  glyph: "☴", name: "Wind",   lines: [0, 1, 1] },
  kan:  { key: "kan",  glyph: "☵", name: "Water",  lines: [0, 1, 0] },
  gen:  { key: "gen",  glyph: "☶", name: "Mountain",lines: [0, 0, 1] },
  kun:  { key: "kun",  glyph: "☷", name: "Earth",  lines: [0, 0, 0] },
};

// Canonical axis order for the matrix (Heaven → Earth).
export const TRIGRAM_ORDER: TrigramKey[] = [
  "qian", "dui", "li", "zhen", "xun", "kan", "gen", "kun",
];

export type LensKey = "zen" | "curry" | "hickey" | "pike";

export interface Lens {
  key: LensKey;
  name: string;
  definition: string;
}

// Interpretive lenses — modern ways of reading the patterns, not historical
// collaborators. Definitions are authoritative (owner-authored).
export const LENSES: Lens[] = [
  { key: "zen",    name: "Zen",    definition: "Beginner's mind, direct experience, non-attachment, continuous practice." },
  { key: "curry",  name: "Curry",  definition: "Expressive systems assembled from small composable primitives via combinatory logic." },
  { key: "hickey", name: "Hickey", definition: "Simplicity is separating concerns, not merely making things convenient or easy." },
  { key: "pike",   name: "Pike",   definition: "A small set of orthogonal, predictable features covers a large solution space." },
];

export interface HexagramGroup {
  roman: string;
  name: string;
  from: number;
  to: number;
}

// Eight groups of eight — the arc of change from origination to continuity.
export const GROUPS: HexagramGroup[] = [
  { roman: "I",    name: "Origination",    from: 1,  to: 8  },
  { roman: "II",   name: "Formation",      from: 9,  to: 16 },
  { roman: "III",  name: "Correction",     from: 17, to: 24 },
  { roman: "IV",   name: "Power",          from: 25, to: 32 },
  { roman: "V",    name: "Adaptation",     from: 33, to: 40 },
  { roman: "VI",   name: "Transformation", from: 41, to: 48 },
  { roman: "VII",  name: "Renewal",        from: 49, to: 56 },
  { roman: "VIII", name: "Continuity",     from: 57, to: 64 },
];

export interface Hexagram {
  num: number;
  glyph: string; // U+4DC0–U+4DFF — kept (not an emoji)
  nameZh: string; // provenance only — never rendered
  namePinyin: string; // provenance only — never rendered
  classical: string; // classical condition, e.g. "The Creative"
  principle: string; // one-line principle name, e.g. "Initiative"
  statement: string; // the Hanzo principle, e.g. "Create from first principles."
  rule: string; // operational rule
  question: string; // diagnostic question
  lenses: LensKey[];
  group: string; // group name
  upper: TrigramKey;
  lower: TrigramKey;
}

export const HEXAGRAMS: Hexagram[] = [
  // ── I · Origination ─────────────────────────────────────────────
  { num: 1, glyph: "䷀", nameZh: "乾", namePinyin: "Qián", classical: "The Creative", principle: "Initiative",
    statement: "Create from first principles.",
    rule: "Do not begin with inherited limitations. Establish the essential force of the system before adding conventions, integrations or optimization.",
    question: "What should exist that does not exist yet?",
    lenses: [], group: "Origination", upper: "qian", lower: "qian" },
  { num: 2, glyph: "䷁", nameZh: "坤", namePinyin: "Kūn", classical: "The Receptive", principle: "Grounding",
    statement: "Build upon reality.",
    rule: "Listen to users, environments, constraints and evidence. Strong foundations receive information before imposing structure.",
    question: "What is reality already telling us?",
    lenses: [], group: "Origination", upper: "kun", lower: "kun" },
  { num: 3, glyph: "䷂", nameZh: "屯", namePinyin: "Zhūn", classical: "Difficulty at the Beginning", principle: "Emergence",
    statement: "Expect disorder at inception.",
    rule: "New systems begin with incomplete information, unstable interfaces and competing possibilities. Establish roots before pursuing speed.",
    question: "What must become stable first?",
    lenses: [], group: "Origination", upper: "kan", lower: "zhen" },
  { num: 4, glyph: "䷃", nameZh: "蒙", namePinyin: "Méng", classical: "Youthful Folly", principle: "Beginner's Mind",
    statement: "Learn before claiming certainty.",
    rule: "Seek guidance, test assumptions and remain open to correction. Expertise without curiosity becomes blindness.",
    question: "What are we assuming we already understand?",
    lenses: ["zen"], group: "Origination", upper: "gen", lower: "kan" },
  { num: 5, glyph: "䷄", nameZh: "需", namePinyin: "Xū", classical: "Waiting", principle: "Readiness",
    statement: "Preparation is action.",
    rule: "Build capacity, gather evidence and allow conditions to mature. Do not force execution before the system can support it.",
    question: "What can be prepared while timing develops?",
    lenses: [], group: "Origination", upper: "kan", lower: "qian" },
  { num: 6, glyph: "䷅", nameZh: "訟", namePinyin: "Sòng", classical: "Conflict", principle: "Resolution",
    statement: "Make disagreement explicit.",
    rule: "Most technical conflict begins with unclear ownership, contradictory contracts or hidden assumptions. Resolve the structure, not merely the argument.",
    question: "Which boundary or contract is ambiguous?",
    lenses: [], group: "Origination", upper: "qian", lower: "kan" },
  { num: 7, glyph: "䷆", nameZh: "師", namePinyin: "Shī", classical: "The Army", principle: "Coordination",
    statement: "Concentrate force through structure.",
    rule: "Clear roles, shared protocols and disciplined execution turn many independent actors into a coherent system.",
    question: "Who decides, who executes and who verifies?",
    lenses: [], group: "Origination", upper: "kun", lower: "kan" },
  { num: 8, glyph: "䷇", nameZh: "比", namePinyin: "Bǐ", classical: "Holding Together", principle: "Cohesion",
    statement: "Organize around trust.",
    rule: "Networks endure when participants share protocols, incentives and a reliable center of coordination without surrendering their autonomy.",
    question: "What causes the system to remain coherent?",
    lenses: [], group: "Origination", upper: "kan", lower: "kun" },

  // ── II · Formation ──────────────────────────────────────────────
  { num: 9, glyph: "䷈", nameZh: "小畜", namePinyin: "Xiǎo Xù", classical: "Small Taming", principle: "Incremental Control",
    statement: "Small constraints shape large systems.",
    rule: "Rate limits, types, tests, schemas and permissions quietly determine whether power becomes useful or chaotic.",
    question: "Which small constraint prevents a large failure?",
    lenses: [], group: "Formation", upper: "xun", lower: "qian" },
  { num: 10, glyph: "䷉", nameZh: "履", namePinyin: "Lǚ", classical: "Treading", principle: "Careful Operation",
    statement: "Move with awareness.",
    rule: "Powerful infrastructure must be approached with explicit permissions, safe defaults and respect for consequences.",
    question: "Where does one careless action create disproportionate risk?",
    lenses: [], group: "Formation", upper: "qian", lower: "dui" },
  { num: 11, glyph: "䷊", nameZh: "泰", namePinyin: "Tài", classical: "Peace", principle: "Alignment",
    statement: "Allow value to flow.",
    rule: "Systems thrive when layers communicate cleanly, incentives align and information can move without unnecessary obstruction.",
    question: "Where is useful flow being interrupted?",
    lenses: [], group: "Formation", upper: "kun", lower: "qian" },
  { num: 12, glyph: "䷋", nameZh: "否", namePinyin: "Pǐ", classical: "Standstill", principle: "Decoupling",
    statement: "Recognize blocked circulation.",
    rule: "When systems stop communicating, adding more force often increases failure. Isolate the obstruction and restore the channel.",
    question: "What has stopped moving, and why?",
    lenses: [], group: "Formation", upper: "qian", lower: "kun" },
  { num: 13, glyph: "䷌", nameZh: "同人", namePinyin: "Tóng Rén", classical: "Fellowship", principle: "Open Collaboration",
    statement: "Build across boundaries.",
    rule: "Shared standards, open protocols and public knowledge allow independent teams to create more than any closed organization can alone.",
    question: "What becomes possible when others can participate?",
    lenses: [], group: "Formation", upper: "qian", lower: "li" },
  { num: 14, glyph: "䷍", nameZh: "大有", namePinyin: "Dà Yǒu", classical: "Great Possession", principle: "Stewardship",
    statement: "Abundance creates responsibility.",
    rule: "Compute, data, capital and reach should increase what a system contributes—not merely what its owners can extract.",
    question: "What responsibility comes with this capability?",
    lenses: [], group: "Formation", upper: "li", lower: "qian" },
  { num: 15, glyph: "䷎", nameZh: "謙", namePinyin: "Qiān", classical: "Modesty", principle: "Humility",
    statement: "Let evidence outrank ego.",
    rule: "Make the smallest claim supported by reality. Quietly functioning systems are more valuable than loudly advertised possibilities.",
    question: "What do the results actually justify?",
    lenses: ["zen", "hickey"], group: "Formation", upper: "kun", lower: "gen" },
  { num: 16, glyph: "䷏", nameZh: "豫", namePinyin: "Yù", classical: "Enthusiasm", principle: "Mobilization",
    statement: "Direct energy through structure.",
    rule: "Momentum becomes productive when people understand the purpose, the path and their role in moving it forward.",
    question: "Is excitement attached to executable direction?",
    lenses: [], group: "Formation", upper: "zhen", lower: "kun" },

  // ── III · Correction ────────────────────────────────────────────
  { num: 17, glyph: "䷐", nameZh: "隨", namePinyin: "Suí", classical: "Following", principle: "Adaptation",
    statement: "Follow reality rather than forcing it.",
    rule: "Good systems respond to user behavior, operational evidence and changing environments without abandoning their principles.",
    question: "What signal should the system follow?",
    lenses: [], group: "Correction", upper: "dui", lower: "zhen" },
  { num: 18, glyph: "䷑", nameZh: "蠱", namePinyin: "Gǔ", classical: "Work on the Decayed", principle: "Refactoring",
    statement: "Repair the cause, not the symptom.",
    rule: "Inherited complexity, stale assumptions and hidden debt must be exposed and corrected at their source.",
    question: "Which old decision is creating today's failure?",
    lenses: ["hickey"], group: "Correction", upper: "gen", lower: "xun" },
  { num: 19, glyph: "䷒", nameZh: "臨", namePinyin: "Lín", classical: "Approach", principle: "Accessibility",
    statement: "Bring capability closer.",
    rule: "Intelligence becomes valuable when it is understandable, affordable and available where people already work.",
    question: "What distance stands between capability and use?",
    lenses: [], group: "Correction", upper: "kun", lower: "dui" },
  { num: 20, glyph: "䷓", nameZh: "觀", namePinyin: "Guān", classical: "Contemplation", principle: "Observability",
    statement: "See the whole before intervening.",
    rule: "Logs, metrics, traces, evaluations and direct observation transform invisible behavior into understandable systems.",
    question: "What can happen that we cannot currently see?",
    lenses: ["zen"], group: "Correction", upper: "xun", lower: "kun" },
  { num: 21, glyph: "䷔", nameZh: "噬嗑", namePinyin: "Shì Kè", classical: "Biting Through", principle: "Enforcement",
    statement: "Remove hard obstructions decisively.",
    rule: "Policies that cannot execute are merely suggestions. Security, validation and governance must operate at the point of action.",
    question: "Which rule must become executable?",
    lenses: [], group: "Correction", upper: "li", lower: "zhen" },
  { num: 22, glyph: "䷕", nameZh: "賁", namePinyin: "Bì", classical: "Grace", principle: "Interface",
    statement: "Beauty should reveal structure.",
    rule: "Design should make the system easier to understand and operate, not decorate confusion or hide unfinished behavior.",
    question: "Does the interface clarify the underlying model?",
    lenses: [], group: "Correction", upper: "gen", lower: "li" },
  { num: 23, glyph: "䷖", nameZh: "剝", namePinyin: "Bō", classical: "Splitting Apart", principle: "Decomposition",
    statement: "Let failing structures fall away.",
    rule: "Separate the durable core from layers that have become fragile, coupled or obsolete.",
    question: "What can be removed without weakening the essence?",
    lenses: ["hickey"], group: "Correction", upper: "gen", lower: "kun" },
  { num: 24, glyph: "䷗", nameZh: "復", namePinyin: "Fù", classical: "Return", principle: "Reversibility",
    statement: "Make return possible.",
    rule: "Rollback, recovery, versioning, checkpoints and reproducibility allow experimentation without permanent damage.",
    question: "How does the system return to a known state?",
    lenses: [], group: "Correction", upper: "kun", lower: "zhen" },

  // ── IV · Power ──────────────────────────────────────────────────
  { num: 25, glyph: "䷘", nameZh: "无妄", namePinyin: "Wú Wàng", classical: "Innocence", principle: "Integrity",
    statement: "Avoid contrivance.",
    rule: "Behavior should follow explicit rules rather than hidden manipulation, accidental side effects or clever exceptions.",
    question: "Is the system behaving according to its stated model?",
    lenses: [], group: "Power", upper: "qian", lower: "zhen" },
  { num: 26, glyph: "䷙", nameZh: "大畜", namePinyin: "Dà Chù", classical: "Great Taming", principle: "Capacity",
    statement: "Accumulate strength before expansion.",
    rule: "Knowledge, compute, liquidity, testing and operational maturity should precede the demand placed upon them.",
    question: "Which capacity must be built before scale?",
    lenses: [], group: "Power", upper: "gen", lower: "qian" },
  { num: 27, glyph: "䷚", nameZh: "頤", namePinyin: "Yí", classical: "Nourishment", principle: "Inputs",
    statement: "Systems become what they consume.",
    rule: "Data, prompts, context, dependencies, feedback and incentives determine the intelligence that emerges.",
    question: "What are we feeding the system?",
    lenses: [], group: "Power", upper: "gen", lower: "zhen" },
  { num: 28, glyph: "䷛", nameZh: "大過", namePinyin: "Dà Guò", classical: "Great Exceeding", principle: "Load Bearing",
    statement: "Extraordinary load requires extraordinary support.",
    rule: "Know when normal architecture is carrying conditions beyond its intended limits.",
    question: "Which component is carrying too much weight?",
    lenses: [], group: "Power", upper: "dui", lower: "xun" },
  { num: 29, glyph: "䷜", nameZh: "坎", namePinyin: "Kǎn", classical: "The Abyss", principle: "Resilience",
    statement: "Design for repeated danger.",
    rule: "Reliable systems assume failures will recur. Recovery must be automatic, tested and stronger than a single fallback.",
    question: "What happens when the same failure occurs again?",
    lenses: [], group: "Power", upper: "kan", lower: "kan" },
  { num: 30, glyph: "䷝", nameZh: "離", namePinyin: "Lí", classical: "Clinging Fire", principle: "Legibility",
    statement: "Illuminate cause and consequence.",
    rule: "State, ownership, policy and execution should remain visible enough for people to understand what the system is doing.",
    question: "What remains hidden during execution?",
    lenses: [], group: "Power", upper: "li", lower: "li" },
  { num: 31, glyph: "䷞", nameZh: "咸", namePinyin: "Xián", classical: "Influence", principle: "Resonance",
    statement: "Invite adoption rather than forcing it.",
    rule: "Systems spread when they fit naturally into existing behavior and create immediate reciprocal value.",
    question: "Why would someone willingly carry this forward?",
    lenses: [], group: "Power", upper: "dui", lower: "gen" },
  { num: 32, glyph: "䷟", nameZh: "恆", namePinyin: "Héng", classical: "Duration", principle: "Stability",
    statement: "Preserve meaning across time.",
    rule: "APIs, formats, identities and promises should remain stable enough for others to build upon them confidently.",
    question: "Which contract must remain dependable?",
    lenses: [], group: "Power", upper: "zhen", lower: "xun" },

  // ── V · Adaptation ──────────────────────────────────────────────
  { num: 33, glyph: "䷠", nameZh: "遯", namePinyin: "Dùn", classical: "Retreat", principle: "Strategic Withdrawal",
    statement: "Know when to stop.",
    rule: "Disable, isolate, deprecate or leave a path before sunk cost turns a recoverable mistake into systemic damage.",
    question: "What should we stop defending?",
    lenses: ["zen"], group: "Adaptation", upper: "qian", lower: "gen" },
  { num: 34, glyph: "䷡", nameZh: "大壯", namePinyin: "Dà Zhuàng", classical: "Great Power", principle: "Controlled Power",
    statement: "Strength requires restraint.",
    rule: "The more capable a model or platform becomes, the more explicit its boundaries, permissions and accountability must become.",
    question: "What controls this power?",
    lenses: [], group: "Adaptation", upper: "zhen", lower: "qian" },
  { num: 35, glyph: "䷢", nameZh: "晉", namePinyin: "Jìn", classical: "Progress", principle: "Iteration",
    statement: "Advance visibly and cumulatively.",
    rule: "Small improvements become transformational when they can be measured, retained and built upon.",
    question: "What did this iteration prove?",
    lenses: [], group: "Adaptation", upper: "li", lower: "kun" },
  { num: 36, glyph: "䷣", nameZh: "明夷", namePinyin: "Míng Yí", classical: "Darkening of the Light", principle: "Confidentiality",
    statement: "Protect intelligence when exposure is dangerous.",
    rule: "Privacy, encryption and local execution preserve valuable knowledge under hostile or untrusted conditions.",
    question: "What must remain concealed to remain safe?",
    lenses: [], group: "Adaptation", upper: "kun", lower: "li" },
  { num: 37, glyph: "䷤", nameZh: "家人", namePinyin: "Jiā Rén", classical: "The Family", principle: "Locality",
    statement: "Define local responsibility.",
    rule: "Strong global systems emerge from understandable local units with clear roles, authority and internal coherence.",
    question: "Is responsibility clear within every local boundary?",
    lenses: [], group: "Adaptation", upper: "xun", lower: "li" },
  { num: 38, glyph: "䷥", nameZh: "睽", namePinyin: "Kuí", classical: "Opposition", principle: "Diversity",
    statement: "Preserve useful difference.",
    rule: "Models, architectures and contributors do not need to agree in order to improve one another. Diversity can expose blind spots and increase resilience.",
    question: "Which disagreement contains useful information?",
    lenses: [], group: "Adaptation", upper: "li", lower: "dui" },
  { num: 39, glyph: "䷦", nameZh: "蹇", namePinyin: "Jiǎn", classical: "Obstruction", principle: "Constraint Discovery",
    statement: "Let obstacles teach.",
    rule: "Repeated friction reveals where an abstraction, workflow or assumption no longer matches reality.",
    question: "What is this obstruction telling us about the design?",
    lenses: [], group: "Adaptation", upper: "kan", lower: "gen" },
  { num: 40, glyph: "䷧", nameZh: "解", namePinyin: "Xiè", classical: "Deliverance", principle: "Simplification",
    statement: "Release trapped capacity.",
    rule: "Remove accidental complexity, obsolete coordination and unnecessary dependencies.",
    question: "What becomes possible after this constraint disappears?",
    lenses: ["hickey"], group: "Adaptation", upper: "zhen", lower: "kan" },

  // ── VI · Transformation ─────────────────────────────────────────
  { num: 41, glyph: "䷨", nameZh: "損", namePinyin: "Sǔn", classical: "Decrease", principle: "Minimalism",
    statement: "Subtract deliberately.",
    rule: "Remove features, states and concepts until the remaining system expresses its purpose without waste.",
    question: "What can disappear?",
    lenses: ["zen", "hickey", "pike"], group: "Transformation", upper: "gen", lower: "dui" },
  { num: 42, glyph: "䷩", nameZh: "益", namePinyin: "Yì", classical: "Increase", principle: "Leverage",
    statement: "Add where value compounds.",
    rule: "The best improvements strengthen many products, users or layers simultaneously.",
    question: "Which addition multiplies the capability of everything around it?",
    lenses: [], group: "Transformation", upper: "xun", lower: "zhen" },
  { num: 43, glyph: "䷪", nameZh: "夬", namePinyin: "Guài", classical: "Breakthrough", principle: "Decision",
    statement: "Make truth explicit.",
    rule: "Decisive change requires clear evidence, declared intent and responsibility for the consequences.",
    question: "Which decision can no longer remain implicit?",
    lenses: [], group: "Transformation", upper: "dui", lower: "qian" },
  { num: 44, glyph: "䷫", nameZh: "姤", namePinyin: "Gòu", classical: "Coming to Meet", principle: "Boundary Control",
    statement: "Treat arrivals as consequential.",
    rule: "A new model, dependency, contributor or external service may alter the system more deeply than expected.",
    question: "What authority are we granting to what just entered?",
    lenses: [], group: "Transformation", upper: "qian", lower: "xun" },
  { num: 45, glyph: "䷬", nameZh: "萃", namePinyin: "Cuì", classical: "Gathering Together", principle: "Ecosystem",
    statement: "Create a center for participation.",
    rule: "Models, tools, compute, knowledge and contributors become more valuable when they can discover and compose with one another.",
    question: "What shared center allows independent contribution?",
    lenses: ["curry"], group: "Transformation", upper: "dui", lower: "kun" },
  { num: 46, glyph: "䷭", nameZh: "升", namePinyin: "Shēng", classical: "Pushing Upward", principle: "Layering",
    statement: "Grow from stable foundations.",
    rule: "Higher abstractions should preserve the strength and meaning of the layers beneath them.",
    question: "Is every new layer supported by a complete lower layer?",
    lenses: ["curry"], group: "Transformation", upper: "kun", lower: "xun" },
  { num: 47, glyph: "䷮", nameZh: "困", namePinyin: "Kùn", classical: "Oppression", principle: "Graceful Degradation",
    statement: "Remain useful under constraint.",
    rule: "When memory, compute, bandwidth or external services disappear, the system should preserve its most essential function.",
    question: "What remains available in the worst operating condition?",
    lenses: [], group: "Transformation", upper: "dui", lower: "kan" },
  { num: 48, glyph: "䷯", nameZh: "井", namePinyin: "Jǐng", classical: "The Well", principle: "Shared Infrastructure",
    statement: "Build resources many can draw from.",
    rule: "Protocols, open models, public research and common infrastructure create persistent value beyond a single product.",
    question: "What shared resource are we maintaining?",
    lenses: [], group: "Transformation", upper: "kan", lower: "xun" },

  // ── VII · Renewal ───────────────────────────────────────────────
  { num: 49, glyph: "䷰", nameZh: "革", namePinyin: "Gé", classical: "Revolution", principle: "Migration",
    statement: "Replace foundations honestly.",
    rule: "When incremental repair can no longer preserve integrity, design a controlled transition to a new system.",
    question: "Has repair become more dangerous than replacement?",
    lenses: [], group: "Renewal", upper: "dui", lower: "li" },
  { num: 50, glyph: "䷱", nameZh: "鼎", namePinyin: "Dǐng", classical: "The Cauldron", principle: "Transformation",
    statement: "Turn raw material into capability.",
    rule: "Stable processes convert data, research, compute and human knowledge into useful intelligence.",
    question: "What transformation does this system perform?",
    lenses: [], group: "Renewal", upper: "li", lower: "xun" },
  { num: 51, glyph: "䷲", nameZh: "震", namePinyin: "Zhèn", classical: "Thunder", principle: "Responsiveness",
    statement: "Respond without panic.",
    rule: "Detect important change quickly and execute a prepared response before disruption becomes collapse.",
    question: "Which event requires immediate coordinated action?",
    lenses: [], group: "Renewal", upper: "zhen", lower: "zhen" },
  { num: 52, glyph: "䷳", nameZh: "艮", namePinyin: "Gèn", classical: "Keeping Still", principle: "Boundaries",
    statement: "Know where action must stop.",
    rule: "Every component, agent and person should have explicit limits on authority, execution and access.",
    question: "Where is the stopping condition?",
    lenses: ["pike"], group: "Renewal", upper: "gen", lower: "gen" },
  { num: 53, glyph: "䷴", nameZh: "漸", namePinyin: "Jiàn", classical: "Development", principle: "Gradualism",
    statement: "Mature through ordered stages.",
    rule: "Durable systems progress through tested transitions rather than skipping directly from prototype to critical infrastructure.",
    question: "Which stage cannot safely be skipped?",
    lenses: [], group: "Renewal", upper: "xun", lower: "gen" },
  { num: 54, glyph: "䷵", nameZh: "歸妹", namePinyin: "Guī Mèi", classical: "The Marrying Maiden", principle: "Integration Risk",
    statement: "Understand asymmetric dependence.",
    rule: "External integrations can place the system in a secondary position with limited authority over its own future.",
    question: "Who controls the relationship after integration?",
    lenses: [], group: "Renewal", upper: "zhen", lower: "dui" },
  { num: 55, glyph: "䷶", nameZh: "豐", namePinyin: "Fēng", classical: "Abundance", principle: "Operational Clarity",
    statement: "Simplify at the moment of maximum complexity.",
    rule: "As systems become more powerful, commands, ownership and communication must become clearer.",
    question: "Can the system still be understood at peak scale?",
    lenses: [], group: "Renewal", upper: "zhen", lower: "li" },
  { num: 56, glyph: "䷷", nameZh: "旅", namePinyin: "Lǚ", classical: "The Wanderer", principle: "Portability",
    statement: "Build systems that can travel.",
    rule: "Models, workloads and data should move across clouds, devices, regions and organizations without losing their identity.",
    question: "Can this operate somewhere we do not control?",
    lenses: [], group: "Renewal", upper: "li", lower: "gen" },

  // ── VIII · Continuity ───────────────────────────────────────────
  { num: 57, glyph: "䷸", nameZh: "巽", namePinyin: "Xùn", classical: "The Gentle Wind", principle: "Composability",
    statement: "Spread through small, consistent interfaces.",
    rule: "Simple primitives that penetrate every layer can produce systems of indefinite capability.",
    question: "Can this combine cleanly with something we have not yet imagined?",
    lenses: ["curry", "pike"], group: "Continuity", upper: "xun", lower: "xun" },
  { num: 58, glyph: "䷹", nameZh: "兌", namePinyin: "Duì", classical: "The Joyous Lake", principle: "Exchange",
    statement: "Create reciprocal communication.",
    rule: "Open dialogue, feedback and shared knowledge make systems more useful and communities more resilient.",
    question: "How does value return through the interaction?",
    lenses: [], group: "Continuity", upper: "dui", lower: "dui" },
  { num: 59, glyph: "䷺", nameZh: "渙", namePinyin: "Huàn", classical: "Dispersion", principle: "Distribution",
    statement: "Dissolve rigid centers.",
    rule: "Distribute computation, state and authority where doing so increases resilience, privacy and participation.",
    question: "Which central dependency should be dispersed?",
    lenses: [], group: "Continuity", upper: "xun", lower: "kan" },
  { num: 60, glyph: "䷻", nameZh: "節", namePinyin: "Jié", classical: "Limitation", principle: "Constraints",
    statement: "Use limits to create freedom.",
    rule: "Clear types, interfaces, quotas and policies make behavior predictable enough for people to build confidently.",
    question: "Which constraint makes the system easier to reason about?",
    lenses: ["pike"], group: "Continuity", upper: "kan", lower: "dui" },
  { num: 61, glyph: "䷼", nameZh: "中孚", namePinyin: "Zhōng Fú", classical: "Inner Truth", principle: "Verifiability",
    statement: "Make trust emerge from structure.",
    rule: "Proofs, signatures, evaluations, traces and reproducible behavior are stronger than institutional promises.",
    question: "How can this claim be independently verified?",
    lenses: ["curry"], group: "Continuity", upper: "xun", lower: "dui" },
  { num: 62, glyph: "䷽", nameZh: "小過", namePinyin: "Xiǎo Guò", classical: "Small Exceeding", principle: "Precision",
    statement: "Treat small details as structural.",
    rule: "In delicate systems, minor inconsistencies can produce consequences larger than ambitious architectural decisions.",
    question: "Which small detail could invalidate the whole?",
    lenses: [], group: "Continuity", upper: "zhen", lower: "gen" },
  { num: 63, glyph: "䷾", nameZh: "既濟", namePinyin: "Jì Jì", classical: "After Completion", principle: "Operational Discipline",
    statement: "Completion is a dangerous state.",
    rule: "When every component appears correctly positioned, complacency becomes the primary risk. Observe, maintain and prepare for drift.",
    question: "What could quietly deteriorate after launch?",
    lenses: [], group: "Continuity", upper: "kan", lower: "li" },
  { num: 64, glyph: "䷿", nameZh: "未濟", namePinyin: "Wèi Jì", classical: "Before Completion", principle: "Continuous Becoming",
    statement: "No system is final.",
    rule: "Every release, model and architecture is a transition toward another condition. Build so that the next change remains possible.",
    question: "What must remain open for what comes next?",
    lenses: ["zen"], group: "Continuity", upper: "li", lower: "kan" },
];

// The English label a reader sees on a collapsed card: "{classical} — {principle}".
export function englishLabel(h: Hexagram): string {
  return `${h.classical} — ${h.principle}`;
}

// Accessible label for the Unicode glyph (Chinese never rendered).
export function glyphAria(h: Hexagram): string {
  return `Hexagram ${h.num}, ${h.classical}`;
}

// Padded display number, "01".."64".
export function displayNum(n: number): string {
  return String(n).padStart(2, "0");
}

// Matrix lookup: the single hexagram formed by (upper, lower).
export function hexagramAt(upper: TrigramKey, lower: TrigramKey): Hexagram | undefined {
  return HEXAGRAMS.find((h) => h.upper === upper && h.lower === lower);
}

// Count of hexagrams illuminated by each lens (for the Lenses view).
export function lensCount(key: LensKey): number {
  return HEXAGRAMS.filter((h) => h.lenses.includes(key)).length;
}
