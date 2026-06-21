import { NextRequest, NextResponse } from 'next/server';
import {
  getInitiativeBySlug,
  updateInitiative,
  deleteInitiative,
} from '@/lib/data/initiatives';
import { revalidatePath } from 'next/cache';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const initiative = await getInitiativeBySlug(id);

    if (!initiative) {
      return NextResponse.json(
        { error: 'Initiative not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(initiative, { status: 200 });
  } catch (error) {
    console.error('GET /api/admin/initiatives/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch initiative' },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    const body = await request.json();

    const result = await updateInitiative(id, body);

    revalidatePath('/');
    revalidatePath('/initiatives');
    if (body.slug) {
      revalidatePath(`/work/${body.slug}`);
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('PUT /api/admin/initiatives/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to update initiative' },
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
    await deleteInitiative(id);

    revalidatePath('/');
    revalidatePath('/initiatives');

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('DELETE /api/admin/initiatives/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to delete initiative' },
      { status: 500 },
    );
  }
}
