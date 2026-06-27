import { NextRequest, NextResponse } from 'next/server';
import {
  getFunctionalSkills,
  createFunctionalSkill,
} from '@/lib/data/skills';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    const skills = await getFunctionalSkills();
    return NextResponse.json(skills || [], { status: 200 });
  } catch (error) {
    console.error('GET /api/admin/skills/functional error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch functional skills' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { label, order } = body;

    if (!label) {
      return NextResponse.json(
        { error: 'label is required' },
        { status: 400 },
      );
    }

    const result = await createFunctionalSkill({
      label,
      order,
    });

    revalidatePath('/');

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('POST /api/admin/skills/functional error:', error);
    return NextResponse.json(
      { error: 'Failed to create functional skill' },
      { status: 500 },
    );
  }
}
