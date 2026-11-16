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
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import { SERVICES_LIST, getWhatsAppUrl } from '@/lib/constants';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';

export const ServicesSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    const iconProps = {
      className:
        'w-5 h-5 text-[#FFE600] group-hover:scale-110 transition-transform duration-300',
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
    <section id="servicios" className="py-16 lg:py-24 bg-[#0B0B0C] relative">
      {/* Background blueprint subtle */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-blueprint-dense opacity-40 pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Servicios Eléctricos Profesionales"
          highlightedWord="Profesionales"
          subtitle="Trabajos certificados, diagnósticos precisos y cumplimiento riguroso de normas de seguridad AEA en cada intervención."
        />

        {/* 6 Services Grid - Compact & Balanced */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {SERVICES_LIST.map((service) => (
            <div
              key={service.id}
              className={`group relative rounded-2xl bg-[#141416] p-5 sm:p-6 border transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 ${
                service.isPopular
                  ? 'border-[#FFE600]/50 shadow-[0_0_20px_rgba(255,230,0,0.12)]'
                  : 'border-[#26262A] hover:border-[#FFE600] hover:shadow-[0_0_25px_rgba(255,230,0,0.15)]'
              }`}
            >
              <div>
                {/* Header: Icon & Number */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0B0B0C] border border-[#26262A] group-hover:border-[#FFE600] flex items-center justify-center transition-colors shadow-inner">
                    {getIcon(service.icon)}
                  </div>
                  <span className="font-mono text-xs font-bold text-[#A1A1AA]/40 group-hover:text-[#FFE600] transition-colors">
                    {service.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading text-lg font-bold text-white mb-2 group-hover:text-[#FFE600] transition-colors leading-snug">
                  {service.title}
                </h3>

                {/* Concise Description */}
                <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed mb-5">
                  {service.fullDesc}
                </p>
              </div>

              {/* Action Button: Compact & Direct */}
              <div className="pt-2 border-t border-[#26262A]/60">
                <Button
                  href={getWhatsAppUrl(service.whatsappMessage)}
                  variant="secondary"
                  size="sm"
                  fullWidth
                  rightIcon={<ArrowRight className="w-3.5 h-3.5 text-[#FFE600]" />}
                  trackingLocation={`service_card_${service.id}`}
                  className="py-2.5 text-xs font-bold"
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
