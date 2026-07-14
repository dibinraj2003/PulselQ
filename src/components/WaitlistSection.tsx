/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Ticket, 
  Building2, 
  User, 
  Sparkles, 
  AlertCircle, 
  Activity, 
  Terminal,
  Server,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WaitlistRecord } from '../types';

interface WaitlistSectionProps {
  onAddCompany?: (companyName: string, clientName: string, email: string) => void;
}

export default function WaitlistSection({ onAddCompany }: WaitlistSectionProps) {
  const [email, setEmail] = useState('');
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [arrRange, setArrRange] = useState('');
  const [role, setRole] = useState('');
  
  // Interactive Validation & UX States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitPhase, setSubmitPhase] = useState<'idle' | 'validating' | 'encrypting' | 'securing'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successRecord, setSuccessRecord] = useState<WaitlistRecord | null>(null);
  const [waitlistCount, setWaitlistCount] = useState<number>(311);
  const [slotsLeft, setSlotsLeft] = useState<number>(14);

  // Micro-validation on the fly helper
  const isPersonalDomain = (emailVal: string) => {
    if (!emailVal.includes('@')) return false;
    const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com', 'icloud.com'];
    const domain = emailVal.split('@')[1]?.toLowerCase();
    return personalDomains.includes(domain);
  };

  const isEmailValid = (emailVal: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailVal);
  };

  // Simulate real-time ticking metrics for high credibility UX
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly fluctuation of stats or slot decay
      setWaitlistCount(prev => prev + (Math.random() > 0.82 ? 1 : 0));
      if (Math.random() > 0.96) {
        setSlotsLeft(prev => Math.max(3, prev - 1));
      }
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email || !companyName || !clientName || !arrRange || !role) {
      setErrorMsg('All calibration values are required to define integration tiers.');
      return;
    }

    if (!isEmailValid(email)) {
      setErrorMsg('Please submit a valid enterprise email format.');
      return;
    }

    if (isPersonalDomain(email)) {
      setErrorMsg('PulseIQ requires an enterprise work domain. Personal emails are restricted for security calibration.');
      return;
    }

    // Trigger multi-phase validation submission sequence for incredible interface feedback
    setIsSubmitting(true);
    setSubmitPhase('validating');

    setTimeout(() => {
      setSubmitPhase('encrypting');
      setTimeout(() => {
        setSubmitPhase('securing');
        setTimeout(() => {
          const randomTicketNum = Math.floor(1000 + Math.random() * 9000);
          const ticketStr = `PULSE-X${randomTicketNum}`;

          const newRecord: WaitlistRecord = {
            email,
            companyName,
            arrRange,
            role,
            ticketId: ticketStr,
            signupDate: new Date().toISOString()
          };

          setSuccessRecord(newRecord);
          if (onAddCompany) {
            onAddCompany(companyName, clientName, email);
          }
          setWaitlistCount(prev => prev + 1);
          setSlotsLeft(prev => Math.max(2, prev - 1));
          setIsSubmitting(false);
          setSubmitPhase('idle');
        }, 8000 / 10); // rapid nice workflow
      }, 700);
    }, 600);
  };

  return (
    <section id="waitlist-signup-anchor" className="relative py-28 lg:py-40 border-y border-white/12 overflow-hidden z-10 bg-gradient-to-b from-[#06070A] via-[#08090F] to-[#050608]">
      
      {/* Absolute Ambient Background Lights to make the design incredibly luxury & premium */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-br from-[#0068ff]/10 to-emerald-500/5 rounded-full blur-[140px] pointer-events-none opacity-60" />
      <div className="absolute -bottom-12 right-0 w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none opacity-40" />

      {/* Chapter header */}
      <div className="absolute top-0 left-4 sm:left-6 lg:left-8 py-3 pointer-events-none border-l border-white/5 pl-4 mt-8 sm:mt-12">
        <span className="font-mono text-[10px] text-white/30 tracking-widest block font-medium uppercase">
          ✦ System Node // waitlist validation
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ perspective: '1200px' }}>
        
        {/* Two-Column Premium Layout */}
        <motion.div 
          initial={{ opacity: 0, y: 55, rotateX: 6, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{
            type: 'spring',
            damping: 24,
            stiffness: 65,
            mass: 1.15
          }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
          style={{ transformStyle: 'preserve-3d' }}
        >
          
          {/* Left Column: Vision & Cohort Telemetry Tracker */}
          <div className="lg:col-span-5 space-y-8 select-none">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#0068ff]/10 to-emerald-500/10 border border-[#0068ff]/20 px-3.5 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-[#0068ff] animate-pulse" />
              <span className="text-[10.5px] font-mono uppercase tracking-wider text-white font-medium">Cohort Delta Active Slots</span>
            </div>

            {/* Typography Heading */}
            <div className="space-y-4">
              <h2 className="font-sans font-light text-4xl sm:text-5xl text-white tracking-tight leading-[1.05] text-left">
                Secure Your Priority Slot In Our Queue
              </h2>
              <p className="font-sans text-sm sm:text-[15px] text-white/55 leading-relaxed font-light text-left">
                Early access quota allocation is calculated dynamically based on historical SaaS data profiles. Register your operational attributes to generate an authenticated PulseIQ Access Ticket.
              </p>
            </div>

            {/* Modern Interactive Progress Block (Cohort Capacity) */}
            <div className="bg-[#090A0C] border border-white/5 rounded-xl p-5 space-y-4">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-white/40 uppercase">Queue Reservation</span>
                <span className="text-emerald-400 font-bold flex items-center space-x-1.5 font-sans">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                  <span>{slotsLeft} Spaces Left</span>
                </span>
              </div>

              {/* Advanced UI Progress Meter */}
              <div className="space-y-2">
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-[1px]">
                  <motion.div 
                    initial={{ width: '0%' }}
                    animate={{ width: `${100 - (slotsLeft / 30) * 100}%` }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-[#0068ff] to-emerald-500 rounded-full"
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-white/20">
                  <span>CLASS DELTA COMPLETED</span>
                  <span>94.8% ALLOCATED</span>
                </div>
              </div>

              {/* Dynamic live statistics counters */}
              <div className="grid grid-cols-2 gap-3 border-t border-white/5 pt-4">
                <div>
                  <span className="text-[10px] font-mono text-white/30 uppercase block">Validated Teams</span>
                  <span className="font-sans text-xl font-semibold text-white tracking-tight">{waitlistCount}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-white/30 uppercase block">Avg Integration Duration</span>
                  <span className="font-sans text-xl font-semibold text-emerald-400 tracking-tight">&lt; 3 Min</span>
                </div>
              </div>
            </div>

            {/* Exclusive Program Highlights */}
            <div className="space-y-4 pt-2">
              <span className="text-[11px] font-mono text-white/30 uppercase tracking-widest block font-medium">✦ EXCLUSIVE COHORT INCLUSIONS</span>
              <ul className="space-y-3.5 text-[13.5px] text-white/70 font-sans font-light">
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0068ff] shrink-0 mt-0.5" />
                  <span>Fully-featured Stripe Integration Sandbox</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0068ff] shrink-0 mt-0.5" />
                  <span>Customizable real-time retention alert triggers</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0068ff] shrink-0 mt-0.5" />
                  <span>Locked-in historical launch platform pricing</span>
                </li>
              </ul>
            </div>

            {/* Trust Badges section */}
            <div className="pt-2 border-t border-white/5 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-mono text-white/25 select-none grayscale opacity-45">
              <span className="flex items-center space-x-1.5"><Server className="w-3.5 h-3.5" /> <span>STRIPE VERIFIED</span></span>
              <span className="flex items-center space-x-1.5"><ShieldCheck className="w-3.5 h-3.5" /> <span>AES-256 SECURED</span></span>
            </div>

          </div>

          {/* Right Column: Dynamic Form Block with AnimatePresence */}
          <div className="lg:col-span-7">
            
            <AnimatePresence mode="wait">
              {!successRecord ? (
                
                /* Active Glassmorphic Form Deck */
                <motion.form 
                  key="waitlist-active-form"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  onSubmit={handleSubmit}
                  className="bg-gradient-to-b from-[#0B0C0E] to-[#070809] border border-white/5 hover:border-white/10 p-6 sm:p-9 rounded-2xl text-left space-y-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] relative overflow-hidden group"
                >
                  {/* Subtle Top-Glow Bar decoration */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#0068ff] via-emerald-500 to-[#0068ff] opacity-40 group-hover:opacity-80 transition-opacity" />

                  {/* Restricted Secure Badge */}
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <div className="flex items-center space-x-2">
                      <Terminal className="w-3.5 h-3.5 text-[#0068ff]" />
                      <span className="font-mono text-[9.5px] text-[#0068ff] tracking-widest font-semibold uppercase">SECURE QUEUE REGISTRATION</span>
                    </div>
                    <div className="flex items-center space-x-1 font-mono text-[8.5px] text-white/30 bg-white/5 px-2 py-0.5 rounded">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>LIVE TELEMETRY ON</span>
                    </div>
                  </div>

                  {/* Work Email Input With Dynamic Verification */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-mono text-white/40 uppercase tracking-wider block font-medium">
                        Work Email Address
                      </label>
                      {email && (
                        <span className="font-mono text-[9px]">
                          {isPersonalDomain(email) ? (
                            <span className="text-amber-500 flex items-center space-x-1">
                              <ShieldAlert className="w-3 h-3" />
                              <span>Work address required</span>
                            </span>
                          ) : isEmailValid(email) ? (
                            <span className="text-emerald-400">✓ Eligible Domain</span>
                          ) : (
                            <span className="text-white/20">Awaiting Valid Format</span>
                          )}
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/25">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        placeholder="sarah@company.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errorMsg) setErrorMsg(null);
                        }}
                        disabled={isSubmitting}
                        className={`w-full bg-[#040506] border rounded-xl pl-10 pr-4 py-3 text-[13.5px] text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#0068ff]/20 transition-all font-sans font-light ${
                          email && isPersonalDomain(email)
                            ? 'border-amber-500/40 focus:border-amber-500' 
                            : 'border-white/5 focus:border-[#0068ff]/60'
                        }`}
                        required
                      />
                    </div>
                    {email && isPersonalDomain(email) && (
                      <p className="text-[10.5px] font-mono text-amber-500/80 leading-normal pl-1">
                        Please avoid standard consumer profiles (Gmail, Yahoo, iCloud). PulseIQ calibration requires business-owned email domains.
                      </p>
                    )}
                  </div>

                  {/* Client Name */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-white/40 uppercase tracking-wider block font-medium">Your Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/25">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        placeholder="Sarah Jenkins"
                        value={clientName}
                        onChange={(e) => {
                          setClientName(e.target.value);
                          if (errorMsg) setErrorMsg(null);
                        }}
                        disabled={isSubmitting}
                        className="w-full bg-[#040506] border border-white/5 rounded-xl pl-10 pr-4 py-3 text-[13.5px] text-white placeholder-white/20 focus:border-[#0068ff]/60 focus:ring-2 focus:ring-[#0068ff]/20 focus:outline-none transition-all font-sans font-light"
                        required
                      />
                    </div>
                  </div>

                  {/* Company Name */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-white/40 uppercase tracking-wider block font-medium">Company Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/25">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        placeholder="Acme Operations Corp"
                        value={companyName}
                        onChange={(e) => {
                          setCompanyName(e.target.value);
                          if (errorMsg) setErrorMsg(null);
                        }}
                        disabled={isSubmitting}
                        className="w-full bg-[#040506] border border-white/5 rounded-xl pl-10 pr-4 py-3 text-[13.5px] text-white placeholder-white/20 focus:border-[#0068ff]/60 focus:ring-2 focus:ring-[#0068ff]/20 focus:outline-none transition-all font-sans font-light"
                        required
                      />
                    </div>
                  </div>

                  {/* Double Parameter Selection grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* ARR Scope Selection */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-white/40 uppercase tracking-wider block font-medium">Estimated ARR Scope</label>
                      <div className="relative">
                        <select
                          value={arrRange}
                          onChange={(e) => {
                            setArrRange(e.target.value);
                            if (errorMsg) setErrorMsg(null);
                          }}
                          disabled={isSubmitting}
                          className="w-full bg-[#040506] border border-white/5 rounded-xl px-3.5 py-3 text-[13px] text-white focus:border-[#0068ff]/60 focus:ring-2 focus:ring-[#0068ff]/20 focus:outline-none cursor-pointer appearance-none font-sans font-light"
                          required
                        >
                          <option value="" disabled className="bg-[#0B0C0E]">Select Segment...</option>
                          <option value="<$500K" className="bg-[#0B0C0E]">&lt; $500K</option>
                          <option value="$500K–$2M" className="bg-[#0B0C0E]">$500K — $2M</option>
                          <option value="$2M–$10M" className="bg-[#0B0C0E]">$2M — $10M</option>
                          <option value="$10M+" className="bg-[#0B0C0E]">$10M + USD ARR</option>
                        </select>
                        <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-white/30">
                          <ChevronRight className="w-3.5 h-3.5 rotate-90" />
                        </div>
                      </div>
                    </div>

                    {/* Corporate Role */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-white/40 uppercase tracking-wider block font-medium">Your Operational Role</label>
                      <div className="relative">
                        <select
                          value={role}
                          onChange={(e) => {
                            setRole(e.target.value);
                            if (errorMsg) setErrorMsg(null);
                          }}
                          disabled={isSubmitting}
                          className="w-full bg-[#040506] border border-white/5 rounded-xl px-3.5 py-3 text-[13px] text-white focus:border-[#0068ff]/60 focus:ring-2 focus:ring-[#0068ff]/20 focus:outline-none cursor-pointer appearance-none font-sans font-light"
                          required
                        >
                          <option value="" disabled className="bg-[#0B0C0E]">Select Role...</option>
                          <option value="Founder/CEO" className="bg-[#0B0C0E]">CEO / Co-Founder</option>
                          <option value="VP Revenue" className="bg-[#0B0C0E]">VP Revenue / RevOps</option>
                          <option value="Head of CS" className="bg-[#0B0C0E]">CS Lead / Executive</option>
                          <option value="Other" className="bg-[#0B0C0E]">Other SaaS Lead</option>
                        </select>
                        <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-white/30">
                          <ChevronRight className="w-3.5 h-3.5 rotate-90" />
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Error Notification Block */}
                  {errorMsg && (
                    <motion.div 
                      initial={{ scale: 0.96, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="p-3.5 bg-red-950/20 border border-red-500/20 rounded-xl text-[11px] font-mono text-red-400 flex items-start space-x-2.5"
                    >
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <span>{errorMsg}</span>
                    </motion.div>
                  )}

                  {/* High Quality Active CTA Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full relative py-3.5 bg-white hover:bg-neutral-150 text-black font-sans text-xs font-semibold tracking-wider rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer outline-none select-none disabled:bg-white/10 disabled:text-neutral-500 overflow-hidden"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2 font-mono uppercase text-[10.5px]">
                        <Activity className="w-3.5 h-3.5 text-black animate-spin" />
                        <span>
                          {submitPhase === 'validating' && 'Verifying System Variable...'}
                          {submitPhase === 'encrypting' && 'Cryptographic Signing...'}
                          {submitPhase === 'securing' && 'Binding Secure Ticket...'}
                        </span>
                      </div>
                    ) : (
                      <>
                        <span className="font-mono text-xs uppercase tracking-widest">SECURE MY WAITLIST ACCREDITATION</span>
                        <ArrowRight className="w-4 h-4 text-black stroke-[2.5px]" />
                      </>
                    )}
                  </button>

                  {/* Footnote Compliance Disclaimer */}
                  <p className="text-center text-[10px] font-mono text-white/20 select-none">
                    No unsolicited marketing. Spots strictly allocated to certified B2B operators.
                  </p>

                </motion.form>
              ) : (
                
                /* Incredibly Stunning holographic developer pass receipt */
                <motion.div
                  key="waitlist-ticket-issued"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                  className="bg-gradient-to-b from-[#090D1A] to-[#04060E] border border-[#0068ff]/40 p-6 sm:p-8 rounded-2xl shadow-[0_30px_60px_-10px_rgba(0,104,255,0.4)] relative space-y-6 overflow-hidden text-left"
                >
                  {/* Hologram aesthetic overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0068ff]/10 via-transparent to-emerald-500/5 pointer-events-none select-none" />
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#0068ff]/15 rounded-full blur-2xl pointer-events-none" />

                  {/* Success Banner Title */}
                  <div className="border-b border-white/10 pb-4 relative z-10">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <span className="font-mono text-[9px] text-emerald-400 uppercase tracking-widest block font-bold">Registration Verification Passed // Queue Connected</span>
                        <h4 className="font-sans text-[20px] font-medium text-white tracking-tight">Access Token Verified</h4>
                      </div>
                    </div>
                  </div>

                  {/* Physical Pass Style Container */}
                  <div className="bg-[#050608] border border-white/5 rounded-xl overflow-hidden relative z-10">
                    
                    {/* Top Monospaced Information parameters */}
                    <div className="p-4 sm:p-5 space-y-3.5">
                      
                      {/* Virtual monospaced highlighted section */}
                      <div className="bg-[#0A0D15] border border-dashed border-[#0068ff]/30 p-4 rounded-lg flex items-center justify-between text-xs font-mono">
                        <div className="flex items-center space-x-2 text-white/50">
                          <Ticket className="w-3.5 h-3.5 text-[#0068ff]" />
                          <span className="uppercase text-[10.5px]">ALLOCATED ACCESS REQ STATUS:</span>
                        </div>
                        <span className="font-mono text-sm font-bold text-white tracking-wider flex items-center">
                          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse mr-2" />
                          {successRecord.ticketId}
                        </span>
                      </div>

                      {/* Decoded Telemetry variables logged list */}
                      <div className="space-y-2 text-xs font-mono">
                        <div className="flex justify-between border-b border-white/[0.02] pb-1.5">
                          <span className="text-white/35 uppercase">MAPPED COMPANY ENTITY:</span>
                          <span className="text-white font-semibold uppercase">{successRecord.companyName}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/[0.02] pb-1.5">
                          <span className="text-white/35 uppercase">BUSINESS REVENUE RANGE:</span>
                          <span className="text-white font-semibold">{successRecord.arrRange}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/[0.02] pb-1.5">
                          <span className="text-white/35 uppercase">REVENUE AUDIT SECTOR ID:</span>
                          <span className="text-white font-semibold uppercase">{successRecord.role}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/35 uppercase">REGISTRATION LATENCY SEC:</span>
                          <span className="text-emerald-400 font-semibold uppercase">SECURED INTEGRITY</span>
                        </div>
                      </div>

                    </div>

                    {/* Laser ticket tearing line */}
                    <div className="relative flex items-center justify-between px-3 h-4 select-none pointer-events-none">
                      <div className="w-3 h-4 rounded-r-full bg-[#050607] absolute -left-[1px] border-r border-[#0068ff]/20" />
                      <div className="w-full border-t border-dashed border-white/10 mx-5" />
                      <div className="w-3 h-4 rounded-l-full bg-[#050607] absolute -right-[1px] border-l border-[#0068ff]/20" />
                    </div>

                    {/* Barcode & Queue position telemetry segment */}
                    <div className="p-4 sm:p-5 bg-gradient-to-b from-transparent to-[#07090F] flex flex-col items-center text-center space-y-3.5">
                      
                      {/* Stylized generative mockup barcode */}
                      <div className="flex flex-col items-center justify-center space-y-1 select-none pointer-events-none">
                        <div className="flex space-x-[1.5px] items-end h-8">
                          {Array.from({ length: 42 }).map((_, idx) => {
                            const barWidth = idx % 3 === 0 ? 'w-1' : idx % 5 === 0 ? 'w-[2px]' : 'w-[0.75px]';
                            const opacityClass = idx % 7 === 0 ? 'opacity-30' : 'opacity-85';
                            return (
                              <div 
                                key={idx} 
                                className={`h-full bg-gradient-to-b from-[#0068ff] to-emerald-400 ${barWidth} ${opacityClass}`} 
                              />
                            );
                          })}
                        </div>
                        <span className="text-[9.5px] font-mono text-white/40 tracking-[6px] uppercase pl-1.5">
                          {successRecord.ticketId}
                        </span>
                      </div>

                      <div className="text-[12.5px] font-sans text-white/55 leading-relaxed font-light px-2">
                        System validation complete. Your security ticket has been dispatched to <strong className="text-white font-medium">{successRecord.email}</strong>. Our core calibration reps will coordinate next configuration steps soon.
                      </div>

                    </div>

                  </div>

                  {/* Return Navigation Anchor action link */}
                  <div className="text-center pt-1.5 z-10 relative">
                    <button 
                      onClick={() => {
                        setEmail('');
                        setClientName('');
                        setCompanyName('');
                        setArrRange('');
                        setRole('');
                        setSuccessRecord(null);
                      }}
                      className="inline-flex items-center text-[11px] font-mono text-[#0068ff] hover:text-[#0068ff]/80 font-bold uppercase tracking-wider cursor-pointer"
                    >
                      <span>← Register another validation team</span>
                    </button>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
