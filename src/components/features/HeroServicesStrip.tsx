// src/components/features/HeroServicesStrip.tsx
'use client';

import React from 'react';
import {
  Zap,
  Wrench,
  Cpu,
  AlertTriangle,
  Lightbulb,
  ShieldCheck,
  CheckCircle2,
  Clock,
} from 'lucide-react';

export const HeroServicesStrip: React.FC = () => {
  const items = [
    { label: 'Instalaciones Domiciliarias & Comerciales', icon: Zap },
    { label: 'Reparaciones & Detección de Fallas', icon: Wrench },
    { label: 'Tableros Eléctricos & Protecciones', icon: Cpu },
    { label: 'Urgencias Eléctricas 24/7', icon: AlertTriangle, highlight: true },
    { label: 'Iluminación LED Interior & Exterior', icon: Lightbulb },
    { label: 'Diagnóstico Preciso en el Día', icon: Clock },
    { label: 'Trabajo Prolijo & Limpieza Garantizada', icon: CheckCircle2 },
    { label: 'Cumplimiento Normas de Seguridad AEA', icon: ShieldCheck, highlight: true },
  ];

  // Duplicate items for infinite seamless scroll
  const marqueeItems = [...items, ...items];

  return (
    <div
      aria-label="Servicios destacados"
      className="relative w-full bg-[#101012] border-y border-[#26262A] py-4 overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.6)] z-20"
    >
      {/* Edge gradient masks for smooth fade in/out */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#101012] to-transparent z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#101012] to-transparent z-10"
      />

      {/* Infinite Marquee Track */}
      <div className="animate-marquee flex items-center gap-6 sm:gap-8">
        {marqueeItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-xl border text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-colors select-none ${
                item.highlight
                  ? 'bg-[#FFE600]/10 border-[#FFE600]/40 text-[#FFE600] shadow-[0_0_15px_rgba(255,230,0,0.15)]'
                  : 'bg-[#141416] border-[#26262A] text-white/90 hover:border-[#FFE600]/50'
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${
                  item.highlight ? 'text-[#FFE600] fill-[#FFE600]/30' : 'text-[#FFE600]'
                }`}
              />
              <span>{item.label}</span>
              <span className="text-white/20 ml-2">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
