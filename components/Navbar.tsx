'use client'

import { useState, useEffect, useCallback } from "react";
import { MobileMenu } from "./navigation/MobileMenu";
import Logo from "./navigation/Logo";
import DesktopNav from "./navigation/DesktopNav";
import AuthButtons from "./navigation/AuthButtons";
import NavbarContainer from "./navigation/NavbarContainer";
import CommandPalette from "./CommandPalette";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Single source of auth truth: the @hanzo/iam session.
  const { user: iamUser, isAuthenticated, login, logout } = useAuth();
  const user = isAuthenticated && iamUser
    ? {
        id: iamUser.sub || "",
        email: iamUser.email || "",
        name: iamUser.name || iamUser.preferred_username || undefined,
      }
    : null;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Global keyboard shortcut for command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleOpenCommandPalette = useCallback(() => {
    setIsCommandPaletteOpen(true);
  }, []);

  const handleCloseCommandPalette = useCallback(() => {
    setIsCommandPaletteOpen(false);
  }, []);

  return (
    <>
      <NavbarContainer isScrolled={isScrolled}>
        <div className="flex items-center w-full">
          {/* Left: Logo — min-width balances right side for centered nav */}
          <div className="flex-shrink-0 min-w-[120px]">
            <Logo />
          </div>

          {/* Center: Navigation */}
          <div className="flex-1 flex justify-center">
            <DesktopNav />
          </div>

          {/* Right: Auth Buttons */}
          <div className="flex-shrink-0">
            <AuthButtons
              user={user}
              onLogin={() => { void login(); }}
              onLogout={logout}
              onOpenCommandPalette={handleOpenCommandPalette}
            />
          </div>

          {/* Mobile Menu */}
          <MobileMenu
            isOpen={isMobileMenuOpen}
            onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            onOpenSearch={handleOpenCommandPalette}
          />
        </div>
      </NavbarContainer>

      {/* Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={handleCloseCommandPalette}
      />
    </>
  );
};

export default Navbar;
