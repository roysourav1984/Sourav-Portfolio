import { NextRequest, NextResponse } from 'next/server';
import {
  updateCertification,
  deleteCertification,
} from '@/lib/data/certifications';
import { revalidatePath } from 'next/cache';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    const body = await request.json();

    const result = await updateCertification(id, body);

    revalidatePath('/');
    revalidatePath('/credentials');

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('PUT /api/admin/certifications/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to update certification' },
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
    await deleteCertification(id);

    revalidatePath('/');
    revalidatePath('/credentials');

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('DELETE /api/admin/certifications/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to delete certification' },
      { status: 500 },
    );
  }
}
