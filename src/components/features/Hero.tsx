// src/components/features/Hero.tsx
'use client';

import React, { useRef, useEffect } from 'react';
import { ShieldCheck, CheckCircle2, Clock, MessageSquare, ArrowRight, Zap, Award } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { getWhatsAppUrl } from '@/lib/constants';

export const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay handled with muted attribute
      });
    }
  }, []);

  const handleVideoEnded = () => {
    if (videoRef.current) {
      // Plays once, then resets to the starting frame and stays fixed
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center overflow-hidden bg-[#0B0B0C]"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          src="/videos/hero-electric.mp4"
          poster="/videos/hero-poster.jpg"
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={handleVideoEnded}
          className="w-full h-full object-cover object-center lg:object-right opacity-85"
        />

        {/* Gradient overlays to ensure text readability on the left while letting the right glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0C] via-[#0B0B0C]/80 via-40% to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-transparent to-[#0B0B0C]/50" />
        <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
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

          {/* Right Column: Floating Technical HUD Status Over Background Video */}
          <div className="lg:col-span-5 flex flex-col justify-end items-center lg:items-end relative z-10 pt-8 lg:pt-0">
            {/* Floating Technical Status Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#141416]/75 border border-[#FFE600]/40 backdrop-blur-md shadow-[0_0_30px_rgba(255,230,0,0.15)] flex flex-col gap-3 max-w-xs w-full">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#FFE600]">
                <span className="flex items-center gap-1 font-bold">
                  <Zap className="w-3.5 h-3.5 fill-[#FFE600]" />
                  TENSIÓN NORMALIZADA
                </span>
                <span>220V / 50Hz</span>
              </div>

              <div className="flex items-center justify-between text-xs text-[#A1A1AA] pt-2 border-t border-white/10">
                <span>Norma aplicada:</span>
                <span className="text-white font-mono font-semibold">AEA 90364</span>
              </div>

              <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#0B0B0C]/80 border border-[#26262A]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFE600] animate-ping" />
                  <span className="text-xs font-semibold text-white">Guardia Activa</span>
                </div>
                <span className="text-xs font-mono font-bold text-[#FFE600]">24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
