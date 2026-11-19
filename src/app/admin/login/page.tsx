'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError('Por favor ingresá la contraseña de acceso.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Contraseña incorrecta');
        setLoading(false);
        return;
      }

      window.location.href = '/admin';
    } catch {
      setError('Error de conexión. Intentá nuevamente.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C] flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Background blueprint grid */}
      <div className="absolute inset-0 bg-blueprint-dense opacity-40 pointer-events-none" />

      {/* Ambient electric glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FFE600]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="rounded-3xl bg-[#141416] border border-[#26262A] p-7 sm:p-9 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          {/* Logo & Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#0B0B0C] border border-[#FFE600]/50 p-1 mb-4 shadow-[0_0_20px_rgba(255,230,0,0.2)]">
              <Image
                src="/images/logo.jpg"
                alt="MV Electricidad"
                width={64}
                height={64}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE600]/10 border border-[#FFE600]/30 text-[#FFE600] text-xs font-mono font-bold tracking-wider mb-2">
              <Zap className="w-3.5 h-3.5" /> PANEL DE CONTROL
            </div>
            <h1 className="font-heading text-2xl font-black text-white">
              MV Electricidad
            </h1>
            <p className="text-xs text-[#A1A1AA] mt-1">
              Acceso exclusivo para Matías Vallejos
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#A1A1AA] mb-2">
                Contraseña de Administrador
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#71717A]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresá tu contraseña..."
                  autoFocus
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#0B0B0C] border border-[#26262A] text-white placeholder-[#71717A] text-sm focus:outline-none focus:border-[#FFE600] focus:ring-1 focus:ring-[#FFE600] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#71717A] hover:text-[#FFE600] transition-colors"
                  aria-label="Mostrar/ocultar contraseña"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-[#FFE600] text-[#0B0B0C] font-heading font-extrabold text-sm tracking-wide shadow-[0_0_20px_rgba(255,230,0,0.35)] hover:shadow-[0_0_30px_rgba(255,230,0,0.6)] hover:bg-[#FFF04D] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Verificando credenciales...</span>
              ) : (
                <>
                  <span>Ingresar al Panel</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick info */}
          <div className="mt-6 pt-5 border-t border-[#26262A] flex items-center justify-between text-[11px] text-[#71717A]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FFE600]" /> Sesión cifrada JWT
            </span>
            <Link
              href="/"
              className="text-[#A1A1AA] hover:text-[#FFE600] transition-colors"
            >
              ← Volver al sitio público
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
