import { NextRequest, NextResponse } from 'next/server';
import {
  updateAward,
  deleteAward,
} from '@/lib/data/awards';
import { revalidatePath } from 'next/cache';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    const body = await request.json();

    const result = await updateAward(id, body);

    revalidatePath('/');
    revalidatePath('/recognition');

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('PUT /api/admin/awards/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to update award' },
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
    await deleteAward(id);

    revalidatePath('/');
    revalidatePath('/recognition');

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('DELETE /api/admin/awards/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to delete award' },
      { status: 500 },
    );
  }
}
