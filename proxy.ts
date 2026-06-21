import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { adminSessions } from '@/db/schema';
import { eq } from 'drizzle-orm';

const SESSION_COOKIE_NAME = 'admin_session';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow login page and login/logout API routes without a session
  if (
    pathname === '/admin/login' ||
    pathname === '/api/admin/login' ||
    pathname === '/api/admin/logout'
  ) {
    return NextResponse.next();
  }

  // Check for valid session cookie
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    // Redirect to login
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  try {
    // Verify session exists and is not expired
    const now = new Date();
    const session = await db
      .select()
      .from(adminSessions)
      .where(eq(adminSessions.tokenHash, token))
      .limit(1)
      .execute();

    if (!session.length || session[0].expiresAt < now) {
      // Session expired or invalid
      const response = NextResponse.redirect(
        new URL('/admin/login', request.url),
      );
      response.cookies.delete(SESSION_COOKIE_NAME);
      return response;
    }

    // Session is valid, allow request
    return NextResponse.next();
  } catch (error) {
    // On error, redirect to login
    console.error('Session verification error:', error);
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
  runtime: 'nodejs',
};
