import { NextRequest, NextResponse } from 'next/server';
import {
  updateFocusArea,
  deleteFocusArea,
} from '@/lib/data/focusAreas';
import { revalidatePath } from 'next/cache';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    const body = await request.json();

    const result = await updateFocusArea(id, body);

    revalidatePath('/');
    revalidatePath('/focus-areas');

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('PUT /api/admin/focus-areas/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to update focus area' },
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
    await deleteFocusArea(id);

    revalidatePath('/');
    revalidatePath('/focus-areas');

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('DELETE /api/admin/focus-areas/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to delete focus area' },
      { status: 500 },
    );
  }
}
