// Frontier AI model families on the Hanzo API
const modelCategories = [
  {
    name: "Zen — open weights from Zoo Labs Foundation",
    description: "Language, code, vision, image, audio, speech and retrieval, built by Zoo Labs Foundation and served on the Hanzo API. Most have their weights published, so you can serve them yourself",
    models: [
      // Zen5 — Next Generation
      { name: "Zen5", provider: "Zoo Labs Foundation", features: ["1M+ context window", "Agentic-trained", "MoDE + CoT", "Preview"], description: "Our current frontier model, trained for agent work, reasoning step by step by default." },
      { name: "Zen5 Pro", provider: "Zoo Labs Foundation", features: ["512K context window", "Agentic-trained", "Production optimized", "Preview"], description: "High-throughput agentic model for demanding production workloads." },
      { name: "Zen5 Max", provider: "Zoo Labs Foundation", features: ["2M context window", "Extended CoT", "Document-scale", "Preview"], description: "Maximum context agentic model for document-scale analysis." },
      { name: "Zen5 Ultra", provider: "Zoo Labs Foundation", features: ["1M context window", "Deep CoT", "Self-verification", "Preview"], description: "Deepest reasoning model with multi-pass chain-of-thought." },
      { name: "Zen5 Mini", provider: "Zoo Labs Foundation", features: ["256K context window", "Agentic-trained", "Cost efficient", "Preview"], description: "Efficient agentic model with zen5-class intelligence." },
      // Zen4 — Flagship
      { name: "Zen4", provider: "Zoo Labs Foundation", features: ["744B MoE (40B active)", "202K context window", "Ultra Max tier", "$3 / $9.60 per MTok"], description: "Flagship model for complex reasoning and multi-domain tasks." },
      { name: "Zen4 Ultra", provider: "Zoo Labs Foundation", features: ["744B MoE (40B active) + CoT", "262K context window", "Ultra Max tier", "Deep reasoning"], description: "Maximum reasoning with extended chain-of-thought." },
      { name: "Zen4 Pro", provider: "Zoo Labs Foundation", features: ["80B MoE (3B active)", "131K context window", "Ultra tier", "Efficient MoE"], description: "High-capability model with efficient MoE architecture." },
      { name: "Zen4 Max", provider: "Zoo Labs Foundation", features: ["Dense architecture", "1M context window", "Ultra Max tier", "Agentic coding"], description: "Most capable model for complex reasoning and agentic tasks." },
      { name: "Zen4.6", provider: "Zoo Labs Foundation", features: ["Dense architecture", "1M context window", "Ultra tier", "Cost efficient"], description: "Extended context for long-document analysis and agentic workflows." },
      { name: "Zen4 Mini", provider: "Zoo Labs Foundation", features: ["Dense architecture", "128K context window", "Starter tier", "Free tier"], description: "Ultra-fast lightweight model, ideal for free tier." },
      { name: "Zen4 Thinking", provider: "Zoo Labs Foundation", features: ["80B MoE (3B active) + CoT", "131K context window", "Pro Max tier", "Chain-of-thought"], description: "Dedicated reasoning with explicit chain-of-thought." },
      // Zen4 Coder
      { name: "Zen4 Coder", provider: "Zoo Labs Foundation", features: ["480B MoE (35B active)", "163K context window", "Ultra tier", "Code generation"], description: "Code-specialized MoE for generation, review, and debugging." },
      { name: "Zen4 Coder Pro", provider: "Zoo Labs Foundation", features: ["480B Dense BF16", "131K context window", "Ultra Max tier", "Full-precision"], description: "Full-precision BF16 code model for complex codebases." },
      { name: "Zen4 Coder Flash", provider: "Zoo Labs Foundation", features: ["30B MoE (3B active)", "262K context window", "Pro Max tier", "Fast completions"], description: "Lightweight code model for speed and inline completions." },
      // Zen3 Core
      { name: "Zen3 Omni", provider: "Zoo Labs Foundation", features: ["~200B Dense Multimodal", "202K context window", "Pro Max tier", "Text + Vision + Audio"], description: "Multimodal model supporting text, vision, audio, and structured output." },
      { name: "Zen3 VL", provider: "Zoo Labs Foundation", features: ["30B MoE (3B active)", "262K context window", "Pro Max tier", "Image understanding"], description: "Vision-language model for image understanding and visual reasoning." },
      { name: "Zen3 Nano", provider: "Zoo Labs Foundation", features: ["8B Dense", "128K context window", "Starter tier", "Free tier"], description: "Ultra-lightweight model for edge deployment." },
      { name: "Zen3 Guard", provider: "Zoo Labs Foundation", features: ["4B Dense", "65K context window", "Pro tier", "119 languages"], description: "Content safety classifier for moderation and guardrails." },
      // Zen3 Image
      { name: "Zen3 Image", provider: "Zoo Labs Foundation", features: ["Diffusion", "Text-to-image", "Image editing", "$0.04/image"], description: "Best general-purpose image generation." },
      { name: "Zen3 Image Max", provider: "Zoo Labs Foundation", features: ["Diffusion", "Maximum quality", "Professional creative", "$0.08/image"], description: "Maximum quality image generation." },
      { name: "Zen3 Image Dev", provider: "Zoo Labs Foundation", features: ["Diffusion", "Development", "Iteration", "$0.0005/step"], description: "Development model for experimentation." },
      { name: "Zen3 Image Fast", provider: "Zoo Labs Foundation", features: ["Diffusion", "Ultra-fast", "Real-time", "$0.00035/step"], description: "Fastest image model for real-time generation." },
      { name: "Zen3 Image SDXL", provider: "Zoo Labs Foundation", features: ["Diffusion", "1024px", "High-resolution"], description: "High-resolution image generation at 1024px." },
      { name: "Zen3 Image Playground", provider: "Zoo Labs Foundation", features: ["Diffusion", "Aesthetic", "Artistic"], description: "Aesthetic model for artistic generation." },
      { name: "Zen3 Image SSD", provider: "Zoo Labs Foundation", features: ["1B Diffusion", "Fastest", "Real-time"], description: "Fastest diffusion model for real-time generation." },
      { name: "Zen3 Image JP", provider: "Zoo Labs Foundation", features: ["Diffusion", "Japanese", "Specialized"], description: "Japanese-specialized image generation." },
      // Zen3 Audio & Speech
      { name: "Zen3 Audio", provider: "Zoo Labs Foundation", features: ["1.5B ASR", "100+ languages", "Best accuracy"], description: "Best quality speech-to-text transcription." },
      { name: "Zen3 Audio Fast", provider: "Zoo Labs Foundation", features: ["809M ASR", "Fastest", "Batch optimized"], description: "Fastest speech-to-text for high-throughput." },
      { name: "Zen3 ASR", provider: "Zoo Labs Foundation", features: ["Streaming ASR", "Real-time", "Sub-500ms latency"], description: "Real-time streaming speech recognition." },
      { name: "Zen3 ASR v1", provider: "Zoo Labs Foundation", features: ["Streaming ASR", "Legacy", "Compatible"], description: "First-generation streaming ASR." },
      { name: "Zen3 TTS", provider: "Zoo Labs Foundation", features: ["82M TTS", "40+ voices", "8 languages"], description: "High-quality text-to-speech with natural prosody." },
      { name: "Zen3 TTS HD", provider: "Zoo Labs Foundation", features: ["TTS HD", "Broadcast-grade", "48kHz output"], description: "Maximum fidelity text-to-speech." },
      { name: "Zen3 TTS Fast", provider: "Zoo Labs Foundation", features: ["82M TTS", "Low latency", "Voice agents"], description: "Low-latency TTS for real-time voice agents." },
      // Zen3 Retrieval
      { name: "Zen3 Embedding", provider: "Zoo Labs Foundation", features: ["3072 dimensions", "8K context window", "Pro Max tier"], description: "High-quality text embeddings for RAG and search." },
      { name: "Zen3 Embedding Medium", provider: "Zoo Labs Foundation", features: ["4B parameters", "40K context window", "Cost-effective"], description: "Balanced embedding model for retrieval." },
      { name: "Zen3 Embedding Small", provider: "Zoo Labs Foundation", features: ["0.6B parameters", "32K context window", "High-throughput"], description: "Lightweight embedding for high throughput." },
      { name: "Zen3 Embedding OpenAI", provider: "Zoo Labs Foundation", features: ["3072 dimensions", "8K context window", "OpenAI compatible"], description: "OpenAI-compatible embedding endpoint." },
      { name: "Zen3 Reranker", provider: "Zoo Labs Foundation", features: ["8B parameters", "40K context window", "RAG accuracy"], description: "High-quality reranker for RAG pipelines." },
      { name: "Zen3 Reranker Medium", provider: "Zoo Labs Foundation", features: ["4B parameters", "40K context window", "Cost-effective"], description: "Balanced reranker for retrieval." },
      { name: "Zen3 Reranker Small", provider: "Zoo Labs Foundation", features: ["0.6B parameters", "40K context window", "Minimal cost"], description: "Lightweight reranker for high throughput." },
    ]
  },
  {
    name: "Models from other labs",
    description: "Same endpoint, same key, same request shape. Reaching for one of these is changing a string, not a migration",
    models: [
      { name: "Claude Opus 4.6", provider: "Anthropic", features: ["1M context window", "Complex reasoning", "Extended thinking"], description: "Anthropic's top tier, for the questions where depth beats speed." },
      { name: "Claude Sonnet 4.6", provider: "Anthropic", features: ["1M context window", "Best balance of speed and intelligence", "Strong coding", "Fast inference"], description: "Ideal balance of capability and speed for production workloads." },
      { name: "Claude Haiku 4.5", provider: "Anthropic", features: ["200K context window", "Fastest Anthropic model", "Cost efficient", "Low latency"], description: "Fastest and most affordable Claude model for high-throughput tasks." },
      { name: "GPT-4o", provider: "OpenAI", features: ["128K context window", "Multimodal", "Advanced reasoning", "Tool use"], description: "OpenAI's flagship model with advanced reasoning capabilities." },
      { name: "GPT-4o Mini", provider: "OpenAI", features: ["128K context window", "Fast and affordable", "Good quality", "Low latency"], description: "Cost-efficient OpenAI model for everyday tasks." },
      { name: "Gemini 3.1 Pro", provider: "Google", features: ["1M context window", "Multimodal", "Long-context reasoning", "Code generation"], description: "Google's flagship with the longest context window." },
      // Listed under Z.ai, which is whose they are. The house rule is that Zen
      // models are ours and are never described as someone else's work; the
      // reverse holds just as firmly, and a catalogue that hid whose model a
      // reader was calling would be the same mistake pointed the other way.
      // ProviderMark already maps glm -> zai.
      //
      // Ids taken from catalog.hanzo.ai, which is the only authority on what is
      // served. 5.2 is the newest GLM there; there is no 5.3 to list yet.
      { name: "GLM-5.2", provider: "Z.ai", features: ["Agentic tool use", "Strong coding", "Served as z-ai/glm-5.2"], description: "The newest GLM on the gateway. Reach for it the way you reach for any other model here — change the string." },
      { name: "GLM-4.7", provider: "Z.ai", features: ["Cost efficient", "High throughput", "Served as z-ai/glm-4.7"], description: "The previous GLM generation, still a common default for high-volume work." },
    ]
  },
  {
    name: "Custom Models",
    description: "Deploy and customize models to meet your specific needs",
    models: [
      { name: "Fine-tuned Models", provider: "Custom", features: ["Domain adaptation", "Company knowledge base", "Specialized tasks", "Improved performance"] },
      { name: "Hugging Face Models", provider: "Custom", features: ["Community models", "Thousands of options", "Specialized capabilities", "Open source"] },
      { name: "Custom Embedding Models", provider: "Custom", features: ["Domain-specific embeddings", "Custom similarity metrics", "Enhanced search", "Optimized retrieval"] },
    ]
  }
];

export default modelCategories;
