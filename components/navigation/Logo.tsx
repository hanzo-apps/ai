'use client'

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { HanzoLogo } from "@hanzo/logo/react";
import { getWhiteSVG } from "@hanzo/logo";
import { Copy, Download, Image, ExternalLink, FileCode } from "lucide-react";

// The mark + wordmark motion (intro flip, idle breathe, wordmark slide-in →
// collapse → return on hover) is the @hanzo/logo animated shell — the ONE brand
// motion shared across hanzo.ai / console / app / team. Only the right-click
// brand menu is local.

// Context menu items for right-click
const contextMenuItems = [
  { label: "Copy SVG", action: "copy-svg", icon: Copy },
  { label: "Download SVG", action: "download-svg", icon: Download },
  { label: "Download PNG", action: "download-png", icon: Image },
  { divider: true },
  { label: "Brand Guidelines", href: "/brand", icon: FileCode },
  { label: "All Products", href: "/products" },
  { label: "Documentation", href: "https://docs.hanzo.ai", external: true, icon: ExternalLink },
  { label: "Status", href: "/status" },
];

const Logo = () => {
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close context menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setContextMenu(null);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setContextMenu(null);
    };

    if (contextMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [contextMenu]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadPNG = async () => {
    const svgString = getWhiteSVG();
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new window.Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 512, 512);
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'hanzo-logo.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 'image/png');
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgString);
  };

  const handleMenuItemClick = async (item: typeof contextMenuItems[0]) => {
    setContextMenu(null);
    if ('action' in item) {
      if (item.action === 'copy-svg') {
        try {
          await navigator.clipboard.writeText(getWhiteSVG());
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error('Failed to copy SVG:', err);
        }
      } else if (item.action === 'download-svg') {
        downloadFile(getWhiteSVG(), 'hanzo-logo.svg', 'image/svg+xml');
      } else if (item.action === 'download-png') {
        await downloadPNG();
      }
    } else if ('external' in item && item.external) {
      window.open(item.href, "_blank");
    } else if (item.href) {
      router.push(item.href);
    }
  };

  return (
    <>
      <Link
        href="/"
        className="flex items-center group cursor-pointer text-foreground text-base"
        onContextMenu={handleContextMenu}
      >
        <HanzoLogo animated size={20} wordmark="Hanzo Cloud" />
      </Link>

      {/* Right-click context menu */}
      <AnimatePresence>
        {contextMenu && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="fixed z-[200] rounded-xl shadow-2xl py-1.5 min-w-[200px] border bg-background/95 backdrop-blur-xl border-border"
            style={{ left: contextMenu.x, top: contextMenu.y }}
          >
            {contextMenuItems.map((item, index) =>
              'divider' in item ? (
                <div key={index} className="border-t my-1 border-border/50" />
              ) : (
                <button
                  key={item.label}
                  onClick={() => handleMenuItemClick(item)}
                  className="w-full text-left px-3 py-1.5 text-sm transition-colors flex items-center gap-2.5 text-foreground/80 hover:bg-accent hover:text-foreground rounded-md mx-1"
                  style={{ width: 'calc(100% - 8px)' }}
                >
                  {'icon' in item && item.icon && (
                    <item.icon className="w-3.5 h-3.5 text-muted-foreground" />
                  )}
                  {!('icon' in item && item.icon) && (
                    <span className="w-3.5" />
                  )}
                  {item.label}
                </button>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Logo;
