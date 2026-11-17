import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { COOKIE_NAME, verifyAdminToken } from '@/lib/auth/session';
import { MV_PREAPPROVAL_PLAN_ID } from '../subscribe/route';

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

const MP_ACCESS_TOKEN =
  process.env.KEVDEV_MP_ACCESS_TOKEN ||
  process.env.MP_ACCESS_TOKEN ||
  'APP_USR-6048028823134972-082614-9caa0aa0e151104c1769457fec0a3bfa-322263721';

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

  let realPayments: KevDevPayment[] = [];
  let estadoPago = 'AL_DIA';

  // 1. Intentar consultar desde el API de KevDev (por doc ID o slug)
  try {
    const kevdevUrl = process.env.KEVDEV_API_URL || 'https://www.kevdev.net.ar';
    const clienteId = process.env.KEVDEV_CLIENT_ID || 'E3m06nKWjQsVOwts3TzR';
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
      if (Array.isArray(data.payments) && data.payments.length > 0) {
        realPayments = data.payments;
      }
      if (data.estadoPago) {
        estadoPago = data.estadoPago;
      }
    }
  } catch (err: any) {
    console.warn('[Billing Payments] Error connecting to KevDev API:', err?.message || err);
  }

  // 2. Si KevDev aún no sincronizó o devolvió lista vacía, consultar Mercado Pago en tiempo real
  if (realPayments.length === 0) {
    try {
      const mpRes = await fetch(
        'https://api.mercadopago.com/v1/payments/search?sort=date_created&criteria=desc&limit=15',
        {
          headers: {
            Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
            'Cache-Control': 'no-cache',
          },
          cache: 'no-store',
        }
      );

      if (mpRes.ok) {
        const mpData = await mpRes.json();
        const results = mpData.results || [];

        const mvMpPayments = results
          .filter((p: any) => {
            if (p.status !== 'approved') return false;
            const planId = p.point_of_interaction?.transaction_data?.plan_id;
            const subId = p.point_of_interaction?.transaction_data?.subscription_id;
            const desc = (p.description || '').toLowerCase();
            return (
              planId === MV_PREAPPROVAL_PLAN_ID ||
              subId === '4c52c15da8764717ae0f2e2676428608' ||
              desc.includes('mv electricidad') ||
              desc.includes('vallejos')
            );
          })
          .map((p: any) => ({
            id: String(p.id),
            date: (p.date_approved || p.date_created || new Date().toISOString()).split('T')[0],
            amount: Number(p.transaction_amount) || 30000,
            concept: p.description || 'Plan KevDev - MV Electricidad (Matías Vallejos)',
            medioPago:
              p.payment_method_id === 'account_money'
                ? 'Dinero en cuenta (Mercado Pago)'
                : 'Mercado Pago Débito Automático',
            metodo: 'pasarela',
            referencia: String(p.id),
            confirmed: true,
          }));

        if (mvMpPayments.length > 0) {
          realPayments = mvMpPayments;
          estadoPago = 'AL_DIA';
        }
      }
    } catch (mpErr: any) {
      console.warn('[Billing Payments] Error consultando pagos directos en MP:', mpErr?.message || mpErr);
    }
  }

  return NextResponse.json(
    {
      success: true,
      clienteId: 'E3m06nKWjQsVOwts3TzR',
      clienteNombre: 'MV Electricidad (Matías Vallejos)',
      estadoPago,
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
