import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { heroStats } from '@/db/schema';
import { deleteHeroStat } from '@/lib/data/hero';
import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    const body = await request.json();
    const { label, value } = body;

    if (!label || !value) {
      return NextResponse.json(
        { error: 'label and value are required' },
        { status: 400 },
      );
    }

    await db
      .update(heroStats)
      .set({ label, value })
      .where(eq(heroStats.id, id))
      .execute();

    revalidatePath('/');

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('PUT /api/admin/hero/stats/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to update hero stat' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    await deleteHeroStat(id);

    revalidatePath('/');

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('DELETE /api/admin/hero/stats/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to delete hero stat' },
      { status: 500 },
    );
  }
}
