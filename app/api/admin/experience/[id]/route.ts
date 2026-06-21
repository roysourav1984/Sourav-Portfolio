import { NextRequest, NextResponse } from 'next/server';
import {
  getRoleBySlug,
  updateRole,
  deleteRole,
} from '@/lib/data/experience';
import { revalidatePath } from 'next/cache';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const role = await getRoleBySlug(id);

    if (!role) {
      return NextResponse.json(
        { error: 'Role not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(role, { status: 200 });
  } catch (error) {
    console.error('GET /api/admin/experience/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch experience role' },
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

    const result = await updateRole(id, body);

    revalidatePath('/');
    revalidatePath('/experience');
    if (body.slug) {
      revalidatePath(`/experience/${body.slug}`);
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('PUT /api/admin/experience/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to update experience role' },
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
    await deleteRole(id);

    revalidatePath('/');
    revalidatePath('/experience');

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('DELETE /api/admin/experience/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to delete experience role' },
      { status: 500 },
    );
  }
}
