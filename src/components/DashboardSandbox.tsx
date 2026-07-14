/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowUpRight, ArrowDownRight, RefreshCw, Layers, TrendingUp, CheckCircle, 
  AlertTriangle, Play, HelpCircle, Activity, Key, Sliders, Mail, MessageSquare, Send, Check
} from 'lucide-react';
import { ChurnCustomer, RevenueProjectionPoint } from '../types';

export default function DashboardSandbox() {
  // Simulator input parameters controlled by user
  const [mrrBase, setMrrBase] = useState<number>(85000); // base MRR in USD
  const [growthSlider, setGrowthSlider] = useState<number>(6); // monthly sales growth % 
  const [churnSlider, setChurnSlider] = useState<number>(2.4); // current churn rate %
  const [retentionMode, setRetentionMode] = useState<'standard' | 'pulse-secured'>('standard');
  const [contractDecayShock, setContractDecayShock] = useState<boolean>(false);

  // Active tab inside internal dashboard
  const [internalTab, setInternalTab] = useState<'forecast' | 'churn' | 'integrations'>('forecast');

  // Interactive action state
  const [selectedCustomerAction, setSelectedCustomerAction] = useState<ChurnCustomer | null>(null);
  const [outreachSent, setOutreachSent] = useState<boolean>(false);
  const [mockResolvedList, setMockResolvedList] = useState<string[]>([]); // list of mock resolved customer ids

  // Mock initial Churn Alert Customers
  const [customers, setCustomers] = useState<ChurnCustomer[]>([
    {
      id: 'cust-1',
      companyName: 'Apex Media Corp',
      riskScore: 92,
      arrImpact: 98400,
      healthTrend: 'down',
      signals: ['Api volume decreased 60%', 'Primary Admin seat inactive 14 days'],
      owner: 'Sarah Connor'
    },
    {
      id: 'cust-2',
      companyName: 'Velocity Logistics',
      riskScore: 78,
      arrImpact: 35000,
      healthTrend: 'down',
      signals: ['Payment card expires in 4 days', 'Credit declined in simulations'],
      owner: 'Marcus Webb'
    },
    {
      id: 'cust-3',
      companyName: 'BriteDev Studio',
      riskScore: 61,
      arrImpact: 14400,
      healthTrend: 'stable',
      signals: ['Support ticket open for 11 days', 'Usage capped, seats full'],
      owner: 'John Doe'
    },
    {
      id: 'cust-4',
      companyName: 'SproutAI Web',
      riskScore: 45,
      arrImpact: 9600,
      healthTrend: 'up',
      signals: ['Seat count increased +30%', 'Integrated Salesforce CRM today'],
      owner: 'Alex Sterling'
    },
  ]);

  // Handle outreach send trigger for interactive CRM next-step
  const handleTriggerOutreach = () => {
    setOutreachSent(true);
    setTimeout(() => {
      if (selectedCustomerAction) {
        // Resolve customer mock status
        setMockResolvedList(prev => [...prev, selectedCustomerAction.id]);
        setCustomers(prev => 
          prev.map(c => c.id === selectedCustomerAction.id ? { ...c, riskScore: Math.max(10, Math.floor(c.riskScore * 0.3)) } : c)
        );
      }
    }, 1800);
  };

  // Perform calculations for the monthly revenue forecast (6 Months window based on sliders!)
  // If "Pulse Secured" mode is active, historical/predicted churn resolves to -40% improvement.
  const calculateProjections = (): RevenueProjectionPoint[] => {
    const points: RevenueProjectionPoint[] = [];
    const months = ['Jan 2026', 'Feb 2026', 'Mar 2026', 'Apr 2026', 'May 2026', 'Jun 2026', 'Jul 2026', 'Aug 2026'];
    
    // Static historical points
    points.push({ monthName: 'Oct 2025', historical: 72000 });
    points.push({ monthName: 'Nov 2025', historical: 74500 });
    points.push({ monthName: 'Dec 2025', historical: 79000 });
    points.push({ monthName: 'Jan 2026', historical: 82400 });

    // Computed starting variables
    let currentPredictionBasis = mrrBase;
    
    // We projection 4 months forward: Feb, Mar, Apr, May
    const forwardMonths = ['Feb 2026', 'Mar 2026', 'Apr 2026', 'May 2026', 'Jun 2026', 'Jul 2026'];
    
    forwardMonths.forEach((mName, index) => {
      const stepIndex = index + 1;
      
      // Compute net growth percentage
      const targetGrowthRate = growthSlider / 100;
      
      // Churn rate discount. Pulse secures -45% of churn.
      const adjustedChurn = retentionMode === 'pulse-secured' ? churnSlider * 0.55 : churnSlider;
      const targetChurnRate = adjustedChurn / 100;
      
      // Shock parameter applied to Apr 2026 forward
      const isShockActive = contractDecayShock && stepIndex >= 3;
      const shockDiscount = isShockActive ? 0.08 : 0; // -8% recurring contraction loss shock
      
      const netGainMultiplier = (1 + targetGrowthRate - targetChurnRate - shockDiscount);
      
      currentPredictionBasis = currentPredictionBasis * netGainMultiplier;
      
      // Confidence interval boundaries
      const stdDeviation = 0.03 * stepIndex * currentPredictionBasis;
      
      points.push({
        monthName: mName,
        projected: Math.round(currentPredictionBasis),
        confidenceLower: Math.round(currentPredictionBasis - stdDeviation),
        confidenceUpper: Math.round(currentPredictionBasis + stdDeviation)
      });
    });

    return points;
  };

  const projectionsList = calculateProjections();

  // Helper values to map SVG paths
  const mapProjectionToCoordinates = (points: RevenueProjectionPoint[], width: number, height: number) => {
    // scale based on values
    const minVal = 65000;
    const maxVal = 145000;
    const padding = 20;

    let pointsPathStr = '';
    let lowerConfidencePoints: { x: number; y: number }[] = [];
    let upperConfidencePoints: { x: number; y: number }[] = [];

    points.forEach((p, index) => {
      const x = padding + (index * (width - padding * 2)) / (points.length - 1);
      const mrrVal = p.historical ?? p.projected ?? 0;
      
      const y = height - padding - ((mrrVal - minVal) * (height - padding * 2)) / (maxVal - minVal);
      
      if (index === 0) {
        pointsPathStr += `M ${x},${y}`;
      } else {
        pointsPathStr += ` L ${x},${y}`;
      }

      // Collect confidence values
      const lowerYVal = p.confidenceLower ?? mrrVal;
      const upperYVal = p.confidenceUpper ?? mrrVal;

      const lowerY = height - padding - ((lowerYVal - minVal) * (height - padding * 2)) / (maxVal - minVal);
      const upperY = height - padding - ((upperYVal - minVal) * (height - padding * 2)) / (maxVal - minVal);

      lowerConfidencePoints.push({ x, y: lowerY });
      upperConfidencePoints.unshift({ x, y: upperY }); // reverse to draw connected ring path
    });

    // Make shaded confidence path string
    let confidenceAreaStr = '';
    if (lowerConfidencePoints.length > 0) {
      confidenceAreaStr = `M ${lowerConfidencePoints[0].x},${lowerConfidencePoints[0].y}`;
      lowerConfidencePoints.forEach((pt, id) => {
        if (id > 0) confidenceAreaStr += ` L ${pt.x},${pt.y}`;
      });
      upperConfidencePoints.forEach(pt => {
        confidenceAreaStr += ` L ${pt.x},${pt.y}`;
      });
      confidenceAreaStr += ' Z';
    }

    return { mainPath: pointsPathStr, areaPath: confidenceAreaStr };
  };

  const svgWidth = 640;
  const svgHeight = 240;
  const chartPaths = mapProjectionToCoordinates(projectionsList, svgWidth, svgHeight);

  // Dynamic Y coordinates for markers
  const basePoint = projectionsList[3]; // Jan 2026 (BASE)
  const baseMRR = basePoint.historical ?? basePoint.projected ?? 0;
  const baseY = svgHeight - 20 - ((baseMRR - 65000) * (svgHeight - 40)) / 80000;

  const lastPoint = projectionsList[projectionsList.length - 1];
  const lastMRR = lastPoint.projected ?? lastPoint.historical ?? 0;
  const lastY = svgHeight - 20 - ((lastMRR - 65000) * (svgHeight - 40)) / 80000;

  // Extract stats for top indicator boxes
  const latestForecastPt = projectionsList[projectionsList.length - 1];
  const initialPt = projectionsList[0];
  const forecastDeltaPercent = (((latestForecastPt.projected ?? 0) - (initialPt.historical ?? 82000)) / (initialPt.historical ?? 82000) * 100).toFixed(1);

  return (
    <section className="relative w-full py-20 lg:py-28 border-b border-white/12 z-10 bg-[#07080B]">
      
      <div className="absolute top-0 left-4 sm:left-6 lg:left-8 py-3 pointer-events-none">
        <span className="font-mono text-[10px] text-text-secondary tracking-widest block font-medium">
          DASHBOARD PREVIEW // SANDBOX INSTANCE
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block split */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12 border-b border-white/10 pb-8 text-left">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-white/10 text-white border border-white/20 rounded font-mono text-[9px] font-bold uppercase">
              PREDICT LEVEL ACTIVE SANDBOX
            </div>
            
            <h2 className="font-display font-light text-3xl sm:text-5xl text-text-primary tracking-tight leading-[1.05]">
              Interactive <span className="text-white/20 font-light">Revenue Engine</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-white/40 max-w-xl font-light">
              Model real-time cohort trends directly in this preview console. Adjust growth rate indicators, assign custom client risks, and test variables to see how PulseIQ's AI algorithms secure SaaS Net Revenue Retention.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[10px] text-white/30">INTEGRATION SYNC SPEED:</span>
            <span className="px-2.5 py-1 rounded bg-[#0A0A0A] border border-white/10 font-mono text-[10px] text-white font-bold uppercase">
              REAL-TIME SIMULATOR ACTIVE
            </span>
          </div>
        </div>

        {/* Outer Split Frame: Inputs Sliders on Left (33%), Dynamic Dashboard Preview Grid on Right (67%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Simulator Side Controllers */}
          <div className="lg:col-span-4 bg-[#0C0C0E] border border-white/10 rounded-xl p-7 space-y-7 text-left">
            
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <span className="font-mono text-xs text-text-primary font-bold flex items-center">
                <Sliders className="w-3.5 h-3.5 text-white mr-1.5" />
                <span>MODEL CONTROL ARRAYS</span>
              </span>
              <span className="font-mono text-[9px] text-white/30">INDEX // PLG_V1</span>
            </div>

            {/* Inputs Form */}
            <div className="space-y-6">
              
              {/* Baseline MRR input */}
              <div className="space-y-2">
                <label className="flex justify-between text-xs font-mono text-white/40 uppercase">
                  <span>Current ARR Metric Basis</span>
                  <span className="text-white font-medium font-mono">${(mrrBase * 12).toLocaleString()} / yr</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-white/30 font-mono text-xs">
                    $
                  </div>
                  <input
                    type="number"
                    value={mrrBase}
                    onChange={(e) => setMrrBase(Math.max(1000, Number(e.target.value)))}
                    className="w-full bg-[#050505] border border-white/10 rounded px-3 py-2.5 pl-7 text-xs font-mono text-white placeholder-white/20 focus:border-white focus:ring-1 focus:ring-white/20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Monthly New Sales Growth Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-white/40 uppercase">
                  <span>Target Monthly organic Sales Growth</span>
                  <span className="text-white font-semibold font-mono">+{growthSlider}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="0.5"
                  value={growthSlider}
                  onChange={(e) => setGrowthSlider(Number(e.target.value))}
                  className="w-full accent-white h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-[10px] font-mono text-white/20 block text-right mt-1">Stripe customer growth rate basis</span>
              </div>

              {/* Monthly Logo Churn Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-white/40 uppercase">
                  <span>Contract Logo Churn Bias</span>
                  <span className="text-white font-semibold font-mono">{churnSlider}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="12"
                  step="0.1"
                  value={churnSlider}
                  onChange={(e) => setChurnSlider(Number(e.target.value))}
                  className="w-full accent-white h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-[10px] font-mono text-white/20 block text-right mt-1">Simulated leakage parameter</span>
              </div>

              {/* Extreme Shock Contract Loss Switch (Simulates a major contract loss or macro correction) */}
              <div className="p-3 bg-[#050505] border border-white/10 rounded flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-text-primary block font-medium">SIMULATE MACRO DECAY SHOCK</span>
                  <span className="text-[10px] font-mono text-white/30">Simulates contract contractions in Month 3</span>
                </div>
                <button
                  onClick={() => setContractDecayShock(!contractDecayShock)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    contractDecayShock ? 'bg-white' : 'bg-[#111111] border-white/10'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      contractDecayShock ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Core PulseIQ optimization securing mode! */}
              <div className="p-4 bg-white/5 border border-white/10 rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono text-white font-bold uppercase block tracking-wider">
                    // PULSEIQ RECOVER NODE
                  </span>
                  
                  <div className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/35 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                  </div>
                </div>

                <p className="font-sans text-[11px] text-white/40 leading-normal font-light">
                  Toggle <strong>PulseIQ Secure Optimizer™</strong> to simulate deploying automated client warnings and Next-Best outreach loops. This mitigates simulated Churn Leakage by <strong>45%</strong> immediately.
                </p>

                <div className="flex space-x-1.5 p-1 bg-[#050505] rounded border border-white/10">
                  <button
                    onClick={() => setRetentionMode('standard')}
                    className={`w-1/2 py-2 text-[10px] font-mono rounded font-semibold transition-all cursor-pointer ${
                      retentionMode === 'standard' 
                        ? 'bg-[#111111] text-white font-bold border border-white/10' 
                        : 'text-white/40 hover:text-white'
                    }`}
                  >
                    STANDARD BI STATUS
                  </button>
                  <button
                    onClick={() => setRetentionMode('pulse-secured')}
                    className={`w-1/2 py-2 text-[10px] font-mono rounded font-bold transition-all cursor-pointer ${
                      retentionMode === 'pulse-secured' 
                        ? 'bg-white text-black font-bold' 
                        : 'text-white/40 hover:text-white'
                    }`}
                  >
                    PULSE SECURED™
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Dynamic Interactive Dashboard Monitor (67%) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Upper Dashboard Tab Switchers */}
            <div className="flex justify-between items-center bg-[#0C0C0E] border border-white/10 px-5 py-3.5 rounded-xl">
              <div className="flex space-x-2">
                {([
                  { id: 'forecast', label: 'PREDICTED MRR FORECAST' },
                  { id: 'churn', label: 'CHURN INTELLIGENCE RADAR' },
                ] as const).map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => { setInternalTab(tab.id); }}
                    className={`px-3 py-1.5 rounded text-xs font-mono tracking-wider transition-all cursor-pointer ${
                      internalTab === tab.id 
                        ? 'bg-[#111111] text-white font-bold border-b-2 border-white' 
                        : 'text-white/40 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="font-mono text-[9px] text-white/80 tracking-widest hidden sm:inline-block font-bold">
                // SYSTEM STATUS: SYNCED &bull; ACTIVE
              </div>
            </div>

            {/* TAB VIEW 1: PREDICTED FORECAST LINE CHART & CALCULATIONS */}
            {internalTab === 'forecast' && (
              <div className="bg-[#0C0C0E] border border-white/10 rounded-xl p-6 sm:p-8 text-left space-y-8 animate-fade-in">
                
                {/* Metric Strip overview with improved padding and gap */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#050505] p-4 sm:p-5 rounded-xl border border-white/10">
                  <div>
                    <span className="text-[9px] font-mono text-white/30 block tracking-wider uppercase">INITIAL BASIS MRR</span>
                    <span className="text-lg font-display font-light text-white">
                      ${mrrBase.toLocaleString()}
                    </span>
                  </div>

                  <div>
                    <span className="text-[9px] font-mono text-white/30 block tracking-wider uppercase">90-DAY PREDICTED</span>
                    <span className="text-lg font-display font-light text-white">
                      ${(projectionsList[6]?.projected ?? 0).toLocaleString()}
                    </span>
                  </div>

                  <div>
                    <span className="text-[9px] font-mono text-white/30 block tracking-wider uppercase">ARR GAIN/LOSS DELTA</span>
                    <span className="text-lg font-display font-light flex items-center text-white">
                      {Number(forecastDeltaPercent) >= 0 ? <ArrowUpRight className="w-4 h-4 mr-1 shrink-0" /> : <ArrowDownRight className="w-4 h-4 mr-1 shrink-0" />}
                      <span>{forecastDeltaPercent}%</span>
                    </span>
                  </div>

                  <div>
                    <span className="text-[9px] font-mono text-white/30 block tracking-wider uppercase">ADJUSTED LEAKAGE RATE</span>
                    <span className="text-lg font-display font-light text-white">
                      {(retentionMode === 'pulse-secured' ? churnSlider * 0.55 : churnSlider).toFixed(2)}%
                    </span>
                  </div>
                </div>

                {/* Main Interactive Responsive SVG Chart */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center px-1 font-light">
                    <span className="font-mono text-[10px] text-white/40 uppercase">
                      90-DAY PREDICTIVE COHORT REVENUE CORRIDOR
                    </span>
                    <span className="text-[9px] font-mono text-white/30">
                      Y-AXIS RANGE: $65.0K &mdash; $145.0K
                    </span>
                  </div>

                  <div className="relative bg-[#050507] border border-white/10 rounded-xl p-5 sm:p-6 h-64 pt-12 pb-6">
                    {/* Shading, border lines, actual paths */}
                    <div className="absolute top-2 right-2 flex space-x-3 text-[9px] font-mono text-white/30">
                      <span className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full mr-1.5" /> Actual
                      </span>
                      <span className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-white rounded-full mr-1.5" /> Predicted Curve
                      </span>
                      <span className="flex items-center">
                        <span className="w-2.5 h-1.5 bg-white bg-opacity-10 border border-white border-opacity-20 rounded mr-1.5" /> Confidence Interval
                      </span>
                    </div>

                    <svg className="w-full h-full pb-4" viewBox="0 0 640 240" preserveAspectRatio="none">
                      {/* Grid guidelines aligned perfectly with $20.0K steps */}
                      <line x1="20" y1="20" x2="620" y2="20" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="1" strokeDasharray="2 2" />
                      <line x1="20" y1="70" x2="620" y2="70" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="1" strokeDasharray="2 2" />
                      <line x1="20" y1="120" x2="620" y2="120" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="1" strokeDasharray="2 2" />
                      <line x1="20" y1="170" x2="620" y2="170" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="1" strokeDasharray="2 2" />
                      <line x1="20" y1="220" x2="620" y2="220" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />

                      {/* Precise Y-axis labels aligned next to their respective grid line */}
                      <g className="font-mono text-[8px]" fill="rgba(255, 255, 255, 0.35)">
                        <text x="24" y="20" dominantBaseline="central" fill="rgba(255, 255, 255, 0.35)">$145.0K</text>
                        <text x="24" y="70" dominantBaseline="central" fill="rgba(255, 255, 255, 0.35)">$125.0K</text>
                        <text x="24" y="120" dominantBaseline="central" fill="rgba(255, 255, 255, 0.35)">$105.0K</text>
                        <text x="24" y="170" dominantBaseline="central" fill="rgba(255, 255, 255, 0.35)">$85.0K</text>
                        <text x="24" y="220" dominantBaseline="central" fill="rgba(255, 255, 255, 0.35)">$65.0K</text>
                      </g>

                      {/* 1. Confidence Area */}
                      <polygon 
                        points={chartPaths.areaPath} 
                        fill="#FFFFFF" 
                        fillOpacity="0.08"
                        className="transition-all duration-300"
                      />

                      {/* 2. Confidence outlines */}
                      <path 
                        d={chartPaths.areaPath} 
                        fill="none" 
                        stroke="#FFFFFF" 
                        strokeOpacity="0.25"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                        className="transition-all duration-300"
                      />

                      {/* 3. Actual Reported Path (Mathematically exact coordinates based on actual scale) */}
                      <path 
                        d="M 20,202.5 L 86.67,196.25 L 153.33,185 L 220,176.5" 
                        fill="none" 
                        stroke="#666666" 
                        strokeWidth="2.5" 
                      />

                      {/* 4. Core Forecast Line */}
                      <path 
                        d={chartPaths.mainPath} 
                        fill="none" 
                        stroke="#FFFFFF" 
                        strokeWidth="2.5" 
                        className="transition-all duration-500 ease-out"
                      />

                      {/* Marker checkpoints aligned dynamically with correct coordinates */}
                      <circle cx="220" cy={baseY} r="4.5" fill="#666666" stroke="#FFFFFF" strokeWidth="1.5" />
                      <circle cx="620" cy={lastY} r="4.5" fill="#FFFFFF" stroke="#666666" strokeWidth="1.5" className="transition-all duration-500" />

                      {/* Timeline labels at bottom inside SVG for perfect responsive alignment */}
                      <g className="font-mono text-[8px]" fill="rgba(255, 255, 255, 0.3)">
                        <text x="20" y="235" textAnchor="middle">OCT</text>
                        <text x="86.67" y="235" textAnchor="middle">NOV</text>
                        <text x="153.33" y="235" textAnchor="middle">DEC</text>
                        <text x="220" y="235" textAnchor="middle" fill="rgba(255, 255, 255, 0.6)" className="font-bold">JAN 2026 (BASE)</text>
                        <text x="286.67" y="235" textAnchor="middle">FEB</text>
                        <text x="353.33" y="235" textAnchor="middle">MAR</text>
                        <text x="420" y="235" textAnchor="middle">APR</text>
                        <text x="486.67" y="235" textAnchor="middle">MAY</text>
                        <text x="553.33" y="235" textAnchor="middle">JUN</text>
                        <text x="620" y="235" textAnchor="end" fill="rgba(255, 255, 255, 0.6)" className="font-bold">JUL 2026</text>
                      </g>
                    </svg>

                  </div>
                </div>

                {/* Explanation insight snippet with improved padding */}
                <div className="p-4 bg-[#111111] border border-white/10 rounded-xl flex items-center space-x-4 text-xs font-sans text-white/40">
                  <Activity className="w-5 h-5 text-white shrink-0" />
                  <p className="font-light">
                    <strong>Interactive Simulation Analysis:</strong> At your custom {growthSlider}% Sales Growth and {churnSlider}% Logo Churn parameters, the model forecasts direct ARR of <strong>${(mrrBase * 12 * (1 + (growthSlider - (retentionMode === 'pulse-secured' ? churnSlider * 0.55 : churnSlider))/100)).toLocaleString(undefined, {maximumFractionDigits:0})}</strong> in the immediate 30-day window. {retentionMode === 'pulse-secured' ? 'PulseIQ secure optimization is actively mitigating user dropoff trends, keeping expansion margins green.' : 'Enable Pulse Secure Mode on the left side to simulate active CS rescue operations.'}
                  </p>
                </div>

              </div>
            )}

            {/* TAB VIEW 2: CHURN RADAR LIST VIEW */}
            {internalTab === 'churn' && (
              <div className="bg-[#0C0C0C] border border-white/5 rounded-lg p-5 text-left space-y-6 animate-fade-in">
                
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-display text-lg font-light text-text-primary leading-tight">
                      Churn Decay <span className="text-white/20 font-light">Warning Feed</span>
                    </h3>
                    <p className="font-sans text-xs text-white/40 font-light">AI identified these subscriber licenses displaying extreme risk signatures.</p>
                  </div>

                  <span className="font-mono text-xs text-white bg-white/10 px-2 py-0.5 border border-white/20 rounded">
                    {customers.filter(c => c.riskScore > 60).length} COHORTS ALERT
                  </span>
                </div>

                {/* Master Churn customer rows */}
                <div className="space-y-3">
                  {customers.map((cust) => {
                    const isResolved = mockResolvedList.includes(cust.id);
                    return (
                      <div 
                        key={cust.id}
                        className={`p-4 border rounded-lg transition-all ${
                          isResolved 
                            ? 'bg-[#050505]/40 border-white/5 opacity-50' 
                            : cust.riskScore > 80 
                            ? 'bg-[#111111] border-white/10 hover:border-white/25' 
                            : 'bg-[#050505] border-white/5 hover:border-white/10'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className={`w-2 h-2 rounded-full ${isResolved ? 'bg-neutral-600' : cust.riskScore > 80 ? 'bg-white animate-pulse' : 'bg-neutral-400'}`} />
                              <span className="font-display text-base font-semibold text-white">{cust.companyName}</span>
                              {isResolved && (
                                <span className="font-mono text-[8px] bg-white/10 text-white border border-white/20 px-1.5 py-0.25 rounded">
                                  OUTREACH IN-FLIGHT / PREVENTED
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-white/30 pt-0.5">
                              <span>CONTRACT VALUE: ${(cust.arrImpact / 12).toLocaleString(undefined, {maximumFractionDigits:0})}/mo</span>
                              <span>&bull;</span>
                              <span>OWNER: {cust.owner}</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <span className="text-[9px] font-mono text-white/30 block">COMPUTED HAZARD</span>
                              <span className={`text-sm font-mono font-semibold ${isResolved ? 'text-white/20' : 'text-white'}`}>
                                {cust.riskScore}%
                              </span>
                            </div>

                            <button
                              onClick={() => {
                                setSelectedCustomerAction(cust);
                                setOutreachSent(false);
                              }}
                              disabled={isResolved}
                              className={`px-3 py-1.5 font-mono text-[10px] rounded font-semibold tracking-wider transition-all ${
                                isResolved
                                  ? 'bg-[#050505] text-white/20 border border-white/5 cursor-not-allowed'
                                  : 'bg-[#111111] hover:bg-[#151515] text-white border border-white/10 hover:border-white/30 cursor-pointer'
                              }`}
                            >
                              {isResolved ? 'SECURED' : 'TAKE ACTION'}
                            </button>
                          </div>
                        </div>

                        {/* Signals block */}
                        {!isResolved && (
                          <div className="mt-3 pt-3 border-t border-white/5 p-2.5 bg-[#050505] rounded border border-white/5">
                            <span className="font-mono text-[8.5px] text-white/30 block mb-1">TRIGGERED SUSPECT SIGNALS:</span>
                            <ul className="space-y-1">
                              {cust.signals.map((sig, sId) => (
                                <li key={sId} className="flex items-center text-[10.5px] font-mono text-white/60">
                                  <AlertTriangle className="w-3 h-3 text-white mr-1.5 shrink-0" />
                                  <span>{sig}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Sub Action Modal mockup inline (Fidelity boost!) */}
                {selectedCustomerAction && (
                  <div className="p-4 bg-[#111111] border border-white/10 rounded-lg text-left relative animate-fade-in space-y-4">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="font-mono text-[10px] text-white font-bold uppercase block tracking-wider">
                        // SECURE OUTREACH DISPATCH CAMPAIGN
                      </span>
                      <button 
                        onClick={() => setSelectedCustomerAction(null)}
                        className="text-white/40 hover:text-white font-mono text-xs"
                      >
                        DISMISS
                      </button>
                    </div>

                    <div className="space-y-2">
                      <span className="font-mono text-[9px] text-white block font-bold">// RECOMMENDED TEMPLATE SPEC: DETECTED DEACTIVATION ALERT</span>
                      <h4 className="font-display text-sm font-semibold text-white">To: Technical contacts at {selectedCustomerAction.companyName}</h4>
                      
                      <div className="p-3 bg-[#050505] border border-white/5 rounded font-mono text-xs text-white/50 leading-relaxed">
                        Hi team, this is automated telemetry outreach from {selectedCustomerAction.owner}'s account representative desk. Our system detected custom platform deactivations on your primary admin seats. We want to ensure everything is running perfectly ...
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <p className="text-[10px] font-mono text-white/40 font-light">
                        PulseIQ models predict this campaign has an <strong>82% retention success probability</strong>.
                      </p>

                      <button
                        onClick={handleTriggerOutreach}
                        disabled={outreachSent}
                        className="px-4 py-2 bg-white hover:bg-neutral-200 text-black font-mono text-xs font-semibold tracking-wider rounded flex items-center justify-center space-x-2 cursor-pointer transition-colors"
                      >
                        {outreachSent ? (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-[2.5px] text-black" />
                            <span>SECURED SENT</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5 text-black" />
                            <span>DISPATCH SYSTEM OUTREACH</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
