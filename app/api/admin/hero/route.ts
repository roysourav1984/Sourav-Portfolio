import { NextRequest, NextResponse } from 'next/server';
import { getHeroContent, upsertHeroContent } from '@/lib/data/hero';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
  try {
    const hero = await getHeroContent();
    return NextResponse.json(hero || {}, { status: 200 });
  } catch (error) {
    console.error('GET /api/admin/hero error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hero content' },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, headline, subtitle, location, summary, portraitUrl, portraitAlt } = body;

    if (!headline || !subtitle || !location) {
      return NextResponse.json(
        { error: 'headline, subtitle, and location are required' },
        { status: 400 },
      );
    }

    const result = await upsertHeroContent({
      name,
      headline,
      subtitle,
      location,
      summary,
      portraitUrl,
      portraitAlt,
    });

    revalidatePath('/');

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('PUT /api/admin/hero error:', error);
    return NextResponse.json(
      { error: 'Failed to update hero content' },
      { status: 500 },
    );
  }
}
