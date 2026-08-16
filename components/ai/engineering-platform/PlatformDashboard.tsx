'use client'


import React, { useState } from "react";
import { motion } from "@/components/motion";
import AIModelsView from "./dashboard/AIModelsView";
import ObservabilityView from "./dashboard/ObservabilityView";
import AnalyticsView from "./dashboard/AnalyticsView";
import { Box } from '@hanzo/ui'

const PlatformDashboard = () => {
  const [activeSection, setActiveSection] = useState("models");

  return (
    <Box className="relative w-full bg-neutral-900/70 rounded-xl overflow-hidden border border-neutral-800 shadow-xl">
      {/* Dashboard header */}
      <Box className="bg-neutral-800/90 p-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <Box className="w-3 h-3 rounded-full bg-primary/10"></Box>
            <Box className="w-3 h-3 rounded-full bg-primary/10"></Box>
            <Box className="w-3 h-3 rounded-full bg-primary/10"></Box>
          </div>
          <Box className="text-xs text-muted-foreground">Hanzo AI Engineering Platform</Box>
        </div>
        <div className="flex space-x-3">
          <button 
            className={`px-3 py-1 rounded-md text-xs ${activeSection === "models" ? "bg-primary/40 text-foreground/70" : "bg-neutral-800 text-muted-foreground"}`} 
            onClick={() => setActiveSection("models")}
          >
            AI Models
          </button>
          <button 
            className={`px-3 py-1 rounded-md text-xs ${activeSection === "observability" ? "bg-primary/40 text-foreground/70" : "bg-neutral-800 text-muted-foreground"}`} 
            onClick={() => setActiveSection("observability")}
          >
            Observability
          </button>
          <button 
            className={`px-3 py-1 rounded-md text-xs ${activeSection === "analytics" ? "bg-primary/40 text-foreground/70" : "bg-neutral-800 text-muted-foreground"}`} 
            onClick={() => setActiveSection("analytics")}
          >
            Analytics
          </button>
        </div>
      </Box>

      {/* Dashboard content */}
      <Box className="p-4 h-[340px] overflow-auto">
        {activeSection === "models" && <AIModelsView />}
        {activeSection === "observability" && <ObservabilityView />}
        {activeSection === "analytics" && <AnalyticsView />}
      </Box>
    </Box>
  );
};

export default PlatformDashboard;
