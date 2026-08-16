'use client'


import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "@/components/motion";
import { Project } from "./models/project";
import ResourceUsageSection from "./ResourceUsageSection";
import ProjectCostSection from "./ProjectCostSection";
import { createAnimationVariant, curves } from "@/components/ui/animation-variants";
import { Box } from '@hanzo/ui'

const cardAnimation = createAnimationVariant("fadeInBlur", {
  duration: 0.4,
  curve: curves.snappy,
  distance: 15
});

interface ProjectCardProps {
  project: Project;
  onToggleExpand: (projectId: string) => void;
}

const ProjectCard = ({ project, onToggleExpand }: ProjectCardProps) => {
  return (
    <motion.div 
      variants={cardAnimation}
      className="rounded-xl border border-neutral-800 bg-neutral-900/20 overflow-hidden"
    >
      <Box 
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-neutral-800/30"
        onClick={() => onToggleExpand(project.id)}
      >
        <Box className="flex items-center gap-4">
          {project.expanded ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
          <span className="font-medium">{project.name}</span>
        </Box>
        <Box className="flex items-center gap-8">
          <div>
            <Box className="text-sm text-muted-foreground">Current Cost</Box>
            <Box className="font-medium">{project.currentCost}</Box>
          </div>
          <div>
            <Box className="text-sm text-muted-foreground">Estimated</Box>
            <Box className="font-medium">{project.estimatedCost}</Box>
          </div>
        </Box>
      </Box>
      
      {project.expanded && (
        <Box className="p-6 border-t border-neutral-800">
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <ResourceUsageSection resources={project.resources} />
            <ProjectCostSection costs={project.costs} currentCost={project.currentCost} />
          </Box>
        </Box>
      )}
    </motion.div>
  );
};

export default ProjectCard;
