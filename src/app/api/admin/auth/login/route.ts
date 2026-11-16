import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { signAdminToken, COOKIE_NAME, COOKIE_MAX_AGE } from '@/lib/auth/session';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json({ error: 'La contraseña es requerida' }, { status: 400 });
    }

    const defaultPassword = process.env.ADMIN_PASSWORD || 'matias2026';
    const hashB64 = process.env.ADMIN_PASSWORD_HASH;

    let isValid = false;

    if (hashB64) {
      try {
        const hash = Buffer.from(hashB64, 'base64').toString('utf8');
        isValid = await bcrypt.compare(password, hash);
      } catch {
        isValid = false;
      }
    }

    // Direct match with ADMIN_PASSWORD or default fallback passwords
    if (!isValid) {
      const allowedPasswords = [
        defaultPassword,
        'matias2026',
        'vallejos2026',
        'admin2026',
        'mvelectricidad',
      ];
      isValid = allowedPasswords.includes(password.trim());
    }

    if (!isValid) {
      return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
    }

    const token = await signAdminToken();
    const response = NextResponse.json({ ok: true, message: 'Autenticación exitosa' });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: COOKIE_MAX_AGE,
      path: '/',
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Error procesando la solicitud' },
      { status: 500 }
    );
  }
}
