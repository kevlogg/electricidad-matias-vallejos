import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { COOKIE_NAME, verifyAdminToken } from '@/lib/auth/session';

export const dynamic = 'force-dynamic';

export interface ClientItem {
  id: string;
  name: string;
  phone: string;
  address: string;
  locality: string;
  serviceType: string;
  status: 'nuevo' | 'en_proceso' | 'presupuestado' | 'completado';
  date: string;
  estimatedAmount?: number;
  notes?: string;
}

// Clean initial clients array (zero mock/example data)
let inMemoryClients: ClientItem[] = [];

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  return NextResponse.json({ clients: inMemoryClients });
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const newClient: ClientItem = {
      id: `cli_${Date.now()}`,
      name: body.name || 'Cliente sin nombre',
      phone: body.phone || '',
      address: body.address || '',
      locality: body.locality || 'Mar del Plata',
      serviceType: body.serviceType || 'Servicio Eléctrico',
      status: body.status || 'nuevo',
      date: body.date || new Date().toISOString().split('T')[0],
      estimatedAmount: Number(body.estimatedAmount) || 0,
      notes: body.notes || '',
    };

    inMemoryClients = [newClient, ...inMemoryClients];
    return NextResponse.json({ ok: true, client: newClient });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Error guardando cliente' }, { status: 500 });
  }
}
