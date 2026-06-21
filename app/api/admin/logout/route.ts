import { NextResponse } from 'next/server';
import { db } from '@/db';
import { adminSessions } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getSessionCookie, clearSessionCookie } from '@/lib/auth';

export async function POST() {
  try {
    const token = await getSessionCookie();

    if (token) {
      await db.delete(adminSessions).where(eq(adminSessions.tokenHash, token));
    }

    await clearSessionCookie();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('POST /api/admin/logout error:', error);
    return NextResponse.json({ error: 'An error occurred during logout' }, { status: 500 });
  }
}
