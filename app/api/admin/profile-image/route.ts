import { put } from '@vercel/blob';
import { db } from '@/db';
import { heroContent } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

const PROFILE_BLOB_KEY = 'profile-portrait';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    const buffer = await file.arrayBuffer();

    // Upload to Vercel Blob
    // Automatically uses BLOB_READ_WRITE_TOKEN from environment
    // On Vercel, this is auto-configured when Blob is enabled
    // Locally, you need to set BLOB_READ_WRITE_TOKEN in .env.local
    let blob;
    try {
      blob = await put(PROFILE_BLOB_KEY, buffer, {
        access: 'public',
        contentType: file.type,
      });
    } catch (error: any) {
      if (error.message.includes('No blob credentials found')) {
        return NextResponse.json(
          {
            error: 'Blob not configured. Add BLOB_READ_WRITE_TOKEN to .env.local from Vercel dashboard.',
            hint: 'https://vercel.com/dashboard/sourav-roy-team/sourav-portfolio/settings/storage',
          },
          { status: 500 }
        );
      }
      throw error;
    }

    // Update database with new URL
    await db
      .update(heroContent)
      .set({
        portraitUrl: blob.url,
        portraitAlt: 'Profile portrait',
        updatedAt: new Date(),
      })
      .execute();

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error('Profile image upload failed:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}
