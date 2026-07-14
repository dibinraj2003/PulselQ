/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, Activity, Users, Award, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function StatsBar() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const stats = [
    { 
      value: '99.4%', 
      label: 'FORECAST ACCURACY', 
      sub: 'Verified by Back-testing',
      kpi: 'MAPE Forecast Precision',
      desc: 'Reflects historical mean absolute percentage error across our simulated high-volume merchant runs.'
    },
    { 
      value: '23%', 
      label: 'CHURN RISK REDUCED', 
      sub: 'Detected in Active Runs',
      kpi: 'Avoided Retention Attrition',
      desc: 'Predictive cohort behavioral indicators warning of structural revenue leaks before client offboarding triggers.'
    },
    { 
      value: '90-DAY', 
      label: 'REVENUE FORECAST', 
      sub: 'Forward Horizon Scope',
      kpi: 'Forecast Convergence Window',
      desc: 'Sequential time-series forecasting mapping total enterprise valuation metrics inside a 90-day predictive horizon.'
    },
  ];

  const mockLogos = [
    { name: 'Stripe', desc: 'Billing Ledger' },
    { name: 'Salesforce', desc: 'Operations CRM' },
    { name: 'HubSpot', desc: 'Hub Telemetry' },
    { name: 'CSV Imports', desc: 'Local Imports' },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -50,
      scale: 0.94,
      rotateY: -12
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        type: 'spring',
        damping: 22,
        stiffness: 90,
        mass: 1.1
      }
    }
  };

  return (
    <div className="w-full bg-[#060606] border-y border-white/12 relative z-10 overflow-hidden" style={{ perspective: '1000px' }}>
      
      {/* Decorative vertical grid line bindings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Row 1: Massive Editorial Stats */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-5% 0px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-border-default py-8 border-b border-border-subtle"
        >
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className={`p-6 md:px-8 space-y-1 relative group cursor-help select-none focus:outline-none focus:ring-1 focus:ring-accent-primary/30 rounded-lg ${idx === 1 ? 'text-center' : idx === 2 ? 'text-right' : 'text-left'}`}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              onTouchStart={() => setHoveredIdx(idx)}
              onTouchEnd={() => setHoveredIdx(null)}
              onFocus={() => setHoveredIdx(idx)}
              onBlur={() => setHoveredIdx(null)}
              tabIndex={0}
            >
              <div className="text-4xl lg:text-5xl font-display font-light tracking-tight text-text-primary">
                {stat.value}
              </div>
              <div className={`font-mono text-xs text-text-primary tracking-wide font-medium flex items-center gap-1.5 ${idx === 1 ? 'justify-center' : idx === 2 ? 'justify-end' : 'justify-start'}`}>
                <span>{stat.label}</span>
                <Info className="w-3 h-3 text-text-secondary/65 group-hover:text-accent-primary group-hover:scale-110 transition-all duration-200" />
              </div>
              <div className="font-sans text-[11px] text-text-secondary leading-normal">
                {stat.sub}
              </div>

              {/* Hover-activated tooltip with smooth Framer Motion transition */}
              <AnimatePresence>
                {hoveredIdx === idx && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-72 top-full mt-3 bg-[#0C0C0C]/95 backdrop-blur-md border border-white/10 p-4 rounded-lg shadow-[0_12px_40px_rgba(0,0,0,0.6)] z-30 text-left pointer-events-none"
                  >
                    <div className="font-mono text-[9px] text-accent-primary font-bold uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-primary" />
                      {stat.kpi}
                    </div>
                    <p className="font-sans text-[11px] text-text-primary/95 leading-relaxed font-light">
                      {stat.desc}
                    </p>
                    {/* Small arrow pointing up */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-white/10" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Row 2: Credibility / Social Proof / Quote - Screen 5 / Screen 1 */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-5% 0px" }}
          transition={{ type: 'spring', damping: 25, stiffness: 70, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6"
        >
          
          {/* Logo cloud - Generic Beautiful typography based SaaS labels */}
          <div className="lg:col-span-5 space-y-2.5">
            <span className="font-mono text-[9px] text-text-secondary tracking-widest block uppercase">
              CONNECTS WITH:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {mockLogos.map((logo, idx) => (
                <div 
                  key={idx} 
                  className="bg-bg-elevated/40 hover:bg-bg-elevated border border-border-subtle hover:border-border-default px-2.5 py-2 rounded text-center transition-all group overflow-hidden"
                >
                  <span className="font-display text-[11px] sm:text-xs font-extrabold tracking-wider text-[#6B6E72] group-hover:text-accent-primary transition-colors block whitespace-nowrap">
                    {logo.name}
                  </span>
                  <span className="block text-[8px] font-mono text-text-muted mt-0.5 truncate">
                    {logo.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Center Column - Divider Line */}
          <div className="hidden lg:block lg:col-span-1 h-12 w-px bg-border-default mx-auto" />

          {/* Right Column - Fictional Advisor / Tester Quote */}
          <div className="lg:col-span-6 text-left space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-4 py-[5px] bg-accent-primary/15 text-accent-primary border border-accent-primary/20 rounded font-mono text-[14px] leading-[13.5px] font-bold">
                EARLY ACCESS TESTING ADVISORY
              </span>
            </div>
            
            <p className="font-sans text-[14px] text-text-secondary leading-relaxed">
              Customer activity suggests strong revenue growth next quarter. Monitor 3 accounts with elevated churn risk.
            </p>
            
            <div className="font-mono text-[10px] text-text-primary capitalize flex items-center space-x-1">
              <span className="w-1.5 h-1.5 bg-white rounded-full inline-block" />
              <span className="text-[12px]">Sarah C. &mdash; Chief Revenue Officer, Simulated Run Model</span>
            </div>
          </div>

        </motion.div>

      </div>
    </div>
  );
}
