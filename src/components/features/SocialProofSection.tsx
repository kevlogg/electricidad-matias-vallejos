// src/components/features/SocialProofSection.tsx
'use client';

import React from 'react';
import { Star, CheckCircle, ExternalLink, MessageSquare } from 'lucide-react';
import { TESTIMONIALS_DATA, BUSINESS_CONFIG, getWhatsAppUrl } from '@/lib/constants';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';

export const SocialProofSection: React.FC = () => {
  return (
    <section id="resenas" className="py-20 lg:py-28 bg-[#0B0B0C] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Lo que opinan quienes confiaron en MV Electricidad"
          highlightedWord="MV Electricidad"
          subtitle="Compromiso innegociable con la calidad y la seguridad. Calificación perfecta en Google basada en la satisfacción de nuestros clientes."
        />

        {/* Google Score Banner */}
        <div className="max-w-2xl mx-auto mb-14 p-6 rounded-2xl bg-[#141416] border border-[#26262A] shadow-[0_0_30px_rgba(0,0,0,0.6)] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {/* Google "G" representation */}
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-lg shrink-0">
              <svg width="30" height="30" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.66-5.17 3.66-9.12z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.27 21.39 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.25C.45 8.16 0 9.98 0 12s.45 3.84 1.25 5.42l4.03-3.13z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.27 2.61 1.25 6.58l4.03 3.13c.95-2.83 3.6-4.96 6.72-4.96z"
                />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-2xl font-black text-white">5.0</span>
                <div className="flex items-center text-[#FFE600]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#FFE600]" />
                  ))}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#A1A1AA] mt-0.5">
                Calificación promedio en Google Business Profile ({BUSINESS_CONFIG.reviewCount} opiniones verificadas)
              </p>
            </div>
          </div>

          <Button
            href={BUSINESS_CONFIG.social.googleBusiness}
            variant="outline"
            size="sm"
            isExternal
            rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
            trackingLocation="google_reviews_badge"
          >
            Ver en Google
          </Button>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS_DATA.map((review) => (
            <div
              key={review.id}
              className="p-6 sm:p-7 rounded-2xl bg-[#141416] border border-[#26262A] hover:border-[#FFE600] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Author Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FFE600]/10 border border-[#FFE600]/40 flex items-center justify-center font-bold text-sm text-[#FFE600]">
                      {review.avatarText}
                    </div>
                    <div>
                      <h4 className="font-heading text-base font-bold text-white leading-tight">
                        {review.author}
                      </h4>
                      <p className="text-xs text-[#A1A1AA]">{review.location}</p>
                    </div>
                  </div>
                  <div className="flex text-[#FFE600]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FFE600]" />
                    ))}
                  </div>
                </div>

                {/* Work Done Tag */}
                <div className="mb-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0B0B0C] border border-[#26262A] text-xs font-medium text-[#FFE600]">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{review.workDone}</span>
                </div>

                {/* Comment Text */}
                <p className="text-sm text-[#A1A1AA] leading-relaxed italic">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              {/* Verified footer */}
              <div className="mt-6 pt-4 border-t border-[#26262A] flex items-center justify-between text-xs text-[#A1A1AA]/60">
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <CheckCircle className="w-3 h-3" /> Reseña verificada en Google
                </span>
                <span>{review.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Secondary review CTA */}
        <div className="mt-12 text-center">
          <Button
            href={getWhatsAppUrl(
              'Hola Matías, vi las reseñas en tu web y quería consultarte por un trabajo eléctrico.'
            )}
            variant="secondary"
            size="md"
            leftIcon={<MessageSquare className="w-4 h-4 text-[#FFE600]" />}
            trackingLocation="testimonials_bottom_cta"
          >
            Quiero una atención 5 estrellas para mi hogar o negocio
          </Button>
        </div>
      </div>
    </section>
  );
};
