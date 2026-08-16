'use client'


import React from "react";
import { motion } from "@/components/motion";
import { Activity, Terminal, ChartLine } from "lucide-react";
import { Box } from '@hanzo/ui'

const ObservabilityView = () => {
  return (
    <div className="space-y-4">
      <Box className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-[var(--white)]">AI Observability Dashboard</h3>
        <div className="flex space-x-2">
          <button className="px-2 py-1 bg-primary/40 rounded-md text-xs text-foreground/70 flex items-center">
            <Activity className="w-3 h-3 mr-1" />
            Real-time
          </button>
          <button className="px-2 py-1 bg-neutral-800 rounded-md text-xs text-muted-foreground flex items-center">
            <Terminal className="w-3 h-3 mr-1" />
            Logs
          </button>
        </div>
      </Box>

      <Box className="grid grid-cols-3 gap-3 mb-4">
        <Box className="bg-neutral-800/40 border border-neutral-700/40 rounded-lg p-3">
          <Box className="text-xs text-muted-foreground mb-1">Requests</Box>
          <Box className="text-lg font-medium text-[var(--white)]">3,452</Box>
          <Box className="mt-1 text-xs text-foreground/70 flex items-center">
            <ChartLine className="w-3 h-3 mr-1" />
            +18% from yesterday
          </Box>
        </Box>
        <Box className="bg-neutral-800/40 border border-neutral-700/40 rounded-lg p-3">
          <Box className="text-xs text-muted-foreground mb-1">Avg. Latency</Box>
          <Box className="text-lg font-medium text-[var(--white)]">94ms</Box>
          <Box className="mt-1 text-xs text-foreground/70 flex items-center">
            <ChartLine className="w-3 h-3 mr-1" />
            -12ms from yesterday
          </Box>
        </Box>
        <Box className="bg-neutral-800/40 border border-neutral-700/40 rounded-lg p-3">
          <Box className="text-xs text-muted-foreground mb-1">Error Rate</Box>
          <Box className="text-lg font-medium text-[var(--white)]">0.4%</Box>
          <Box className="mt-1 text-xs text-foreground/70 flex items-center">
            <ChartLine className="w-3 h-3 mr-1" />
            -0.2% from yesterday
          </Box>
        </Box>
      </Box>

      <Box className="bg-neutral-800/40 border border-neutral-700/40 rounded-lg p-3 mb-4">
        <Box className="text-xs text-muted-foreground mb-2">Response Time Trend</Box>
        <div className="h-24 flex items-end space-x-1">
          {[35, 42, 38, 30, 45, 55, 47, 40, 48, 60, 53, 41, 48, 50, 58, 45, 43, 49, 55, 62].map((value, index) => (
            <motion.div
              key={index}
              className="bg-primary/70 rounded-t w-full"
              style={{ height: `${value}%` }}
              initial={{ height: 0 }}
              animate={{ height: `${value}%` }}
              transition={{ duration: 0.5, delay: index * 0.03 }}
            />
          ))}
        </div>
        <Box className="flex justify-between mt-1 text-xs text-muted-foreground">
          <span>00:00</span>
          <span>12:00</span>
          <span>23:59</span>
        </Box>
      </Box>

      <Box className="bg-neutral-800/40 border border-neutral-700/40 rounded-lg p-3">
        <Box className="text-xs text-muted-foreground mb-2">Recent Traces</Box>
        <div className="space-y-2">
          {[
            { id: "t1", model: "GPT-4o", time: "2m ago", status: "success", duration: "92ms" },
            { id: "t2", model: "Llama 4", time: "5m ago", status: "success", duration: "84ms" },
            { id: "t3", model: "Claude", time: "12m ago", status: "error", duration: "176ms" },
            { id: "t4", model: "Mixtral", time: "18m ago", status: "success", duration: "78ms" },
          ].map((trace) => (
            <Box key={trace.id} className="flex items-center justify-between text-xs p-1.5 rounded hover:bg-neutral-700/30">
              <Box className="flex items-center">
                <div className={`w-1.5 h-1.5 rounded-full mr-2 ${trace.status === "success" ? "bg-primary/10" : "bg-primary/10"}`}></div>
                <span className="text-foreground/80">{trace.model}</span>
              </Box>
              <div className="flex items-center space-x-3">
                <span className="text-muted-foreground">{trace.time}</span>
                <span className={`${trace.status === "success" ? "text-foreground/70" : "text-foreground/70"}`}>{trace.duration}</span>
              </div>
            </Box>
          ))}
        </div>
      </Box>
    </div>
  );
};

export default ObservabilityView;
