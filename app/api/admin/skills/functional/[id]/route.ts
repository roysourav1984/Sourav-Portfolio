import { NextRequest, NextResponse } from 'next/server';
import {
  updateFunctionalSkill,
  deleteFunctionalSkill,
} from '@/lib/data/skills';
import { revalidatePath } from 'next/cache';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    const body = await request.json();

    const result = await updateFunctionalSkill(id, body);

    revalidatePath('/');

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('PUT /api/admin/skills/functional/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to update functional skill' },
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
    await deleteFunctionalSkill(id);

    revalidatePath('/');

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('DELETE /api/admin/skills/functional/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to delete functional skill' },
      { status: 500 },
    );
  }
}
