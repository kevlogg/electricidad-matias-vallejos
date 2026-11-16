// src/components/features/ElectricDivider.tsx
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
    <div className={`relative w-full py-4 sm:py-6 overflow-hidden flex items-center justify-center pointer-events-none ${className}`}>
      {/* Background track line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#26262A] to-transparent relative">
        {/* Traveling electric spark packet */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-32 sm:w-48 h-1 bg-gradient-to-r from-transparent via-[#FFE600] to-transparent animate-electric-pulse-travel opacity-90 drop-shadow-[0_0_8px_#FFE600]"
        />
      </div>

      {/* Central technical node with pulse */}
      {glow && (
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
          <div className="w-5 h-5 rounded-full bg-[#0B0B0C] border border-[#FFE600]/40 flex items-center justify-center shadow-[0_0_15px_rgba(255,230,0,0.3)]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FFE600] animate-ping opacity-75" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#FFE600] absolute" />
          </div>
        </div>
      )}
    </div>
  );
};
