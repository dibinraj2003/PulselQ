/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Database, Cpu, LayoutList, CheckCircle2, RefreshCw, Send, Sparkles, Server, AlertTriangle, TrendingUp, ArrowRight, ShieldCheck, Lock } from 'lucide-react';

export default function HowItWorks() {
  // Step 1 interactive simulator state
  const [stripeConnected, setStripeConnected] = useState(true);
  const [salesforceConnected, setSalesforceConnected] = useState(true);
  const [connecting, setConnecting] = useState<string | null>(null);

  // Step 2 interactive state
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [isTraining, setIsTraining] = useState(false);
  const [selectedCohort, setSelectedCohort] = useState<'weekly' | 'monthly' | 'season'>('weekly');

  // Step 3 interactive state
  const [activeActionId, setActiveActionId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalHeight = containerRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      const stickyOffset = 120;
      const stickyHeight = 720;
      const scrollLength = totalHeight - stickyHeight - stickyOffset;
      if (scrollLength <= 0) return;
      
      // Calculate continuous progress relative to scroll anchor position
      const elementTop = rect.top + window.scrollY;
      const scrolled = window.scrollY - (elementTop - stickyOffset);
      const progress = Math.min(Math.max(scrolled / scrollLength, 0), 1);
      
      const entryDistance = viewportHeight > 0 ? viewportHeight + 100 : 900;

      // Define clear progressive timing segments without dead weight gaps
      const layer1Progress = Math.min(Math.max((progress - 0.05) / 0.40, 0), 1); // Card 2 entrance
      const layer2Progress = Math.min(Math.max((progress - 0.55) / 0.40, 0), 1); // Card 3 entrance

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        
        // Skip transform logic on small screens so they display normally in flow
        if (window.innerWidth < 1024) {
          card.style.transform = '';
          card.style.opacity = '';
          card.style.pointerEvents = 'auto';
          card.style.transition = '';
          return;
        }

        // Apply fast linear transition for physics-aligned scroll tracking
        card.style.transition = 'transform 0.1s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.15s linear';
        card.style.willChange = 'transform, opacity';

        if (index === 0) {
          // Card 1 stays completely locked and stationary relative to the stuck viewport,
          // but scales down gracefully when Card 2 and Card 3 stack on top.
          const scale = 1.0 - (layer1Progress * 0.03) - (layer2Progress * 0.03);
          
          card.style.transform = `translate3d(0, 0, 0) scale(${scale})`;
          card.style.opacity = '1';
          card.style.pointerEvents = 'auto';
          return;
        }

        if (index === 1) {
          // Card 2 slides up, stops completely at y=0, and then scales down when Card 3 stacks on top.
          const y = (1 - layer1Progress) * entryDistance;
          const scale = 1.0 - (layer2Progress * 0.03);
          
          card.style.transform = `translate3d(0, ${y}px, 0) scale(${scale})`;
          
          if (layer1Progress === 0) {
            card.style.opacity = '0';
            card.style.pointerEvents = 'none';
          } else {
            card.style.opacity = `${layer1Progress}`;
            card.style.pointerEvents = 'auto';
          }
          return;
        }

        if (index === 2) {
          // Card 3 slides up and stops completely at y=0 on top of the stacked deck.
          const y = (1 - layer2Progress) * entryDistance;
          card.style.transform = `translate3d(0, ${y}px, 0) scale(1)`;
          
          if (layer2Progress === 0) {
            card.style.opacity = '0';
            card.style.pointerEvents = 'none';
          } else {
            card.style.opacity = `${layer2Progress}`;
            card.style.pointerEvents = 'auto';
          }
          return;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    // Initial run
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [stripeConnected, salesforceConnected, connecting, trainingProgress, isTraining, selectedCohort, activeActionId]);

  // Handle mock connects
  const handleConnect = (service: 'stripe' | 'salesforce') => {
    if (service === 'stripe') {
      if (stripeConnected) {
        setStripeConnected(false);
      } else {
        setConnecting('stripe');
        setTimeout(() => {
          setStripeConnected(true);
          setConnecting(null);
        }, 1200);
      }
    }
    if (service === 'salesforce') {
      if (salesforceConnected) {
        setSalesforceConnected(false);
      } else {
        setConnecting('salesforce');
        setTimeout(() => {
          setSalesforceConnected(true);
          setConnecting(null);
        }, 1200);
      }
    }
  };

  // Handle mock training trigger
  const runModelTraining = () => {
    if (isTraining) return;
    setIsTraining(true);
    setTrainingProgress(0);
    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          return 100;
        }
        return prev + 20;
      });
    }, 200);
  };

  return (
    <section className="relative py-20 lg:py-32 border-b border-white/16 z-10 bg-gradient-to-b from-[#08090D] to-[#0C0D12]">
      
      {/* Editorial Chapter Marker */}
      <div className="absolute top-0 left-4 sm:left-6 lg:left-8 py-2 pointer-events-none">
        <span className="font-mono text-[10px] text-text-secondary tracking-widest block font-medium">
          03 // WORKFLOW DISCIPLINE
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-16 md:mb-24">
          <h2 className="font-display font-light text-4xl sm:text-6xl text-text-primary tracking-tight leading-[1.05]">
            Real-Time Cohort <span className="text-white/20 font-light">Forecast</span> Architecture
          </h2>
        </div>

        {/* Sticky Stacked Container */}
        <div ref={containerRef} className="relative h-auto lg:h-[300vh] mt-12 md:mt-20">
          <div className="relative w-full h-auto lg:sticky lg:top-[120px] lg:h-[720px] lg:overflow-hidden space-y-16 lg:space-y-0">
            
            {/* Step 1: Connect your stack */}
            <div 
              ref={el => { cardRefs.current[0] = el; }}
              className="lg:absolute lg:top-[20px] lg:left-0 lg:right-0 lg:w-full z-10 bg-[#070809]/95 backdrop-blur-md border border-white/[0.06] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.9)] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center hover:border-white/[0.12] transition-colors duration-300 lg:h-[580px]"
            >
            
            {/* Step Left Copy Column */}
            <div className="lg:col-span-6 relative text-left bg-[#0d0d0d]">
              <div className="absolute top-[-5rem] left-0 font-mono font-black text-white/[0.02] select-none text-[8rem] sm:text-[10rem] leading-none -z-10">
                01
              </div>
              <div className="space-y-4 pt-4">
                <span className="font-mono text-xs text-accent-primary uppercase tracking-widest block font-semibold">
                  // TELEMETRY INGRESS
                </span>
                <h3 className="font-display font-light text-2xl sm:text-4xl text-text-primary">
                  Connect Your Business <span className="text-white/20 font-light">Data</span>
                </h3>
                <p className="font-sans text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Securely connect billing, customer, and sales data in minutes. PulseIQ unifies your data to power accurate forecasts and customer insights.
                </p>
                
                {/* Micro tech tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="bg-bg-elevated px-2.5 py-1 rounded text-[10px] font-mono text-text-secondary border border-border-subtle uppercase">Stripe API</span>
                  <span className="bg-bg-elevated px-2.5 py-1 rounded text-[10px] font-mono text-text-secondary border border-border-subtle uppercase">Salesforce Webhook</span>
                  <span className="bg-bg-elevated px-2.5 py-1 rounded text-[10px] font-mono text-text-secondary border border-border-subtle uppercase">Secure Sync TLS 1.3</span>
                </div>
              </div>
            </div>

            {/* Step Right Visual Simulator Widget */}
            <div className="lg:col-span-6">
              <div className="bg-gradient-to-br from-[#080809]/90 via-[#0a0a0c]/95 to-[#050506]/98 border border-white/[0.05] rounded-xl p-6 sm:p-7 text-left relative overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]">
                
                {/* Underneath Glowing Ambient Spot */}
                <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -top-12 -left-12 w-40 h-40 bg-[#635BFF]/5 rounded-full blur-2xl pointer-events-none" />

                <div className="space-y-5">
                  <span className="text-[10px] font-mono font-medium tracking-widest text-[#9CA3AF] uppercase block">
                    CONNECTED SOURCES
                  </span>
                  
                  {/* Connect Row Stripe */}
                  <div className="bg-[#050506]/90 p-4 rounded-xl border border-white/[0.04] hover:border-white/[0.08] transition-all duration-200 flex items-center justify-between gap-4">
                    <div className="flex items-center space-x-3.5">
                      <div className="w-11 h-11 rounded-lg bg-[#635BFF] flex items-center justify-center font-sans font-black text-white text-[20px] shadow-[0_4px_12px_rgba(99,91,255,0.25)] select-none shrink-0">
                        S
                      </div>
                      <div>
                        <span className="text-[14px] font-sans font-semibold text-white block leading-tight">Stripe Billing</span>
                        <span className="text-[12px] font-sans text-white/40 mt-1 block">Payments, subscriptions, invoices</span>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {stripeConnected ? (
                        <button
                          type="button"
                          onClick={() => handleConnect('stripe')}
                          disabled={connecting === 'stripe'}
                          className="text-[#10B981] bg-[#10B981]/5 px-3 py-1.5 rounded-full border border-[#10B981]/15 hover:border-[#10B981]/35 hover:bg-[#10B981]/10 text-[10px] font-mono font-bold leading-none tracking-wider flex items-center gap-1.5 transition-all select-none cursor-pointer"
                        >
                          <span>CONNECTED</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleConnect('stripe')}
                          disabled={connecting === 'stripe'}
                          className="px-3 py-1.5 font-mono text-[10px] rounded-full font-bold tracking-wider text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
                        >
                          {connecting === 'stripe' ? 'CONNECTING...' : 'CONNECT API'}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Connect Row Salesforce */}
                  <div className="bg-[#050506]/90 p-4 rounded-xl border border-white/[0.04] hover:border-white/[0.08] transition-all duration-200 flex items-center justify-between gap-4">
                    <div className="flex items-center space-x-3.5">
                      <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#00A1E0] to-[#0176D3] flex items-center justify-center text-white shadow-[0_4px_12px_rgba(0,161,224,0.25)] select-none shrink-0">
                        <svg viewBox="0 0 24 24" className="w-6.5 h-6.5 fill-current text-white" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19.1 11.2c-.3-1.6-1.5-2.8-3.1-3.2-.2-.8-.8-1.5-1.5-1.9-.8-.4-1.7-.5-2.5-.2C11 4.5 9 5.2 8 6.9c-1.3-.2-2.6.4-3.3 1.5-.7 1.1-.6 2.6.2 3.6-.9 0-1.8.5-2.3 1.3-.5.9-.5 2 0 2.9.5.8 1.4 1.3 2.3 1.3h14.2c1.3 0 2.4-.9 2.7-2.1.3-1.3-.3-2.6-1.3-3.3.3-.3.4-.6.3-.9z" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-[14px] font-sans font-semibold text-white block leading-tight">Salesforce CRM</span>
                        <span className="text-[12px] font-sans text-white/40 mt-1 block">Accounts, opportunities, contracts</span>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {salesforceConnected ? (
                        <button
                          type="button"
                          onClick={() => handleConnect('salesforce')}
                          disabled={connecting === 'salesforce'}
                          className="text-[#10B981] bg-[#10B981]/5 px-3 py-1.5 rounded-full border border-[#10B981]/15 hover:border-[#10B981]/35 hover:bg-[#10B981]/10 text-[10px] font-mono font-bold leading-none tracking-wider flex items-center gap-1.5 transition-all select-none cursor-pointer"
                        >
                          <span>CONNECTED</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleConnect('salesforce')}
                          disabled={connecting === 'salesforce'}
                          className="px-3 py-1.5 font-mono text-[10px] rounded-full font-bold tracking-wider text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
                        >
                          {connecting === 'salesforce' ? 'CONNECTING...' : 'CONNECT API'}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Encryption & Tunnel Status Secure Footer */}
                  <div className="flex justify-between items-center text-[11.5px] font-mono text-white/30 pt-1">
                    <div className="flex items-center text-[#10B981] font-sans font-medium">
                      <ShieldCheck className="w-4 h-4 text-[#10B981] mr-1.5 shrink-0" />
                      <span>Secure tunnel active</span>
                    </div>

                    <div className="flex items-center space-x-2 text-white/40">
                      <span>TLS 1.3 Encryption</span>
                      <div className="p-1 rounded bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] flex items-center justify-center shrink-0">
                        <Lock className="w-3 h-3" />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>

          {/* Step 2: PulseIQ Models */}
          <div 
            ref={el => { cardRefs.current[1] = el; }}
            className="lg:absolute lg:top-[60px] lg:left-0 lg:right-0 lg:w-full z-20 bg-[#080909]/95 backdrop-blur-md border border-white/[0.06] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.9)] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center hover:border-white/[0.12] transition-colors duration-300 lg:h-[580px]"
          >
            
            {/* Step Left Visual Simulator Widget */}
            <div className="lg:col-span-6 order-last lg:order-first">
              <div className="bg-gradient-to-br from-[#080809]/90 via-[#0a0a0c]/95 to-[#050506]/98 border border-white/[0.05] rounded-xl p-6 sm:p-7 text-left relative overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]">
                
                {/* Underneath Glowing Ambient Spot */}
                <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -top-12 -left-12 w-40 h-40 bg-[#635BFF]/5 rounded-full blur-2xl pointer-events-none" />

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-mono text-[10px] text-white/40 tracking-wider uppercase">PREDICTIVE STREAK TRAINING PANEL</h4>
                    <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase flex items-center bg-emerald-500/5 px-2.5 py-1 rounded border border-emerald-500/10">
                      <Sparkles className="w-3 h-3 text-emerald-400 mr-1 inline animate-spin" /> AI TRAINING
                    </span>
                  </div>

                  {/* Cohort selection */}
                  <div className="grid grid-cols-3 gap-2">
                    {([
                      { id: 'weekly', label: 'WEEKLY CYCLE' },
                      { id: 'monthly', label: 'MONTHLY BATCH' },
                      { id: 'season', label: 'SEASONAL BIAS' }
                    ] as const).map(item => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedCohort(item.id)}
                        className={`py-1.5 border px-1 text-center rounded font-mono text-[9.5px] transition-all cursor-pointer ${
                          selectedCohort === item.id 
                            ? 'border-emerald-500/50 text-emerald-400 bg-emerald-500/5 shadow-[0_0_12px_rgba(16,185,129,0.1)]' 
                            : 'border-white/5 text-white/40 hover:text-white'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  {/* Training Visual progress block */}
                  <div className="bg-[#050505]/95 p-4 rounded border border-white/5 text-center space-y-4">
                    <div className="flex justify-between items-center font-mono text-[10px] text-white/40">
                      <span>COHORT HISTORICAL SCOPE:</span>
                      <span className="text-white">1,400+ SEGMENT PATHS</span>
                    </div>

                    {/* Radial progress simulator or bar */}
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className={`text-[9.5px] font-mono inline-block py-1 px-2 uppercase rounded-full font-bold ${
                            isTraining 
                              ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' 
                              : trainingProgress === 100 
                                ? 'text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.05)]' 
                                : 'text-white bg-white/10'
                          }`}>
                            {isTraining ? 'TUNING PARAMETERS...' : trainingProgress === 100 ? 'CONVERGED SUCCESS' : 'MODEL IDLE'}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold font-mono text-emerald-400">
                            {trainingProgress}%
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-[#111111] border border-white/5">
                        <div 
                          style={{ width: `${trainingProgress}%` }} 
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-emerald-500 to-[#10B981] shadow-[0_0_10px_rgba(16,185,129,0.3)] transition-all duration-300"
                        />
                      </div>
                    </div>

                    <button
                      onClick={runModelTraining}
                      disabled={isTraining}
                      className="w-full py-2.5 bg-[#111111] hover:bg-[#111111]/80 border border-white/5 hover:border-emerald-500/30 hover:text-emerald-400 text-white font-mono text-[10px] font-bold rounded-full tracking-widest flex items-center justify-center space-x-1.5 cursor-pointer transition-colors"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isTraining ? 'animate-spin text-emerald-400' : 'text-white'}`} />
                      <span>{trainingProgress === 100 ? 'RE-RUN FORECAST MODEL' : 'EXECUTE PREDICTION PASS'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Step Right Copy Column */}
            <div className="lg:col-span-6 relative text-left">
              <div className="absolute top-[-5rem] left-0 font-mono font-black text-white/[0.02] select-none text-[8rem] sm:text-[10rem] leading-none -z-10">
                02
              </div>
              <div className="space-y-4 pt-4">
                <span className="font-mono text-xs text-accent-primary uppercase tracking-widest block font-semibold">
                  // COHORT RETROSPECT COUPLING
                </span>
                <h3 className="font-display font-light text-2xl sm:text-4xl text-text-primary">
                  AI Predicts <span className="text-white/20 font-light">What's Next</span>
                </h3>
                <p className="font-sans text-xs sm:text-sm text-text-secondary leading-relaxed">
                  PulseIQ analyzes customer behavior, subscription history, and product usage to predict churn risk and uncover growth opportunities.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="bg-bg-elevated px-2.5 py-1 rounded text-[10px] font-mono text-text-secondary border border-border-subtle uppercase">Temporal Transformers</span>
                  <span className="bg-bg-elevated px-2.5 py-1 rounded text-[10px] font-mono text-text-secondary border border-border-subtle uppercase">Seasonality Isolation</span>
                  <span className="bg-bg-elevated px-2.5 py-1 rounded text-[10px] font-mono text-text-secondary border border-border-subtle uppercase">99.4% Back-Tested Proof</span>
                </div>
              </div>
            </div>

          </div>

          {/* Step 3: Actionable Insights */}
          <div 
            ref={el => { cardRefs.current[2] = el; }}
            className="lg:absolute lg:top-[100px] lg:left-0 lg:right-0 lg:w-full z-30 bg-[#070809]/95 backdrop-blur-md border border-white/[0.06] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.9)] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center hover:border-white/[0.12] transition-colors duration-300 lg:h-[580px]"
          >
            
            {/* Step Left Copy Column */}
            <div className="lg:col-span-6 relative text-left">
              <div className="absolute top-[-5rem] left-0 font-mono font-black text-white/[0.02] select-none text-[8rem] sm:text-[10rem] leading-none -z-10">
                03
              </div>
              <div className="space-y-4 pt-4">
                <span className="font-mono text-xs text-accent-primary uppercase tracking-widest block font-semibold">
                  // ACTIONABLE COHORT FEED
                </span>
                <h3 className="font-display font-light text-2xl sm:text-4xl text-text-primary">
                  Get Actionable <span className="text-white/20 font-light">Recommendations</span>
                </h3>
                <p className="font-sans text-xs sm:text-sm text-text-secondary leading-relaxed font-light">
                  Receive real-time alerts for at-risk customers and identify expansion opportunities so you can take action early and protect revenue.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="bg-bg-elevated px-2.5 py-1 rounded text-[10px] font-mono text-text-secondary border border-border-subtle uppercase">Slack Warnings</span>
                  <span className="bg-bg-elevated px-2.5 py-1 rounded text-[10px] font-mono text-text-secondary border border-border-subtle uppercase">Zapier Inbound Webhooks</span>
                  <span className="bg-bg-elevated px-2.5 py-1 rounded text-[10px] font-mono text-text-secondary border border-border-subtle uppercase">Pre-Emptive CS Outreach</span>
                </div>
              </div>
            </div>

            {/* Step Right Visual Simulator Widget */}
            <div className="lg:col-span-6">
              <div className="bg-gradient-to-br from-[#080809]/90 via-[#0a0a0c]/95 to-[#050506]/98 border border-white/[0.05] rounded-xl p-6 sm:p-7 text-left relative overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]">
                
                {/* Underneath Glowing Ambient Spot */}
                <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -top-12 -left-12 w-40 h-40 bg-[#635BFF]/5 rounded-full blur-2xl pointer-events-none" />

                <div className="space-y-4">
                  <h4 className="font-mono text-[10px] text-white/40 tracking-wider uppercase">REAL-TIME RECOMMENDATIONS</h4>

                  {/* Alert Card item 1 */}
                  <div 
                    onClick={() => setActiveActionId('1')}
                    className={`p-5 rounded-lg border transition-all cursor-pointer bg-[#0F0606] border-[#421616]/70 hover:border-[#7c2d2d] hover:bg-[#150a0a]/90 ${
                      activeActionId === '1' 
                        ? 'ring-1 ring-[#ff4a4a]/40 shadow-[0_0_20px_rgba(239,68,68,0.12)] translate-x-1' 
                        : ''
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2 text-[#ff4a4a]">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="font-sans font-semibold text-xs tracking-wide">High Churn Risk</span>
                      </div>
                      <span className="font-mono text-[10px] text-[#ff4a4a] bg-[#ff4a4a]/10 border border-[#ff4a4a]/20 px-2 py-0.5 rounded font-bold tracking-wider">
                        89% RISK
                      </span>
                    </div>

                    <h5 className="font-sans text-base font-semibold text-white mt-3">Enterprise Account: Codery Labs</h5>
                    
                    <ul className="mt-3 space-y-1.5 text-xs text-white/50 font-sans pl-1 list-none">
                      <li className="flex items-start space-x-2">
                        <span className="text-white/30 font-semibold select-none">•</span>
                        <span>Product usage dropped 42% (Wow)</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-white/30 font-semibold select-none">•</span>
                        <span>Renewal in 18 days</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-white/30 font-semibold select-none">•</span>
                        <span>Decreased engagement from key users</span>
                      </li>
                    </ul>

                    <div className="mt-5 flex justify-between items-center">
                      <button className="px-3 py-1.5 bg-[#1B1B1B]/85 hover:bg-[#262626] border border-white/5 hover:border-white/10 rounded text-xs font-sans text-white/90 transition-colors cursor-pointer">
                        View Account
                      </button>
                      <button className="text-[#ff4a4a] hover:text-[#ff3e3e] flex items-center space-x-1 text-xs font-semibold transition-all cursor-pointer bg-transparent border-none p-0">
                        <span>Take Action</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Alert Card item 2 */}
                  <div 
                    onClick={() => setActiveActionId('2')}
                    className={`p-5 rounded-lg border transition-all cursor-pointer bg-gradient-to-br from-[#050D08] to-[#091C11] border-emerald-500/30 hover:border-emerald-500/60 hover:from-[#08150d] hover:to-[#0f2d1b] ${
                      activeActionId === '2' 
                        ? 'ring-1 ring-emerald-400/40 shadow-[0_0_25px_rgba(16,185,129,0.2)] translate-x-1' 
                        : 'shadow-[0_4px_12px_rgba(0,0,0,0.2)]'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2 text-emerald-400">
                        <TrendingUp className="w-4 h-4 animate-bounce" />
                        <span className="font-sans font-bold text-xs tracking-wide">Expansion Opportunity</span>
                      </div>
                      <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded font-bold tracking-wider shadow-[0_0_10px_rgba(16,185,129,0.15)] flex items-center gap-1">
                        <span>+35% ARR</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      </span>
                    </div>

                    <h5 className="font-sans text-base font-semibold text-white mt-3">Growth Account: SwiftPay Systems</h5>
                    
                    <ul className="mt-3 space-y-1.5 text-xs text-emerald-200/60 font-sans pl-1 list-none">
                      <li className="flex items-start space-x-2">
                        <strong className="text-emerald-400/80 font-bold select-none">•</strong>
                        <span>Usage growth of <strong className="text-emerald-300 font-semibold">68%</strong> (MoM)</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <strong className="text-emerald-400/80 font-bold select-none">•</strong>
                        <span><strong className="text-emerald-300 font-semibold">82%</strong> feature adoption rate</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <strong className="text-emerald-400/80 font-bold select-none">•</strong>
                        <span>Highly recommended for <strong className="text-emerald-300 font-semibold">Premium tier upgrade</strong></span>
                      </li>
                    </ul>

                    <div className="mt-5 flex justify-between items-center">
                      <button className="px-3 py-1.5 bg-white/5 hover:bg-emerald-500/10 border border-white/5 hover:border-emerald-500/20 rounded text-xs font-sans text-white/90 transition-colors cursor-pointer">
                        View Account
                      </button>
                      <button className="text-emerald-400 hover:text-emerald-300 flex items-center space-x-1.5 text-xs font-bold transition-all cursor-pointer bg-transparent border-none p-0 group">
                        <span>Create Playbook</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>

        </div> {/* Viewport container closure */}
      </div> {/* Sticky stack wrapper closure */}

      </div>
    </section>
  );
}
