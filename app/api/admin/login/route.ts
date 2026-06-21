import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { adminSessions } from '@/db/schema';
import {
  verifyPassword,
  generateSessionToken,
  setSessionCookie,
} from '@/lib/auth';

const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }

    const passwordHash = process.env.ADMIN_PASSWORD_HASH;

    if (!passwordHash) {
      console.error('ADMIN_PASSWORD_HASH environment variable is not set');
      return NextResponse.json(
        { error: 'Admin login is not configured' },
        { status: 500 },
      );
    }

    const isValid = await verifyPassword(password, passwordHash);

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const token = generateSessionToken();
    const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

    await db.insert(adminSessions).values({
      tokenHash: token,
      expiresAt,
    });

    await setSessionCookie(token);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('POST /api/admin/login error:', error);
    return NextResponse.json({ error: 'An error occurred during login' }, { status: 500 });
  }
}
