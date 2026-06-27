import { NextRequest, NextResponse } from 'next/server';
import {
  getCertifications,
  createCertification,
} from '@/lib/data/certifications';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    const certs = await getCertifications();
    return NextResponse.json(certs || [], { status: 200 });
  } catch (error) {
    console.error('GET /api/admin/certifications error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch certifications' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, issuer, year, order } = body;

    if (!name || !issuer) {
      return NextResponse.json(
        { error: 'name and issuer are required' },
        { status: 400 },
      );
    }

    const result = await createCertification({
      name,
      issuer,
      year,
      order,
    });

    revalidatePath('/');
    revalidatePath('/credentials');

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('POST /api/admin/certifications error:', error);
    return NextResponse.json(
      { error: 'Failed to create certification' },
      { status: 500 },
    );
  }
}
