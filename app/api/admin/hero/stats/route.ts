import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { heroStats } from '@/db/schema';
import { upsertHeroStat } from '@/lib/data/hero';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
  try {
    const stats = await db.select().from(heroStats).orderBy(heroStats.id).execute();
    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    console.error('GET /api/admin/hero/stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hero stats' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { label, value } = body;

    if (!label || !value) {
      return NextResponse.json(
        { error: 'label and value are required' },
        { status: 400 },
      );
    }

    const result = await upsertHeroStat({ label, value });

    revalidatePath('/');

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('POST /api/admin/hero/stats error:', error);
    return NextResponse.json(
      { error: 'Failed to create hero stat' },
      { status: 500 },
    );
  }
}
