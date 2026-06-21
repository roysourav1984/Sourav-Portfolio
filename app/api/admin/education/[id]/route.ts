import { NextRequest, NextResponse } from 'next/server';
import {
  updateEducation,
  deleteEducation,
} from '@/lib/data/education';
import { revalidatePath } from 'next/cache';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    const body = await request.json();

    const result = await updateEducation(id, body);

    revalidatePath('/');

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('PUT /api/admin/education/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to update education entry' },
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
    await deleteEducation(id);

    revalidatePath('/');

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('DELETE /api/admin/education/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to delete education entry' },
      { status: 500 },
    );
  }
}
