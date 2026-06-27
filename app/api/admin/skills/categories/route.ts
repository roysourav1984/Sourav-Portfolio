import { NextRequest, NextResponse } from 'next/server';
import {
  getSkillCategories,
  createSkillCategory,
} from '@/lib/data/skills';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    const categories = await getSkillCategories();
    return NextResponse.json(categories || [], { status: 200 });
  } catch (error) {
    console.error('GET /api/admin/skills/categories error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch skill categories' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { categoryName, skills, order } = body;

    if (!categoryName) {
      return NextResponse.json(
        { error: 'categoryName is required' },
        { status: 400 },
      );
    }

    const result = await createSkillCategory({
      categoryName,
      skills: skills || [],
      order,
    });

    revalidatePath('/');

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('POST /api/admin/skills/categories error:', error);
    return NextResponse.json(
      { error: 'Failed to create skill category' },
      { status: 500 },
    );
  }
}
