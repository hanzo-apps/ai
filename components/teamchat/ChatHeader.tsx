
import React from "react";
import { Bot, Settings } from "lucide-react";
import { Button } from "@hanzo/ui";
import { Box } from '@hanzo/ui'

const ChatHeader: React.FC = () => {
  return (
    <Box className="bg-neutral-900/70 p-4 border-b border-neutral-800 flex items-center">
      <Box className="bg-primary/10 h-8 w-8 rounded-full flex items-center justify-center mr-3">
        <Bot className="h-4 w-4 text-[var(--white)]" />
      </Box>
      <div>
        <h3 className="font-medium">Hanzo Assistant</h3>
        <p className="text-xs text-muted-foreground">Powered by Zen</p>
      </div>
      <Button variant="ghost" size="icon" className="ml-auto text-muted-foreground hover:text-[var(--white)]">
        <Settings className="h-5 w-5" />
      </Button>
    </Box>
  );
};

export default ChatHeader;
