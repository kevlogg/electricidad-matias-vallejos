// src/components/features/Footer.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Zap,
  Phone,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  Shield,
  ArrowRight,
} from 'lucide-react';
import { BUSINESS_CONFIG, SERVICES_LIST, getWhatsAppUrl } from '@/lib/constants';
import { Button } from '@/components/ui/Button';

export const Footer: React.FC = () => {
  return (
    <footer id="contacto" className="bg-[#070708] border-t border-[#26262A] text-white pt-16 pb-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#26262A]">
          {/* Column 1: Brand & Philosophy (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFE600] rounded-xl p-1 mb-4"
              aria-label="MV Electricidad"
            >
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#26262A] bg-[#0B0B0C]">
                <Image
                  src="/images/logo.jpg"
                  alt="Logo MV Electricidad"
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-xl tracking-tight text-white flex items-center gap-1 group-hover:text-[#FFE600] transition-colors">
                  MV Electricidad
                  <Zap className="w-4 h-4 text-[#FFE600] fill-[#FFE600]" />
                </span>
                <span className="text-[11px] font-medium text-[#A1A1AA] uppercase tracking-wider">
                  Matías Vallejos
                </span>
              </div>
            </Link>

            <p className="text-sm text-[#A1A1AA] leading-relaxed mb-5">
              Servicios eléctricos profesionales integrales para hogares, comercios y consorcios. Compromiso inquebrantable con la seguridad, la durabilidad de los materiales y la prolijidad técnica.
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-[#FFE600] bg-[#141416] px-3.5 py-2 rounded-xl border border-[#26262A]">
              <Shield className="w-4 h-4 shrink-0" />
              <span>Instalaciones bajo normativa AEA 90364</span>
            </div>
          </div>

          {/* Column 2: Main Services (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-heading font-bold text-base text-white tracking-wide uppercase text-xs mb-4 text-[#FFE600]">
              Servicios Principales
            </h4>
            <ul className="space-y-2.5 text-sm">
              {SERVICES_LIST.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <a
                    href={`#servicios`}
                    className="text-[#A1A1AA] hover:text-[#FFE600] transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#FFE600]" />
                    <span>{service.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Local Info & Google Profile (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-heading font-bold text-base text-white tracking-wide uppercase text-xs mb-4 text-[#FFE600]">
              Información Local & Contacto
            </h4>
            <ul className="space-y-3 text-sm text-[#A1A1AA]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FFE600] shrink-0 mt-0.5" />
                <span>CABA y principales localidades de Gran Buenos Aires</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#FFE600] shrink-0 mt-0.5" />
                <span>Lun a Vie 08-20hs • Sáb 08:30-14hs (Urgencias 24/7)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FFE600] shrink-0" />
                <a
                  href={`tel:${BUSINESS_CONFIG.phoneClean}`}
                  className="hover:text-white transition-colors font-mono"
                >
                  {BUSINESS_CONFIG.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#FFE600] shrink-0" />
                <a
                  href={`mailto:${BUSINESS_CONFIG.email}`}
                  className="hover:text-white transition-colors"
                >
                  {BUSINESS_CONFIG.email}
                </a>
              </li>
            </ul>

            <div className="mt-4 pt-3 border-t border-[#26262A] flex items-center gap-3">
              <a
                href={BUSINESS_CONFIG.social.googleBusiness}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#A1A1AA] hover:text-[#FFE600] flex items-center gap-1 transition-colors"
              >
                <span>Perfil de Google</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-[#26262A]">•</span>
              <a
                href={BUSINESS_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#A1A1AA] hover:text-[#FFE600] flex items-center gap-1 transition-colors"
              >
                <span>Instagram</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Column 4: Quick Action Mini CTA (2 cols) */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <h4 className="font-heading font-bold text-base text-white tracking-wide uppercase text-xs mb-4 text-[#FFE600]">
                Acción Rápida
              </h4>
              <p className="text-xs text-[#A1A1AA] leading-relaxed mb-4">
                Solicitá una visita técnica en el día o recibí asesoramiento directo.
              </p>
            </div>

            <Button
              href={getWhatsAppUrl('Hola Matías, quisiera solicitar una visita técnica en mi domicilio.')}
              variant="primary"
              size="sm"
              fullWidth
              trackingLocation="footer_solicitar_visita"
              className="text-xs font-bold"
            >
              Solicitar Visita Técnica
            </Button>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A1A1AA] gap-3">
          <p>© 2026 MV Electricidad - Matías Vallejos. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            <span>Desarrollado para alta conversión y máxima seguridad eléctrica</span>
            <Zap className="w-3.5 h-3.5 text-[#FFE600]" />
          </p>
        </div>
      </div>
    </footer>
  );
};
