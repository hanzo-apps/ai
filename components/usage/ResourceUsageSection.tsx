
import React from "react";
import { Server, CircuitBoard, HardDrive, Globe } from "lucide-react";
import { Progress } from "@hanzo/ui";
import { ProjectResources } from "./models/project";
import { Box } from '@hanzo/ui'

interface ResourceUsageSectionProps {
  resources: ProjectResources;
}

const ResourceUsageSection = ({ resources }: ResourceUsageSectionProps) => {
  return (
    <div>
      <h4 className="font-medium mb-4">Resource Usage</h4>
      
      <div className="space-y-6">
        <div>
          <Box className="flex justify-between mb-1">
            <Box className="flex items-center gap-2">
              <Server className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">CPU</span>
            </Box>
            <span className="text-sm">{resources.cpu.value}</span>
          </Box>
          <Progress value={resources.cpu.usage} className="h-2" />
        </div>
        
        <div>
          <Box className="flex justify-between mb-1">
            <Box className="flex items-center gap-2">
              <CircuitBoard className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">RAM</span>
            </Box>
            <span className="text-sm">{resources.memory.value}</span>
          </Box>
          <Progress value={resources.memory.usage} className="h-2" />
        </div>
        
        <div>
          <Box className="flex justify-between mb-1">
            <Box className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Network Egress</span>
            </Box>
            <span className="text-sm">{resources.network.value}</span>
          </Box>
          <Progress value={resources.network.usage} className="h-2" />
        </div>
        
        <div>
          <Box className="flex justify-between mb-1">
            <Box className="flex items-center gap-2">
              <HardDrive className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Volume</span>
            </Box>
            <span className="text-sm">{resources.storage.value}</span>
          </Box>
          <Progress value={resources.storage.usage} className="h-2" />
        </div>
      </div>
    </div>
  );
};

export default ResourceUsageSection;
