
import React from "react";


import TeamChatHero from "./TeamChatHero";
import ChatInterface from "./ChatInterface";
import ChatFeatures from "./ChatFeatures";
import { Box } from '@hanzo/ui'

const TeamChatLayout: React.FC = () => {
  return (
    <Box className="min-h-screen bg-[var(--black)] text-[var(--white)] flex flex-col">
      
      
      <main className="flex-1 flex flex-col pt-16">
        <TeamChatHero />
        <ChatInterface />
        <ChatFeatures />
      </main>
      
      
    </Box>
  );
};

export default TeamChatLayout;
