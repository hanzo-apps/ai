
import React from "react";
import { MessageSquare, Bot, Settings } from "lucide-react";
import { Box } from '@hanzo/ui'

const ChatFeatures: React.FC = () => {
  return (
    <Box className="mt-10 mb-16">
      <h2 className="text-2xl font-bold text-center mb-8">Enhanced Chat Capabilities</h2>
      <Box className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Box className="bg-gradient-to-br from-white/20 to-white/5 p-6 rounded-xl border border-border hover:border-white/40 transition-all duration-300">
          <Box className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <MessageSquare className="h-6 w-6 text-foreground" />
          </Box>
          <h3 className="text-xl font-bold mb-2 text-[var(--white)]">Multimodal Conversations</h3>
          <p className="text-foreground/80">Chat with text, images, audio, and video in natural conversations with our AI assistants.</p>
        </Box>

        <Box className="bg-gradient-to-br from-white/15 to-white/5 p-6 rounded-xl border border-border hover:border-white/40 transition-all duration-300">
          <Box className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Bot className="h-6 w-6 text-foreground" />
          </Box>
          <h3 className="text-xl font-bold mb-2 text-[var(--white)]">Specialized Assistants</h3>
          <p className="text-foreground/80">Access domain-specific experts for coding, design, marketing, legal, and more fields.</p>
        </Box>

        <Box className="bg-gradient-to-br from-white/20 to-white/10 p-6 rounded-xl border border-border hover:border-white/40 transition-all duration-300">
          <Box className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Settings className="h-6 w-6 text-foreground/70" />
          </Box>
          <h3 className="text-xl font-bold mb-2 text-[var(--white)]">Customizable Workflows</h3>
          <p className="text-foreground/80">Connect your data sources, APIs, and tools to create powerful AI-powered workflows.</p>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatFeatures;
