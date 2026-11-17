// src/components/pwa/PwaRegister.tsx
'use client';

import { useEffect } from 'react';

export function PwaRegister() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
      const handleLoad = () => {
        navigator.serviceWorker
          .register('/sw.js', { scope: '/' })
          .then((registration) => {
            registration.onupdatefound = () => {
              const installing = registration.installing;
              if (installing) {
                installing.onstatechange = () => {
                  if (installing.state === 'installed' && navigator.serviceWorker.controller) {
                    console.log('[PWA] Nueva versión disponible.');
                  }
                };
              }
            };
          })
          .catch((err) => {
            console.warn('[PWA] Registro de Service Worker omitido:', err);
          });
      };

      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return null;
}
