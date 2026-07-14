/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageId } from '../types';
import { Activity, Calculator, Bookmark, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  onJoinWaitlistClick: () => void;
}

export default function Navbar({ currentPage, setCurrentPage, onJoinWaitlistClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'landing' as PageId, label: 'HOMEPAGE', icon: Activity },
    { id: 'roi-calculator' as PageId, label: 'ROI CALCULATOR', icon: Calculator },
    { id: 'waitlist' as PageId, label: 'WAITLIST', icon: Bookmark },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-bg-base/80 backdrop-blur-md border-b border-border-subtle transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Brand Title */}
          <div 
            onClick={() => { setCurrentPage('landing'); setMobileMenuOpen(false); }}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="relative">
              <span className="w-2.5 h-2.5 bg-accent-primary rounded-full block animate-pulse duration-3000" />
              <span className="absolute inset-0 bg-accent-primary/50 rounded-full scale-150 animate-ping opacity-30" />
            </div>
            <span className="font-display text-2xl font-light tracking-tight text-text-primary group-hover:text-accent-primary transition-colors duration-250">
              Pulse<span className="text-accent-primary">IQ</span>.
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { setCurrentPage(item.id); }}
                  className={`flex items-center px-4 py-2 rounded text-xs font-mono tracking-widest transition-all duration-150 ${
                    isActive 
                      ? 'text-accent-primary bg-bg-elevated border-b-2 border-accent-primary' 
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-surface/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 mr-2 stroke-[1.5px]" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Action Callouts */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={onJoinWaitlistClick}
              className="px-6 py-2.5 border border-white/10 rounded-full text-[10px] font-sans uppercase tracking-[0.15em] hover:bg-white hover:text-black hover:border-white text-text-primary transition-all duration-150 flex items-center space-x-1.5 cursor-pointer"
            >
              <span>JOIN WAITLIST</span>
              <ArrowUpRight className="w-3 h-3 stroke-[2.5px]" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-text-secondary hover:text-text-primary p-2 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-bg-surface border-b border-border-default animate-fade-in py-4 px-4 space-y-3">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center w-full px-4 py-3 rounded text-left text-xs font-mono tracking-widest transition-colors ${
                    isActive 
                      ? 'text-accent-primary bg-bg-elevated' 
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-3 stroke-[1.5px]" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Social and quick callouts */}
          <div className="pt-4 border-t border-border-default flex flex-col space-y-3">
            <div className="flex items-center justify-between px-4 text-xs font-mono text-text-secondary">
              <span>SYSTEM CHANNELS</span>
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-accent-positive" />
                <span className="text-text-primary">SECURE DEPLOY</span>
              </span>
            </div>
            <button
              onClick={() => {
                onJoinWaitlistClick();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-accent-primary text-bg-base font-mono text-xs font-bold tracking-wider rounded text-center block"
            >
              JOIN SECURE WAITLIST
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
