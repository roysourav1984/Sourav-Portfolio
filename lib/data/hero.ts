import { db } from '../../db';
import { heroContent, heroStats } from '../../db/schema';
import { eq } from 'drizzle-orm';
import type { HeroContent, HeroStat } from '../../lib/types';

function mapHeroRow(row: {
  id?: number;
  name?: string | null;
  headline: string;
  subtitle: string;
  location: string;
  summary?: string | null;
  portraitUrl?: string | null;
  portraitAlt?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}): Omit<HeroContent, 'stats'> {
  return {
    id: row.id,
    name: row.name || undefined,
    headline: row.headline,
    subtitle: row.subtitle,
    location: row.location,
    summary: row.summary || undefined,
    portraitUrl: row.portraitUrl || undefined,
    portraitAlt: row.portraitAlt || undefined,
    createdAt: row.createdAt || undefined,
    updatedAt: row.updatedAt || undefined,
  };
}

function mapStatRow(row: { id?: number; label: string; value: string }): HeroStat {
  return {
    id: row.id,
    label: row.label,
    value: row.value,
  };
}

export async function getHeroContent(): Promise<HeroContent | null> {
  const result = await db.select().from(heroContent).limit(1).execute();

  if (!result.length) return null;

  const heroRow = mapHeroRow(result[0]);
  const statRows = await db.select().from(heroStats).execute();

  return {
    ...heroRow,
    stats: statRows.map(mapStatRow),
  };
}

export async function upsertHeroContent(
  data: Omit<HeroContent, 'id' | 'createdAt' | 'updatedAt'>
): Promise<HeroContent> {
  const existing = await db
    .select()
    .from(heroContent)
    .limit(1)
    .execute();

  if (existing.length) {
    await db
      .update(heroContent)
      .set({
        name: data.name,
        headline: data.headline,
        subtitle: data.subtitle,
        location: data.location,
        summary: data.summary,
        portraitUrl: data.portraitUrl,
        portraitAlt: data.portraitAlt,
        updatedAt: new Date(),
      })
      .execute();
  } else {
    await db
      .insert(heroContent)
      .values({
        name: data.name,
        headline: data.headline,
        subtitle: data.subtitle,
        location: data.location,
        summary: data.summary,
        portraitUrl: data.portraitUrl,
        portraitAlt: data.portraitAlt,
      })
      .returning()
      .execute();
  }

  const result = await getHeroContent();
  if (!result) throw new Error('Failed to upsert hero content');
  return result;
}

export async function upsertHeroStat(data: HeroStat): Promise<HeroStat> {
  if (data.id) {
    const updated = await db
      .update(heroStats)
      .set({
        label: data.label,
        value: data.value,
      })
      .where(eq(heroStats.id, data.id))
      .returning()
      .execute();
    return mapStatRow(updated[0]);
  }

  const inserted = await db
    .insert(heroStats)
    .values({
      label: data.label,
      value: data.value,
    })
    .returning()
    .execute();

  return mapStatRow(inserted[0]);
}

export async function deleteHeroStat(id: number): Promise<void> {
  await db
    .delete(heroStats)
    .where(eq(heroStats.id, id))
    .execute();
}
