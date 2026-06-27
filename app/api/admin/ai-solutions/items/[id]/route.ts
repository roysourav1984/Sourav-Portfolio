import { NextRequest, NextResponse } from 'next/server';
import { updateAiSolutionItem, deleteAiSolutionItem } from '@/lib/data/aiSolutions';
import { revalidatePath } from 'next/cache';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    const body = await request.json();
    const result = await updateAiSolutionItem(id, body);
    revalidatePath('/');
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('PUT /api/admin/ai-solutions/items/[id] error:', error);
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    await deleteAiSolutionItem(id);
    revalidatePath('/');
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('DELETE /api/admin/ai-solutions/items/[id] error:', error);
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}
