import { NextRequest, NextResponse } from 'next/server';
import { getAiSolutionItems, createAiSolutionItem } from '@/lib/data/aiSolutions';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    const items = await getAiSolutionItems();
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error('GET /api/admin/ai-solutions/items error:', error);
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, order } = body;
    if (!title || !description) {
      return NextResponse.json({ error: 'title and description are required' }, { status: 400 });
    }
    const result = await createAiSolutionItem({ title, description, order });
    revalidatePath('/');
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('POST /api/admin/ai-solutions/items error:', error);
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}
