
import React from "react";
import { Bot, MessageSquare, Paperclip, AlertCircle } from "lucide-react";
import { Box } from '@hanzo/ui'

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description?: string;
    status: string;
    priority?: "low" | "medium" | "high";
    assignees?: { id: string; name: string; avatar?: string }[];
    labels?: { id: string; name: string; color: string }[];
    agentCount?: number;
    messageCount?: number;
    dueDate?: string;
  };
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const priorityColors = {
    low: "bg-neutral-500",
    medium: "bg-primary/10",
    high: "bg-primary/10"
  };

  return (
    <Box className="bg-neutral-900 rounded-md p-3 border border-neutral-800 hover:border-neutral-700 cursor-pointer transition-colors">
      {/* Task ID and Priority */}
      <Box className="flex items-center justify-between mb-2">
        <Box className="text-xs text-muted-foreground flex items-center">
          <span>HAN-{task.id}</span>
        </Box>
        {task.priority && (
          <div className={`h-2 w-2 rounded-full ${priorityColors[task.priority]}`}></div>
        )}
      </Box>
      
      {/* Title */}
      <h3 className="font-medium text-sm mb-2">{task.title}</h3>
      
      {/* Description (optional) */}
      {task.description && (
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{task.description}</p>
      )}
      
      {/* Labels — a label's colour TINTS the chip; it never sets the text.
          Colouring 11px text with the value made the chip's legibility a
          property of the data: the ramp runs #d4d4d4 → #525252, its own fill is
          that colour at 12.5% so it darkens in step, and the bottom two rungs
          measured 4.06:1 and 2.53:1 against the card. Fixed foreground, tint
          behind it — every rung reads, and a new colour cannot introduce an
          unreadable chip. */}
      {task.labels && task.labels.length > 0 && (
        <Box className="flex flex-wrap gap-1 mb-3">
          {task.labels.map(label => (
            <span
              key={label.id}
              className="px-2 py-0.5 text-xs rounded-full border text-neutral-200"
              style={{ backgroundColor: `${label.color}20`, borderColor: `${label.color}59` }}
            >
              {label.name}
            </span>
          ))}
        </Box>
      )}
      
      {/* Footer */}
      <Box className="flex items-center justify-between mt-2">
        {/* Assignees */}
        <div className="flex -space-x-2">
          {task.assignees && task.assignees.map((assignee, index) => (
            <div 
              key={assignee.id} 
              className="h-6 w-6 rounded-full bg-neutral-700 border-2 border-neutral-900 flex items-center justify-center text-[10px]"
              title={assignee.name}
            >
              {assignee.avatar ? (
                <img src={assignee.avatar} alt={assignee.name} className="h-full w-full rounded-full" />
              ) : (
                assignee.name.charAt(0)
              )}
            </div>
          ))}
          
          {task.agentCount && task.agentCount > 0 && (
            <div 
              className="h-6 w-6 rounded-full bg-primary/10 border-2 border-neutral-900 flex items-center justify-center"
              title={`${task.agentCount} AI agents`}
            >
              <Bot className="h-3 w-3 text-foreground" />
            </div>
          )}
        </div>
        
        {/* Metadata */}
        <div className="flex items-center space-x-2 text-muted-foreground">
          {task.messageCount && task.messageCount > 0 && (
            <Box className="flex items-center text-xs">
              <MessageSquare className="h-3 w-3 mr-1" />
              {task.messageCount}
            </Box>
          )}
          
          {task.dueDate && (
            <Box className="flex items-center text-xs">
              <AlertCircle className="h-3 w-3 mr-1" />
              {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </Box>
          )}
        </div>
      </Box>
    </Box>
  );
};

export default TaskCard;
