import { NextRequest, NextResponse } from 'next/server';
import { getSummary, upsertSummary } from '@/lib/data/summary';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
  try {
    const summary = await getSummary();
    return NextResponse.json(summary || {}, { status: 200 });
  } catch (error) {
    console.error('GET /api/admin/summary error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch summary' },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { paragraphs, pullQuote } = body;

    if (!paragraphs || !Array.isArray(paragraphs)) {
      return NextResponse.json(
        { error: 'paragraphs array is required' },
        { status: 400 },
      );
    }

    const result = await upsertSummary({
      paragraphs,
      pullQuote,
    });

    revalidatePath('/');

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('PUT /api/admin/summary error:', error);
    return NextResponse.json(
      { error: 'Failed to update summary' },
      { status: 500 },
    );
  }
}
