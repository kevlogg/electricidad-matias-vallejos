// src/components/features/Hero.tsx
'use client';

import React, { useRef, useEffect } from 'react';
import { ShieldCheck, CheckCircle2, Clock, MessageSquare, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getWhatsAppUrl } from '@/lib/constants';

export const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay handled by browser policies with muted attribute
      });
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] pt-32 pb-16 lg:pt-40 lg:pb-24 flex items-center overflow-hidden bg-[#0B0B0C]"
    >
      {/* Background Video: Web-optimized 1080p, zero overlay opacity, faststart streaming */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          poster="/videos/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center lg:object-right"
        >
          <source src="/videos/hero-electric.mp4" type="video/mp4" />
          <source src="/videos/hero-electric.webm" type="video/webm" />
        </video>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="max-w-3xl flex flex-col items-start text-left">
          {/* Main H1 Headline with high contrast text shadow */}
          <div className="relative">
            <h1
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]"
              style={{
                textShadow:
                  '0 4px 24px rgba(0,0,0,1), 0 2px 8px rgba(0,0,0,1), 0 0 40px rgba(0,0,0,0.9)',
              }}
            >
              Soluciones Eléctricas{' '}
              <span
                className="text-[#FFE600] inline-block"
                style={{
                  textShadow:
                    '0 0 25px rgba(255,230,0,0.85), 0 4px 20px rgba(0,0,0,1), 0 2px 6px rgba(0,0,0,1)',
                }}
              >
                Seguras, Rápidas
              </span>{' '}
              y Garantizadas.
            </h1>

            {/* Animated electric pulse underline */}
            <div className="mt-4 relative h-1.5 w-48 sm:w-64 bg-[#26262A] rounded-full overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFE600] to-transparent animate-beam-scan drop-shadow-[0_0_10px_#FFE600]" />
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <Button
              href={getWhatsAppUrl(
                'Hola Matías, te contacto desde la web de MV Electricidad. Necesito pedir un presupuesto por un trabajo eléctrico.'
              )}
              variant="primary"
              size="lg"
              leftIcon={<MessageSquare className="w-5 h-5" />}
              trackingLocation="hero_primary_whatsapp"
              className="font-extrabold shadow-[0_4px_30px_rgba(0,0,0,0.85)]"
            >
              Pedir Presupuesto por WhatsApp
            </Button>

            <Button
              href="#servicios"
              variant="outline"
              size="lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
              trackingLocation="hero_secondary_services"
              className="backdrop-blur-md bg-[#0B0B0C]/75 border-white/30 hover:border-[#FFE600] shadow-[0_4px_30px_rgba(0,0,0,0.85)]"
            >
              Ver Servicios
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-white/15 w-full grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
            <div className="flex items-center gap-2.5 text-sm font-semibold text-white bg-[#0B0B0C]/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
              <div className="w-7 h-7 rounded-lg bg-[#FFE600]/15 border border-[#FFE600]/40 flex items-center justify-center shrink-0 text-[#FFE600]">
                <Clock className="w-4 h-4" />
              </div>
              <span>Diagnóstico en el día</span>
            </div>

            <div className="flex items-center gap-2.5 text-sm font-semibold text-white bg-[#0B0B0C]/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
              <div className="w-7 h-7 rounded-lg bg-[#FFE600]/15 border border-[#FFE600]/40 flex items-center justify-center shrink-0 text-[#FFE600]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span>Materiales certificados</span>
            </div>

            <div className="flex items-center gap-2.5 text-sm font-semibold text-white bg-[#0B0B0C]/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
              <div className="w-7 h-7 rounded-lg bg-[#FFE600]/15 border border-[#FFE600]/40 flex items-center justify-center shrink-0 text-[#FFE600]">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span>Garantía escrita</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
