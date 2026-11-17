// src/components/admin/AdminPwaInstallModal.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Download,
  X,
  CheckCircle2,
  Smartphone,
  Share2,
  PlusSquare,
  Laptop,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface AdminPwaInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  deferredPrompt: any;
  isStandalone: boolean;
  isIOS: boolean;
}

export const AdminPwaInstallModal: React.FC<AdminPwaInstallModalProps> = ({
  isOpen,
  onClose,
  deferredPrompt,
  isStandalone,
  isIOS,
}) => {
  const [installedSuccess, setInstalledSuccess] = useState(false);
  const [installing, setInstalling] = useState(false);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    setInstalling(true);
    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setInstalledSuccess(true);
      }
    } catch (err) {
      console.warn('[PWA Install Error]:', err);
    } finally {
      setInstalling(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#141416] border border-[#26262A] rounded-3xl p-6 sm:p-8 shadow-[0_10px_50px_rgba(0,0,0,0.9)] text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-[#A1A1AA] hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with App Logo */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[#0B0B0C] border border-[#FFE600]/40 p-1 shadow-[0_0_20px_rgba(255,230,0,0.2)] shrink-0">
            <Image
              src="/images/logo.jpg"
              alt="MV Electricidad"
              width={56}
              height={56}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-black text-lg sm:text-xl text-white">
                MV Electricidad
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-[#FFE600] text-[#0B0B0C] text-[10px] font-black uppercase">
                App PWA
              </span>
            </div>
            <p className="text-xs text-[#A1A1AA] mt-0.5">
              Panel de Gestión & Presupuestos para celular o PC
            </p>
          </div>
        </div>

        {/* Content based on device status */}
        {isStandalone || installedSuccess ? (
          <div className="space-y-4 text-center py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-black text-lg text-white">
              ¡App Instalada con Éxito!
            </h4>
            <p className="text-xs text-[#A1A1AA] max-w-sm mx-auto leading-relaxed">
              Ya podés acceder al panel de administración directamente desde la pantalla de inicio de tu celular o desde el escritorio de tu computadora.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-xl bg-[#FFE600] hover:bg-[#FFE600]/90 text-[#0B0B0C] font-black text-xs transition-all shadow-[0_0_20px_rgba(255,230,0,0.3)]"
            >
              Entendido
            </button>
          </div>
        ) : isIOS ? (
          /* iOS Safari Guide */
          <div className="space-y-5">
            <div className="p-4 rounded-2xl bg-[#0B0B0C] border border-[#26262A] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#FFE600]">
                <Smartphone className="w-4 h-4" />
                <span>Cómo instalar en iPhone o iPad (Safari):</span>
              </div>
              <ol className="text-xs text-[#E4E4E7] space-y-2.5 pl-1">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[11px] font-bold text-white shrink-0 mt-0.5">
                    1
                  </span>
                  <span>
                    Tocá el botón <strong>Compartir</strong> en la barra inferior de Safari{' '}
                    <Share2 className="w-3.5 h-3.5 inline text-[#FFE600] -mt-0.5" /> (cuadrado con flecha hacia arriba).
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[11px] font-bold text-white shrink-0 mt-0.5">
                    2
                  </span>
                  <span>
                    Deslizá el menú hacia abajo y seleccioná{' '}
                    <strong>&quot;Agregar a pantalla de inicio&quot;</strong>{' '}
                    <PlusSquare className="w-3.5 h-3.5 inline text-[#FFE600] -mt-0.5" />.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[11px] font-bold text-white shrink-0 mt-0.5">
                    3
                  </span>
                  <span>
                    Tocá <strong>&quot;Agregar&quot;</strong> arriba a la derecha. ¡Listo! Ya tenés el ícono de la app en tu pantalla.
                  </span>
                </li>
              </ol>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#71717A] pt-2 border-t border-[#26262A]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Sin descargas desde App Store • Acceso directo liviano
              </span>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold"
              >
                Cerrar
              </button>
            </div>
          </div>
        ) : deferredPrompt ? (
          /* Android / Chrome Desktop with Native Prompt */
          <div className="space-y-5">
            <p className="text-xs text-[#A1A1AA] leading-relaxed">
              Instalá el panel de administración en tu dispositivo para acceder rápidamente a la lista de clientes, generar presupuestos en PDF y gestionar tu suscripción sin barras de navegación del navegador.
            </p>

            <div className="p-4 rounded-2xl bg-[#0B0B0C] border border-[#26262A] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFE600]/10 border border-[#FFE600]/30 flex items-center justify-center text-[#FFE600] shrink-0">
                <Smartphone className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-white">Instalación nativa ultraliviana</p>
                <p className="text-[#A1A1AA]">
                  Funciona offline, sin ocupar espacio de almacenamiento como una app pesada.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={handleInstallClick}
                disabled={installing}
                className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-[#FFE600] hover:bg-[#FFE600]/90 text-[#0B0B0C] font-black text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,230,0,0.35)] transition-all cursor-pointer active:scale-95 disabled:opacity-50"
              >
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>{installing ? 'Instalando...' : 'Instalar App Ahora'}</span>
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto py-3 px-5 rounded-xl bg-[#141416] hover:bg-white/10 text-[#A1A1AA] hover:text-white border border-[#26262A] text-xs font-bold transition-colors"
              >
                Más tarde
              </button>
            </div>
          </div>
        ) : (
          /* Desktop or Android without deferred prompt ready */
          <div className="space-y-5">
            <p className="text-xs text-[#A1A1AA] leading-relaxed">
              Podés instalar esta aplicación para acceder con un solo clic desde tu barra de tareas o escritorio:
            </p>

            <div className="space-y-2.5 text-xs text-[#E4E4E7]">
              <div className="p-3.5 rounded-2xl bg-[#0B0B0C] border border-[#26262A] flex items-center gap-3">
                <Laptop className="w-5 h-5 text-[#FFE600] shrink-0" />
                <span>
                  <strong>En Google Chrome / Edge (PC):</strong> Hacé clic en el icono{' '}
                  <strong className="text-[#FFE600]">⊕ (Instalar aplicación)</strong> situado a la derecha de la barra de direcciones URL arriba.
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#0B0B0C] border border-[#26262A] flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-[#FFE600] shrink-0" />
                <span>
                  <strong>En Celular Android:</strong> Tocá los 3 puntos verticales <strong>(⋮)</strong> arriba a la derecha del navegador y elegí{' '}
                  <strong className="text-[#FFE600]">&quot;Instalar aplicación&quot;</strong> o{' '}
                  <strong className="text-[#FFE600]">&quot;Agregar a la pantalla principal&quot;</strong>.
                </span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-[#FFE600] hover:bg-[#FFE600]/90 text-[#0B0B0C] font-black text-xs transition-all shadow-[0_0_20px_rgba(255,230,0,0.3)]"
              >
                Entendido
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
