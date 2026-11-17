'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Users,
  FileText,
  Zap,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Download,
} from 'lucide-react';
import { AdminClientsSection } from '@/components/admin/AdminClientsSection';
import { AdminQuotesSection } from '@/components/admin/AdminQuotesSection';
import { AdminPlanKevDevSection } from '@/components/admin/AdminPlanKevDevSection';
import { AdminPwaInstallModal } from '@/components/admin/AdminPwaInstallModal';
import { ClientItem } from '@/app/api/admin/clients/route';

type AdminTab = 'clientes' | 'presupuestos' | 'plan';

function AdminContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const subSuccessParam = searchParams.get('sub_success') === 'true';

  const [activeTab, setActiveTab] = useState<AdminTab>(subSuccessParam ? 'plan' : 'clientes');
  const [selectedClientForQuote, setSelectedClientForQuote] = useState<ClientItem | null>(null);

  // PWA Install State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showPwaModal, setShowPwaModal] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Detect standalone mode (already installed as PWA)
      const isStandaloneMode =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true;
      setIsStandalone(Boolean(isStandaloneMode));

      // Detect iOS
      const userAgent = window.navigator.userAgent || '';
      const isAppleMobile = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
      setIsIOS(Boolean(isAppleMobile));

      // Listen for Chromium PWA install prompt
      const handleBeforeInstall = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e);
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstall);

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      };
    }
  }, []);

  const handleSelectClient = (client: ClientItem) => {
    setSelectedClientForQuote(client);
    setActiveTab('presupuestos');
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch {
      router.push('/admin/login');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white flex flex-col">
      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-40 w-full bg-[#101012]/95 backdrop-blur-md border-b border-[#26262A] py-3.5 px-4 sm:px-8 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & Specialist Name */}
          <div className="flex items-center gap-3.5 w-full md:w-auto justify-between md:justify-start">
            <Link href="/admin" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#0B0B0C] border border-[#FFE600]/40 p-0.5 shadow-[0_0_12px_rgba(255,230,0,0.2)]">
                <Image
                  src="/images/logo.jpg"
                  alt="MV Electricidad"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading font-black text-white text-base tracking-tight group-hover:text-[#FFE600] transition-colors">
                    MV Electricidad
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#FFE600]/10 border border-[#FFE600]/30 text-[#FFE600] text-[10px] font-mono font-bold">
                    ADMIN
                  </span>
                </div>
                <p className="text-[11px] text-[#A1A1AA]">
                  Panel de Gestión • Matías Vallejos
                </p>
              </div>
            </Link>

            {/* Quick Actions & PWA Download on Mobile */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => setShowPwaModal(true)}
                className="p-2 rounded-lg bg-[#FFE600] text-[#0B0B0C] font-bold shadow-[0_0_12px_rgba(255,230,0,0.35)] flex items-center justify-center active:scale-95 transition-transform"
                title="Descargar como App (PWA)"
                aria-label="Descargar panel como aplicación"
              >
                <Download className="w-4 h-4 stroke-[2.5]" />
              </button>
              <Link
                href="/"
                target="_blank"
                className="p-2 rounded-lg bg-[#141416] text-[#A1A1AA] hover:text-white border border-[#26262A]"
                title="Ver web pública"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg bg-[#141416] text-red-400 hover:text-red-300 border border-[#26262A]"
                title="Cerrar sesión"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#0B0B0C] border border-[#26262A] w-full md:w-auto overflow-x-auto">
            <button
              onClick={() => setActiveTab('clientes')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'clientes'
                  ? 'bg-[#FFE600] text-[#0B0B0C] shadow-[0_0_15px_rgba(255,230,0,0.35)]'
                  : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Clientes</span>
            </button>

            <button
              onClick={() => setActiveTab('presupuestos')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'presupuestos'
                  ? 'bg-[#FFE600] text-[#0B0B0C] shadow-[0_0_15px_rgba(255,230,0,0.35)]'
                  : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Presupuestos PDF</span>
            </button>

            <button
              onClick={() => setActiveTab('plan')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'plan'
                  ? 'bg-[#FFE600] text-[#0B0B0C] shadow-[0_0_15px_rgba(255,230,0,0.35)]'
                  : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Plan KevDev</span>
            </button>
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* PWA Download Button */}
            <button
              onClick={() => setShowPwaModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFE600]/10 hover:bg-[#FFE600]/20 text-[#FFE600] border border-[#FFE600]/30 hover:border-[#FFE600] text-xs font-bold transition-all shadow-[0_0_15px_rgba(255,230,0,0.12)] cursor-pointer active:scale-95"
              title="Instalar panel como app en tu celular o PC"
            >
              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>{isStandalone ? 'App Instalada' : 'Descargar App'}</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#141416] text-[#A1A1AA] hover:text-white hover:border-[#FFE600] border border-[#26262A] text-xs font-semibold transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#FFE600]" />
              <span>Ver Web Pública</span>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-semibold transition-colors"
              title="Cerrar sesión"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Salir</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8">
        {activeTab === 'clientes' && (
          <AdminClientsSection onSelectClientForQuote={handleSelectClient} />
        )}

        {activeTab === 'presupuestos' && (
          <AdminQuotesSection initialClient={selectedClientForQuote} />
        )}

        {activeTab === 'plan' && (
          <AdminPlanKevDevSection initialSubSuccess={subSuccessParam} />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#101012] border-t border-[#26262A] py-4 px-4 sm:px-8 text-center text-xs text-[#71717A]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Panel Oficial • <strong>MV Electricidad (Matías Vallejos)</strong>
          </span>
          <span className="flex items-center gap-1.5 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FFE600]" />
            Desarrollado y mantenido por <strong>Kevin Loggia (KevDev)</strong>
          </span>
        </div>
      </footer>
      {/* PWA Install Modal */}
      <AdminPwaInstallModal
        isOpen={showPwaModal}
        onClose={() => setShowPwaModal(false)}
        deferredPrompt={deferredPrompt}
        isStandalone={isStandalone}
        isIOS={isIOS}
      />
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B0B0C] flex items-center justify-center text-xs text-[#A1A1AA]">Cargando panel...</div>}>
      <AdminContent />
    </Suspense>
  );
}
