import { SignJWT, jwtVerify } from 'jose';

export const COOKIE_NAME = 'mv_admin_session';
export const COOKIE_MAX_AGE = 60 * 60 * 12; // 12 hours

function getSecret() {
  const secret = process.env.JWT_SECRET || 'mv-electricidad-secure-jwt-2026-secret-token';
  return new TextEncoder().encode(secret);
}

export async function signAdminToken(): Promise<string> {
  return new SignJWT({ role: 'admin', user: 'Matías Vallejos' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('12h')
    .sign(getSecret());
}

export async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}
