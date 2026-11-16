// src/components/features/Hero.tsx
'use client';

import React from 'react';
import { ShieldCheck, CheckCircle2, Clock, MessageSquare, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AnimatedMvLogo } from './AnimatedMvLogo';
import { getWhatsAppUrl } from '@/lib/constants';

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center overflow-hidden bg-[#0B0B0C]"
    >
      {/* Background blueprint grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-blueprint opacity-60 pointer-events-none"
      />

      {/* Radial yellow energy gradients */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#FFE600]/10 via-[#FFE600]/3 to-transparent blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 right-10 w-96 h-96 bg-[#FFE600]/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            {/* Top Badge */}
            <div className="mb-5 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <Badge variant="yellow" size="md">
                Servicio Eléctrico Profesional • Atención Rápida
              </Badge>
            </div>

            {/* Main H1 Headline with electric pulse underline */}
            <div className="relative">
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
                Soluciones Eléctricas{' '}
                <span className="text-[#FFE600] drop-shadow-electric inline-block">
                  Seguras, Rápidas
                </span>{' '}
                y Garantizadas.
              </h1>

              {/* Animated electric pulse underline */}
              <div className="mt-3 relative h-1.5 w-48 sm:w-64 bg-[#26262A] rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFE600] to-transparent animate-beam-scan drop-shadow-[0_0_8px_#FFE600]" />
              </div>
            </div>

            {/* Subtitle */}
            <p className="mt-6 text-base sm:text-lg lg:text-xl text-[#A1A1AA] leading-relaxed max-w-2xl font-normal">
              Instalaciones, reparaciones, tableros y urgencias domiciliarias o
              comerciales a cargo de{' '}
              <strong className="text-white font-semibold">Matías Vallejos</strong>.
              Trabajo prolijo, diagnóstico preciso y estricto cumplimiento de
              normas de seguridad.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <Button
                href={getWhatsAppUrl(
                  'Hola Matías, te contacto desde la web de MV Electricidad. Necesito pedir un presupuesto por un trabajo eléctrico.'
                )}
                variant="primary"
                size="lg"
                leftIcon={<MessageSquare className="w-5 h-5" />}
                trackingLocation="hero_primary_whatsapp"
                className="font-extrabold"
              >
                Pedir Presupuesto por WhatsApp
              </Button>

              <Button
                href="#servicios"
                variant="outline"
                size="lg"
                rightIcon={<ArrowRight className="w-5 h-5" />}
                trackingLocation="hero_secondary_services"
              >
                Ver Servicios
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-10 pt-8 border-t border-[#26262A] w-full grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="flex items-center gap-2.5 text-sm font-medium text-white/90">
                <div className="w-7 h-7 rounded-lg bg-[#FFE600]/10 border border-[#FFE600]/30 flex items-center justify-center shrink-0 text-[#FFE600]">
                  <Clock className="w-4 h-4" />
                </div>
                <span>Diagnóstico en el día</span>
              </div>

              <div className="flex items-center gap-2.5 text-sm font-medium text-white/90">
                <div className="w-7 h-7 rounded-lg bg-[#FFE600]/10 border border-[#FFE600]/30 flex items-center justify-center shrink-0 text-[#FFE600]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span>Materiales certificados</span>
              </div>

              <div className="flex items-center gap-2.5 text-sm font-medium text-white/90">
                <div className="w-7 h-7 rounded-lg bg-[#FFE600]/10 border border-[#FFE600]/30 flex items-center justify-center shrink-0 text-[#FFE600]">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span>Garantía escrita</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Animated MV Logo */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center relative z-10">
            {/* Technical HUD Frame */}
            <div className="relative p-6 sm:p-8 rounded-3xl bg-[#141416]/80 border border-[#26262A] backdrop-blur-md shadow-2xl">
              {/* Corner coordinate marks */}
              <span className="absolute top-2 left-3 text-[10px] font-mono text-[#FFE600]/50 tracking-wider">
                [VOLT-220V/50HZ]
              </span>
              <span className="absolute top-2 right-3 text-[10px] font-mono text-[#A1A1AA]/50 tracking-wider">
                SEC_01 // SECURE
              </span>
              <span className="absolute bottom-2 left-3 text-[10px] font-mono text-[#A1A1AA]/50 tracking-wider">
                SYS_STATUS: ACTIVE
              </span>
              <span className="absolute bottom-2 right-3 text-[10px] font-mono text-[#FFE600]/50 tracking-wider">
                AEA-90364
              </span>

              {/* Animated Logo Component */}
              <AnimatedMvLogo size="hero" showSparks priority />

              {/* Status pill under logo */}
              <div className="mt-6 flex items-center justify-between px-3.5 py-2 rounded-xl bg-[#0B0B0C] border border-[#26262A]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFE600] animate-ping" />
                  <span className="text-xs font-semibold text-white tracking-wide">
                    Guardia de Atención Rápida
                  </span>
                </div>
                <span className="text-xs font-mono text-[#FFE600] font-bold">
                  24/7 ACTIVO
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
