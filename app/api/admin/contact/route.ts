import { NextRequest, NextResponse } from 'next/server';
import {
  getContactInfo,
  upsertContactInfo,
} from '@/lib/data/contact';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
  try {
    const contact = await getContactInfo();
    return NextResponse.json(contact || {}, { status: 200 });
  } catch (error) {
    console.error('GET /api/admin/contact error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact info' },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, linkedIn } = body;

    if (!email || !linkedIn) {
      return NextResponse.json(
        { error: 'email and linkedIn are required' },
        { status: 400 },
      );
    }

    const result = await upsertContactInfo({
      email,
      linkedIn,
    });

    revalidatePath('/', 'layout');

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('PUT /api/admin/contact error:', error);
    return NextResponse.json(
      { error: 'Failed to update contact info' },
      { status: 500 },
    );
  }
}
