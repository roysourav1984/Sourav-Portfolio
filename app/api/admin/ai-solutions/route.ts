import { NextRequest, NextResponse } from 'next/server';
import { getAiSolutions, upsertAiSolutionsSection } from '@/lib/data/aiSolutions';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    const data = await getAiSolutions();
    return NextResponse.json(data || {}, { status: 200 });
  } catch (error) {
    console.error('GET /api/admin/ai-solutions error:', error);
    return NextResponse.json({ error: 'Failed to fetch AI solutions' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, intro } = body;
    if (!title || !intro) {
      return NextResponse.json({ error: 'title and intro are required' }, { status: 400 });
    }
    const result = await upsertAiSolutionsSection({ title, intro });
    revalidatePath('/');
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('PUT /api/admin/ai-solutions error:', error);
    return NextResponse.json({ error: 'Failed to update AI solutions section' }, { status: 500 });
  }
}
