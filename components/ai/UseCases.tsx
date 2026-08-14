'use client'


import React from 'react';
import { motion } from 'framer-motion';
import { Bot, MessageSquare, BookOpen, Search, FileCode, Database, Brain, Headphones } from 'lucide-react';

const UseCases = () => {
  const useCases = [
    {
      icon: MessageSquare,
      title: 'Support that reads your docs',
      description: 'An assistant grounded in your own content, answering from what you published rather than from what it half-remembers.',
      color: 'bg-primary/20',
      textColor: 'text-foreground'
    },
    {
      icon: Brain,
      title: 'Text, images, audio, video',
      description: 'zen-image draws, zen-voice speaks, zen-music composes, zen-video moves. Same key, same billing, one request each.',
      color: 'bg-primary/20',
      textColor: 'text-foreground/70'
    },
    {
      icon: Search,
      title: 'Search over your own data',
      description: 'Index what you have, then answer questions from it with the passages that support the answer attached.',
      color: 'bg-primary/10',
      textColor: 'text-foreground/70'
    },
    {
      icon: Bot,
      title: 'Work that runs without you',
      description: 'An agent with tools, a trigger, and a place to write the result. Triage a queue, reconcile a ledger, file the report.',
      color: 'bg-primary/10',
      textColor: 'text-foreground/70'
    },
    {
      icon: FileCode,
      title: 'Coding agents',
      description: 'Hanzo Dev in the terminal, the MCP tool surface underneath it, and a code model that fits the whole repository in context.',
      color: 'bg-primary/10',
      textColor: 'text-foreground/60'
    },
    {
      icon: Headphones,
      title: 'Speech both directions',
      description: 'zen3-asr transcribes thirty languages and can stream while someone is still talking. zen3-tts speaks back.',
      color: 'bg-primary/10',
      textColor: 'text-foreground/70'
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--black)] relative">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--white)] mb-6">
              What people build with it
            </h2>
            <p className="text-xl text-foreground/80">
              Six shapes that keep coming back, and the models each one reaches for
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-neutral-900/20 border border-neutral-800 rounded-xl p-8 hover:bg-neutral-900/40 transition-colors group"
            >
              {/* `bg-opacity-*` is Tailwind v3 and was removed in v4 — the class
                  emitted no rule, so the hover tint never once rendered. The
                  colour already carries its own alpha (`bg-primary/20`). */}
              <div className={`h-14 w-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 ${useCase.color}`}>
                <useCase.icon className={`h-7 w-7 ${useCase.textColor}`} />
              </div>
              <h3 className="text-xl font-semibold text-[var(--white)] mb-3">{useCase.title}</h3>
              <p className="text-muted-foreground">{useCase.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Implementation example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-neutral-900/30 border border-neutral-800 rounded-xl overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-[var(--white)] mb-4">What it looks like</h3>
              <p className="text-muted-foreground mb-6">
                A client, a model name, and a message. The vector store and the agent below use the same client and the same key
              </p>
              <div className="bg-neutral-950 rounded-lg p-4 font-mono text-sm text-foreground/80 overflow-x-auto">
                <pre>
{`import { Hanzo } from '@hanzo/ai';

// Initialize the Hanzo AI client
const hanzo = new Hanzo({
  apiKey: process.env.HANZO_API_KEY
});

// Create a conversation with memory
const conversation = hanzo.conversation({
  model: 'zen5',
  memory: true,
  system: 'You are a helpful assistant'
});

// Send a message and get a response
const response = await conversation.send('Tell me about AI engineering');

console.log(response);`}
                </pre>
              </div>
            </div>
            <div className="lg:w-1/2 bg-neutral-950 p-8 flex flex-col">
              <h4 className="text-lg font-semibold text-[var(--white)] mb-4 flex items-center">
                <BookOpen className="h-4 w-4 mr-2 text-foreground" />
                Documentation Example
              </h4>
              <div className="flex flex-col h-full space-y-4 overflow-y-auto">
                <div className="bg-neutral-900 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Database className="h-4 w-4 text-foreground mr-2" />
                    <h5 className="text-foreground font-medium">Vector Search</h5>
                  </div>
                  <pre className="text-xs text-foreground/80 overflow-x-auto">
{`// Create a vector store
const vectorStore = hanzo.vectorStore('my-store');

// Add documents to the store
await vectorStore.addDocuments([
  { text: 'AI engineering best practices...' },
  { text: 'Deploying models to production...' }
]);

// Search for similar documents
const results = await vectorStore.search(
  'How to deploy AI models?', 
  { limit: 3 }
);`}
                  </pre>
                </div>

                <div className="bg-neutral-900 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Bot className="h-4 w-4 text-foreground/70 mr-2" />
                    <h5 className="text-foreground/70 font-medium">AI Agents</h5>
                  </div>
                  <pre className="text-xs text-foreground/80 overflow-x-auto">
{`// Create an agent with tools
const agent = hanzo.agent({
  model: 'zen5-max',
  tools: [
    hanzo.tools.webSearch(),
    hanzo.tools.codeInterpreter(),
    vectorStore.asTool('knowledge')
  ]
});

// Run the agent with a task
const result = await agent.run(
  'Analyze our production metrics and suggest optimizations'
);`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UseCases;
