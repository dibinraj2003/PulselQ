/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId, WaitlistCompany } from './types';
import GridOverlay from './components/GridOverlay';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import ProblemSection from './components/ProblemSection';
import HowItWorks from './components/HowItWorks';
import RoiCalculator from './components/RoiCalculator';
import WaitlistSection from './components/WaitlistSection';
import WaitlistDirectory from './components/WaitlistDirectory';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, ArrowUpRight, X } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('landing');

  // Unified dynamic waitlist companies storage
  const [waitlistCompanies, setWaitlistCompanies] = useState<WaitlistCompany[]>(() => {
    const saved = localStorage.getItem('pulseiq_waitlist_companies');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return [
      { id: '1', companyName: 'Stripe Corporate Systems', clientName: 'John Collison', email: 'john@stripe.com', addedAt: new Date(Date.now() - 86400000 * 4).toISOString() },
      { id: '2', companyName: 'Linear Technologies', clientName: 'Karri Saarinen', email: 'karri@linear.app', addedAt: new Date(Date.now() - 86400000 * 2.5).toISOString() },
      { id: '3', companyName: 'Vercel Edge Cloud', clientName: 'Guillermo Rauch', email: 'rauchg@vercel.com', addedAt: new Date(Date.now() - 86400000).toISOString() },
      { id: '4', companyName: 'Figma Dev Studio', clientName: 'Dylan Field', email: 'dylan@figma.com', addedAt: new Date(Date.now() - 3600000 * 8).toISOString() },
      { id: '5', companyName: 'Retool Platforms', clientName: 'John Wu', email: 'john@retool.com', addedAt: new Date(Date.now() - 3600000 * 3).toISOString() },
    ];
  });

  useEffect(() => {
    localStorage.setItem('pulseiq_waitlist_companies', JSON.stringify(waitlistCompanies));
  }, [waitlistCompanies]);

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [newlyAddedCompany, setNewlyAddedCompany] = useState<WaitlistCompany | null>(null);

  const handleAddCompany = (companyName: string, clientName: string, email: string) => {
    const newCompany: WaitlistCompany = {
      id: Math.random().toString(36).substring(2, 9),
      companyName,
      clientName,
      email,
      addedAt: new Date().toISOString(),
      isRecent: true // pins to top of table
    };

    setWaitlistCompanies(prev => {
      // Clear previous 'isRecent' tags to isolate the latest submission at absolute top
      const cleared = prev.map(c => ({ ...c, isRecent: false }));
      return [newCompany, ...cleared];
    });

    setNewlyAddedCompany(newCompany);
    setShowSuccessPopup(true);
  };

  // Trigger smooth scroll to waitlist form section
  const handleScrollToWaitlist = () => {
    // If the user isn't on the main landing homepage, route them there first, and then scroll
    if (currentPage !== 'landing') {
      setCurrentPage('landing');
      // Wait for React to render landing components
      setTimeout(() => {
        const element = document.getElementById('waitlist-signup-anchor');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const element = document.getElementById('waitlist-signup-anchor');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Restore scroll positions when changing subpages to feel like actual multi-pages!
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [currentPage]);

  return (
    <div className="relative min-h-screen bg-bg-base text-text-primary overflow-x-clip selection:bg-accent-primary selection:text-bg-base">
      
      {/* Editorial Grid Backplane background */}
      <GridOverlay />

      {/* Primary Sticky Header Navigation */}
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        onJoinWaitlistClick={handleScrollToWaitlist}
      />

      {/* Dynamic Main Site Router Viewports */}
      <main className="relative z-10">
        {currentPage === 'landing' && (
          <div className="animate-fade-in">
            {/* Above the fold displays */}
            <Hero 
              onJoinWaitlistClick={handleScrollToWaitlist} 
              setCurrentPage={setCurrentPage}
            />
            
            {/* Horizontal metrics strip */}
            <StatsBar />
 
            {/* Pain point agitation */}
            <ProblemSection />
 
            {/* Steps & flows */}
            <HowItWorks />

            {/* Core conversion terminal */}
            <WaitlistSection onAddCompany={handleAddCompany} />
 
            {/* Objections accordion */}
            <FAQSection />
          </div>
        )}
 
        {currentPage === 'roi-calculator' && (
          <div className="animate-fade-in px-2 sm:px-4">
            <RoiCalculator />
          </div>
        )}

        {currentPage === 'waitlist' && (
          <div className="animate-fade-in px-2 sm:px-4">
            <WaitlistDirectory 
              companies={waitlistCompanies} 
              onBackToLanding={() => setCurrentPage('landing')} 
            />
          </div>
        )}
      </main>
 
      {/* Clean Brutalist Footer */}
      <Footer 
        setCurrentPage={setCurrentPage} 
        onJoinWaitlistClick={handleScrollToWaitlist}
      />

      {/* Dynamic Success Toast Overlay */}
      <AnimatePresence>
        {showSuccessPopup && newlyAddedCompany && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 150 }}
              className="relative max-w-md w-full bg-gradient-to-b from-[#0e121a] to-[#06080d] border border-accent-primary/40 rounded-2xl p-6 shadow-[0_25px_60px_-15px_rgba(0,104,255,0.4)] text-left"
            >
              <button 
                onClick={() => setShowSuccessPopup(false)}
                className="absolute top-4 right-4 text-white/40 hover:text-white p-1 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30 shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <span className="font-mono text-[9px] text-accent-primary tracking-widest font-semibold block uppercase">SECURE REGISTRY CONNECTED</span>
                  <h3 className="font-sans text-lg font-medium text-white tracking-tight">Accreditation Secured!</h3>
                </div>
              </div>

              <div className="space-y-4 bg-black/45 border border-white/5 p-4 rounded-xl font-sans text-xs text-white/70 leading-relaxed font-light">
                <p>
                  We have authenticated and dispatched waitlist credentials for <strong className="text-white font-medium">{newlyAddedCompany.companyName}</strong>.
                </p>
                <div className="space-y-1.5 border-t border-white/5 pt-3 font-mono text-[10px] text-white/40">
                  <div className="flex justify-between">
                    <span>CLIENT REPRESENTATIVE:</span>
                    <span className="text-white font-medium">{newlyAddedCompany.clientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SYSTEM ID OVERLAY:</span>
                    <span className="text-emerald-400 font-bold">PULSE-X{Math.floor(1000 + Math.random() * 9000)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col space-y-2">
                <button
                  onClick={() => {
                    setCurrentPage('waitlist');
                    setShowSuccessPopup(false);
                  }}
                  className="w-full py-3 bg-white hover:bg-neutral-100 text-black text-xs font-mono font-bold tracking-widest rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer border-none"
                >
                  <span>VIEW WAITLIST DIRECTORY</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5px]" />
                </button>
                <button
                  onClick={() => setShowSuccessPopup(false)}
                  className="w-full py-2.5 text-xs font-mono text-white/45 tracking-widest hover:text-white transition-colors cursor-pointer bg-transparent border-none"
                >
                  DISMISS OVERLAY
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
