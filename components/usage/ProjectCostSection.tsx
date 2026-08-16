
import React from "react";
import { Button } from "@hanzo/ui";
import { CostItem } from "./models/project";
import { Box } from '@hanzo/ui'

interface ProjectCostSectionProps {
  costs: CostItem[];
  currentCost: string;
}

const ProjectCostSection = ({ costs, currentCost }: ProjectCostSectionProps) => {
  return (
    <div>
      <Box className="flex justify-between mb-4">
        <h4 className="font-medium">Project Cost</h4>
        <Button 
          variant="ghost" 
          size="sm"
          className="text-foreground hover:text-foreground/70 hover:bg-primary/10"
        >
          View Cost by Service
        </Button>
      </Box>
      
      <div className="space-y-4">
        {costs.map((cost, index) => (
          <Box key={index} className="flex justify-between">
            <div>
              <Box className="font-medium">{cost.name}</Box>
              <Box className="text-xs text-muted-foreground">{cost.usage}</Box>
              <Box className="text-xs text-muted-foreground">{cost.rate}</Box>
            </div>
            <Box className="font-medium">{cost.cost}</Box>
          </Box>
        ))}
        
        <Box className="pt-4 border-t border-neutral-800 flex justify-between">
          <Box className="text-sm">Metrics are shown as minutely accumulated values</Box>
          <Box className="font-bold">{currentCost}</Box>
        </Box>
      </div>
    </div>
  );
};

export default ProjectCostSection;
