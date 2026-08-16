
import React from "react";
import WorkspaceHeader from "./workspace/WorkspaceHeader";
import ProjectManagementCard from "./workspace/ProjectManagementCard";
import TeamChatCard from "./workspace/TeamChatCard";
import VideoMeetingsCard from "./workspace/VideoMeetingsCard";
import KnowledgeBaseCard from "./workspace/KnowledgeBaseCard";
import WorkspaceFooter from "./workspace/WorkspaceFooter";
import { Box } from '@hanzo/ui'

const WorkspaceIntegration = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <Box className="max-w-7xl mx-auto">
        <WorkspaceHeader />

        <Box className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <ProjectManagementCard />
          <TeamChatCard />
          <VideoMeetingsCard />
          <KnowledgeBaseCard />
        </Box>

        <WorkspaceFooter />
      </Box>
    </section>
  );
};

export default WorkspaceIntegration;
