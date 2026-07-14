/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Calendar, AlertTriangle, TrendingDown, Hourglass } from 'lucide-react';
import { motion } from 'motion/react';

export default function ProblemSection() {
  const problems = [
    {
      id: '01',
      label: 'CUSTOMER RISK',
      title: 'Churn Risks Go Unnoticed',
      desc: "Many customers show warning signs weeks before they cancel. Most teams don't see those signals until it's too late.",
      impact: 'Revenue drops unexpectedly',
      icon: AlertTriangle
    },
    {
      id: '02',
      label: 'DATA OPERATIONS',
      title: 'Too Much Time Spent on Reports',
      desc: "Teams waste hours combining data from spreadsheets, CRM tools, and billing systems just to understand what's happening.",
      impact: 'Up to 3 days lost every month',
      icon: Hourglass
    },
    {
      id: '03',
      label: 'FORECASTING',
      title: 'You Only See Problems After They Happen',
      desc: 'Traditional business intelligence shows you MRR that failed yesterday. It does not predict subscriber health metrics, credit-card decay vectors, or early usage contractions.',
      impact: 'Reactive instead of proactive',
      icon: TrendingDown
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.18
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 80,
      rotateX: 18,
      rotateY: -6,
      scale: 0.93,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 22,
        stiffness: 70,
        mass: 1.2
      }
    }
  };

  return (
    <section className="relative py-20 lg:py-32 border-b border-white/12 z-10 bg-[#06070A] overflow-hidden" style={{ perspective: '1200px' }}>
      
      {/* Cinematic Ambient Glow Grid */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 0.08, scale: 1.1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#0068ff] to-[#00bfff] rounded-full blur-[140px] pointer-events-none -z-10"
      />
      
      {/* Editorial Chapter Marker */}
      <div className="absolute top-0 left-4 sm:left-6 lg:left-8 py-2 pointer-events-none">
        <span className="font-mono text-[10px] text-text-secondary tracking-widest block font-medium">
          02 // PROBLEM VALIDATION
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main centered text block - Max width 720px */}
        <motion.div 
          initial={{ opacity: 0, y: 35, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[720px] mx-auto text-center space-y-4 mb-16 md:mb-24"
        >
          <span className="font-mono text-xs text-white tracking-widest font-bold block">
            THE RETRENCHMENT CYCLE IN SAAS
          </span>
          <h2 className="font-display font-light text-3xl sm:text-5xl lg:text-6xl text-text-primary tracking-tight leading-[1.05]">
            Most Business Problems Are Discovered Too Late
          </h2>
          <p className="font-sans text-sm sm:text-base text-white/40 max-w-xl mx-auto leading-relaxed font-light">
            Your dashboards tell you what already happened. PulseIQ helps you spot revenue risks and customer churn before they impact your business.
          </p>
        </motion.div>

        {/* Start stark 3-Column Problem Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {problems.map((prob) => {
            const Icon = prob.icon;
            return (
              <motion.div 
                key={prob.id}
                variants={cardVariants}
                className="bg-[#0C0C0C] border border-white/5 p-6 rounded-lg text-left relative flex flex-col justify-between group hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-200"
              >
                <div className="space-y-4">
                  {/* Card Editorial Index */}
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="font-mono text-xs text-white/30">
                      {prob.label}
                    </span>
                    <Icon className={`w-5 h-5 ${prob.id === '01' ? 'text-[#ffd500]' : prob.id === '02' ? 'text-[#0068ff]' : prob.id === '03' ? 'text-[#ff0000]' : 'text-white'} stroke-[1px]`} />
                  </div>

                  {/* Context block */}
                  <div className="space-y-2">
                    <h3 className={`font-display ${prob.id === '01' ? 'text-[18px] font-bold' : 'text-lg font-bold'} text-white tracking-tight`}>
                      {prob.title}
                    </h3>
                    <p className="font-sans text-[1rem] text-white/40 leading-relaxed font-light">
                      {prob.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Impact Indicator */}
                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-white/30 uppercase text-[9px]">EST. WASTED OVERHEAD:</span>
                  <span className="text-white bg-white/10 px-2.5 py-0.5 rounded border border-white/20 text-[10px] uppercase font-bold">
                    {prob.impact}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footnote statement */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="font-mono text-xs text-white/30">
            STILL AGGREGATING CSV FILES? THERE IS A SCIENTIFIC PATH FORWARD.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
