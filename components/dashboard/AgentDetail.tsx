'use client'


import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@hanzo/ui";
import { 
  Bot, Activity, Database, 
  FileText, Globe, Trash2, 
  PlusCircle, ChevronRight,
  ArrowUpDown, Settings, 
  PlayCircle, StopCircle,
  Save, X
} from "lucide-react";
import { Button } from "@hanzo/ui";
import { Input } from "@hanzo/ui";
import { Textarea } from "@hanzo/ui";
import { Progress } from "@hanzo/ui";
import { Agent } from "./data";
import { Box } from '@hanzo/ui'

interface AgentDetailProps {
  agent: Agent | null;
  onClose: () => void;
  onUpdate: (agent: Agent) => void;
}

interface RagSource {
  id: string;
  name: string;
  type: "database" | "vector" | "file" | "api";
  connection: string;
}

const AgentDetail: React.FC<AgentDetailProps> = ({ agent, onClose, onUpdate }) => {
  const [editedAgent, setEditedAgent] = useState<Agent | null>(agent);
  const [activeTab, setActiveTab] = useState<"overview" | "rag" | "settings">("overview");
  const [selectedRagSource, setSelectedRagSource] = useState<RagSource | null>(null);

  if (!editedAgent) return null;

  const setField = (name: string, value: string) => {
    setEditedAgent(prev => (prev ? { ...prev, [name]: value } : null));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setField(e.target.name, e.target.value);
  };

  const handleSave = () => {
    if (editedAgent) {
      onUpdate(editedAgent);
    }
  };

  const handleAddRagSource = () => {
    const newSource: RagSource = {
      id: `rs-${Date.now()}`,
      name: "New Source",
      type: "database",
      connection: ""
    };
    
    setEditedAgent(prev => {
      if (!prev) return null;
      return {
        ...prev,
        ragSources: [...(prev.ragSources || []), newSource]
      };
    });
    
    setSelectedRagSource(newSource);
  };

  const handleRagSourceChange = (source: RagSource) => {
    setEditedAgent(prev => {
      if (!prev || !prev.ragSources) return prev;
      return {
        ...prev,
        ragSources: prev.ragSources.map(s => 
          s.id === source.id ? source : s
        )
      };
    });
  };

  const handleRemoveRagSource = (sourceId: string) => {
    setEditedAgent(prev => {
      if (!prev || !prev.ragSources) return prev;
      return {
        ...prev,
        ragSources: prev.ragSources.filter(s => s.id !== sourceId)
      };
    });
    
    if (selectedRagSource?.id === sourceId) {
      setSelectedRagSource(null);
    }
  };

  return (
    <Dialog open={!!agent} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Box className="w-8 h-8 rounded-md bg-primary/10 border border-border flex items-center justify-center mr-3">
              <Bot className="h-4 w-4 text-foreground" />
            </Box>
            <Input 
              name="name"
              value={editedAgent.name}
              onChange={handleInputChange}
              className="text-xl font-semibold bg-transparent border-none px-0 h-auto"
            />
          </DialogTitle>
        </DialogHeader>

        <Box className="flex border-b border-neutral-800 mt-2">
          <button 
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'overview' ? 'text-[var(--white)] border-b-2 border-white' : 'text-muted-foreground hover:text-[var(--white)]'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'rag' ? 'text-[var(--white)] border-b-2 border-white' : 'text-muted-foreground hover:text-[var(--white)]'}`}
            onClick={() => setActiveTab('rag')}
          >
            RAG Sources
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'settings' ? 'text-[var(--white)] border-b-2 border-white' : 'text-muted-foreground hover:text-[var(--white)]'}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </Box>

        <Box className="flex-1 overflow-auto py-4">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Description</label>
                {/* gui's TextArea emits the VALUE, not a DOM change event — the
                    DOM spelling never matched the runtime, so it routed nothing. */}
                <Textarea 
                  value={editedAgent.description || ""}
                  onChangeText={(value) => setField("description", value)}
                  placeholder="Agent description..."
                  className="min-h-24 bg-neutral-900 border-neutral-800"
                />
              </div>

              <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Status</label>
                  <Box className="flex items-center justify-between p-3 bg-neutral-900 border border-neutral-800 rounded-md">
                    <Box className="flex items-center">
                      <div className={`h-2 w-2 rounded-full mr-2 ${
                        editedAgent.status === 'running' ? 'bg-primary/10' : 
                        editedAgent.status === 'paused' ? 'bg-primary/10' : 
                        editedAgent.status === 'error' ? 'bg-primary/10' : 'bg-neutral-500'
                      }`}></div>
                      <span>{
                        editedAgent.status.charAt(0).toUpperCase() + editedAgent.status.slice(1)
                      }</span>
                    </Box>
                    {editedAgent.status === 'running' ? (
                      <Button size="sm" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-[var(--white)]">
                        <StopCircle className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button size="sm" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-[var(--white)]">
                        <PlayCircle className="h-4 w-4" />
                      </Button>
                    )}
                  </Box>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Model</label>
                  <Box className="flex items-center p-3 bg-neutral-900 border border-neutral-800 rounded-md">
                    <Input 
                      name="model"
                      value={editedAgent.model}
                      onChange={handleInputChange}
                      className="bg-transparent border-none p-0"
                    />
                  </Box>
                </div>
              </Box>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Resource Usage</h3>
                <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Box className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">CPU</span>
                      <span className="text-sm">{editedAgent.cpu || 0}%</span>
                    </Box>
                    <Progress value={editedAgent.cpu || 0} className="h-2" />
                  </div>
                  <div>
                    <Box className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">GPU</span>
                      <span className="text-sm">{editedAgent.gpu || 0}%</span>
                    </Box>
                    <Progress value={editedAgent.gpu || 0} className="h-2" />
                  </div>
                  <div>
                    <Box className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Memory</span>
                      <span className="text-sm">{editedAgent.memory}%</span>
                    </Box>
                    <Progress value={editedAgent.memory} className="h-2" />
                  </div>
                  <div>
                    <Box className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Storage</span>
                      <span className="text-sm">{editedAgent.storage || 0}%</span>
                    </Box>
                    <Progress value={editedAgent.storage || 0} className="h-2" />
                  </div>
                </Box>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Usage Statistics</h3>
                <Box className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <Box className="bg-neutral-900 border border-neutral-800 rounded-md p-3">
                    <h4 className="text-xs text-muted-foreground mb-1">Tokens Used</h4>
                    <p className="text-lg font-medium">{editedAgent.tokens.toLocaleString()}</p>
                  </Box>
                  <Box className="bg-neutral-900 border border-neutral-800 rounded-md p-3">
                    <h4 className="text-xs text-muted-foreground mb-1">Cost</h4>
                    <p className="text-lg font-medium">${editedAgent.cost.toFixed(2)}</p>
                  </Box>
                  <Box className="bg-neutral-900 border border-neutral-800 rounded-md p-3">
                    <h4 className="text-xs text-muted-foreground mb-1">Tasks Assigned</h4>
                    <p className="text-lg font-medium">{editedAgent.tasks}</p>
                  </Box>
                  <Box className="bg-neutral-900 border border-neutral-800 rounded-md p-3">
                    <h4 className="text-xs text-muted-foreground mb-1">Last Active</h4>
                    <p className="text-lg font-medium">{editedAgent.lastActive}</p>
                  </Box>
                </Box>
              </div>
            </div>
          )}

          {activeTab === 'rag' && (
            <Box className="grid grid-cols-3 gap-6 h-[400px]">
              <Box className="col-span-1 border-r border-neutral-800 pr-4">
                <Box className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-medium">Knowledge Sources</h3>
                  <Button size="sm" variant="ghost" onClick={handleAddRagSource}>
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </Box>
                <div className="space-y-1">
                  {editedAgent.ragSources?.map(source => (
                    <div 
                      key={source.id}
                      className={`p-2 rounded flex items-center justify-between cursor-pointer ${
                        selectedRagSource?.id === source.id ? 'bg-neutral-800' : 'hover:bg-neutral-900'
                      }`}
                      onClick={() => setSelectedRagSource(source)}
                    >
                      <Box className="flex items-center">
                        {source.type === 'database' && <Database className="h-4 w-4 text-foreground mr-2" />}
                        {source.type === 'vector' && <Activity className="h-4 w-4 text-foreground/70 mr-2" />}
                        {source.type === 'file' && <FileText className="h-4 w-4 text-foreground/60 mr-2" />}
                        {source.type === 'api' && <Globe className="h-4 w-4 text-foreground/70 mr-2" />}
                        <span className="text-sm truncate">{source.name}</span>
                      </Box>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                  {!editedAgent.ragSources?.length && (
                    <Box className="text-sm text-muted-foreground p-2">
                      No knowledge sources added
                    </Box>
                  )}
                </div>
              </Box>

              <Box className="col-span-2">
                {selectedRagSource ? (
                  <div className="space-y-4">
                    <Box className="flex justify-between">
                      <h3 className="text-sm font-medium">Source Details</h3>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-foreground/70 hover:text-foreground/70"
                        onClick={() => handleRemoveRagSource(selectedRagSource.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </Box>

                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Name</label>
                      <Input 
                        value={selectedRagSource.name}
                        onChange={(e) => {
                          const updated = { ...selectedRagSource, name: e.target.value };
                          handleRagSourceChange(updated);
                          setSelectedRagSource(updated);
                        }}
                        className="bg-neutral-900 border-neutral-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Type</label>
                      <Box className="grid grid-cols-4 gap-2">
                        {(['database', 'vector', 'file', 'api'] as const).map(type => (
                          <div 
                            key={type}
                            className={`p-2 border rounded flex flex-col items-center justify-center cursor-pointer ${
                              selectedRagSource.type === type 
                                ? 'border-white bg-primary/10' 
                                : 'border-neutral-800 hover:border-neutral-700'
                            }`}
                            onClick={() => {
                              const updated = { ...selectedRagSource, type };
                              handleRagSourceChange(updated);
                              setSelectedRagSource(updated);
                            }}
                          >
                            {type === 'database' && <Database className="h-5 w-5 text-foreground mb-1" />}
                            {type === 'vector' && <Activity className="h-5 w-5 text-foreground/70 mb-1" />}
                            {type === 'file' && <FileText className="h-5 w-5 text-foreground/60 mb-1" />}
                            {type === 'api' && <Globe className="h-5 w-5 text-foreground/70 mb-1" />}
                            <span className="text-xs capitalize">{type}</span>
                          </div>
                        ))}
                      </Box>
                    </div>

                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Connection String</label>
                      <Input 
                        value={selectedRagSource.connection}
                        onChange={(e) => {
                          const updated = { ...selectedRagSource, connection: e.target.value };
                          handleRagSourceChange(updated);
                          setSelectedRagSource(updated);
                        }}
                        className="bg-neutral-900 border-neutral-800 font-mono text-xs"
                        placeholder={
                          selectedRagSource.type === 'database' ? 'postgres://user:pass@host/db' :
                          selectedRagSource.type === 'vector' ? 'pinecone://index' :
                          selectedRagSource.type === 'file' ? '/path/to/document.pdf' :
                          'https://api.example.com/endpoint'
                        }
                      />
                    </div>
                  </div>
                ) : (
                  <Box className="h-full flex items-center justify-center text-muted-foreground text-sm">
                    Select a knowledge source or add a new one
                  </Box>
                )}
              </Box>
            </Box>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Agent Type</label>
                <Input 
                  name="type"
                  value={editedAgent.type}
                  onChange={handleInputChange}
                  className="bg-neutral-900 border-neutral-800"
                />
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Advanced Settings</h3>
                <div className="space-y-4 bg-neutral-900 border border-neutral-800 rounded-md p-4">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Memory Limit (%)</label>
                    <Input 
                      type="number"
                      name="memory"
                      value={editedAgent.memory}
                      onChange={handleInputChange}
                      min="0"
                      max="100"
                      className="bg-neutral-900 border-neutral-800"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Execution Priority</label>
                    <select className="w-full bg-neutral-900 border-neutral-800 rounded-md p-2 text-sm">
                      <option>Normal</option>
                      <option>High</option>
                      <option>Low</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Execution Mode</label>
                    <select className="w-full bg-neutral-900 border-neutral-800 rounded-md p-2 text-sm">
                      <option>Automatic</option>
                      <option>Manual</option>
                      <option>Scheduled</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Box>

        <Box className="flex justify-end gap-2 pt-4 border-t border-neutral-800 mt-4">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Agent
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AgentDetail;
