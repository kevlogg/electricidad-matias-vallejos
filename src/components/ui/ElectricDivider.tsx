'use client';

import React from 'react';

interface ElectricDividerProps {
  className?: string;
  glow?: boolean;
}

export const ElectricDivider: React.FC<ElectricDividerProps> = ({
  className = '',
  glow = true,
}) => {
  return (
    <div className={`relative w-full py-6 sm:py-8 overflow-hidden flex items-center justify-center ${className}`}>
      {/* Background track line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#26262A] to-transparent relative">
        {/* Traveling electric spark packet */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-28 sm:w-44 h-1 bg-gradient-to-r from-transparent via-[#FFE600] to-transparent animate-electric-pulse-travel opacity-90"
        />
      </div>

      {/* Central technical node with pulse */}
      {glow && (
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
          <div className="w-6 h-6 rounded-full bg-[#FFE600]/10 border border-[#FFE600]/40 flex items-center justify-center shadow-[0_0_15px_rgba(255,230,0,0.3)]">
            <div className="w-2 h-2 rounded-full bg-[#FFE600] animate-ping opacity-75" />
            <div className="w-1.5 h-1.5 rounded-full bg-white absolute" />
          </div>
        </div>
      )}
    </div>
  );
};
