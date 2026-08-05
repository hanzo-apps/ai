'use client'

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@hanzo/ui";
import { CopyButton } from "@hanzo/ui/product";

interface CodeExample {
  language: string;
  label: string;
  code: string;
  description?: string;
}

interface CodeExamplesSectionProps {
  title?: string;
  subtitle?: string;
  examples: CodeExample[];
}

export function CodeExamplesSection({
  title = "Quick Start",
  subtitle = "Get started in minutes with your language of choice",
  examples
}: CodeExamplesSectionProps) {
  const languageIcons: Record<string, string> = {
    python: "🐍",
    javascript: "📜",
    typescript: "📘",
    go: "🐹",
    rust: "🦀",
    curl: "🔗",
    cli: "💻",
    bash: "💻",
    docker: "🐳",
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-16 px-4 md:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-2">
          <Terminal className="w-5 h-5 text-foreground" />
          <span className="text-sm font-medium text-foreground uppercase tracking-wider">
            Code Examples
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          {title}
        </h2>
        <p className="text-muted-foreground mb-8">
          {subtitle}
        </p>

        <Tabs defaultValue={examples[0]?.language} className="w-full">
          <TabsList className="flex flex-wrap gap-2 bg-transparent border-b border-border pb-4 mb-6">
            {examples.map((example) => (
              <TabsTrigger
                key={example.language}
                value={example.language}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground data-[state=active]:text-foreground data-[state=active]:bg-neutral-800 hover:text-foreground transition-colors"
              >
                <span>{languageIcons[example.language.toLowerCase()] || "📄"}</span>
                {example.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {examples.map((example) => (
            <TabsContent key={example.language} value={example.language}>
              {example.description && (
                <p className="text-muted-foreground text-sm mb-4">
                  {example.description}
                </p>
              )}

              <div className="relative group">
                <div className="absolute top-3 right-3 z-10">
                  <CopyButton value={example.code} id="code-example" />
                </div>

                <pre className="bg-secondary border border-border rounded-xl p-4 pr-12 overflow-x-auto">
                  <code className="text-sm text-foreground/80 font-mono whitespace-pre">
                    {example.code}
                  </code>
                </pre>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </motion.section>
  );
}

export default CodeExamplesSection;
