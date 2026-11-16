// src/components/features/ServicesSection.tsx
'use client';

import React from 'react';
import {
  AlertTriangle,
  Cpu,
  Zap,
  Lightbulb,
  ShieldCheck,
  Wrench,
  Check,
  MessageCircle,
} from 'lucide-react';
import { SERVICES_LIST, getWhatsAppUrl } from '@/lib/constants';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';

export const ServicesSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    const iconProps = {
      className:
        'w-6 h-6 text-[#FFE600] group-hover:drop-shadow-[0_0_10px_#FFE600] transition-all duration-300',
    };
    switch (iconName) {
      case 'AlertTriangle':
        return <AlertTriangle {...iconProps} />;
      case 'Cpu':
        return <Cpu {...iconProps} />;
      case 'Zap':
        return <Zap {...iconProps} />;
      case 'Lightbulb':
        return <Lightbulb {...iconProps} />;
      case 'ShieldCheck':
        return <ShieldCheck {...iconProps} />;
      case 'Wrench':
        return <Wrench {...iconProps} />;
      default:
        return <Zap {...iconProps} />;
    }
  };

  return (
    <section id="servicios" className="py-20 lg:py-28 bg-[#0B0B0C] relative">
      {/* Background blueprint subtle */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-blueprint-dense opacity-40 pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badgeText="Especialidades y Cobertura Técnica"
          title="Servicios Eléctricos Profesionales"
          highlightedWord="Profesionales"
          subtitle="Trabajos certificados, presupuestos sin vueltas y cumplimiento riguroso de normas de seguridad AEA en cada intervención."
        />

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES_LIST.map((service) => (
            <div
              key={service.id}
              className={`group relative rounded-2xl bg-[#141416] p-7 border transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 ${
                service.isPopular
                  ? 'border-[#FFE600]/40 shadow-[0_0_25px_rgba(255,230,0,0.12)]'
                  : 'border-[#26262A] hover:border-[#FFE600] hover:shadow-[0_0_30px_rgba(255,230,0,0.18)]'
              }`}
            >
              {/* Popular badge */}
              {service.isPopular && (
                <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-[#FFE600] text-[#0B0B0C] font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(255,230,0,0.5)]">
                  Atención Prioritaria
                </div>
              )}

              <div>
                {/* Header: Icon & Number */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#0B0B0C] border border-[#26262A] group-hover:border-[#FFE600] flex items-center justify-center transition-colors">
                    {getIcon(service.icon)}
                  </div>
                  <span className="font-mono text-sm font-bold text-[#A1A1AA]/50 group-hover:text-[#FFE600] transition-colors">
                    {service.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading text-xl font-bold text-white mb-2.5 group-hover:text-[#FFE600] transition-colors">
                  {service.title}
                </h3>

                {/* Full description */}
                <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6">
                  {service.fullDesc}
                </p>

                {/* Features checklist */}
                <ul className="space-y-2 mb-8 pt-4 border-t border-[#26262A]">
                  {service.features.map((feat, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-white/90"
                    >
                      <Check className="w-4 h-4 text-[#FFE600] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Button
                  href={getWhatsAppUrl(service.whatsappMessage)}
                  variant="secondary"
                  size="sm"
                  fullWidth
                  leftIcon={<MessageCircle className="w-4 h-4" />}
                  trackingLocation={`service_card_${service.id}`}
                  aria-label={`Consultar por ${service.title} por WhatsApp`}
                >
                  Consultar por WhatsApp
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
