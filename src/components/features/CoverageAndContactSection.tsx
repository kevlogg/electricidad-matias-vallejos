// src/components/features/CoverageAndContactSection.tsx
'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Send,
  Sparkles,
  CheckCircle,
} from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { COVERAGE_ZONES, BUSINESS_CONFIG } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics/events';

export const CoverageAndContactSection: React.FC = () => {
  const [selectedService, setSelectedService] = useState('Urgencia / Cortocircuito');
  const [urgencyLevel, setUrgencyLevel] = useState('Lo antes posible (Hoy)');
  const [zoneInput, setZoneInput] = useState('');
  const [commentInput, setCommentInput] = useState('');

  const servicesOptions = [
    'Urgencia / Cortocircuito',
    'Tablero Eléctrico / Disyuntor',
    'Instalación / Cableado completo',
    'Línea para Aire Acondicionado',
    'Iluminación LED / Spots',
    'Mantenimiento / Medición',
  ];

  const urgencyOptions = [
    'Lo antes posible (Hoy)',
    'Dentro de las 24/48 hs',
    'Planificado para los próximos días',
  ];

  const handleSendCustomQuote = (e: React.FormEvent) => {
    e.preventDefault();

    trackEvent({
      event: 'submit_quote_request',
      service: selectedService,
      urgency: urgencyLevel,
      zone: zoneInput,
    });

    const text = `Hola Matías, te contacto desde la web de MV Electricidad para solicitar presupuesto:
• Servicio: ${selectedService}
• Urgencia: ${urgencyLevel}
• Zona / Barrio: ${zoneInput.trim() ? zoneInput.trim() : 'A coordinar'}
${commentInput.trim() ? `• Detalle adicional: ${commentInput.trim()}` : ''}`;

    const url = `https://wa.me/${BUSINESS_CONFIG.phoneClean}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="zonas-y-horarios" className="py-20 lg:py-28 bg-[#0B0B0C] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badgeText="Cobertura Local & Coordinación Rápida"
          title="Zonas de Atención y Presupuesto Express"
          highlightedWord="Zonas de Atención"
          subtitle="Atención en toda la Ciudad de Buenos Aires y principales zonas de Gran Buenos Aires con respuesta inmediata."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left Column: Coverage & Hours */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Zones Card */}
            <div className="p-7 rounded-2xl bg-[#141416] border border-[#26262A]">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#FFE600]/10 border border-[#FFE600]/30 flex items-center justify-center text-[#FFE600]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-white">
                    Zonas de Cobertura
                  </h3>
                  <p className="text-xs text-[#A1A1AA]">
                    Atención domiciliaria y comercial directa
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {COVERAGE_ZONES.map((zone, idx) => (
                  <div key={idx} className="pb-4 border-b border-[#26262A] last:border-b-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-white text-sm">
                        {zone.name}
                      </span>
                      <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#FFE600]/10 text-[#FFE600] border border-[#FFE600]/20">
                        {zone.badge}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {zone.neighborhoods.map((n, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md bg-[#0B0B0C] border border-[#26262A] text-xs text-[#A1A1AA]"
                        >
                          {n}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hours Card */}
            <div className="p-7 rounded-2xl bg-[#141416] border border-[#26262A]">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#FFE600]/10 border border-[#FFE600]/30 flex items-center justify-center text-[#FFE600]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-white">
                    Horarios de Atención
                  </h3>
                  <p className="text-xs text-[#A1A1AA]">
                    Disponibilidad técnica continua
                  </p>
                </div>
              </div>

              <div className="space-y-3 font-normal text-sm">
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#0B0B0C] border border-[#26262A]">
                  <span className="text-white font-medium">Lunes a Viernes</span>
                  <span className="text-[#FFE600] font-mono">08:00 a 20:00 hs</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#0B0B0C] border border-[#26262A]">
                  <span className="text-white font-medium">Sábados</span>
                  <span className="text-[#FFE600] font-mono">08:30 a 14:00 hs</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#FFE600]/10 border border-[#FFE600]/30">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FFE600] animate-ping" />
                    <span className="text-white font-bold">Guardia de Urgencias</span>
                  </div>
                  <span className="text-[#FFE600] font-mono font-bold">24 HORAS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive WhatsApp Quote Wizard */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-[#141416] border border-[#FFE600]/40 p-7 sm:p-9 shadow-[0_0_35px_rgba(255,230,0,0.12)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#FFE600] text-[#0B0B0C] flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-white">
                    Cotizador Rápido
                  </h3>
                  <p className="text-xs text-[#A1A1AA]">
                    Armá tu consulta y recibí respuesta de Matías en minutos
                  </p>
                </div>
              </div>

              <form onSubmit={handleSendCustomQuote} className="space-y-5">
                {/* Step 1: Select Service */}
                <div>
                  <label className="block text-xs uppercase font-mono tracking-wider text-[#A1A1AA] mb-2 font-medium">
                    1. ¿Qué tipo de trabajo necesitás realizar?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {servicesOptions.map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setSelectedService(opt)}
                        className={`text-left p-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                          selectedService === opt
                            ? 'bg-[#FFE600] text-[#0B0B0C] border-[#FFE600] font-bold shadow-[0_0_12px_rgba(255,230,0,0.4)]'
                            : 'bg-[#0B0B0C] text-[#A1A1AA] border-[#26262A] hover:border-white/30 hover:text-white'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Urgency level */}
                <div>
                  <label className="block text-xs uppercase font-mono tracking-wider text-[#A1A1AA] mb-2 font-medium">
                    2. ¿Con qué urgencia lo requerís?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {urgencyOptions.map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setUrgencyLevel(opt)}
                        className={`text-center p-2 rounded-xl border text-xs font-medium transition-all ${
                          urgencyLevel === opt
                            ? 'bg-[#FFE600]/20 text-[#FFE600] border-[#FFE600] font-bold'
                            : 'bg-[#0B0B0C] text-[#A1A1AA] border-[#26262A] hover:border-white/30'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: Zone Input */}
                <div>
                  <label
                    htmlFor="zone-input"
                    className="block text-xs uppercase font-mono tracking-wider text-[#A1A1AA] mb-1.5 font-medium"
                  >
                    3. ¿En qué barrio o localidad estás?
                  </label>
                  <input
                    id="zone-input"
                    type="text"
                    value={zoneInput}
                    onChange={(e) => setZoneInput(e.target.value)}
                    placeholder="Ej: Palermo, Belgrano, Vicente López..."
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0B0C] border border-[#26262A] text-white placeholder-[#71717A] text-sm focus:outline-none focus:border-[#FFE600] focus:ring-1 focus:ring-[#FFE600] transition-colors"
                  />
                </div>

                {/* Optional comment */}
                <div>
                  <label
                    htmlFor="comment-input"
                    className="block text-xs uppercase font-mono tracking-wider text-[#A1A1AA] mb-1.5 font-medium"
                  >
                    4. Breve descripción (opcional)
                  </label>
                  <textarea
                    id="comment-input"
                    rows={2}
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Ej: Salta el disyuntor cuando enchufo el lavarropas..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0B0B0C] border border-[#26262A] text-white placeholder-[#71717A] text-sm focus:outline-none focus:border-[#FFE600] focus:ring-1 focus:ring-[#FFE600] transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    size="lg"
                    leftIcon={<Send className="w-5 h-5" />}
                    trackingLocation="quote_wizard_submit"
                    className="font-black text-base"
                  >
                    Enviar Consulta por WhatsApp
                  </Button>
                  <p className="text-[11px] text-center text-[#A1A1AA] mt-2.5 flex items-center justify-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    Sin compromiso de contratación. Te respondemos de inmediato.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
