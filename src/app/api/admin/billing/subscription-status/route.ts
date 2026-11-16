import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { COOKIE_NAME, verifyAdminToken } from '@/lib/auth/session';
import { MV_PREAPPROVAL_PLAN_ID } from '../subscribe/route';

export const dynamic = 'force-dynamic';

const MP_ACCESS_TOKEN =
  process.env.KEVDEV_MP_ACCESS_TOKEN ||
  process.env.MP_ACCESS_TOKEN ||
  'APP_USR-6048028823134972-082614-9caa0aa0e151104c1769457fec0a3bfa-322263721';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token || !(await verifyAdminToken(token))) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    try {
      const planSearchUrl = `https://api.mercadopago.com/preapproval/search?preapproval_plan_id=${MV_PREAPPROVAL_PLAN_ID}`;
      const planRes = await fetch(planSearchUrl, {
        headers: {
          Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
          'Cache-Control': 'no-cache',
        },
        cache: 'no-store',
      });

      if (planRes.ok) {
        const planData = await planRes.json();
        const results = planData.results || [];
        const activeSub = results.find((r: any) => r.status === 'authorized');

        if (activeSub) {
          return NextResponse.json({
            ok: true,
            subscribed: true,
            status: 'authorized',
            preapproval_id: activeSub.id,
            next_payment_date: activeSub.next_payment_date || null,
            amount: activeSub.auto_recurring?.transaction_amount || 30000,
            date_created: activeSub.date_created || null,
            payment_method_id: activeSub.payment_method_id || null,
            payer_email: activeSub.payer_email || null,
          });
        }
      }
    } catch (planErr) {
      console.warn('[SubscriptionStatus] Error buscando por plan:', planErr);
    }

    return NextResponse.json({
      ok: true,
      subscribed: false,
      status: 'none',
      amount: 30000,
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || 'Error consultando suscripción' },
      { status: 500 }
    );
  }
}
