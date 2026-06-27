import { NextRequest, NextResponse } from 'next/server';
import {
  getInitiatives,
  createInitiative,
} from '@/lib/data/initiatives';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    const initiatives = await getInitiatives();
    return NextResponse.json(initiatives || [], { status: 200 });
  } catch (error) {
    console.error('GET /api/admin/initiatives error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch initiatives' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      slug,
      title,
      oneLiner,
      year,
      tags,
      context,
      approach,
      technologies,
      outcome,
      order,
    } = body;

    if (!slug || !title || !oneLiner || !year) {
      return NextResponse.json(
        { error: 'slug, title, oneLiner, and year are required' },
        { status: 400 },
      );
    }

    const result = await createInitiative({
      slug,
      title,
      oneLiner,
      year,
      tags: tags || [],
      context: context || '',
      approach: approach || '',
      technologies: technologies || [],
      outcome: outcome || '',
      order,
    });

    revalidatePath('/');
    revalidatePath('/initiatives');
    revalidatePath(`/work/${slug}`);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('POST /api/admin/initiatives error:', error);
    return NextResponse.json(
      { error: 'Failed to create initiative' },
      { status: 500 },
    );
  }
}
