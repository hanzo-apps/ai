
import React from "react";
import Chat from "./Chat";
import { MessageInterface } from "./types";
import { Box } from '@hanzo/ui'

interface ContentProps {
  activeTab: string;
  conversation: MessageInterface[];
  promptText: string;
  setPromptText: (text: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const Content = ({ 
  activeTab, 
  conversation, 
  promptText, 
  setPromptText, 
  handleSubmit 
}: ContentProps) => {
  return (
    <Box className="flex-1 flex flex-col bg-neutral-900/30 border border-neutral-800 rounded-lg overflow-hidden">
      {activeTab === "chat" && (
        <Chat 
          conversation={conversation}
          promptText={promptText}
          setPromptText={setPromptText}
          handleSubmit={handleSubmit}
        />
      )}
    </Box>
  );
};

export default Content;
