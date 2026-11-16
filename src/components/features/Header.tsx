// src/components/features/Header.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, PhoneCall, Zap } from 'lucide-react';
import { BUSINESS_CONFIG, getWhatsAppUrl } from '@/lib/constants';
import { Button } from '@/components/ui/Button';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Servicios', href: '#servicios' },
    { name: 'Por qué elegirme', href: '#por-que-elegirme' },
    { name: 'Zonas y Horarios', href: '#zonas-y-horarios' },
    { name: 'Reseñas', href: '#resenas' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B0B0C]/90 backdrop-blur-md border-b border-[#26262A] shadow-[0_4px_30px_rgba(0,0,0,0.8)] py-3'
          : 'bg-transparent border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand Name */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFE600] rounded-xl p-1"
            aria-label="MV Electricidad - Inicio"
          >
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-[#26262A] group-hover:border-[#FFE600] transition-colors shrink-0 bg-[#0B0B0C]">
              <Image
                src="/images/logo.jpg"
                alt="Logo MV Electricidad"
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-lg sm:text-xl tracking-tight text-white flex items-center gap-1 group-hover:text-[#FFE600] transition-colors">
                MV Electricidad
                <Zap className="w-4 h-4 text-[#FFE600] fill-[#FFE600]" />
              </span>
              <span className="text-[11px] font-medium text-[#A1A1AA] tracking-wider uppercase">
                Matías Vallejos
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Navegación principal">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-[#A1A1AA] hover:text-[#FFE600] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#FFE600] hover:after:w-full after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <Button
              href={getWhatsAppUrl('Hola Matías, te contacto por una URGENCIA eléctrica desde la web.')}
              variant="primary"
              size="sm"
              leftIcon={<PhoneCall className="w-4 h-4 animate-bounce" />}
              trackingLocation="header_urgencias"
              aria-label="Contactar a Matías Vallejos por Urgencias o WhatsApp"
            >
              Urgencias / WhatsApp
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-xl text-[#A1A1AA] hover:text-white hover:bg-[#141416] border border-[#26262A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFE600]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú de navegación'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#FFE600]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B0B0C]/98 backdrop-blur-xl border-b border-[#26262A] px-4 pt-4 pb-6 shadow-2xl animate-in fade-in duration-200">
          <nav className="flex flex-col gap-3" aria-label="Navegación móvil">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-base font-medium text-[#A1A1AA] hover:text-[#FFE600] hover:bg-[#141416] transition-colors flex items-center justify-between"
              >
                <span>{link.name}</span>
                <Zap className="w-4 h-4 text-[#FFE600]/40" />
              </a>
            ))}
            <div className="pt-3 mt-2 border-t border-[#26262A] flex flex-col gap-2">
              <Button
                href={getWhatsAppUrl('Hola Matías, tengo una urgencia eléctrica y te contacto desde la web.')}
                variant="primary"
                fullWidth
                size="md"
                leftIcon={<PhoneCall className="w-4 h-4" />}
                trackingLocation="mobile_menu_cta"
              >
                Urgencias / WhatsApp Directo
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
