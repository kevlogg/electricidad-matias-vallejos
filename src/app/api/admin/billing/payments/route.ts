import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { COOKIE_NAME, verifyAdminToken } from '@/lib/auth/session';

export const dynamic = 'force-dynamic';

export interface KevDevPayment {
  id: string;
  date: string;
  amount: number;
  concept: string;
  medioPago?: string;
  metodo?: string;
  referencia?: string;
  confirmed: boolean;
}

const FALLBACK_DATA = {
  success: true,
  clienteId: 'mv-electricista',
  clienteNombre: 'MV Electricidad (Matías Vallejos)',
  estadoPago: 'AL_DIA',
  planMonto: 35000,
  proximoVencimiento: '10 de cada mes',
  payments: [
    {
      id: 'pay_mv_init',
      date: '2026-11-10',
      amount: 35000,
      concept: 'Desarrollo Landing Page & Hosting Cloud',
      medioPago: 'Transferencia Bancaria',
      metodo: 'banco',
      referencia: 'TRF-KEVDEV-01',
      confirmed: true,
    },
  ],
};

export async function GET(request: Request) {
  // Check admin session or secret
  const secretHeader = request.headers.get('x-kevdev-secret') || '';
  const expectedSecret = process.env.KEVDEV_PAYMENTS_SECRET || 'kevdev_payments_sec_2026_key';

  if (!secretHeader || secretHeader !== expectedSecret) {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token || !(await verifyAdminToken(token))) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }
  }

  try {
    const kevdevUrl = process.env.KEVDEV_API_URL || 'https://www.kevdev.net.ar';
    const clienteId = process.env.KEVDEV_CLIENT_ID || 'mv-electricista';
    const secret = process.env.KEVDEV_PAYMENTS_SECRET || 'kevdev_payments_sec_2026_key';

    const res = await fetch(
      `${kevdevUrl.replace(/\/$/, '')}/api/payments/client-history?clienteId=${encodeURIComponent(clienteId)}&t=${Date.now()}`,
      {
        headers: {
          'x-kevdev-secret': secret,
          'Cache-Control': 'no-cache',
        },
        cache: 'no-store',
      }
    );

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(
        {
          success: true,
          clienteId,
          clienteNombre: 'MV Electricidad (Matías Vallejos)',
          estadoPago: data.estadoPago || 'AL_DIA',
          planMonto: 35000,
          proximoVencimiento: '10 de cada mes',
          payments: Array.isArray(data.payments) && data.payments.length > 0 ? data.payments : FALLBACK_DATA.payments,
        },
        {
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate',
          },
        }
      );
    }

    console.warn('[Billing Payments] KevDev API respondió status:', res.status);
  } catch (err: any) {
    console.warn('[Billing Payments] Error conectando con KevDev API:', err?.message || err);
  }

  return NextResponse.json(FALLBACK_DATA, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}
