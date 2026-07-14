/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Bookmark, 
  Search, 
  Building2, 
  User, 
  Mail, 
  Calendar, 
  CheckCircle2, 
  Sparkles,
  ChevronRight,
  Filter,
  ShieldCheck,
  Zap,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WaitlistCompany } from '../types';

interface WaitlistDirectoryProps {
  companies: WaitlistCompany[];
  onBackToLanding?: () => void;
}

export default function WaitlistDirectory({ companies, onBackToLanding }: WaitlistDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'recent' | 'verified'>('all');

  // Enforce requested sorting logic:
  // "The client's name should always appear at the top of the table if they are added recently, ensuring it stays prominent. Make sure the table updates dynamically whenever a new company is added."
  const sortedAndFilteredCompanies = useMemo(() => {
    // 1. Filter based on search query
    let filtered = companies;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = companies.filter(c => 
        c.companyName.toLowerCase().includes(query) || 
        c.clientName.toLowerCase().includes(query) || 
        c.email.toLowerCase().includes(query)
      );
    }

    // Secondary status filter
    if (statusFilter === 'recent') {
      filtered = filtered.filter(c => c.isRecent);
    } else if (statusFilter === 'verified') {
      // Just for UX variety (using non-recent ones as pre-verified)
      filtered = filtered.filter(c => !c.isRecent);
    }

    // 2. Sort: Pinned premium sorting. Elements with isRecent go first!
    // Within those categories, we sort by chronological addedAt descending (newest first).
    return [...filtered].sort((a, b) => {
      const aRecent = a.isRecent ? 1 : 0;
      const bRecent = b.isRecent ? 1 : 0;
      
      if (aRecent !== bRecent) {
        return bRecent - aRecent; // 1 (recent) comes before 0
      }
      
      return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
    });
  }, [companies, searchQuery, statusFilter]);

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-[#050607]">
      {/* Editorial Grid overlay backgrounds */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-br from-[#0068ff]/15 to-[#00f3ff]/5 rounded-full blur-[140px] pointer-events-none opacity-50" />

      {/* Decorative Navigation System tag */}
      <div className="absolute top-0 left-4 sm:left-6 lg:left-8 py-3 pointer-events-none border-l border-white/5 pl-4 mt-8">
        <span className="font-mono text-[10px] text-accent-primary tracking-widest block font-medium uppercase flex items-center space-x-1.5">
          <Bookmark className="w-3 h-3 text-accent-primary" />
          <span>SYS NODE // waitlist_directory_active</span>
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block with Title & Aggregate Metric */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/5">
          <div className="space-y-4 max-w-xl text-left">
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-text-secondary">Secured Ledger Network</span>
            </div>
            <h1 
              className="font-sans font-light text-[60px] text-white tracking-tight leading-none"
              style={{ fontSize: '60px' }}
            >
              Waitlist Registry
            </h1>
            <p className="font-sans text-sm sm:text-base text-text-secondary leading-relaxed font-light">
              Explore dynamic cohort allocations, validation tickets, and live enterprise integrations. Your freshly added company stays highlighted at the top of the real-time stream.
            </p>
          </div>

          {/* Glowing Aggregate Stats Counter Badge */}
          <div className="flex items-center space-x-4 bg-gradient-to-b from-[#0e0f12] to-[#08090a] border border-white/5 p-4 rounded-2xl md:self-stretch justify-between sm:justify-start">
            <div className="text-left pr-6 border-r border-white/5">
              <span className="text-[10px] font-mono text-white/45 block uppercase tracking-wider">TOTAL ENROLLED</span>
              <div className="flex items-baseline space-x-2 mt-1">
                <span className="text-3xl font-sans font-bold text-white tracking-tight">
                  {companies.length}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase tracking-widest">ACTIVE</span>
              </div>
            </div>
            <div className="text-left">
              <span className="text-[10px] font-mono text-white/45 block uppercase tracking-wider">SECURE PHASE</span>
              <div className="flex items-center space-x-1.5 mt-2 bg-accent-primary/10 border border-accent-primary/20 px-2.5 py-1 rounded-lg">
                <ShieldCheck className="w-3.5 h-3.5 text-accent-primary" />
                <span className="text-[10px] font-mono text-accent-primary font-bold uppercase tracking-widest">COHORT DELTA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Actions and Filters */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          
          {/* Enhanced Search Input */}
          <div className="relative w-full sm:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/20">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Filter by company name, client, or domain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#090a0c] border border-white/5 focus:border-[#0068ff]/60 focus:ring-1 focus:ring-[#0068ff]/20 focus:outline-none rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/25 transition-all font-sans font-light"
            />
          </div>

          {/* Filtering Toggles */}
          <div className="flex items-center space-x-1 border border-white/5 bg-[#090a0c] p-1 rounded-xl w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider rounded-lg transition-all shrink-0 cursor-pointer ${
                statusFilter === 'all'
                  ? 'bg-white text-black font-semibold'
                  : 'text-white/40 hover:text-white/80'
              }`}
            >
              All Teams
            </button>
            <button
              onClick={() => setStatusFilter('recent')}
              className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider rounded-lg transition-all shrink-0 cursor-pointer flex items-center space-x-1 ${
                statusFilter === 'recent'
                  ? 'bg-accent-primary text-white font-semibold'
                  : 'text-white/40 hover:text-white/80'
              }`}
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Recently Added</span>
            </button>
            <button
              onClick={() => setStatusFilter('verified')}
              className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider rounded-lg transition-all shrink-0 cursor-pointer ${
                statusFilter === 'verified'
                  ? 'bg-white/10 text-white font-semibold'
                  : 'text-white/40 hover:text-white/80'
              }`}
            >
              Prior Verified
            </button>
          </div>
        </div>

        {/* Real-Time Table Data Grid */}
        <div className="mt-8 bg-gradient-to-b from-[#08090b] to-[#040506] border border-white/5 rounded-2xl overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]">
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.01]">
                  <th className="py-4 px-6 text-[10px] font-mono text-white/35 uppercase tracking-widest font-semibold">Priority Rank</th>
                  <th className="py-4 px-6 text-[10px] font-mono text-white/35 uppercase tracking-widest font-semibold">Company Entity</th>
                  <th className="py-4 px-6 text-[10px] font-mono text-white/35 uppercase tracking-widest font-semibold">Acredited Client</th>
                  <th className="py-4 px-6 text-[10px] font-mono text-white/35 uppercase tracking-widest font-semibold">Domain Target</th>
                  <th className="py-4 px-6 text-[10px] font-mono text-white/35 uppercase tracking-widest font-semibold">Enrolled Since</th>
                  <th className="py-4 px-6 text-[10px] font-mono text-white/35 uppercase tracking-widest font-semibold text-right">Authentication Status</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence initial={false}>
                  {sortedAndFilteredCompanies.length > 0 ? (
                    sortedAndFilteredCompanies.map((company, index) => (
                      <motion.tr
                        key={company.id}
                        initial={{ opacity: 0, y: 12, x: -4 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, y: -8, x: -4 }}
                        transition={{ 
                          duration: 0.35, 
                          ease: [0.16, 1, 0.3, 1],
                          delay: Math.min(index * 0.03, 0.4)
                        }}
                        className={`group transition-colors relative ${
                          index !== 0 ? 'border-b border-white/5' : ''
                        } ${
                          company.isRecent 
                            ? 'bg-[#0068ff]/5 hover:bg-[#0068ff]/10 border-l-[3px] border-accent-primary' 
                            : 'hover:bg-white/[0.02]'
                        }`}
                      >
                        {/* Queue rank element */}
                        <td className="py-4.5 px-6">
                          <div className="flex items-center space-x-2">
                            {company.isRecent ? (
                              <div className="flex items-center space-x-1">
                                <span className="text-[10px] font-mono text-accent-primary font-bold pl-0.5">#01</span>
                                <span className="bg-accent-primary/20 text-[#00a6ff] text-[8px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded leading-none flex items-center">
                                  <Zap className="w-2 h-2 text-accent-primary mr-0.5 fill-accent-primary" />
                                  <span>TOP PINS</span>
                                </span>
                              </div>
                            ) : (
                              <span className="font-mono text-xs text-white/30">
                                #{String(index + 1).padStart(2, '0')}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Company Detail with building icon */}
                        <td className="py-4.5 px-6 font-medium text-white">
                          <div className="flex items-center space-x-2.5">
                            <span className={`p-1.5 rounded-lg border ${
                              company.isRecent 
                                ? 'bg-accent-primary/10 border-accent-primary/30 text-accent-primary'
                                : 'bg-white/5 border-white/5 text-white/40'
                            }`}>
                              <Building2 className="w-3.5 h-3.5" />
                            </span>
                            <span className="font-sans text-xs tracking-tight uppercase group-hover:text-accent-primary transition-colors">
                              {company.companyName}
                            </span>
                          </div>
                        </td>

                        {/* Client Full Name */}
                        <td className="py-4.5 px-6">
                          <div className="flex items-center space-x-2 select-none">
                            <User className="w-3.5 h-3.5 text-white/30 shrink-0" />
                            <span className={`font-sans text-xs ${
                              company.isRecent ? 'text-white font-semibold' : 'text-text-secondary'
                            }`}>
                              {company.clientName}
                            </span>
                            {company.isRecent && (
                              <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/20 border border-emerald-500/20 px-1.5 py-0.5 rounded uppercase leading-none">
                                Your Submission
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Domain Email */}
                        <td className="py-4.5 px-6 font-mono text-xs text-white/40">
                          <div className="flex items-center space-x-2">
                            <Mail className="w-3 h-3 text-white/20" />
                            <span>{company.email}</span>
                          </div>
                        </td>

                        {/* Date Added */}
                        <td className="py-4.5 px-6 font-mono text-xs text-white/45">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-3 h-3 text-white/25" />
                            <span>
                              {new Date(company.addedAt).toLocaleDateString(undefined, {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                        </td>

                        {/* Right side status flag */}
                        <td className="py-4.5 px-6 text-right">
                          <div className="inline-flex items-center space-x-1.5 bg-emerald-950/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                              {company.isRecent ? 'VERIFYING LATENCY' : 'QUEUE VERIFIED'}
                            </span>
                          </div>
                        </td>

                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-20 text-center">
                        <div className="max-w-sm mx-auto space-y-3">
                          <div className="w-12 h-12 bg-white/5 border border-white/5 rounded-full flex items-center justify-center mx-auto text-white/20">
                            <Bookmark className="w-5 h-5" />
                          </div>
                          <p className="font-mono text-xs text-white/30 uppercase">
                            No match identified in the priority log queue
                          </p>
                          <button
                            onClick={() => { setSearchQuery(''); setStatusFilter('all'); }}
                            className="text-xs text-[#0068ff] hover:underline font-mono"
                          >
                            Reset filters
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Table footer telemetry indicators */}
          <div className="border-t border-white/5 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-white/20 select-none bg-black/40">
            <div className="flex items-center space-x-4">
              <span>LEDGER SEQUENCE: #0045-DELTA</span>
              <span>•</span>
              <span>SYNCHRONIZED METADATA STREAM</span>
            </div>
            <div>
              <span>SECURE ACCESS ENFORCED BY PULSEIQ AUTH</span>
            </div>
          </div>

        </div>

        {/* CTA Return Section */}
        <div className="mt-12 text-center">
          <button
            onClick={onBackToLanding}
            className="inline-flex items-center space-x-2 bg-white/5 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-widest px-6 py-3 border border-white/10 rounded-xl transition-all cursor-pointer"
          >
            <span>← RETURN TO CALIBRATION HUBS</span>
            <ChevronRight className="w-4 h-4 text-white shrink-0 rotate-180" />
          </button>
        </div>

      </div>
    </section>
  );
}
