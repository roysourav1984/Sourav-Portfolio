import { NextRequest, NextResponse } from 'next/server';
import {
  getExperienceRoles,
  createRole,
} from '@/lib/data/experience';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    const roles = await getExperienceRoles();
    return NextResponse.json(roles || [], { status: 200 });
  } catch (error) {
    console.error('GET /api/admin/experience error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch experience roles' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      slug,
      org,
      title,
      startDate,
      endDate,
      summary,
      responsibilities,
      order,
    } = body;

    if (!slug || !org || !title || !startDate) {
      return NextResponse.json(
        { error: 'slug, org, title, and startDate are required' },
        { status: 400 },
      );
    }

    const result = await createRole({
      slug,
      org,
      title,
      startDate,
      endDate: endDate || 'Present',
      summary: summary || '',
      responsibilities: responsibilities || [],
      order,
    });

    revalidatePath('/');
    revalidatePath('/experience');
    revalidatePath(`/experience/${slug}`);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('POST /api/admin/experience error:', error);
    return NextResponse.json(
      { error: 'Failed to create experience role' },
      { status: 500 },
    );
  }
}
