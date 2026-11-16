// src/components/features/FaqSection.tsx
'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQ_DATA, getWhatsAppUrl } from '@/lib/constants';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#0B0B0C] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badgeText="Preguntas Frecuentes"
          title="Respuestas Claras a Dudas Habituales"
          highlightedWord="Dudas Habituales"
          subtitle="Todo lo que necesitás saber antes de solicitar tu servicio eléctrico."
        />

        <div className="space-y-4">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#141416] border border-[#26262A] overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFE600]"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading font-bold text-base sm:text-lg text-white">
                    {faq.question}
                  </span>
                  <span
                    className={`w-8 h-8 rounded-lg bg-[#0B0B0C] border border-[#26262A] flex items-center justify-center shrink-0 text-[#FFE600] transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#FFE600]/10 border-[#FFE600]/30' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-[#A1A1AA] leading-relaxed border-t border-[#26262A]/60 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions? */}
        <div className="mt-12 p-6 rounded-2xl bg-[#141416]/60 border border-[#26262A] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFE600]/10 border border-[#FFE600]/30 flex items-center justify-center text-[#FFE600] shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-white text-sm sm:text-base">
                ¿Tenés otra consulta que no figura acá?
              </h4>
              <p className="text-xs text-[#A1A1AA]">
                Escribime directamente por WhatsApp y te asesoro en el momento.
              </p>
            </div>
          </div>

          <Button
            href={getWhatsAppUrl('Hola Matías, tengo una consulta específica para hacerte.')}
            variant="secondary"
            size="sm"
            trackingLocation="faq_custom_question"
          >
            Hacer mi consulta
          </Button>
        </div>
      </div>
    </section>
  );
};
