'use client'

import React from "react";
import { Button } from "@hanzo/ui";
import { PlusCircle, X } from "lucide-react";
import { Box } from '@hanzo/ui'

interface Assignee {
  id: string;
  name: string;
  avatar?: string;
}

interface AssigneesListProps {
  assignees?: Assignee[];
  onRemove?: (id: string) => void;
}

const AssigneesList: React.FC<AssigneesListProps> = ({ assignees = [], onRemove }) => {
  return (
    <Box className="mb-6">
      <Box className="flex justify-between mb-2">
        <label className="block text-sm font-medium text-muted-foreground">Assignees</label>
        <Button size="sm" variant="ghost" className="text-foreground hover:text-foreground/70 h-6 px-2">
          <PlusCircle className="h-3.5 w-3.5 mr-1" />
          Add
        </Button>
      </Box>
      <Box className="flex flex-wrap gap-2">
        {assignees.map(assignee => (
          <Box 
            key={assignee.id}
            className="flex items-center gap-2 bg-neutral-800 px-2 py-1 rounded text-sm"
          >
            <Box className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-xs">
              {assignee.name.charAt(0)}
            </Box>
            <span>{assignee.name}</span>
            <button 
              className="text-muted-foreground hover:text-[var(--white)]"
              onClick={() => onRemove && onRemove(assignee.id)}
            >
              <X className="h-3 w-3" />
            </button>
          </Box>
        ))}
        {!assignees.length && (
          <Box className="text-sm text-muted-foreground">No assignees</Box>
        )}
      </Box>
    </Box>
  );
};

export default AssigneesList;
