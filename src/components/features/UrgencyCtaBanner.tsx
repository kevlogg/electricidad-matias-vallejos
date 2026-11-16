// src/components/features/UrgencyCtaBanner.tsx
'use client';

import React from 'react';
import { AlertCircle, PhoneCall } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { BorderBeam } from '@/components/ui/BorderBeam';
import { getWhatsAppUrl } from '@/lib/constants';

export const UrgencyCtaBanner: React.FC = () => {
  return (
    <section className="relative py-14 bg-gradient-to-r from-[#141416] via-[#1c1c20] to-[#141416] border-y border-[#FFE600]/30 overflow-hidden">
      <BorderBeam size={350} duration={8} borderWidth={2} />
      {/* Background ambient pulse */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#FFE600]/10 blur-3xl pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          {/* Left Text */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFE600]/10 border border-[#FFE600]/30 text-[#FFE600] text-xs font-bold uppercase tracking-wider mb-3">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Respuesta Inmediata • Sin Pérdida de Tiempo</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              ¿Tenés un problema eléctrico o necesitás cotizar una instalación?
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#A1A1AA]">
              Contactate directamente con Matías Vallejos. Atención técnica especializada y presupuestos claros en el acto.
            </p>
          </div>

          {/* Right Action */}
          <div className="shrink-0 flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto">
            <Button
              href={getWhatsAppUrl(
                'Hola Matías, tengo una consulta urgente sobre un problema eléctrico en mi propiedad.'
              )}
              variant="emergency"
              size="lg"
              leftIcon={<PhoneCall className="w-5 h-5 animate-pulse" />}
              trackingLocation="interstitial_urgency_cta"
              className="font-black text-base"
            >
              Contactar por WhatsApp Ahora
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
