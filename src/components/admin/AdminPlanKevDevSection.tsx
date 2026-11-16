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
  Check,
  Calendar,
  Layers,
  Zap,
  ArrowRight,
  Info,
} from 'lucide-react';
import { KevDevPayment } from '@/app/api/admin/billing/payments/route';

interface AdminPlanKevDevSectionProps {
  initialSubSuccess?: boolean;
}

export const AdminPlanKevDevSection: React.FC<AdminPlanKevDevSectionProps> = ({
  initialSubSuccess = false,
}) => {
  const [payments, setPayments] = useState<KevDevPayment[]>([]);
  const [estadoPago, setEstadoPago] = useState<string>('AL_DIA');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [subscribeError, setSubscribeError] = useState<string | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subNextDate, setSubNextDate] = useState<string | null>(null);
  const [showSuccessBanner, setShowSuccessBanner] = useState(initialSubSuccess);

  // Exact configuration requested by user
  const planMonto = 30000;
  const fechaInicio = '17/11/2026';
  const whatsappKevDev = '5492235851419';

  const loadData = useCallback(async () => {
    try {
      setRefreshing(true);
      const [paymentsRes, subRes] = await Promise.all([
        fetch(`/api/admin/billing/payments?t=${Date.now()}`, { cache: 'no-store' }),
        fetch(`/api/admin/billing/subscription-status?t=${Date.now()}`, {
          cache: 'no-store',
        }).catch(() => null),
      ]);

      if (paymentsRes.ok) {
        const data = await paymentsRes.json();
        if (data.estadoPago) setEstadoPago(data.estadoPago);
        if (Array.isArray(data.payments)) setPayments(data.payments);
      }

      if (subRes && subRes.ok) {
        const subData = await subRes.json();
        if (subData.subscribed) {
          setIsSubscribed(true);
          if (subData.next_payment_date) {
            setSubNextDate(subData.next_payment_date.split('T')[0]);
          }
        }
      }
    } catch (err) {
      console.warn('[PlanKevDev] Error consultando pagos o suscripción:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handle subscription redirect to official Mercado Pago Checkout
  const handleSubscribeMP = async () => {
    setSubscribing(true);
    setSubscribeError(null);
    try {
      const res = await fetch('/api/admin/billing/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        setSubscribeError(data.error || 'No se pudo iniciar el proceso con Mercado Pago.');
        return;
      }

      if (data.init_point) {
        window.location.href = data.init_point;
      }
    } catch (err: any) {
      setSubscribeError(err?.message || 'Error al conectar con Mercado Pago');
    } finally {
      setSubscribing(false);
    }
  };

  const isAlDia = estadoPago === 'AL_DIA' || estadoPago === 'CONFIRMADO';
  const proximoVencimiento = subNextDate || '17/12/2026';

  const whatsappUrl = `https://wa.me/${whatsappKevDev}?text=${encodeURIComponent(
    'Hola Kevin! Te contacto desde el panel de MV Electricidad sobre el plan contratado o consultas técnicas.'
  )}`;

  return (
    <div className="space-y-6">
      {/* Cabecera Oficial KevDev Sync */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-gradient-to-r from-[#141416] via-[#1a1a1f] to-[#141416] border border-[#26262A] rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.6)]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black bg-[#FFE600]/10 text-[#FFE600] border border-[#FFE600]/30 tracking-wider">
              ⚡ KEVDEV SYNC • OFICIAL
            </span>
            <span className="text-xs text-[#71717A]">
              Cliente: <strong>MV Electricidad (Matías Vallejos)</strong>
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Plan de Servicio & Desarrollo Web
          </h2>
          <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1">
            Acuerdo de infraestructura cloud en alta velocidad, hosting, mantenimiento SEO, optimización y soporte técnico continuo.
          </p>
        </div>

        <button
          onClick={loadData}
          disabled={refreshing}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B0B0C] border border-[#26262A] hover:border-[#FFE600] text-xs font-bold text-white transition-colors disabled:opacity-50 shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-[#FFE600] ${refreshing ? 'animate-spin' : ''}`} />
          <span>{refreshing ? 'Sincronizando...' : 'Actualizar Estado'}</span>
        </button>
      </div>

      {/* Banner de Éxito de Mercado Pago */}
      {showSuccessBanner && (
        <div className="p-4 bg-emerald-950/90 border-2 border-emerald-500/80 rounded-2xl text-white shadow-lg flex items-start gap-3">
          <div className="p-2 bg-emerald-500 text-[#0B0B0C] rounded-xl shrink-0 font-bold">
            🎉
          </div>
          <div className="space-y-1 text-xs">
            <h4 className="font-black text-sm text-emerald-300">
              ¡Suscripción a Débito Automático activada con éxito en Mercado Pago!
            </h4>
            <p className="text-emerald-100">
              Tu tarjeta ha quedado asociada. A partir del próximo mes tu cuota de $ {planMonto.toLocaleString('es-AR')} se debitará automáticamente cada día 17 para asegurar la operatividad ininterrumpida de tu sitio web y correos.
            </p>
            <button
              onClick={() => setShowSuccessBanner(false)}
              className="text-[11px] underline text-emerald-300 font-bold mt-1"
            >
              Cerrar aviso
            </button>
          </div>
        </div>
      )}

      {/* Estado General del Servicio Banner */}
      <div
        className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
          isAlDia
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
            : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
        }`}
      >
        <div className="flex items-center gap-3">
          {isAlDia ? (
            <div className="p-2 bg-emerald-500 text-[#0B0B0C] rounded-xl">
              <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
            </div>
          ) : (
            <div className="p-2 bg-amber-500 text-[#0B0B0C] rounded-xl">
              <Clock className="w-5 h-5 animate-pulse" />
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm sm:text-base text-white">
                Estado del servicio:
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                  isAlDia
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                }`}
              >
                {isAlDia ? '✓ Al día' : '⏳ Cuota a abonar'}
              </span>
            </div>
            <p className="text-xs text-[#A1A1AA] mt-0.5">
              {isAlDia
                ? `Próximo vencimiento: ${proximoVencimiento} ($ ${planMonto.toLocaleString('es-AR')})`
                : `Vencimiento de cuota: ${proximoVencimiento} — Monto: $ ${planMonto.toLocaleString('es-AR')}`}
            </p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-white hidden sm:inline">
          Inicio del acuerdo: {fechaInicio}
        </span>
      </div>

      {/* CARD PRINCIPAL: Sistema de Suscripción Oficial Mercado Pago */}
      <div className="rounded-3xl bg-[#141416] border border-[#26262A] p-6 sm:p-7 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#26262A]">
          <div>
            <span className="text-xs font-bold uppercase text-[#A1A1AA] tracking-wider">
              Detalle del Acuerdo
            </span>
            <h3 className="font-heading text-lg font-black text-white mt-1">
              Plan Profesional MV Electricidad
            </h3>
            <p className="text-xs text-[#A1A1AA] mt-0.5">
              Landing page de alta conversión, hosting cloud Vercel Edge, backups y soporte prioritario.
            </p>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-xs text-[#71717A] uppercase font-bold">Cuota mensual:</span>
            <span className="font-mono text-3xl font-black text-[#FFE600]">
              $ {planMonto.toLocaleString('es-AR')}
            </span>
          </div>
        </div>

        {/* Bloque Mercado Pago: Activo vs Adhesión */}
        {isSubscribed ? (
          /* Estado 1: Débito Automático Ya Activo */
          <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500 text-[#0B0B0C] rounded-xl font-bold">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-base text-white">
                      Débito Automático Activo
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                      EN REGLA
                    </span>
                  </div>
                  <p className="text-xs text-[#A1A1AA] mt-0.5">
                    Tu tarjeta está asociada con Mercado Pago. Los cobros de $ {planMonto.toLocaleString('es-AR')} se debitan automáticamente los días 17 de cada mes.
                  </p>
                </div>
              </div>

              <span className="px-3 py-1.5 rounded-xl bg-[#0B0B0C] border border-[#26262A] text-[#FFE600] text-xs font-mono font-bold shrink-0">
                Próximo débito: {subNextDate || proximoVencimiento}
              </span>
            </div>

            <div className="pt-3 border-t border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#A1A1AA]">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                Suscripción de cobro recurrente activa a través de Mercado Pago
              </span>
              <span className="text-emerald-400 font-bold">
                Servicio protegido y al día con KevDev
              </span>
            </div>
          </div>
        ) : (
          /* Estado 2: Botón para Adherir y Pagar con Mercado Pago */
          <div className="space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-5 rounded-2xl bg-[#0B0B0C] border border-[#26262A]">
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚡</span>
                  <h4 className="text-base sm:text-lg font-black text-white">
                    Pagar Plan y Adherir al Débito Automático
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                  Aboná tu cuota ($ {planMonto.toLocaleString('es-AR')}) asociando tu tarjeta de débito o crédito mediante el link seguro de Mercado Pago. A partir del próximo mes, tu servicio se debitará automáticamente cada día 17 para asegurar la continuidad ininterrumpida de tu web, dominio y soporte.
                </p>
              </div>

              {/* Botón Mercado Pago */}
              <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={handleSubscribeMP}
                  disabled={subscribing}
                  className="px-6 py-3.5 rounded-xl bg-[#009EE3] hover:bg-[#0086c3] text-white font-extrabold text-sm shadow-[0_0_25px_rgba(0,158,227,0.35)] transition-all flex items-center justify-center gap-2.5 disabled:opacity-60 active:scale-95"
                >
                  <CreditCard className="w-4 h-4 text-white" />
                  <span>
                    {subscribing
                      ? 'Conectando con Mercado Pago...'
                      : `Pagar $ ${planMonto.toLocaleString('es-AR')} con Mercado Pago`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {subscribeError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                ⚠️ {subscribeError}
              </div>
            )}

            {/* Badges de Garantía Mercado Pago */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#71717A] pt-1">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-white font-medium flex items-center gap-1">
                  🔒 Procesado 100% oficial por Mercado Pago
                </span>
                <span>•</span>
                <span>💳 Débito o Crédito (Visa, Mastercard, etc.)</span>
                <span>•</span>
                <span>🔄 Débito automático mensual</span>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FFE600] hover:underline font-bold flex items-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Soporte directo con Kevin
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Historial Oficial de Pagos (Sincronizado en tiempo real con KevDev) */}
      <div className="p-6 rounded-3xl bg-[#141416] border border-[#26262A] space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-base font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#FFE600]" />
            Historial Oficial de Pagos
          </h3>
          <span className="text-xs text-[#71717A]">
            Base de datos KevDev en tiempo real
          </span>
        </div>

        {loading ? (
          <div className="text-center py-8 text-xs text-[#A1A1AA]">
            Consultando registros en KevDev...
          </div>
        ) : payments.length === 0 ? (
          <div className="text-center py-8 p-6 rounded-2xl bg-[#0B0B0C] border border-dashed border-[#26262A]">
            <p className="text-xs text-[#A1A1AA] font-medium">
              No hay pagos registrados aún en KevDev para este cliente.
            </p>
            <p className="text-[11px] text-[#71717A] mt-1">
              Los pagos impactan automáticamente aquí en cuanto se procesan o registran en el panel central de KevDev.
            </p>
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
                    <span>Medio: {p.medioPago || 'Mercado Pago'}</span>
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
            Por cada colega, comercio o cliente que refieras a Kevin Loggia y contrate el desarrollo de su sitio web o sistema, se te bonifica automáticamente <strong>1 mes completo de tu suscripción ($ {planMonto.toLocaleString('es-AR')})</strong>.
          </p>
        </div>

        <a
          href={`https://wa.me/${whatsappKevDev}?text=${encodeURIComponent(
            'Hola Kevin! Te paso el contacto de un interesado en hacer su web con vos para sumar un mes bonificado en MV Electricidad.'
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
