/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { FAQItem } from '../types';
import { motion } from 'motion/react';

export default function FAQSection() {
  const [openIds, setOpenIds] = useState<string[]>([]);
  
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const rowVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      rotateX: 12,
      scale: 0.96
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 22,
        stiffness: 80,
        mass: 1.1
      }
    }
  };

  const faqs: FAQItem[] = [
    {
      id: 'faq-1',
      question: 'How is PulseIQ different from Mixpanel or Looker?',
      answer: 'Traditional BI platforms are rearview mirrors—they catalog yesterday\'s charts and report metrics long after transactions occur. PulseIQ is a forward compass. We run temporal neural networks on continuous customer usage patterns to forecast future MRR trends and flag specific accounts displaying high cancellation hazard characteristics 90 days before contracts renew.'
    },
    {
      id: 'faq-2',
      question: 'What data sources do you connect to?',
      answer: 'We connect directly to your primary financial ledgers and product telemetry hubs. Our standard native nodes support Stripe, Salesforce operations, HubSpot, Intercom conversation stats, Segment events, or raw CSV uploads. All integrations establish read-only sessions requiring ZERO custom schema rewrites.'
    },
    {
      id: 'faq-3',
      question: 'Is my company data safe with PulseIQ?',
      answer: 'Security is our core engineering mandate. PulseIQ never sells, rents, or leaks customer profiles. We use AES-256 GCM encryption algorithms across in-transit web tunnels and resting databases. All training computation models isolated on dedicated sandboxes conform fully to SOC2 Type II, GDPR, and CCPA governance guidelines.'
    },
    {
      id: 'faq-4',
      question: 'When is early access launching?',
      answer: 'Our private beta queue is active now. We admit cohort groups of 15 SaaS teams every 3 weeks to maintain continuous validation benchmarks and dedicated modeling capacities. Applying on the waitlist secures your queue rank, and we will contact you directly to establish sync setups.'
    },
    {
      id: 'faq-5',
      question: 'Do I need an internal data engineering team to run PulseIQ?',
      answer: 'No. PulseIQ is designed as plug-and-play capital intelligence. Our setup pipeline requires zero data pipelines, warehouse configurations, or dbt coding. Our background model tuning automatically isolates cohort variables and trains custom forecasts out of the box.'
    },
    {
      id: 'faq-6',
      question: 'What does PulseIQ cost?',
      answer: 'During waitlist and private preview cycles, modeling pipelines run 100% complimentary. At general launch, pricing maps to your corporate ARR scale, starting with a base Series A tier of $1,500/mo. We commit to proving immediate cash-flow retention value prior to subscription billings.'
    }
  ];

  const toggleFaq = (id: string) => {
    setOpenIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="relative py-20 lg:py-32 border-b border-white/16 z-10 bg-[#07080B] overflow-hidden" style={{ perspective: '1100px' }}>
      
      {/* Cinematic Ambient Glow Grid */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.05, scale: 1.15 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-[-10%] right-10 w-[550px] h-[550px] bg-gradient-to-br from-[#8a2be2] to-[#4b0082] rounded-full blur-[130px] pointer-events-none -z-10"
      />
      
      {/* Chapter header */}
      <div className="absolute top-0 left-4 sm:left-6 lg:left-8 py-2 pointer-events-none">
        <span className="font-mono text-[10px] text-text-secondary tracking-widest block font-medium">
          06 // REASSURANCE METRICS
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title splits */}
        <motion.div 
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl text-left space-y-3 mb-16 md:mb-24"
        >
          <span className="font-mono text-xs text-white tracking-widest font-bold block uppercase">
            // ANSWERING OBJECTIONS SILENTLY
          </span>
          <h2 className="font-display font-light text-3xl sm:text-5xl text-text-primary tracking-tight leading-[1.05]">
            Frequently Queried <span className="text-white/20 font-light">Directives</span>
          </h2>
          <p className="font-sans text-sm text-white/40 max-w-md font-light">
            Review architectural considerations, encryption profiles, and cohort capacity allocations prior to waitlist registration.
          </p>
        </motion.div>

        {/* 2-Column Responsive Layout Grid for desktop Accordion */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 text-left"
        >
          {faqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <motion.div 
                key={faq.id}
                variants={rowVariants}
                className="border-b border-white/5 py-4 transition-all"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex justify-between items-center py-2 text-left group cursor-pointer focus:outline-none animate-fade-in"
                >
                  <span className="font-display text-base sm:text-lg font-light text-white group-hover:text-white transition-colors duration-150 tracking-tight pr-4">
                    {faq.question}
                  </span>
                  
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-white shrink-0 transition-transform" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white/30 group-hover:text-white shrink-0 transition-transform" />
                  )}
                </button>

                {/* Animated expandable container with custom height rules */}
                <div 
                  className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'grid-rows-[1fr] opacity-100 mt-2.5 pb-4' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="font-sans text-xs sm:text-sm text-white/40 leading-relaxed max-w-xl font-light">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
