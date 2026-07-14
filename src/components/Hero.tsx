/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Lock, Sparkles, TrendingUp, UserCheck, Users, Clock, Shield, ArrowRight, AlertTriangle, AlertOctagon, AlertCircle, ChevronDown, ChevronRight } from 'lucide-react';
import { PageId } from '../types';
import { motion } from 'motion/react';
import { HoverButton } from '@/components/ui/hover-button';

interface HeroProps {
  onJoinWaitlistClick: () => void;
  setCurrentPage: (page: PageId) => void;
}

export default function Hero({ onJoinWaitlistClick, setCurrentPage }: HeroProps) {
  // Mini interactive state for the preview card to generate real engaging clicks!
  const [forecastHorizon, setForecastHorizon] = useState<30 | 60 | 90>(90);
  const [activeTab, setActiveTab] = useState<'FORECAST' | 'CHURN' | 'NRR'>('FORECAST');
  const [isTabOpen, setIsTabOpen] = useState(false);
  const [isHorizonOpen, setIsHorizonOpen] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const getTabColor = () => {
    switch (activeTab) {
      case 'CHURN': return '#EF4444'; // Rose Red
      case 'NRR': return '#3B82F6'; // Bright Blue
      case 'FORECAST':
      default: return '#10B981'; // Emerald Green
    }
  };

  // Bezier curves & vertices based on state
  let cvPath = "";
  let fillPath = "";
  let points: { x: number; y: number }[] = [];

  if (activeTab === 'FORECAST') {
    cvPath = "M 15 170 C 55 170, 90 10, 130 10 C 170 10, 205 60, 245 60 C 285 60, 320 10, 360 10 C 400 10, 435 170, 475 170 C 515 170, 550 85, 590 85";
    fillPath = "M 15 170 C 55 170, 90 10, 130 10 C 170 10, 205 60, 245 60 C 285 60, 320 10, 360 10 C 400 10, 435 170, 475 170 C 515 170, 550 85, 590 85 L 590 220 L 15 220 Z";
    points = [
      { x: 15, y: 170 },
      { x: 130, y: 10 },
      { x: 245, y: 60 },
      { x: 360, y: 10 },
      { x: 475, y: 170 },
      { x: 590, y: 85 }
    ];
  } else if (activeTab === 'CHURN') {
    cvPath = "M 15 25 C 80 30, 140 65, 200 80 C 260 95, 320 115, 380 125 C 440 135, 500 150, 590 160";
    fillPath = "M 15 25 C 80 30, 140 65, 200 80 C 260 95, 320 115, 380 125 C 440 135, 500 150, 590 160 L 590 220 L 15 220 Z";
    points = [
      { x: 15, y: 25 },
      { x: 140, y: 65 },
      { x: 200, y: 80 },
      { x: 320, y: 115 },
      { x: 440, y: 135 },
      { x: 590, y: 160 }
    ];
  } else {
    cvPath = "M 15 135 C 80 120, 140 90, 200 85 C 260 80, 320 60, 380 50 C 440 40, 500 20, 590 10";
    fillPath = "M 15 135 C 80 120, 140 90, 200 85 C 260 80, 320 60, 380 50 C 440 40, 500 20, 590 10 L 590 220 L 15 220 Z";
    points = [
      { x: 15, y: 135 },
      { x: 140, y: 90 },
      { x: 200, y: 85 },
      { x: 320, y: 60 },
      { x: 440, y: 40 },
      { x: 590, y: 10 }
    ];
  }

  const getYAxisTicks = () => {
    if (activeTab === 'FORECAST') {
      return [
        { top: '0%', label: '$265K' },
        { top: '14.29%', label: '$240K' },
        { top: '28.57%', label: '$215K' },
        { top: '42.86%', label: '$190K' },
        { top: '57.14%', label: '$165K' },
        { top: '71.43%', label: '$140K' },
        { top: '85.71%', label: '$115K' },
        { top: '100%', label: '$90K' }
      ];
    } else if (activeTab === 'CHURN') {
      return [
        { top: '0%', label: '-$6K' },
        { top: '14.29%', label: '-$9K' },
        { top: '28.57%', label: '-$12K' },
        { top: '42.86%', label: '-$15K' },
        { top: '57.14%', label: '-$18K' },
        { top: '71.43%', label: '-$21K' },
        { top: '85.71%', label: '-$24K' },
        { top: '100%', label: '-$27K' }
      ];
    } else {
      return [
        { top: '0%', label: '+$77K' },
        { top: '14.29%', label: '+$70K' },
        { top: '28.57%', label: '+$63K' },
        { top: '42.86%', label: '+$56K' },
        { top: '57.14%', label: '+$49K' },
        { top: '71.43%', label: '+$42K' },
        { top: '85.71%', label: '+$35K' },
        { top: '100%', label: '+$28K' }
      ];
    }
  };

  const getLabels = () => {
    if (activeTab === 'FORECAST') {
      return [
        { 
          text: 'Growth Opportunity', 
          style: { left: '8%', top: '2%' }, 
          pointerPath: 'M 105 10 L 130 10',
          dot: { x: 130, y: 10, color: '#10B981' },
          opacityClass: 'text-white/95 bg-[#0A0A0C]/95 border-white/10 hover:border-[#10B981]/30 transition-all duration-200' 
        },
        { 
          text: 'High Confidence', 
          style: { left: '46%', top: '2%' }, 
          pointerPath: 'M 330 10 L 360 10',
          dot: { x: 360, y: 10, color: '#0068ff' },
          opacityClass: 'text-white/95 bg-[#0A0A0C]/95 border-white/10 hover:border-[#0068ff]/30 transition-all duration-200' 
        },
        { 
          text: 'Potential Revenue Dip', 
          style: { left: '66%', top: '75%' }, 
          pointerPath: 'M 475 186 L 475 170',
          dot: { x: 475, y: 170, color: '#F59E0B' },
          opacityClass: 'text-[#F59E0B] bg-[#0A0A0C]/95 border-[#F59E0B]/35 hover:border-[#F59E0B]/60 transition-all duration-200' 
        }
      ];
    } else if (activeTab === 'CHURN') {
      return [
        { 
          text: 'At-Risk Customers', 
          style: { left: '8%', top: '5%' }, 
          pointerPath: 'M 110 30 L 140 65',
          dot: { x: 140, y: 65, color: '#EF4444' },
          opacityClass: 'text-[#EF4444]/95 bg-[#0A0A0C]/95 border-[#EF4444]/35 hover:border-[#EF4444]/60 font-bold transition-all duration-200',
          pulse: true
        },
        { 
          text: 'Retention Risk', 
          style: { left: '38%', top: '22%' }, 
          pointerPath: 'M 292 80 L 320 115',
          dot: { x: 320, y: 115, color: '#F59E0B' },
          opacityClass: 'text-[#F59E0B] bg-[#0A0A0C]/95 border-[#F59E0B]/25 hover:border-[#F59E0B]/40 transition-all duration-200' 
        },
        { 
          text: 'Healthy Accounts', 
          style: { left: '71%', top: '40%' }, 
          pointerPath: 'M 490 110 L 520 150',
          dot: { x: 520, y: 150, color: '#10B981' },
          opacityClass: 'text-[#10B981] bg-[#0A0A0C]/95 border-[#10B981]/25 hover:border-[#10B981]/40 transition-all duration-200' 
        }
      ];
    } else {
      return [
        { 
          text: 'Upsell Triggered', 
          style: { left: '8%', top: '15%' }, 
          pointerPath: 'M 115 50 L 140 90',
          dot: { x: 140, y: 90, color: '#3B82F6' },
          opacityClass: 'text-white/95 bg-[#0A0A0C]/95 border-white/10 hover:border-white/20 transition-all duration-200' 
        },
        { 
          text: 'Expansion Potential', 
          style: { left: '36%', top: '5%' }, 
          pointerPath: 'M 290 35 L 320 60',
          dot: { x: 320, y: 60, color: '#3B82F6' },
          pulse: true,
          opacityClass: 'text-[#3B82F6] bg-[#3B82F6]/10 border-[#3B82F6]/30 transition-all duration-200' 
        },
        { 
          text: 'Net Stable Base', 
          style: { left: '68%', top: '0%' }, 
          pointerPath: 'M 490 10 L 520 20',
          dot: { x: 520, y: 20, color: '#10B981' },
          opacityClass: 'text-white/80 bg-[#0C0C0C]/80 border-white/5 hover:border-white/10 font-normal transition-all duration-200' 
        }
      ];
    }
  };

  return (
    <section className="relative min-h-[85vh] py-12 md:py-20 lg:py-28 flex flex-col justify-center border-b border-white/10 z-10 bg-gradient-to-b from-[#05060A] via-[#07080D] to-[#040508]">
      
      {/* Structural Chapter Marker */}
      <div className="absolute top-0 left-4 sm:left-6 lg:left-8 py-2 pointer-events-none">
        <span className="font-mono text-[10px] text-text-secondary tracking-widest block font-medium">
          01 // OVERVIEW INTEL
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        {/* Row 1: Header Editorial Layout */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-white/14 pb-10"
        >
          <div className="space-y-5 max-w-[51rem] text-left">
            {/* System Status Pill */}
            <div className="inline-flex items-center space-x-2 self-start px-3.5 py-1.5 bg-[#0C0C0C] border border-white/5 rounded-full">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
              </span>
              <span className="font-mono text-[9px] tracking-widest text-white uppercase font-bold flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-white inline" />
                <span>99.4% Forecast Reliability Verified</span>
              </span>
            </div>

            <h1 
              className="font-display font-bold text-[60px] tracking-tight text-white w-full"
              style={{ lineHeight: '62px', fontSize: '60px' }}
            >
              Predict Tomorrow, Not Yesterday.
            </h1>
            
            <p className="font-sans text-sm sm:text-base text-white/40 w-full max-w-none font-light leading-relaxed">
              PulseIQ turns scattered Stripe signals, account logs, and contract data into one calm operating dashboard for executive leadership teams.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <HoverButton
                onClick={onJoinWaitlistClick}
                className="px-8 py-3.5 text-white font-sans text-xs font-bold tracking-[0.1em] uppercase rounded-full transition-all duration-150 flex items-center justify-center space-x-2 cursor-pointer shadow-lg bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/30"
              >
                <span className="text-white">Join Waitlist</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5px]" />
              </HoverButton>
              
              <button
                onClick={onJoinWaitlistClick}
                className="group px-8 py-3.5 bg-transparent hover:bg-white border border-white/20 hover:border-transparent text-white hover:text-black font-sans text-xs font-bold tracking-[0.1em] uppercase rounded-full transition-all duration-150 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span className="text-white group-hover:text-black transition-colors duration-150">Book a demo</span>
              </button>
            </div>
          </div>

          {/* Right link: Live operating layer indicator */}
          <div className="lg:text-right pb-1">
            <button
              onClick={onJoinWaitlistClick}
              className="inline-flex items-center space-x-2 text-xs font-mono text-white/60 hover:text-white transition-colors duration-200 group cursor-pointer"
            >
              <span>Live operating layer pulseiq.app/overview</span>
              <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Row 2: Master Command Dashboard Layout */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="pt-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#030303] border border-white/14 rounded-xl p-6 sm:p-8 relative overflow-hidden">
            
            {/* Ambient subtle dash grid overlay */}
            <div className="absolute -inset-2 border border-dashed border-white/14 rounded-xl pointer-events-none -z-10" />

            {/* 1. Left Panel (SYSTEM_NODE_ALPHA Identity, Density & MRR stats) */}
            <div className="lg:col-span-3 flex flex-col justify-between space-y-6 text-left border-b lg:border-b-0 lg:border-r border-white/5 pb-6 lg:pb-0 lg:pr-6">
              
              {/* System Metadata Identity header */}
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: getTabColor() }} />
                  <span className="font-mono text-[18px] tracking-widest text-white uppercase font-extrabold">
                    DEMO DASHBOARD
                  </span>
                </div>
                <span className="font-mono text-[14px] text-white/40 block">
                  0xAF92_SECURE_COMPUTE
                </span>
              </div>

              {/* Dynamic KPI Columns inside row */}
              <div className="space-y-4 pt-4">
                {/* Node Resources */}
                <div className="bg-[#0C0C0C] border border-white/5 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between items-center text-[14px] font-mono text-white/30 uppercase tracking-wider">
                    <span>
                      {activeTab === 'FORECAST' && 'Number of customer'}
                      {activeTab === 'CHURN' && 'CHURN_ACCOUNTS'}
                      {activeTab === 'NRR' && 'EXPANSION_COHORTS'}
                    </span>
                    <span className="text-green-400 font-mono text-[11px] font-bold bg-green-950 border border-green-900/30 px-1.5 py-0.5 rounded">ACTV</span>
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-display font-light text-white">
                      {activeTab === 'FORECAST' && '4,291'}
                      {activeTab === 'CHURN' && '18 Accounts'}
                      {activeTab === 'NRR' && '114.2% Rate'}
                    </span>
                  </div>
                  {/* Micro Sparkline */}
                  <div className="h-4 w-full">
                    <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                      <path d="M0,15 Q20,2 40,11 T80,5 T100,12" fill="none" stroke={getTabColor()} strokeOpacity="0.3" strokeWidth="1" />
                    </svg>
                  </div>
                </div>

                {/* Primary Flux / Revenue (ARR Values) */}
                <div className="bg-[#0C0C0C] border border-white/5 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between items-center text-[14px] font-mono text-white/30 uppercase tracking-wider">
                    <span>Current ARR and growth</span>
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-display font-light text-white">
                      {activeTab === 'FORECAST' && `$${(124.5 + (forecastHorizon * 0.42)).toFixed(1)}K`}
                      {activeTab === 'CHURN' && `-$${(12.4 + (forecastHorizon * 0.08)).toFixed(1)}K`}
                      {activeTab === 'NRR' && `+$${(48.2 + (forecastHorizon * 0.18)).toFixed(1)}K`}
                    </span>
                    <span className="text-[14px] font-mono font-bold" style={{ color: getTabColor() }}>
                      {activeTab === 'FORECAST' && `+${forecastHorizon === 30 ? '3.8%' : forecastHorizon === 60 ? '7.4%' : '11.8%'}`}
                      {activeTab === 'CHURN' && `-${forecastHorizon === 30 ? '1.2%' : forecastHorizon === 60 ? '2.4%' : '3.6%'}`}
                      {activeTab === 'NRR' && `+${forecastHorizon === 30 ? '4.1%' : forecastHorizon === 60 ? '8.2%' : '14.5%'}`}
                    </span>
                  </div>
                  {/* Micro Sparkline */}
                  <div className="h-4 w-full">
                    <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                      <path d="M0,18 Q15,4 35,16 T70,7 T100,2" fill="none" stroke={getTabColor()} strokeOpacity="0.4" strokeWidth="1" />
                    </svg>
                  </div>
                </div>

                {/* Operational Notes */}
                <div className="bg-[#0C0C0C] border border-white/5 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between items-center text-[14px] font-mono text-white/30 uppercase tracking-wider">
                    <span>Business Health Check</span>
                  </div>
                  <div className="text-[14px] font-sans text-white/60 leading-relaxed space-y-1 pt-1">
                    {activeTab === 'FORECAST' && (
                      <>
                        <p>• Model forecast convergence high (99.4%).</p>
                        <p>• Strong incoming Q4 pipelines detected.</p>
                      </>
                    )}
                    {activeTab === 'CHURN' && (
                      <>
                        <p>• Contained contraction within Seed tiers.</p>
                        <p>• 2 enterprise accounts flagged at high risk.</p>
                      </>
                    )}
                    {activeTab === 'NRR' && (
                      <>
                        <p>• Expansion driven by automatic seat upgrades.</p>
                        <p>• Trailing 12-Month NRR holds at 118.4%.</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

            </div>

            {/* 2. Center Panel (OSCILLATION.DELTA Projection Wave Graph) */}
            <div className="lg:col-span-6 flex flex-col justify-between text-left min-h-[420px] pb-6 lg:pb-0">
              
              {/* Graph Header: Title, controls, and main display canvas */}
              <div className="flex-grow flex flex-col justify-between">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-3">
                  <div className="space-y-1">
                    <h2 className="text-base text-white font-medium font-sans">
                      {activeTab === 'FORECAST' && 'Projected Forecast Horizons'}
                      {activeTab === 'CHURN' && 'Projected Cumulative Revenue Churn'}
                      {activeTab === 'NRR' && 'Net Revenue Retention Trajectory'}
                    </h2>
                    <span className="text-[14px] text-white/40 font-sans font-light block">
                      {activeTab === 'FORECAST' && 'showing future revenue trends for 90 days.'}
                      {activeTab === 'CHURN' && 'estimated loss and downgrades trajectory for 90 days.'}
                      {activeTab === 'NRR' && '90-day expansion & retention projection map.'}
                    </span>
                  </div>

                  {/* Replaced toggle buttons with elegant dropdown menus side-by-side */}
                  <div className="flex items-center space-x-2 self-start sm:self-center relative pt-1">
                    
                    {/* Time Horizon Dropdown */}
                    <div className="relative inline-block text-left">
                      <button
                        onClick={() => {
                          setIsHorizonOpen(!isHorizonOpen);
                          setIsTabOpen(false);
                        }}
                        className="px-3.5 py-1.5 bg-[#0C0C0D] border border-white/10 hover:border-white/20 rounded-full flex items-center space-x-1.5 text-[14px] font-sans text-white focus:outline-none transition-all duration-150 cursor-pointer select-none"
                      >
                        <span className="text-[8px] text-white/50">▼</span>
                        <span>{forecastHorizon}D</span>
                      </button>

                      {isHorizonOpen && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setIsHorizonOpen(false)} />
                          <div className="absolute right-0 sm:left-0 mt-1.5 w-24 bg-[#0C0C0C] border border-white/10 rounded-lg shadow-2xl z-50 overflow-hidden font-sans text-xs py-1">
                            {([30, 60, 90] as const).map((days) => (
                              <button
                                key={days}
                                onClick={() => {
                                  setForecastHorizon(days);
                                  setIsHorizonOpen(false);
                                }}
                                className={`w-full text-left px-3 py-1.5 hover:bg-white/5 transition-colors cursor-pointer text-[12px] ${forecastHorizon === days ? 'text-white font-bold bg-white/10' : 'text-white/60'}`}
                              >
                                {days}D
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Metric / Tab Dropdown */}
                    <div className="relative inline-block text-left">
                      <button
                        onClick={() => {
                          setIsTabOpen(!isTabOpen);
                          setIsHorizonOpen(false);
                        }}
                        className="px-3.5 py-1.5 bg-[#0C0C0D] border border-white/10 hover:border-white/20 rounded-full flex items-center space-x-1.5 text-[12px] font-sans text-white focus:outline-none transition-all duration-150 cursor-pointer select-none"
                      >
                        <span className="text-[8px] text-white/50">▼</span>
                        <span className="text-[14px]">
                          {activeTab === 'FORECAST' && 'Forecast'}
                          {activeTab === 'CHURN' && 'Churn'}
                          {activeTab === 'NRR' && 'NRR'}
                        </span>
                      </button>

                      {isTabOpen && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setIsTabOpen(false)} />
                          <div className="absolute right-0 sm:left-0 mt-1.5 w-32 bg-[#0C0C0C] border border-white/10 rounded-lg shadow-2xl z-50 overflow-hidden font-sans text-xs py-1">
                            {(['FORECAST', 'CHURN', 'NRR'] as const).map((tab) => (
                              <button
                                key={tab}
                                onClick={() => {
                                  setActiveTab(tab);
                                  if (tab === 'FORECAST') {
                                    setForecastHorizon(90);
                                  }
                                  setIsTabOpen(false);
                                }}
                                className={`w-full text-left px-3 py-1.5 hover:bg-white/5 transition-colors cursor-pointer text-[12px] ${activeTab === tab ? 'text-white font-bold bg-white/10' : 'text-white/60'}`}
                              >
                                {tab === 'FORECAST' && 'Forecast'}
                                {tab === 'CHURN' && 'Churn'}
                                {tab === 'NRR' && 'NRR'}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                  </div>
                </div>

                {/* Main Curve Display Canvas */}
                <div className="relative flex-grow w-full mt-4 min-h-[250px]">
                  {/* Legend Overlay */}
                  <div className="absolute top-2 right-2 flex space-x-3 text-[14px] font-mono text-white/30 z-10">
                    <span className="flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full mr-1 animate-pulse" style={{ backgroundColor: getTabColor() }} /> Predicted
                    </span>
                  </div>

                  {/* Y-axis Ticks Overlay */}
                  <div className="absolute top-2 bottom-0 left-[-37px] lg:left-[-32px] flex flex-col justify-between text-[11px] font-mono text-white/25 pointer-events-none select-none z-10">
                    {getYAxisTicks().map((tick, idx) => (
                      <span key={idx} style={{ position: 'absolute', top: tick.top }} className="leading-none -translate-y-1/2">
                        {tick.label}
                      </span>
                    ))}
                  </div>

                  <svg className="absolute bottom-0 left-0 w-full h-[210px]" viewBox="0 0 600 220" preserveAspectRatio="none">
                    {/* Background Column Boundaries under Vertex Points */}
                    <line x1="15" y1="0" x2="15" y2="220" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="0.75" />
                    <line x1="130" y1="0" x2="130" y2="220" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="0.75" />
                    <line x1="245" y1="0" x2="245" y2="220" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="0.75" />
                    <line x1="360" y1="0" x2="360" y2="220" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="0.75" />
                    <line x1="475" y1="0" x2="475" y2="220" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="0.75" />
                    <line x1="590" y1="0" x2="590" y2="220" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="0.75" />

                    {/* Horizontal Reference Grid Lines */}
                    <line x1="15" y1="20" x2="590" y2="20" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.75" strokeDasharray="3 3" />
                    <line x1="15" y1="75" x2="590" y2="75" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.75" strokeDasharray="3 3" />
                    <line x1="15" y1="130" x2="590" y2="130" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.75" strokeDasharray="3 3" />
                    <line x1="15" y1="185" x2="590" y2="185" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.75" strokeDasharray="3 3" />

                    <defs>
                      <linearGradient id="glowGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={getTabColor()} stopOpacity="0.45" />
                        <stop offset="100%" stopColor={getTabColor()} stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Glowing Filled Gradient Beneath the Curve */}
                    <path
                      d={fillPath}
                      fill="url(#glowGradient)"
                      className="transition-all duration-500 ease-out animate-pulse"
                      style={{ animationDuration: '4s', borderColor: '#e01212' }}
                    />

                    {/* Main High-Fidelity Smoothed Luminous Curve */}
                    <path
                      d={cvPath}
                      fill="none"
                      stroke={getTabColor()}
                      strokeWidth="3.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-all duration-500 ease-out"
                    />

                    {/* Elegant Lead lines connecting cards directly to nodes */}
                    <g className="transition-all duration-500 ease-in-out">
                      {getLabels().map((lbl, idx) => (
                        <path
                          key={`lead-${idx}`}
                          d={lbl.pointerPath}
                          stroke={lbl.dot.color}
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeDasharray="2 3"
                          fill="none"
                          opacity="0.5"
                        />
                      ))}
                    </g>

                    {/* Pristine Highlight Target Nodes */}
                    {getLabels().map((lbl, idx) => (
                      <g key={`node-${idx}`} className="transition-all duration-500 ease-in-out select-none">
                        {/* Outer Pulse */}
                        <circle
                          cx={lbl.dot.x}
                          cy={lbl.dot.y}
                          r="7.5"
                          fill={lbl.dot.color}
                          opacity="0.22"
                          className="animate-pulse"
                        />
                        {/* Inner Ring */}
                        <circle
                          cx={lbl.dot.x}
                          cy={lbl.dot.y}
                          r="4.5"
                          fill="none"
                          stroke={lbl.dot.color}
                          strokeWidth="1.5"
                        />
                        {/* Target Core */}
                        <circle
                          cx={lbl.dot.x}
                          cy={lbl.dot.y}
                          r="2"
                          fill="#FFFFFF"
                        />
                      </g>
                    ))}

                    {/* Pristine Contrast Vertex Navigation Dots */}
                    {points.filter(pt => !getLabels().some(lbl => lbl.dot.x === pt.x && lbl.dot.y === pt.y)).map((pt, idx) => (
                      <circle
                        key={idx}
                        cx={pt.x}
                        cy={pt.y}
                        r="3.5"
                        fill="#FFFFFF"
                        stroke={getTabColor()}
                        strokeWidth="1.5"
                        className="transition-all duration-500"
                      />
                    ))}
                  </svg>

                  {/* Bounding box for HTML Annotations aligned 1:1 with SVG bottom coordinate scale */}
                  <div className="absolute bottom-0 left-0 w-full h-[210px] pointer-events-none select-none z-20">
                    {getLabels().map((lbl, idx) => (
                      <div 
                        key={idx}
                        style={lbl.style}
                        className={`absolute px-3 py-1.5 rounded-lg border text-[11px] font-sans font-bold uppercase tracking-wider shadow-[0_12px_24px_rgba(0,0,0,0.7)] z-25 pointer-events-auto cursor-pointer ${lbl.opacityClass} ${lbl.pulse ? 'animate-pulse' : ''}`}
                      >
                        <span>{lbl.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Graphic metrics limits footer - x-axis labels */}
              <div className="border-t border-white/5 pt-4 flex justify-between text-[14px] font-mono text-white/20 whitespace-nowrap overflow-x-auto">
                {Array.from({ length: 6 }).map((_, i) => {
                  const day = Math.round((forecastHorizon / 5) * i);
                  return <span key={i}>{day} Days</span>;
                })}
              </div>

            </div>

            {/* 3. Right Panel (AI Recommendations section with high-attention warning hierarchy) */}
            <div className="lg:col-span-3 flex flex-col justify-between space-y-5 text-left border-t lg:border-t-0 lg:border-l border-white/5 pt-6 lg:pt-0 lg:pl-6">
              
              {/* Header with spark icon and system state */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-[#ffd500]" />
                  <span className="font-sans text-[12px] text-white tracking-[0.14em] font-medium uppercase">
                    AI RECOMMENDATIONS
                  </span>
                </div>
              </div>

              {/* Stack of Recommendations with Warning Colors */}
              <div className="flex-grow space-y-3 py-1">

                {/* Card 1: CHURN ALERTS (Critical Alert - Deep Red) */}
                <div 
                  onClick={() => setExpandedCard(expandedCard === 'churn' ? null : 'churn')}
                  className={`group bg-[#060607] border transition-all duration-300 relative overflow-hidden cursor-pointer rounded-[12px] ${
                    expandedCard === 'churn' 
                      ? 'border-[#ff0000] p-6' 
                      : 'border-[#ff0000]/25 hover:border-[#ff0000]/45 p-3.5 flex items-center justify-between text-[#ff0000]'
                  }`}
                >
                  {expandedCard === 'churn' ? (
                    <div className="space-y-5 w-full">
                      {/* Header Row */}
                      <div className="flex items-center justify-between w-full pb-3.5 border-b border-[#ff0000]/20">
                        <div className="flex items-center space-x-2">
                          <div className="w-9 h-9 rounded-full bg-[#ff0000]/10 flex items-center justify-center shrink-0">
                            <AlertCircle className="w-5 h-5 text-[#ff0000]" />
                          </div>
                          <div className="flex flex-col text-left">
                            <span className="font-sans text-[14px] font-bold text-[#ff0000] uppercase tracking-wider flex items-center leading-none">
                              CHURN ALERTS
                              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#ff0000] shadow-[0_0_8px_rgba(255,0,0,1)] ml-2"></span>
                            </span>
                          </div>
                        </div>
                        <ChevronDown className="w-5 h-5 text-white/50 hover:text-white transition-colors" />
                      </div>
                      
                      {/* Left-Aligned Content Block */}
                      <div className="space-y-4 text-left w-full flex flex-col items-start pt-1">
                        {/* Potential Upsell Pill */}
                        <div className="bg-[#1C0D0D] border border-[#ff0000]/10 rounded-xl px-4 py-3 w-[184.5px] text-left">
                          <span className="text-[11px] text-[#ff0000] font-bold uppercase tracking-wider block mb-1">
                            POTENTIAL UPSELL
                          </span>
                          <span className="text-[24px] font-bold text-white font-sans leading-none tracking-tight block">
                            3 RISK CUSTOMER
                          </span>
                        </div>

                        {/* Accounts info */}
                        <div className="text-[15px] text-white/90 font-sans font-light leading-relaxed text-left flex flex-col">
                          <span>high-risk customer accounts</span>
                          <span>require attention.</span>
                        </div>

                        {/* View opportunities button */}
                        <button className="text-[16px] font-sans font-normal text-[#ff0000] hover:text-red-400 transition-colors flex items-center space-x-1.5 bg-transparent p-0 cursor-pointer pt-2 group">
                          <span>View at-risk accounts</span>
                          <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    // COLLAPSED CHURN
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-3">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff0000] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ff0000]"></span>
                        </span>
                        <AlertOctagon className="w-5 h-5 text-[#ff0000]" />
                        <span className="font-sans text-[13.5px] font-semibold text-white/90">Churn Alerts</span>
                        <span className="font-mono text-[11px] text-white/50 bg-white/5 px-2 py-0.5 rounded font-medium">3 Active</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" />
                    </div>
                  )}
                </div>

                {/* Card 2: GROWTH OPPORTUNITY (High Alert - Amber/Gold) */}
                <div 
                  onClick={() => setExpandedCard(expandedCard === 'growth' ? null : 'growth')}
                  className={`group bg-[#060607] border transition-all duration-300 relative overflow-hidden cursor-pointer rounded-[12px] ${
                    expandedCard === 'growth' 
                      ? 'border-[#ffd500] p-6' 
                      : 'border-[#ffd500]/25 hover:border-[#ffd500]/45 p-3.5 flex items-center justify-between text-[#ffd500]'
                  }`}
                >
                  {expandedCard === 'growth' ? (
                    <div className="space-y-5 w-full">
                      {/* Header Row */}
                      <div className="flex items-center justify-between w-full pb-3.5 border-b border-white/10">
                        <div className="flex items-center space-x-2">
                          <div className="w-9 h-9 rounded-full bg-[#ffd500]/10 flex items-center justify-center shrink-0">
                            <AlertTriangle className="w-5 h-5 text-[#ffd500]" />
                          </div>
                          <div className="flex flex-col text-left">
                            <span className="font-sans text-[14px] font-bold text-[#ffd500] uppercase tracking-wider flex items-center leading-none">
                              GROWTH
                              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#ffd500] shadow-[0_0_8px_rgba(255,213,0,1)] ml-2"></span>
                            </span>
                            <span className="font-sans text-[14px] font-bold text-[#ffd500] uppercase tracking-wider leading-none mt-1 bg-transparent">
                              OPPORTUNITY
                            </span>
                          </div>
                        </div>
                        <ChevronDown className="w-5 h-5 text-white/50 hover:text-white transition-colors" />
                      </div>
                      
                      {/* Left-Aligned Content Block */}
                      <div className="space-y-4 text-left w-full flex flex-col items-start pt-1">
                        {/* Potential Upsell Pill */}
                        <div className="bg-[#1C1A0E] border border-[#ffd500]/10 rounded-xl px-4 py-3 w-[184.5px] text-left">
                          <span className="text-[11px] text-[#ffd500]/90 font-bold uppercase tracking-wider block mb-1">
                            POTENTIAL UPSELL
                          </span>
                          <span className="text-[24px] font-bold text-white font-sans leading-none tracking-tight block">
                            $18.5K ARP
                          </span>
                        </div>

                        {/* Accounts info */}
                        <div className="text-[16px] text-white/90 font-sans font-light leading-relaxed text-left flex items-baseline">
                          <span className="text-[20px] font-bold text-[#ffd500] mr-1.5 font-sans">5</span>
                          customer accounts are ready for expansion.
                        </div>

                        {/* View opportunities button */}
                        <button className="text-[16px] font-sans font-normal text-[#ffd500] hover:text-yellow-400 transition-colors flex items-center space-x-1.5 bg-transparent p-0 cursor-pointer pt-2 group">
                          <span>View opportunities</span>
                          <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    // COLLAPSED GROWTH
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className="w-5 h-5 text-[#ffd500]" />
                        <span className="font-sans text-[13.5px] font-semibold text-white/90">Growth Opportunities</span>
                        <span className="font-mono text-[11px] text-[#ffd500] bg-[#ffd500]/10 px-2 py-0.5 rounded font-medium">+$18.5K ARR</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" />
                    </div>
                  )}
                </div>

                {/* Card 3: FORECAST CONFIDENCE (Advisory Alert - Blue/Cyan) */}
                <div 
                  onClick={() => setExpandedCard(expandedCard === 'forecast' ? null : 'forecast')}
                  className={`group bg-[#060607] border transition-all duration-300 relative overflow-hidden cursor-pointer rounded-[12px] ${
                    expandedCard === 'forecast' 
                      ? 'border-[#0068ff] p-6' 
                      : 'border-[#0068ff]/25 hover:border-[#0068ff]/45 p-3.5 flex items-center justify-between text-[#0068ff]'
                  }`}
                >
                  {expandedCard === 'forecast' ? (
                    <div className="space-y-5 w-full">
                      {/* Header Row */}
                      <div className="flex items-center justify-between w-full pb-3.5 border-b border-[#0068ff]/20">
                        <div className="flex items-center space-x-2">
                          <div className="w-9 h-9 rounded-full bg-[#0068ff]/10 flex items-center justify-center shrink-0">
                            <Shield className="w-5 h-5 text-[#0068ff]" />
                          </div>
                          <div className="flex flex-col text-left">
                            <span className="font-sans text-[14px] font-bold text-[#0068ff] uppercase tracking-wider flex items-center leading-none">
                              FORECAST
                              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#0068ff] shadow-[0_0_8px_rgba(0,104,255,1)] ml-2"></span>
                            </span>
                            <span className="font-sans text-[14px] font-bold text-[#0068ff] uppercase tracking-wider leading-none mt-1 bg-transparent">
                              CONFIDENCE
                            </span>
                          </div>
                        </div>
                        <ChevronDown className="w-5 h-5 text-white/50 hover:text-white transition-colors" />
                      </div>
                      
                      {/* Left-Aligned Content Block */}
                      <div className="space-y-4 text-left w-full flex flex-col items-start pt-1">
                        {/* Potential Upsell Pill */}
                        <div className="bg-[#0A1224] border border-[#0068ff]/10 rounded-xl px-4 py-3 w-[184.5px] text-left">
                          <span className="text-[11px] text-[#0068ff] font-bold uppercase tracking-wider block mb-1">
                            POTENTIAL UPSELL
                          </span>
                          <span className="text-[24px] font-bold text-white font-sans leading-none tracking-tight block">
                            99.4% FORECAST
                          </span>
                        </div>

                        {/* Accounts info */}
                        <p className="text-[16px] text-white/90 font-sans font-light leading-relaxed text-left">
                          High confidence in this forecast model. No operational actions are required at this time.
                        </p>
                      </div>
                    </div>
                  ) : (
                    // COLLAPSED FORECAST
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-3">
                        <Shield className="w-5 h-5 text-[#0068ff]" />
                        <span className="font-sans text-[13.5px] font-semibold text-white/90">Forecast Confidence</span>
                        <span className="font-mono text-[11px] text-white/50 bg-white/5 px-2 py-0.5 rounded font-medium">99.4%</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" />
                    </div>
                  )}
                </div>

                {/* Card 4: REVENUE OUTLOOK (Positive Status - Emerald Green) */}
                <div 
                  onClick={() => setExpandedCard(expandedCard === 'revenue' ? null : 'revenue')}
                  className={`group bg-[#060607] border transition-all duration-300 relative overflow-hidden cursor-pointer rounded-[12px] ${
                    expandedCard === 'revenue' 
                      ? 'border-[#10B981] p-6' 
                      : 'border-[#10B981]/25 hover:border-[#10B981]/45 p-3.5 flex items-center justify-between text-[#10B981]'
                  }`}
                >
                  {expandedCard === 'revenue' ? (
                    <div className="space-y-5 w-full">
                      {/* Header Row */}
                      <div className="flex items-center justify-between w-full pb-3.5 border-b border-[#10B981]/20">
                        <div className="flex items-center space-x-2">
                          <div className="w-9 h-9 rounded-full bg-[#10B981]/10 flex items-center justify-center shrink-0">
                            <TrendingUp className="w-5 h-5 text-[#10B981]" />
                          </div>
                          <div className="flex flex-col text-left">
                            <span className="font-sans text-[14px] font-bold text-[#10B981] uppercase tracking-wider flex items-center leading-none">
                              REVENUE
                              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,1)] ml-2"></span>
                            </span>
                            <span className="font-sans text-[14px] font-bold text-[#10B981] uppercase tracking-wider leading-none mt-1 bg-transparent block">
                              OUTLOOK
                            </span>
                          </div>
                        </div>
                        <ChevronDown className="w-5 h-5 text-white/50 hover:text-white transition-colors" />
                      </div>
                      
                      {/* Left-Aligned Content Block */}
                      <div className="space-y-4 text-left w-full flex flex-col items-start pt-1">
                        <p className="text-[16px] text-white/90 font-sans font-light leading-relaxed text-left">
                          Our revenue projection anticipates expansion growth of
                        </p>

                        {/* Potential Upsell Pill */}
                        <div className="bg-[#0D1C16] border border-[#10B981]/10 rounded-xl px-4 py-3 w-[184.5px] text-left">
                          <span className="text-[11px] text-[#10B981] font-bold uppercase tracking-wider block mb-1">
                            POTENTIAL UPSELL
                          </span>
                          <span className="text-[24px] font-bold text-white font-sans leading-none tracking-tight block">
                            +22.4% GROWTH
                          </span>
                        </div>

                        <p className="text-[16px] text-white/90 font-sans font-light leading-relaxed text-left">
                          over the scheduled 90-day trajectory.
                        </p>
                      </div>
                    </div>
                  ) : (
                    // COLLAPSED REVENUE
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-3">
                        <TrendingUp className="w-5 h-5 text-[#10B981]" />
                        <span className="font-sans text-[13.5px] font-semibold text-white/90">Revenue Outlook</span>
                        <span className="font-mono text-[11px] text-[#10B981] bg-[#10B981]/15 px-2 py-0.5 rounded font-medium">+22.4%</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" />
                    </div>
                  )}
                </div>

              </div>

              {/* Timestamp with Clock */}
              <div className="flex items-center space-x-2 text-white/30 font-mono text-[11px] pt-4 border-t border-white/5">
                <Clock className="w-3.5 h-3.5 text-white/20" />
                <span>Last updated: Today, 10:30 AM</span>
              </div>

            </div>

            {/* Bottom Section (Flexible Space) */}
            <div className="col-span-1 lg:col-span-12 border-t border-white/5 pt-6 mt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-1.5 text-left max-w-2xl">
                <span className="font-mono text-[11px] text-[#6B6E72] tracking-widest font-bold block uppercase">
                  Take Action // Insights Summary
                </span>
                <p className="text-[14px] font-sans text-white/50 leading-relaxed font-light">
                  {activeTab === 'FORECAST' && 'The convergence rate remains highly favorable (99.4%). Secure incoming pipelines now by scheduling a high-confidence projection review with leadership.'}
                  {activeTab === 'CHURN' && 'Although contraction remains contained under seed tiers, retention initiatives should immediately target the two enterprise accounts flagged at risk.'}
                  {activeTab === 'NRR' && 'Trailed NRR trajectory holds at optimal levels (118.4%) from seat expansions. Initiate standard upsell workflows to capture additional expansion opportunities.'}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                <button
                  onClick={onJoinWaitlistClick}
                  className="px-6 py-2.5 bg-white hover:bg-neutral-200 text-black font-sans text-[11px] font-bold tracking-[0.15em] uppercase rounded transition-all duration-150 flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap shadow-md grow sm:grow-0"
                >
                  <span>Request a Demo</span>
                </button>
                <button
                  onClick={onJoinWaitlistClick}
                  className="px-6 py-2.5 bg-transparent hover:bg-white/5 border border-white/10 hover:border-white/45 text-white font-sans text-[11px] font-bold tracking-[0.15em] uppercase rounded transition-all duration-150 flex items-center justify-center space-x-1 cursor-pointer whitespace-nowrap grow sm:grow-0"
                >
                  <span>Download Report</span>
                </button>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
