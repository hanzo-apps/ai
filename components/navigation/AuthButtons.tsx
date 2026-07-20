'use client'

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, ChevronDown, Sparkles, Zap, MessageSquare, Terminal, ArrowRight, Bot, AppWindow, LayoutDashboard, Building2, Users, CreditCard, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthButtonsProps {
  user: User | null;
  onLogout?: () => void;
  onOpenCommandPalette?: () => void;
}

const zenFamilies = [
  {
    name: "Zen5",
    tag: "Try free",
    description: "Jump straight into chat and use Zen5 — free, no signup.",
    icon: Zap,
    href: "https://hanzo.chat",
  },
  {
    name: "Zen4",
    tag: "Stable",
    description: "30+ open models — nano to 1T. Abliterated, multimodal, agentic.",
    icon: Sparkles,
    href: "/zen",
  },
];

const apps = [
  { label: "Hanzo App", description: "Your AI workspace", href: "https://hanzo.app", icon: AppWindow, external: true },
  { label: "Hanzo Bot", description: "AI agent platform", href: "https://hanzo.bot", icon: Bot, external: true },
  { label: "Hanzo Chat", description: "Chat with Zen + frontier models", href: "https://hanzo.chat", icon: MessageSquare, external: true },
  { label: "Hanzo Dev", description: "AI coding agent for your IDE", href: "/dev", icon: Terminal, external: false },
];

// The signed-in identity menu — mirrors the shared shell (console/app/team):
// Console · Organizations (full IAM org scope lives in the Console) · Team ·
// Billing · Sign out. Marketing site keeps it as plain links, no extra deps.
const accountMenu = [
  { label: "Console", hint: "console.hanzo.ai", href: "https://console.hanzo.ai", icon: LayoutDashboard },
  { label: "Organizations", hint: "switch in Console", href: "https://console.hanzo.ai", icon: Building2 },
  { label: "Team", hint: "hanzo.team", href: "https://hanzo.team", icon: Users },
  { label: "Billing", hint: "billing.hanzo.ai", href: "https://billing.hanzo.ai", icon: CreditCard },
];

