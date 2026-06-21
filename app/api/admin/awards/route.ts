import { NextRequest, NextResponse } from 'next/server';
import {
  getAwards,
  createAward,
} from '@/lib/data/awards';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
  try {
    const awards = await getAwards();
    return NextResponse.json(awards || [], { status: 200 });
  } catch (error) {
    console.error('GET /api/admin/awards error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch awards' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, org, description, order } = body;

    if (!title || !org) {
      return NextResponse.json(
        { error: 'title and org are required' },
        { status: 400 },
      );
    }

    const result = await createAward({
      title,
      org,
      description,
      order,
    });

    revalidatePath('/');
    revalidatePath('/recognition');

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('POST /api/admin/awards error:', error);
    return NextResponse.json(
      { error: 'Failed to create award' },
      { status: 500 },
    );
  }
}
