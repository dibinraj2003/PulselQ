/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Activity, Linkedin, Twitter, ArrowUp, Lock, RefreshCw } from 'lucide-react';
import { PageId } from '../types';

interface FooterProps {
  setCurrentPage: (page: PageId) => void;
  onJoinWaitlistClick: () => void;
}

export default function Footer({ setCurrentPage, onJoinWaitlistClick }: FooterProps) {
  
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050505] border-t border-white/5 h-auto py-16 lg:py-24 z-10 text-left">
      
      {/* Decorative full length vertical rules overlay borders */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Layout Split columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 border-b border-white/5 pb-12">
          
          {/* Column 1 - Brand Identity (5 Cols) */}
          <div className="md:col-span-5 space-y-6">
            <div 
              onClick={() => setCurrentPage('landing')}
              className="inline-flex items-center space-x-2.5 cursor-pointer group"
            >
              <span className="w-2 h-2 bg-white rounded-full block" />
              <span className="font-display text-xl font-light tracking-tight text-white group-hover:text-white transition-all">
                Pulse<span className="text-white/30 font-light">IQ</span>
              </span>
            </div>

            <p className="font-sans text-xs sm:text-sm text-white/40 leading-relaxed max-w-sm font-light">
              AI-Powered Revenue & Churn Intelligence. We forecast recurring projections and protect enterprise Net Revenue Retention (NRR) at the telemetry tier.
            </p>

            <div className="flex items-center space-x-2 text-[10px] font-mono text-white/20">
              <Lock className="w-3.5 h-3.5 text-white/20 animate-pulse" />
              <span>TLS 1.3 SYNCED &bull; AES-256 GCM SECURED</span>
            </div>
          </div>

          {/* Column 2 - Sitemap navigation (3 Cols) */}
          <div className="md:col-span-3 space-y-4">
            <span className="font-mono text-[9px] text-white tracking-widest block font-bold uppercase">
              // SITEMAP NAVIGATION
            </span>
            <ul className="space-y-2.5 font-sans text-xs font-light">
              <li>
                <button 
                  onClick={() => { setCurrentPage('landing'); handleScrollToTop(); }}
                  className="text-white/40 hover:text-white transition-colors cursor-pointer"
                >
                  PREDICTIVE HOME
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentPage('roi-calculator'); handleScrollToTop(); }}
                  className="text-white/40 hover:text-white transition-colors cursor-pointer"
                >
                  ROI CALCULATOR MODULE
                </button>
              </li>
              <li>
                <button 
                  onClick={onJoinWaitlistClick}
                  className="text-white/40 hover:text-white transition-colors cursor-pointer"
                >
                  SECURE SEC SPOT FORM
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3 - Technical & social channels (4 Cols) */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-mono text-[9px] text-white/40 tracking-widest block font-bold uppercase">
              // OPERATIONAL INDEX & SECURE CONNECTS
            </span>
            
            <p className="font-sans text-xs text-white/40 leading-relaxed font-light">
              Have specialized compliance requirements? Reach our engineering advisory desk at: <strong>connect@pulseiq.ai</strong>.
            </p>

            {/* Social triggers */}
            <div className="flex items-center space-x-3 pt-1">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded bg-[#111111] border border-white/5 hover:border-white/30 flex items-center justify-center text-white/30 hover:text-white transition-all cursor-pointer"
                aria-label="Visit Twitter profile"
              >
                <Linkedin className="w-4 h-4 stroke-[1px]" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded bg-[#111111] border border-white/5 hover:border-white/30 flex items-center justify-center text-white/30 hover:text-white transition-all cursor-pointer"
                aria-label="Visit LinkedIn profile"
              >
                <Twitter className="w-4 h-4 stroke-[1px]" />
              </a>

              <div className="text-[10px] font-mono text-white/20 select-none">
                #TWITTER_LIVE_TICKER
              </div>
            </div>
          </div>

        </div>

        {/* Row 2: Copyright parameters */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-white/30">
          <div className="flex space-x-4">
            <span>&copy; 2026 PulseIQ. All rights reserved.</span>
            <span className="text-white/10">|</span>
            <a href="#waitlist-signup-anchor" className="hover:text-white underline">Privacy Commitment Policy</a>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleScrollToTop}
              className="flex items-center space-x-1.5 hover:text-white transition-colors text-xs font-sans font-light text-white/40 group cursor-pointer"
            >
              <span>BACK TO SUMMIT</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform stroke-[1.5px]" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