const AuthButtons = ({ user, onLogout, onOpenCommandPalette }: AuthButtonsProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close the user menu on outside click / escape.
  useEffect(() => {
    if (!isUserMenuOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isUserMenuOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsDropdownOpen(false);
    };

    if (isDropdownOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isDropdownOpen]);

  return (
    <div className="hidden md:flex items-center space-x-3">
      {/* Search / Command palette trigger */}
      <button
        onClick={onOpenCommandPalette}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-800/50 border border-border/50 text-muted-foreground hover:text-foreground hover:bg-accent hover:border-neutral-600 transition-all text-sm cursor-pointer"
        aria-label="Search (⌘K)"
      >
        <Search className="h-4 w-4" />
        <span className="hidden lg:inline text-muted-foreground text-xs">Search...</span>
        <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono bg-secondary/80 border border-border/50 rounded text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* When logged out: Contact Sales */}
      {!user && (
        <Link
          href="/contact/sales"
          className="inline-flex items-center justify-center rounded-full h-9 px-4 text-sm font-medium text-foreground/80 hover:text-foreground transition-all duration-200 cursor-pointer"
        >
          Contact sales
        </Link>
      )}

      {/* When logged in: Pricing + Docs quick links */}
      {user && (
        <>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center rounded-full h-9 px-4 text-sm font-medium text-foreground/80 hover:text-foreground transition-all duration-200 cursor-pointer"
          >
            Pricing
          </Link>
          <a
            href="https://docs.hanzo.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full h-9 px-4 text-sm font-medium text-foreground/80 hover:text-foreground transition-all duration-200 cursor-pointer"
          >
            Docs
          </a>
        </>
      )}

      {/* Log in / User account — the shared-shell identity menu (SSOs via IAM). */}
      {user ? (
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setIsUserMenuOpen((o) => !o)}
            className="inline-flex items-center justify-center border border-border hover:bg-accent rounded-full h-9 px-4 text-sm font-medium text-foreground transition-all duration-200 cursor-pointer gap-2"
            aria-label="Account"
          >
            <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center flex-shrink-0">
              {(user.name || user.email).charAt(0).toUpperCase()}
            </span>
            <span className="max-w-[100px] truncate">{user.name || user.email}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isUserMenuOpen ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {isUserMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-64 bg-secondary/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl overflow-hidden z-[100] p-1.5"
              >
                <div className="px-2.5 py-2 border-b border-border/60 mb-1">
                  <div className="text-sm font-medium text-foreground truncate">{user.name || user.email}</div>
                  {user.name && <div className="text-xs text-muted-foreground truncate">{user.email}</div>}
                </div>
                {accountMenu.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsUserMenuOpen(false)}
                    className="group flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-accent transition-colors"
                  >
                    <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    <span className="flex-1 text-sm text-foreground/90">{item.label}</span>
                    <span className="text-[10px] text-muted-foreground">{item.hint}</span>
                  </a>
                ))}
                <div className="border-t border-border/60 my-1" />
                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    onLogout?.();
                  }}
                  className="group flex w-full items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-accent transition-colors"
                >
                  <LogOut className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  <span className="text-sm text-foreground/90">Sign out</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <a
          href="https://console.hanzo.ai"
          className="inline-flex items-center justify-center border border-border hover:bg-accent rounded-full h-9 px-4 text-sm font-medium text-foreground transition-all duration-200 cursor-pointer"
        >
          Log in
        </a>
      )}

      {/* Try Zen — dropdown of Zen models + apps; primary top-right CTA. */}
      {!user && (
      <div
        className="relative"
        ref={dropdownRef}
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
      >
        <button
          className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-accent active:bg-neutral-300 rounded-full h-9 px-4 text-sm font-medium transition-all duration-200 cursor-pointer"
        >
          Try Zen
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-[380px] bg-secondary/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl overflow-hidden z-[100]"
            >
              {/* Zen Model Families */}
              <div className="p-3">
                <div className="flex items-center justify-between mb-2 px-1">
                  <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Zen AI
                  </span>
                  <Link
                    href="/zen"
                    onClick={() => setIsDropdownOpen(false)}
                    className="text-[10px] text-muted-foreground hover:text-foreground transition-colors"
                  >
                    All models →
                  </Link>
                </div>

                <div className="space-y-1.5">
                  {zenFamilies.map((family) => {
                    const FamilyIcon = family.icon;
                    return (
                      <Link
                        key={family.name}
                        href={family.href}
                        onClick={() => setIsDropdownOpen(false)}
                        className="group flex items-start gap-3 p-3 rounded-xl hover:bg-accent transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-neutral-800/80 flex items-center justify-center flex-shrink-0 group-hover:bg-neutral-700/80 transition-colors">
                          <FamilyIcon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-foreground">{family.name}</span>
                            <span className="text-[9px] font-semibold tracking-wider uppercase text-muted-foreground bg-neutral-800/60 px-1.5 py-px rounded">
                              {family.tag}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-tight mt-0.5">{family.description}</p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-muted-foreground mt-2 flex-shrink-0 transition-colors" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-border" />

              {/* Apps */}
              <div className="p-3">
                <div className="px-1 mb-1.5">
                  <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Apps
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {apps.map((item) => {
                    const ItemIcon = item.icon;
                    const content = (
                      <div className="group flex items-center gap-2 py-2 px-2.5 rounded-lg hover:bg-accent transition-colors">
                        <ItemIcon className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground flex-shrink-0 transition-colors" />
                        <div className="min-w-0">
                          <div className="text-[13px] font-medium text-foreground">{item.label}</div>
                          <div className="text-[10px] text-muted-foreground truncate">{item.description}</div>
                        </div>
                      </div>
                    );

                    if (item.external) {
                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          {content}
                        </a>
                      );
                    }

                    return (
                      <Link key={item.label} href={item.href} onClick={() => setIsDropdownOpen(false)}>
                        {content}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* CTA — Cloud Console */}
              <div className="p-3 pt-0">
                <a
                  href="https://console.hanzo.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  Cloud Console
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      )}
    </div>
  );
};

export default AuthButtons;
