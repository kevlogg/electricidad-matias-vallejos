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

// Initial realistic default clients for Matías Vallejos
const INITIAL_CLIENTS: ClientItem[] = [
  {
    id: 'cli_01',
    name: 'Mariano Benítez',
    phone: '+5492235123456',
    address: 'Güemes 2840, Piso 4 B',
    locality: 'Mar del Plata (Güemes)',
    serviceType: 'Urgencias / Cortocircuito',
    status: 'completado',
    date: '2026-11-02',
    estimatedAmount: 48000,
    notes: 'Recambio de disyuntor diferencial de 25A y prueba de aislamiento. Conforme.',
  },
  {
    id: 'cli_02',
    name: 'Valeria Sotomayor',
    phone: '+5492234987654',
    address: 'Costanera 720',
    locality: 'Santa Clara del Mar',
    serviceType: 'Tableros y Protecciones',
    status: 'completado',
    date: '2026-10-25',
    estimatedAmount: 135000,
    notes: 'Tablero nuevo normalizado, 3 líneas independientes para aire acondicionado y protector de sobretensión.',
  },
  {
    id: 'cli_03',
    name: 'Ignacio G. Roldán',
    phone: '+5492236112233',
    address: 'Calle 21 N° 1140',
    locality: 'Miramar',
    serviceType: 'Iluminación LED Integral',
    status: 'en_proceso',
    date: '2026-11-12',
    estimatedAmount: 92000,
    notes: 'Instalación de 14 paneles embutidos LED y luminarias exteriores con fotocélula.',
  },
  {
    id: 'cli_04',
    name: 'Consultorio Odontológico Mogotes',
    phone: '+5492235998877',
    address: 'Av. Martínez de Hoz 3200',
    locality: 'Mar del Plata (Punta Mogotes)',
    serviceType: 'Instalación Comercial y P.A.T.',
    status: 'presupuestado',
    date: '2026-11-15',
    estimatedAmount: 220000,
    notes: 'Puesta a tierra con jabalina de cobre IRAM, circuito dedicado para compresor y esterilizador.',
  },
];

let inMemoryClients: ClientItem[] = [...INITIAL_CLIENTS];

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
