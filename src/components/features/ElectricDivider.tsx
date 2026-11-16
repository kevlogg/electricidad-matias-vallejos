// src/components/features/ElectricDivider.tsx
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
    <div className={`relative w-full h-[1px] bg-[#26262A] overflow-hidden ${className}`}>
      {/* Scanning electrical current beam */}
      <div
        className={`absolute inset-y-0 w-28 bg-gradient-to-r from-transparent via-[#FFE600] to-transparent animate-beam-scan ${
          glow ? 'drop-shadow-[0_0_8px_#FFE600]' : ''
        }`}
      />
    </div>
  );
};
