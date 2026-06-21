import { NextRequest, NextResponse } from 'next/server';
import {
  getEducation,
  createEducation,
} from '@/lib/data/education';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
  try {
    const education = await getEducation();
    return NextResponse.json(education || [], { status: 200 });
  } catch (error) {
    console.error('GET /api/admin/education error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch education' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { institution, degree, year, order } = body;

    if (!institution || !degree || !year) {
      return NextResponse.json(
        { error: 'institution, degree, and year are required' },
        { status: 400 },
      );
    }

    const result = await createEducation({
      institution,
      degree,
      year,
      order,
    });

    revalidatePath('/');

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('POST /api/admin/education error:', error);
    return NextResponse.json(
      { error: 'Failed to create education entry' },
      { status: 500 },
    );
  }
}
