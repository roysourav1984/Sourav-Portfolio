import { NextRequest, NextResponse } from 'next/server';
import {
  updateSkillCategory,
  deleteSkillCategory,
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

    const result = await updateSkillCategory(id, body);

    revalidatePath('/');

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('PUT /api/admin/skills/categories/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to update skill category' },
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
    await deleteSkillCategory(id);

    revalidatePath('/');

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('DELETE /api/admin/skills/categories/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to delete skill category' },
      { status: 500 },
    );
  }
}
