'use client'


import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@hanzo/ui";
import {
  Home,
  LayoutDashboard,
  Users,
  Settings,
  FileCog,
  Bot,
  Search,
  ChevronDown,
  PlusCircle,
  BellDot,
  Database,
  Server,
  Cpu,
  Layers,
  Command,
  Keyboard,
  Blocks
} from "lucide-react";
import { Box } from '@hanzo/ui'

interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * Open the site's ONE command palette — the shell's, mounted by the header the
 * `(marketing)` layout wraps every page in.
 *
 * The shell binds the palette to ⌘K on `document` and exposes no imperative
 * opener, so the chord IS the entry point. A row that prints "⌘K" therefore
 * presses ⌘K: the label and the behaviour are the same fact, and the page never
 * has to mount a second palette to give the row something to open — which is
 * how one keypress used to open two of them.
 */
function openPalette() {
  document.dispatchEvent(
    new KeyboardEvent('keydown', { key: 'k', metaKey: true, ctrlKey: true, bubbles: true }),
  );
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const router = useRouter();

  return (
    <Box className="flex h-screen bg-[var(--black)] text-[var(--white)] overflow-hidden">
      {/* Sidebar */}
      <Box className="w-56 border-r border-neutral-900 flex flex-col">
        {/* User/Team Selector */}
        <Box className="p-3 border-b border-neutral-900 flex items-center">
          <Box className="w-6 h-6 bg-primary/10 rounded-md flex items-center justify-center text-xs font-bold mr-2">H</Box>
          <span className="font-medium">Hanzo AI</span>
          <ChevronDown className="w-4 h-4 ml-auto" />
        </Box>
        
        {/* Search */}
        <Box className="px-3 py-2 border-b border-neutral-900">
          <Button
            variant="outline"
            className="w-full justify-start text-muted-foreground bg-[var(--black)] border-neutral-800"
            onClick={openPalette}
          >
            <Search className="w-4 h-4 mr-2" />
            <span>Search...</span>
            <Box className="ml-auto flex items-center text-xs text-muted-foreground">
              <Command className="w-3 h-3 mr-1" />
              <span>K</span>
            </Box>
          </Button>
        </Box>
        
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-3">
          <Box className="mb-6">
            <Box className="text-muted-foreground text-xs font-medium mb-2 px-2">WORKSPACE</Box>
            <ul className="space-y-1">
              <li>
                <Button variant="ghost" className="w-full justify-start text-foreground/80 hover:bg-neutral-900 hover:text-[var(--white)]" onClick={() => router.push("/dashboard")}>
                  <LayoutDashboard className="w-4 h-4 mr-2" /> 
                  Dashboard
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start text-foreground/80 hover:bg-neutral-900 hover:text-[var(--white)]">
                  <FileCog className="w-4 h-4 mr-2" /> 
                  Projects
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start text-foreground/80 hover:bg-neutral-900 hover:text-[var(--white)]">
                  <Bot className="w-4 h-4 mr-2" /> 
                  AI Agents
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start text-foreground/80 hover:bg-neutral-900 hover:text-[var(--white)]">
                  <Database className="w-4 h-4 mr-2" /> 
                  Data Sources
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start text-foreground/80 hover:bg-neutral-900 hover:text-[var(--white)]">
                  <Server className="w-4 h-4 mr-2" />
                  Infrastructure
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start text-foreground/80 hover:bg-neutral-900 hover:text-[var(--white)]" onClick={() => router.push("/dashboard?view=blockchain")}>
                  <Blocks className="w-4 h-4 mr-2" />
                  Blockchain
                </Button>
              </li>
            </ul>
          </Box>
          
          <Box className="mb-6">
            <Box className="flex items-center justify-between text-muted-foreground text-xs font-medium mb-2 px-2">
              <span>MODELS</span>
              <Button size="icon" variant="ghost" className="h-4 w-4 text-muted-foreground hover:text-[var(--white)] hover:bg-neutral-900">
                <PlusCircle className="h-3 w-3" />
              </Button>
            </Box>
            <ul className="space-y-1">
              <li>
                <Button variant="ghost" className="w-full justify-start text-foreground/80 hover:bg-neutral-900 hover:text-[var(--white)]">
                  <Box className="w-4 h-4 bg-primary rounded-sm flex items-center justify-center text-[10px] mr-2">G</Box>
                  GPT-5
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start text-foreground/80 hover:bg-neutral-900 hover:text-[var(--white)]">
                  <Box className="w-4 h-4 bg-primary/10 rounded-sm flex items-center justify-center text-[10px] mr-2">C</Box>
                  Claude
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start text-foreground/80 hover:bg-neutral-900 hover:text-[var(--white)]">
                  <Box className="w-4 h-4 bg-primary/10 rounded-sm flex items-center justify-center text-[10px] mr-2">L</Box>
                  Llama 4
                </Button>
              </li>
            </ul>
          </Box>
          
          <Box className="mb-6">
            <Box className="flex items-center justify-between text-muted-foreground text-xs font-medium mb-2 px-2">
              <span>TEAMS</span>
              <Button size="icon" variant="ghost" className="h-4 w-4 text-muted-foreground hover:text-[var(--white)] hover:bg-neutral-900">
                <PlusCircle className="h-3 w-3" />
              </Button>
            </Box>
            <ul className="space-y-1">
              <li>
                <Button variant="ghost" className="w-full justify-start text-foreground/80 hover:bg-neutral-900 hover:text-[var(--white)]">
                  <Box className="w-4 h-4 bg-primary/10 rounded-sm flex items-center justify-center text-[10px] mr-2">E</Box>
                  Engineering
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start text-foreground/80 hover:bg-neutral-900 hover:text-[var(--white)]">
                  <Box className="w-4 h-4 bg-primary rounded-sm flex items-center justify-center text-[10px] mr-2">D</Box>
                  Design
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start text-foreground/80 hover:bg-neutral-900 hover:text-[var(--white)]">
                  <Box className="w-4 h-4 bg-primary/10 rounded-sm flex items-center justify-center text-[10px] mr-2">M</Box>
                  Marketing
                </Button>
              </li>
            </ul>
          </Box>
        </nav>
        
        {/* Footer */}
        <Box className="mt-auto border-t border-neutral-900 p-3">
          <ul className="space-y-1">
            <li>
              <Button variant="ghost" className="w-full justify-start text-foreground/80 hover:bg-neutral-900 hover:text-[var(--white)]">
                <Settings className="w-4 h-4 mr-2" /> 
                Settings
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start text-foreground/80 hover:bg-neutral-900 hover:text-[var(--white)]">
                <Keyboard className="w-4 h-4 mr-2" /> 
                Keyboard Shortcuts
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start text-foreground/80 hover:bg-neutral-900 hover:text-[var(--white)]" onClick={() => router.push("/")}>
                <Home className="w-4 h-4 mr-2" /> 
                Home
              </Button>
            </li>
          </ul>
        </Box>
      </Box>
      
      {/* Main Content */}
      <Box className="flex-1 overflow-hidden flex flex-col">
        {/* Header */}
        <header className="h-12 border-b border-neutral-900 flex items-center px-4">
          <Box className="flex-1"></Box>
          <div className="flex items-center space-x-3">
            <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-[var(--white)]">
              <BellDot className="h-5 w-5" />
            </Button>
            <Box className="h-8 w-8 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-900 border border-neutral-800"></Box>
          </div>
        </header>
        
        {/* Content */}
        <main className="flex-1 overflow-hidden p-6">
          {children}
        </main>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
