'use client';

import React, { useEffect, useRef, useState } from 'react';

interface VoltmeterCounterProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  unit?: string;
  className?: string;
}

export const VoltmeterCounter: React.FC<VoltmeterCounterProps> = ({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  label,
  unit,
  className = '',
}) => {
  const [currentVal, setCurrentVal] = useState<number>(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1600; // ms
          const startTime = performance.now();

          const animate = (time: number) => {
            const elapsed = time - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out expo
            const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const val = easeOut * value;
            setCurrentVal(val);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCurrentVal(value);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value]);

  return (
    <div
      ref={elementRef}
      className={`relative p-5 rounded-2xl bg-[#101012] border border-[#26262A] shadow-[0_0_20px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center text-center overflow-hidden group hover:border-[#FFE600]/60 transition-all duration-300 ${className}`}
    >
      {/* Top LED Indicator */}
      <div className="absolute top-2.5 right-3 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FFE600] animate-ping opacity-75" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#FFE600]" />
        {unit && (
          <span className="text-[10px] font-mono tracking-widest text-[#FFE600] uppercase font-bold">
            {unit}
          </span>
        )}
      </div>

      {/* Voltmeter / Technical Display */}
      <div className="mt-1 flex items-baseline justify-center gap-1 font-mono">
        <span className="text-3xl sm:text-4xl font-extrabold text-[#FFE600] tracking-tight drop-shadow-[0_0_12px_rgba(255,230,0,0.4)]">
          {prefix}
          {currentVal.toFixed(decimals)}
          {suffix}
        </span>
      </div>

      {/* Label */}
      <span className="mt-2 text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] group-hover:text-white transition-colors">
        {label}
      </span>

      {/* Subtle bottom voltage meter line */}
      <div className="w-12 h-0.5 bg-[#26262A] group-hover:bg-[#FFE600] transition-colors mt-2.5 rounded-full" />
    </div>
  );
};
