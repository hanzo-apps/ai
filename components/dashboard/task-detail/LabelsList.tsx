'use client'

import React from "react";
import { Button } from "@hanzo/ui";
import { PlusCircle, X } from "lucide-react";
import { Box } from '@hanzo/ui'

interface Label {
  id: string;
  name: string;
  color: string;
}

interface LabelsListProps {
  labels?: Label[];
  onRemove?: (id: string) => void;
}

const LabelsList: React.FC<LabelsListProps> = ({ labels = [], onRemove }) => {
  return (
    <Box className="mb-6">
      <Box className="flex justify-between mb-2">
        <label className="block text-sm font-medium text-muted-foreground">Labels</label>
        <Button size="sm" variant="ghost" className="text-foreground hover:text-foreground/70 h-6 px-2">
          <PlusCircle className="h-3.5 w-3.5 mr-1" />
          Add
        </Button>
      </Box>
      <Box className="flex flex-wrap gap-2">
        {labels.map(label => (
          <Box 
            key={label.id}
            className="flex items-center gap-2 px-2 py-1 rounded text-sm"
            style={{ backgroundColor: `${label.color}20`, color: label.color }}
          >
            <span>{label.name}</span>
            <button onClick={() => onRemove && onRemove(label.id)}>
              <X className="h-3 w-3" />
            </button>
          </Box>
        ))}
        {!labels.length && (
          <Box className="text-sm text-muted-foreground">No labels</Box>
        )}
      </Box>
    </Box>
  );
};

export default LabelsList;
