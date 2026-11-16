// src/components/features/FloatingWhatsApp.tsx
'use client';

import React, { useState } from 'react';
import { getWhatsAppUrl } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics/events';

export const FloatingWhatsApp: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    trackEvent({
      event: 'click_whatsapp',
      location: 'floating_button',
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip on Desktop */}
      <div
        className={`hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#141416]/95 border border-[#FFE600]/40 text-xs font-semibold text-white shadow-xl backdrop-blur-md transition-all duration-300 pointer-events-none ${
          isHovered
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-2'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-[#FFE600] animate-ping" />
        <span>¿Necesitás un electricista? Escribime</span>
      </div>

      {/* Floating Button with pulsing electric yellow ring and WhatsApp green interior */}
      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Contactar a Matías Vallejos por WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] text-white shadow-[0_4px_25px_rgba(37,211,102,0.4)] border-2 border-[#FFE600] transition-transform duration-300 hover:scale-110 active:scale-95 group focus:outline-none focus-visible:ring-4 focus-visible:ring-[#FFE600]"
      >
        {/* Pulsing electric yellow aura ring */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full border-2 border-[#FFE600] animate-ring-pulse pointer-events-none"
        />

        {/* WhatsApp SVG Icon */}
        <svg
          className="w-7 h-7 sm:w-8 sm:h-8 fill-current drop-shadow-md transition-transform group-hover:scale-105"
          viewBox="0 0 24 24"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z" />
          <path d="M12 2C6.48 2 2 6.48 2 12c0 1.84.498 3.565 1.365 5.048L2 22l5.093-1.336C8.529 21.523 10.217 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18.2c-1.579 0-3.08-.432-4.382-1.2l-.314-.186-3.254.854.869-3.17-.204-.325A8.156 8.156 0 0 1 3.8 12c0-4.52 3.68-8.2 8.2-8.2s8.2 3.68 8.2 8.2-3.68 8.2-8.2 8.2z" />
        </svg>
      </a>
    </div>
  );
};
