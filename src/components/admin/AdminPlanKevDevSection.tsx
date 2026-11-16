'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  CreditCard,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Gift,
  Copy,
  Check,
  DollarSign,
  Calendar,
  Layers,
  Zap,
} from 'lucide-react';
import { KevDevPayment } from '@/app/api/admin/billing/payments/route';

export const AdminPlanKevDevSection: React.FC = () => {
  const [payments, setPayments] = useState<KevDevPayment[]>([]);
  const [estadoPago, setEstadoPago] = useState<string>('AL_DIA');
  const [planMonto, setPlanMonto] = useState<number>(35000);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [copiedCbu, setCopiedCbu] = useState(false);
  const [copiedAlias, setCopiedAlias] = useState(false);

  // Billing data of Kevin Loggia (KevDev)
  const billingInfo = {
    cbu: '0000003100010000322263',
    alias: 'kevinloggia.mp',
    titular: 'Kevin Loggia',
    banco: 'Mercado Pago / Banco',
    whatsapp: '5492235851419',
    vencimientoDia: '10 de cada mes',
  };

  const loadData = useCallback(async () => {
    try {
      setRefreshing(true);
      const res = await fetch(`/api/admin/billing/payments?t=${Date.now()}`, {
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        if (data.estadoPago) setEstadoPago(data.estadoPago);
        if (data.planMonto) setPlanMonto(data.planMonto);
        if (Array.isArray(data.payments)) setPayments(data.payments);
      }
    } catch (err) {
      console.warn('[PlanKevDev] Error consultando pagos:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const copyToClipboard = (text: string, type: 'cbu' | 'alias') => {
    navigator.clipboard.writeText(text);
    if (type === 'cbu') {
      setCopiedCbu(true);
      setTimeout(() => setCopiedCbu(false), 2500);
    } else {
      setCopiedAlias(true);
      setTimeout(() => setCopiedAlias(false), 2500);
    }
  };

  const isAlDia = estadoPago === 'AL_DIA' || estadoPago === 'CONFIRMADO';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFE600]/10 border border-[#FFE600]/30 text-[#FFE600] text-xs font-mono font-bold tracking-wider mb-2">
            <Zap className="w-3.5 h-3.5" /> KEVDEV SYNC • TIEMPO REAL
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Plan de Servicio & Desarrollo KevDev
          </h2>
          <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1">
            Información del plan contratado con Kevin Loggia, estado de cuenta y registro oficial de pagos.
          </p>
        </div>

        <button
          onClick={loadData}
          disabled={refreshing}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#141416] border border-[#26262A] hover:border-[#FFE600] text-xs font-bold text-white transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-[#FFE600] ${refreshing ? 'animate-spin' : ''}`} />
          <span>{refreshing ? 'Sincronizando...' : 'Actualizar Estado'}</span>
        </button>
      </div>

      {/* Grid: Plan Activo & Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Estado del Plan */}
        <div className="p-5 rounded-2xl bg-[#141416] border border-[#26262A] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase text-[#A1A1AA]">Estado de Servicio</span>
              {isAlDia ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5" /> AL DÍA
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  <Clock className="w-3.5 h-3.5" /> PENDIENTE
                </span>
              )}
            </div>
            <h3 className="font-heading text-lg font-bold text-white mb-1">
              Landing Page & Hosting Pro
            </h3>
            <p className="text-xs text-[#A1A1AA]">
              Sitio en alta velocidad, CDN global de Vercel, optimización SEO y soporte técnico prioritario.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#26262A] flex items-center justify-between text-xs text-[#71717A]">
            <span>Vencimiento habitual:</span>
            <strong className="text-white">{billingInfo.vencimientoDia}</strong>
          </div>
        </div>

        {/* Card 2: Valor Mensual */}
        <div className="p-5 rounded-2xl bg-[#141416] border border-[#26262A] flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase text-[#A1A1AA]">Cuota Mensual</span>
            <div className="mt-2 text-3xl font-extrabold text-[#FFE600] font-mono">
              $ {planMonto.toLocaleString('es-AR')}
            </div>
            <p className="text-xs text-[#A1A1AA] mt-1">
              Incluye infraestructura en la nube, dominio y mantenimiento continuo.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#26262A] flex items-center justify-between text-xs text-[#71717A]">
            <span>Desarrollador:</span>
            <strong className="text-white">Kevin Loggia (KevDev)</strong>
          </div>
        </div>

        {/* Card 3: Contacto Directo */}
        <div className="p-5 rounded-2xl bg-[#141416] border border-[#26262A] flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase text-[#A1A1AA]">Soporte & Consultas</span>
            <h3 className="font-heading text-base font-bold text-white mt-1">
              Atención Directa con Kevin
            </h3>
            <p className="text-xs text-[#A1A1AA] mt-1">
              Para nuevas funciones, cambios en la web o envío de comprobantes de pago.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#26262A]">
            <a
              href={`https://wa.me/${billingInfo.whatsapp}?text=${encodeURIComponent(
                'Hola Kevin, te contacto desde el panel de MV Electricidad sobre el plan contratado.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Escribir a Kevin por WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Datos para Transferencia & Pagos */}
      <div className="p-6 rounded-3xl bg-[#141416] border border-[#26262A] space-y-4">
        <h3 className="font-heading text-base font-bold text-white flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-[#FFE600]" />
          Datos para Transferencia Bancaria
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#0B0B0C] border border-[#26262A] flex items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold uppercase text-[#71717A]">Alias Mercado Pago</span>
              <p className="font-mono text-sm font-bold text-white mt-0.5">{billingInfo.alias}</p>
            </div>
            <button
              onClick={() => copyToClipboard(billingInfo.alias, 'alias')}
              className="p-2 rounded-lg bg-[#141416] hover:bg-[#FFE600]/10 text-[#A1A1AA] hover:text-[#FFE600] transition-colors"
              title="Copiar Alias"
            >
              {copiedAlias ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <div className="p-4 rounded-xl bg-[#0B0B0C] border border-[#26262A] flex items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold uppercase text-[#71717A]">CBU</span>
              <p className="font-mono text-sm font-bold text-white mt-0.5">{billingInfo.cbu}</p>
            </div>
            <button
              onClick={() => copyToClipboard(billingInfo.cbu, 'cbu')}
              className="p-2 rounded-lg bg-[#141416] hover:bg-[#FFE600]/10 text-[#A1A1AA] hover:text-[#FFE600] transition-colors"
              title="Copiar CBU"
            >
              {copiedCbu ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="text-xs text-[#71717A] flex items-center justify-between pt-1">
          <span>Titular: <strong>{billingInfo.titular}</strong></span>
          <span>Entidad: <strong>{billingInfo.banco}</strong></span>
        </div>
      </div>

      {/* Historial de Pagos Oficial Sincronizado */}
      <div className="p-6 rounded-3xl bg-[#141416] border border-[#26262A] space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-base font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#FFE600]" />
            Historial Oficial de Pagos
          </h3>
          <span className="text-xs text-[#71717A]">
            Sincronizado con base de datos de KevDev
          </span>
        </div>

        {loading ? (
          <div className="text-center py-8 text-xs text-[#A1A1AA]">
            Consultando registros en KevDev...
          </div>
        ) : payments.length === 0 ? (
          <div className="text-center py-8 text-xs text-[#A1A1AA]">
            No hay pagos registrados aún en el sistema.
          </div>
        ) : (
          <div className="divide-y divide-[#26262A]">
            {payments.map((p) => (
              <div
                key={p.id}
                className="py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="font-bold text-white text-sm">
                    {p.concept || 'Cuota Mensual KevDev'}
                  </div>
                  <div className="text-[#A1A1AA] mt-0.5 flex items-center gap-3">
                    <span>Fecha: {p.date}</span>
                    <span>•</span>
                    <span>Medio: {p.medioPago || 'Transferencia'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <span className="font-mono text-sm font-black text-[#FFE600]">
                    $ {p.amount.toLocaleString('es-AR')}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 className="w-3 h-3" /> Confirmado
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Programa de Referidos KevDev */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#141416] via-[#1a1a1e] to-[#141416] border border-[#FFE600]/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_0_30px_rgba(255,230,0,0.06)]">
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-[#FFE600] text-xs font-bold uppercase tracking-wider">
            <Gift className="w-4 h-4" /> Programa de Referidos KevDev
          </div>
          <h4 className="font-heading text-lg font-black text-white">
            Recomendá a KevDev y obtené meses 100% bonificados
          </h4>
          <p className="text-xs text-[#A1A1AA] max-w-xl">
            Por cada colega, comercio o cliente que refieras a Kevin Loggia y contrate el desarrollo de su sitio web o sistema, se te bonifica automáticamente <strong>1 mes completo de tu suscripción ($ 35.000)</strong>.
          </p>
        </div>

        <a
          href={`https://wa.me/${billingInfo.whatsapp}?text=${encodeURIComponent(
            'Hola Kevin! Te quiero pasar el contacto de un conocido interesado en hacer su web con vos para sumar un mes bonificado.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 px-4 py-2.5 rounded-xl bg-[#FFE600] text-[#0B0B0C] text-xs font-extrabold shadow-[0_0_15px_rgba(255,230,0,0.3)] hover:bg-[#FFF04D] transition-colors"
        >
          Referir un Contacto
        </a>
      </div>
    </div>
  );
};
