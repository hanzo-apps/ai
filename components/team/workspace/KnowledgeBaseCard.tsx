'use client'


import React from "react";
import { motion } from "@/components/motion";
import { FileText, Calendar, Bot } from "lucide-react";
import { Badge } from "@hanzo/ui";
import { Box } from '@hanzo/ui'

const KnowledgeBaseCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-card border border-border rounded-xl overflow-hidden shadow-xl"
    >
      <Box className="border-b border-border p-3 flex items-center">
        <FileText className="h-5 w-5 mr-2" />
        <span className="font-medium text-foreground">Knowledge Base</span>
        <Badge
          variant="outline"
          className="ml-auto"
          style={{ backgroundColor: "color-mix(in srgb, var(--primary) 20%, transparent)", borderColor: "color-mix(in srgb, var(--primary) 30%, transparent)", color: "var(--primary)" }}
        >
          Notion-style
        </Badge>
      </Box>
      <Box className="p-4">
        <Box className="bg-secondary/50 rounded-lg p-4">
          <Box className="mb-4 flex items-center justify-between">
            <h3 className="font-medium text-foreground">Company Wiki</h3>
            <div className="flex items-center space-x-2">
              <Box className="text-xs text-foreground/70 flex items-center">
                <Box className="w-5 h-5 rounded-full flex items-center justify-center text-xs mr-1 text-primary-foreground">AI</Box>
                <span>Updating</span>
              </Box>
            </div>
          </Box>

          <div className="space-y-3">
            <Box className="p-2 bg-secondary/50 rounded-md border border-border">
              <Box className="flex items-center mb-1">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="font-medium text-foreground">Onboarding Process</span>
              </Box>
              <p className="text-xs text-muted-foreground">
                Step-by-step guide for new employees, updated automatically by HR Bot.
              </p>
            </Box>

            <Box className="p-2 bg-secondary/50 rounded-md border border-border">
              <Box className="flex items-center mb-1">
                <FileText className="h-4 w-4 mr-2" />
                <span className="font-medium text-foreground">Technical Documentation</span>
              </Box>
              <p className="text-xs text-muted-foreground">
                API references and architectural diagrams maintained by DevBot.
              </p>
            </Box>

            <Box
              className="p-2 rounded-md"
              style={{ backgroundColor: "color-mix(in srgb, var(--primary) 15%, transparent)", border: "1px solid color-mix(in srgb, var(--primary) 30%, transparent)" }}
            >
              <Box className="flex items-center mb-1">
                <Bot className="h-4 w-4 mr-2" />
                <span className="font-medium text-foreground">AI Activity: Adding Marketing Guidelines</span>
              </Box>
              <Box className="flex items-center text-xs">
                <span>ContentBot is updating brand guidelines based on latest team meeting</span>
              </Box>
            </Box>
          </div>
        </Box>
      </Box>
    </motion.div>
  );
};

export default KnowledgeBaseCard;
