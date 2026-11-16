// src/components/features/AnimatedMvLogo.tsx
'use client';

import React from 'react';
import Image from 'next/image';

interface AnimatedMvLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showSparks?: boolean;
  priority?: boolean;
  className?: string;
}

export const AnimatedMvLogo: React.FC<AnimatedMvLogoProps> = ({
  size = 'md',
  showSparks = true,
  priority = false,
  className = '',
}) => {
  const dimensions = {
    sm: { container: 'w-10 h-10', px: 40 },
    md: { container: 'w-14 h-14', px: 56 },
    lg: { container: 'w-24 h-24', px: 96 },
    hero: { container: 'w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80', px: 320 },
  }[size];

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Background ambient radial glow for hero */}
      {size === 'hero' && (
        <>
          <div
            aria-hidden="true"
            className="absolute -inset-10 rounded-full bg-[#FFE600]/15 blur-3xl pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -inset-2 rounded-full border border-[#FFE600]/30 animate-pulse pointer-events-none"
          />
        </>
      )}

      {/* Main Logo Container */}
      <div
        className={`relative ${dimensions.container} rounded-2xl overflow-hidden bg-[#0B0B0C] border border-[#26262A] shadow-[0_0_25px_rgba(0,0,0,0.8)] transition-all duration-300 hover:border-[#FFE600]/60`}
      >
        {/* The official logo graphic */}
        <Image
          src="/images/logo.jpg"
          alt="MV Electricidad - Matías Vallejos"
          width={dimensions.px}
          height={dimensions.px}
          priority={priority}
          className={`w-full h-full object-cover ${
            size === 'hero' ? 'animate-neon-flicker' : 'hover:brightness-110'
          }`}
        />

        {/* Electrical scanline pulse over logo in hero */}
        {size === 'hero' && (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFE600]/10 to-transparent pointer-events-none animate-beam-scan"
          />
        )}
      </div>

      {/* Extra floating sparks for Hero visual effect */}
      {size === 'hero' && showSparks && (
        <div aria-hidden="true" className="pointer-events-none absolute -inset-5 z-10">
          {/* Top spark */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[#FFE600] animate-spark-1">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>

          {/* Left spark */}
          <div className="absolute top-1/3 -left-4 text-[#FFE600] animate-spark-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>

          {/* Right spark */}
          <div className="absolute top-1/2 -right-4 text-[#FFE600] animate-spark-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>

          {/* Bottom spark placed at bottom corner away from the status pill */}
          <div className="absolute -bottom-3 right-8 text-[#FFE600] animate-spark-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};
