// src/components/features/WhyChooseUsSection.tsx
'use client';

import React from 'react';
import {
  UserCheck,
  ShieldAlert,
  CheckCircle2,
  Sparkles,
  Zap,
  Gauge,
  Check,
  Award,
} from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { getWhatsAppUrl } from '@/lib/constants';

export const WhyChooseUsSection: React.FC = () => {
  const differentials = [
    {
      title: 'Atención directa por Matías Vallejos',
      desc: 'Sin intermediarios ni contratistas tercerizados. Hablás directamente con quien ejecuta y supervisa el trabajo, asegurando puntualidad, honestidad y trato personalizado desde el primer contacto.',
      icon: <UserCheck className="w-6 h-6 text-[#FFE600]" />,
    },
    {
      title: 'Seguridad absoluta ante todo',
      desc: 'Uso exclusivo de materiales normalizados (sellos IRAM / AEA). Medición de aislamiento, disparo de disyuntor y verificación de carga térmica antes de retirarme del lugar.',
      icon: <ShieldAlert className="w-6 h-6 text-[#FFE600]" />,
    },
    {
      title: 'Presupuestos claros y sin sorpresas',
      desc: 'Te explico detalladamente cuál es la causa de la falla y acordamos el costo antes de comenzar. Sin recargos ocultos ni gastos imprevistos.',
      icon: <CheckCircle2 className="w-6 h-6 text-[#FFE600]" />,
    },
    {
      title: 'Prolijidad y respeto por tu espacio',
      desc: 'Cuidado riguroso de paredes, mobiliario y pisos. Canalizaciones prolijas, peinado de tableros de nivel industrial y limpieza integral del área de trabajo al finalizar.',
      icon: <Sparkles className="w-6 h-6 text-[#FFE600]" />,
    },
  ];

  const safetyProtocols = [
    'Instrumental digital calibrado True RMS para diagnóstico certero',
    'Conductores eléctricos 100% cobre ignífugo con certificación IRAM',
    'Disyuntores y térmicas de primera línea (Schneider / Siemens / Sica)',
    'Verificación de resistencia de puesta a tierra con telurímetro',
    'Garantía escrita respaldando mano de obra y componentes',
  ];

  return (
    <section id="por-que-elegirme" className="py-20 lg:py-28 bg-[#0B0B0C] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badgeText="Confianza & Calidad Técnica"
          title="¿Por qué elegir a MV Electricidad?"
          highlightedWord="MV Electricidad"
          subtitle="La tranquilidad de un trabajo bien ejecutado desde la primera vez, con la responsabilidad y el compromiso de un profesional dedicado."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Column 1: The 4 Benefits */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {differentials.map((item, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-[#141416] border border-[#26262A] hover:border-[#FFE600] transition-all duration-300 flex items-start gap-4 sm:gap-5"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0B0B0C] border border-[#26262A] group-hover:border-[#FFE600] flex items-center justify-center shrink-0 transition-colors shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-white group-hover:text-[#FFE600] transition-colors mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2: Technical Blueprint / Safety Panel */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-[#141416] border border-[#FFE600]/40 p-7 sm:p-9 shadow-[0_0_40px_rgba(255,230,0,0.1)] overflow-hidden">
              {/* Subtle top glow bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFE600] to-transparent" />

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#FFE600] text-[#0B0B0C] flex items-center justify-center font-bold">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider font-mono text-[#FFE600] font-bold">
                    ESTÁNDAR DE TRABAJO
                  </span>
                  <h4 className="font-heading text-xl font-bold text-white">
                    Protocolo de Seguridad
                  </h4>
                </div>
              </div>

              <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6">
                Cada intervención técnica sigue las directrices de la{' '}
                <strong className="text-white">Norma AEA 90364</strong> (Asociación Electrotécnica Argentina) para instalaciones seguras en inmuebles.
              </p>

              {/* Protocol List */}
              <div className="space-y-3.5 mb-8">
                {safetyProtocols.map((protocol, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#FFE600]/10 border border-[#FFE600]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#FFE600]">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className="text-xs sm:text-sm text-white/90 leading-tight">
                      {protocol}
                    </span>
                  </div>
                ))}
              </div>

              {/* Technical readout mock */}
              <div className="rounded-xl bg-[#0B0B0C] p-4 border border-[#26262A] font-mono text-xs text-[#A1A1AA] space-y-1.5 mb-6">
                <div className="flex justify-between items-center text-[#FFE600]">
                  <span className="flex items-center gap-1.5">
                    <Gauge className="w-3.5 h-3.5" /> TEST_DISYUNTOR:
                  </span>
                  <span className="font-bold">✓ DISPARO &lt; 30ms</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>RESISTENCIA P.A.T.:</span>
                  <span className="text-emerald-400 font-bold">&lt; 5 OHMS (CONFORME)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>BALANCEO FASES:</span>
                  <span className="text-emerald-400 font-bold">DESVÍO &lt; 3%</span>
                </div>
              </div>

              <Button
                href={getWhatsAppUrl(
                  'Hola Matías, vi tu protocolo de seguridad en la web y quiero consultar por una inspección/trabajo.'
                )}
                variant="primary"
                fullWidth
                size="md"
                leftIcon={<Zap className="w-4 h-4" />}
                trackingLocation="why_us_technical_cta"
              >
                Coordinar Visita Técnica
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
