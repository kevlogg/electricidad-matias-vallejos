import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { COOKIE_NAME, verifyAdminToken } from '@/lib/auth/session';

export const dynamic = 'force-dynamic';

const MP_ACCESS_TOKEN =
  process.env.KEVDEV_MP_ACCESS_TOKEN ||
  process.env.MP_ACCESS_TOKEN ||
  'APP_USR-6048028823134972-082614-9caa0aa0e151104c1769457fec0a3bfa-322263721';

export const MV_PREAPPROVAL_PLAN_ID = 'e25258fe6a3743a98887020a370218a5';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token || !(await verifyAdminToken(token))) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    // 1. Verificación previa de suscripciones activas vinculadas a este plan
    try {
      const searchRes = await fetch(
        `https://api.mercadopago.com/preapproval/search?preapproval_plan_id=${MV_PREAPPROVAL_PLAN_ID}`,
        {
          headers: {
            Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
            'Cache-Control': 'no-cache',
          },
        }
      );

      if (searchRes.ok) {
        const searchData = await searchRes.json();
        const activeSub = (searchData.results || []).find(
          (r: any) => r.status === 'authorized'
        );
        if (activeSub) {
          return NextResponse.json(
            {
              ok: false,
              error: 'Ya contás con una suscripción de débito automático activa para este plan.',
              activeSubId: activeSub.id,
            },
            { status: 400 }
          );
        }
      }
    } catch (checkErr) {
      console.warn('[Subscribe] Error verificando suscripciones previas:', checkErr);
    }

    // 2. Retornar el punto de inicio del Plan Oficial de Mercado Pago
    const initPoint = `https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=${MV_PREAPPROVAL_PLAN_ID}`;

    return NextResponse.json({
      ok: true,
      plan_id: MV_PREAPPROVAL_PLAN_ID,
      init_point: initPoint,
      status: 'active',
      frequency: 1,
      frequency_type: 'months',
      amount: 30000,
    });
  } catch (err: any) {
    console.error('[Subscribe] Error en endpoint subscribe:', err);
    return NextResponse.json(
      { ok: false, error: err?.message || 'Error al procesar suscripción' },
      { status: 500 }
    );
  }
}
