import { NextRequest, NextResponse } from 'next/server';
import {
  getFocusAreas,
  createFocusArea,
} from '@/lib/data/focusAreas';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    const areas = await getFocusAreas();
    return NextResponse.json(areas || [], { status: 200 });
  } catch (error) {
    console.error('GET /api/admin/focus-areas error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch focus areas' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, stat, order } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: 'title and description are required' },
        { status: 400 },
      );
    }

    const result = await createFocusArea({
      title,
      description,
      stat,
      order,
    });

    revalidatePath('/');
    revalidatePath('/focus-areas');

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('POST /api/admin/focus-areas error:', error);
    return NextResponse.json(
      { error: 'Failed to create focus area' },
      { status: 500 },
    );
  }
}
