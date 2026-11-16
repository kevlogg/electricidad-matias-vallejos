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
  planMonto: 30000,
  fechaInicio: '17/11/2026',
  proximoVencimiento: '17/12/2026',
  payments: [] as KevDevPayment[],
};

export async function GET(request: Request) {
  // Allow KevDev secret or authenticated admin
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
      const realPayments: KevDevPayment[] = Array.isArray(data.payments) ? data.payments : [];

      return NextResponse.json(
        {
          success: true,
          clienteId,
          clienteNombre: 'MV Electricidad (Matías Vallejos)',
          estadoPago: data.estadoPago || 'AL_DIA',
          planMonto: 30000,
          fechaInicio: '17/11/2026',
          proximoVencimiento: '17/12/2026',
          payments: realPayments,
        },
        {
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate',
          },
        }
      );
    }

    console.warn('[Billing Payments] KevDev API status:', res.status);
  } catch (err: any) {
    console.warn('[Billing Payments] Error connecting to KevDev API:', err?.message || err);
  }

  return NextResponse.json(FALLBACK_DATA, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}
