'use client'

import React from "react";
import { Button } from "@hanzo/ui";
import { Plus } from "lucide-react";

interface KanbanAddTaskButtonProps {
  onAddTask: () => void;
}

const KanbanAddTaskButton: React.FC<KanbanAddTaskButtonProps> = ({ onAddTask }) => {
  return (
    <Button 
      className="w-full justify-start text-muted-foreground hover:text-[var(--white)] border border-neutral-800 bg-[var(--black)] hover:bg-neutral-900" 
      variant="outline"
      onClick={onAddTask}
    >
      <Plus className="h-4 w-4 mr-2" />
      Add Task
    </Button>
  );
};

export default KanbanAddTaskButton;
