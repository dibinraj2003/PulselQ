/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calculator, ArrowRight, ShieldCheck, DollarSign, Award, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function RoiCalculator() {
  const [arr, setArr] = useState<number>(5000000); // 5M base ARR
  const [churn, setChurn] = useState<number>(8.5); // 8.5% annual churn
  const [acv, setAcv] = useState<number>(24000); // 24K ACV average contract value

  // Calculated values
  const totalAnnualLostArr = arr * (churn / 100);
  const totalLostContracts = Math.round(totalAnnualLostArr / acv);
  
  // PulseIQ recovers 45% of churned logo value as back-tested in simulations
  const predictedRecoveryPercent = 45;
  const pulseIQSavedDollarVal = totalAnnualLostArr * (predictedRecoveryPercent / 100);
  const pulseIQSavedContractsCount = Math.round(pulseIQSavedDollarVal / acv);
  
  // ROI ratio (hypothetical PulseIQ base pricing is $15k per year for Series A)
  const estPulsePricing = 18000;
  const netReturnMultiplier = pulseIQSavedDollarVal / estPulsePricing;

  const leftPanelVariants = {
    hidden: { 
      opacity: 0, 
      x: -60,
      rotateY: 15,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 24,
        stiffness: 70,
        mass: 1.1,
        delay: 0.1
      }
    }
  };

  const rightPanelVariants = {
    hidden: { 
      opacity: 0, 
      x: 60,
      rotateY: -15,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 24,
        stiffness: 70,
        mass: 1.1,
        delay: 0.2
      }
    }
  };

  return (
    <section className="relative py-16 lg:py-24 border-b border-border-default z-10 bg-[#0F1010]/20 overflow-hidden" style={{ perspective: '1200px' }}>
      
      {/* Chapter header */}
      <div className="absolute top-0 left-4 sm:left-6 lg:left-8 py-2 pointer-events-none">
        <span className="font-mono text-[10px] text-text-secondary tracking-widest block font-medium">
          DECISION MATH // FINANCIAL COGNITION MODEL
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center space-y-4 mb-16"
        >
          <span className="font-mono text-xs text-white tracking-widest font-bold uppercase">
            // ESTIMATE NET OPERATIONAL CAPITAL RECLAIMED //
          </span>
          <h2 className="font-display font-light text-3xl sm:text-5xl text-text-primary tracking-tight leading-[1.05]">
            Predict Your Saved <span className="text-white/20 font-light">Expansion Capital</span>
          </h2>
          <p className="font-sans text-sm text-white/40 max-w-xl mx-auto leading-relaxed font-light">
            Plug in your current enterprise scaling metrics to instantly map the revenue bleed holding back your team's valuation. Apply predictive monitoring to see saved contract values.
          </p>
        </motion.div>

        {/* Form panel splits */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
        >
          
          {/* Controls Input Grid (Column left 40%) */}
          <motion.div 
            variants={leftPanelVariants}
            className="lg:col-span-5 bg-[#0C0C0C] border border-white/5 rounded-lg p-6 flex flex-col justify-between space-y-6 text-left"
          >
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <span className="font-mono text-xs text-white font-semibold uppercase flex items-center">
                <Calculator className="w-4 h-4 text-white mr-1.5" />
                <span>INPUT CONTRACT CONFIG</span>
              </span>
              <span className="font-mono text-[9px] text-white/30">SYSTEM // RET_MTRX</span>
            </div>

            <div className="space-y-6">
              
              {/* ARR input */}
              <div className="space-y-2">
                <label className="flex justify-between text-xs font-mono text-white/40 uppercase">
                  <span>SaaS Annual Recurring Revenue (ARR)</span>
                  <span className="text-white font-medium font-mono">${arr.toLocaleString()}</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-white/30 font-mono text-xs">
                    $
                  </div>
                  <input
                    type="number"
                    value={arr}
                    onChange={(e) => setArr(Math.max(10000, Number(e.target.value)))}
                    className="w-full bg-[#050505] border border-white/5 rounded px-3 py-2.5 pl-8 text-xs font-mono text-white font-semibold focus:border-white outline-none"
                  />
                </div>
              </div>

              {/* Logo Churn rate % */}
              <div className="space-y-2">
                <label className="flex justify-between text-xs font-mono text-white/40 uppercase">
                  <span>Annual Logo Churn Rate</span>
                  <span className="text-white font-semibold font-mono">{churn}%</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="0.1"
                  value={churn}
                  onChange={(e) => setChurn(Number(e.target.value))}
                  className="w-full accent-white h-1 bg-white/5 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between font-mono text-[8px] text-white/20 pt-1">
                  <span>1.0% HEALTHY</span>
                  <span>15.0% DANGER</span>
                  <span>30.0% VOLATILE</span>
                </div>
              </div>

              {/* Total average contract value ACV */}
              <div className="space-y-2">
                <label className="flex justify-between text-xs font-mono text-white/40 uppercase">
                  <span>Average Contract ACV / yr</span>
                  <span className="text-white font-medium font-mono">${acv.toLocaleString()}</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-white/30 font-mono text-xs">
                    $
                  </div>
                  <input
                    type="number"
                    value={acv}
                    onChange={(e) => setAcv(Math.max(100, Number(e.target.value)))}
                    className="w-full bg-[#050505] border border-white/5 rounded px-3 py-2.5 pl-8 text-xs font-mono text-white focus:border-white outline-none"
                  />
                </div>
              </div>

            </div>

            <div className="p-3 bg-[#111111] border border-white/5 rounded text-[10px] font-mono text-white/30 leading-normal text-left">
              <span>* Computation accounts for default 45% mitigated attrition rate based on simulations. Actual result scopes may vary with client integration depths.</span>
            </div>
          </motion.div>

          {/* Results dashboard displays (Column right 60%) */}
          <motion.div 
            variants={rightPanelVariants}
            className="lg:col-span-7 flex flex-col justify-between space-y-6"
          >
            
            {/* Upper Results card panel (Loss metrics vs. Saved capital) */}
            <div className="bg-[#0C0C0C] border border-white/5 rounded-lg p-6 text-left flex flex-col justify-between h-full space-y-6">
              
              <div className="space-y-4">
                <span className="font-mono text-[9px] text-white/30 tracking-widest block font-medium uppercase">
                  // ANNUAL REVENUE LOSS ASSESSMENT INDICATOR
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Bleed column */}
                  <div className="bg-[#050505] p-4 rounded border border-white/5 relative overflow-hidden group hover:border-white/10 transition-all">
                    <span className="text-[10px] font-mono text-white/30 block">ANNUAL CAPITAL BLEED ARR</span>
                    <span className="text-2xl sm:text-3xl font-display font-light text-white block mt-1">
                      ${totalAnnualLostArr.toLocaleString(undefined, {maximumFractionDigits:0})}
                    </span>
                    <span className="text-[10.5px] font-mono text-white/20 mt-1.5 block">
                      Equivalent to {totalLostContracts} active customer contracts lost.
                    </span>
                  </div>

                  {/* Saved column */}
                  <div className="bg-[#050505] p-4 rounded border border-white/5 relative overflow-hidden group hover:border-white/30 transition-all">
                    <span className="text-[10px] font-mono text-white block font-semibold">// SECURED RECLAIM ARR</span>
                    <span className="text-2xl sm:text-3xl font-display font-light text-white block mt-1">
                      ${pulseIQSavedDollarVal.toLocaleString(undefined, {maximumFractionDigits:0})}
                    </span>
                    <span className="text-[10.5px] font-mono text-white/40 mt-1.5 block">
                      PulseIQ recovers {pulseIQSavedContractsCount} contracts annually.
                    </span>
                  </div>

                </div>
              </div>

              {/* Lower projection statement */}
              <div className="border-t border-white/5 pt-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div className="text-left">
                  <span className="text-[9px] font-mono text-white/30 block uppercase">PREDICTED RETURN ON INVESTMENT (ROI) Ratio</span>
                  <span className="text-xl font-display font-light text-white font-mono mt-0.5 block">
                    {netReturnMultiplier > 0 ? `${netReturnMultiplier.toFixed(1)}X Retainer Yield` : 'Calculating ROI...'}
                  </span>
                </div>

                <div className="flex items-center space-x-1.5 text-xs text-white/80 px-3 py-1.5 bg-white/10 border border-white/20 rounded font-mono font-semibold">
                  <ShieldCheck className="w-4 h-4 text-white" />
                  <span>SECURE VALUE SECURED</span>
                </div>
              </div>

            </div>

            {/* Bottom quick value highlight explanation */}
            <div className="bg-[#111111] border border-white/5 rounded-lg p-5 flex items-center justify-between text-left">
              <div>
                <span className="font-mono text-[9px] text-white block font-semibold uppercase">// PREDICTIVE ACTION VALUE MATRIX</span>
                <p className="font-sans text-xs text-white/40 mt-1 max-w-sm font-light">
                  Connecting PulseIQ recovers contracts at scale, increasing the average customer lifetime valuation (LTV) metric.
                </p>
              </div>

              <span className="font-mono text-sm text-white font-semibold whitespace-nowrap bg-[#050505] px-4 py-2 border border-white/5 rounded">
                +45% RECLAIM
              </span>
            </div>

          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}
