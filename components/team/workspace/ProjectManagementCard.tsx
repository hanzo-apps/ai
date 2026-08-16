'use client'


import React from "react";
import { motion } from "@/components/motion";
import { Kanban, CheckCircle, Bot } from "lucide-react";
import { Badge } from "@hanzo/ui";
import { Box } from '@hanzo/ui'

const ProjectManagementCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-card border border-border rounded-xl overflow-hidden shadow-xl"
    >
      <Box className="border-b border-border p-3 flex items-center">
        <Kanban className="h-5 w-5 mr-2" />
        <span className="font-medium text-foreground">Project Management</span>
        <Badge
          variant="outline"
          className="ml-auto"
          style={{ backgroundColor: "color-mix(in srgb, var(--primary) 20%, transparent)", borderColor: "color-mix(in srgb, var(--primary) 30%, transparent)", color: "var(--primary)" }}
        >
          Linear-style
        </Badge>
      </Box>
      <Box className="p-4">
        <Box className="bg-secondary/50 rounded-lg p-4">
          <Box className="mb-4 flex items-center justify-between">
            <Box className="flex items-center">
              <h3 className="font-medium text-foreground">Website Redesign</h3>
              <Badge className="ml-2 bg-primary/20 text-foreground border-white/30">In Progress</Badge>
            </Box>
            <div className="flex space-x-2">
              <Box className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground">AI</Box>
              <Box className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs text-muted-foreground">JD</Box>
            </div>
          </Box>

          <div className="space-y-3">
            <Box className="flex items-center p-2 bg-secondary/50 rounded-md border border-border">
              <CheckCircle className="h-4 w-4 text-foreground/70 mr-2" />
              <span className="text-sm text-foreground">Create wireframes</span>
              <div className="ml-auto flex items-center space-x-1">
                <Box className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-xs text-muted-foreground">JD</Box>
              </div>
            </Box>
            <Box className="flex items-center p-2 bg-secondary/50 rounded-md border border-border">
              <CheckCircle className="h-4 w-4 text-foreground/70 mr-2" />
              <span className="text-sm text-foreground">Design homepage</span>
              <div className="ml-auto flex items-center space-x-1">
                <Box className="w-5 h-5 rounded-full flex items-center justify-center text-xs text-primary-foreground">AI</Box>
              </div>
            </Box>
            <Box
              className="flex items-center p-2 rounded-md"
              style={{ backgroundColor: "color-mix(in srgb, var(--primary) 15%, transparent)", border: "1px solid color-mix(in srgb, var(--primary) 30%, transparent)" }}
            >
              <Bot className="h-4 w-4 mr-2" />
              <span className="text-sm text-foreground">AI working: Implementing frontend code</span>
            </Box>
          </div>
        </Box>
      </Box>
    </motion.div>
  );
};

export default ProjectManagementCard;
