/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export default function GridOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* 5-column editorial vertical grid lines */}
      <div className="max-w-7xl mx-auto h-full w-full px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div className="h-full border-l border-[#1C1E1E]/40" />
        <div className="h-full border-l border-[#1C1E1E]/40" />
        <div className="h-full border-l border-[#1C1E1E]/40 hidden md:block" />
        <div className="h-full border-l border-[#1C1E1E]/40 hidden md:block" />
        <div className="h-full border-l border-[#1C1E1E]/40 hidden lg:block" />
        <div className="h-full border-l border-r border-[#1C1E1E]/40 hidden lg:block" />
      </div>

      {/* Gentle radial ambient glow purely behind content */}
      <div 
        className="absolute top-[-10%] left-[50%] -translate-x-[50%] w-[1000px] h-[600px] rounded-full opacity-10 pointer-events-none mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, rgba(8,9,9,0) 75%)',
          filter: 'blur(100px)'
        }}
      />
    </div>
  );
}
