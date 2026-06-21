import { db } from '../../db';
import { initiatives } from '../../db/schema';
import { eq } from 'drizzle-orm';
import type { Initiative } from '../../lib/types';

function mapInitiativeRow(row: {
  id?: number;
  slug: string;
  title: string;
  oneLiner: string;
  year: string;
  tags?: string[] | null;
  context: string;
  approach: string;
  technologies?: string[] | null;
  outcome: string;
  order?: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}): Initiative {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    oneLiner: row.oneLiner,
    year: row.year,
    tags: row.tags || [],
    context: row.context,
    approach: row.approach,
    technologies: row.technologies || [],
    outcome: row.outcome,
    order: row.order,
    createdAt: row.createdAt || undefined,
    updatedAt: row.updatedAt || undefined,
  };
}

export async function getInitiatives(): Promise<Initiative[]> {
  const result = await db
    .select()
    .from(initiatives)
    .orderBy(initiatives.order)
    .execute();

  return result.map(mapInitiativeRow);
}

export async function getInitiativeBySlug(slug: string): Promise<Initiative | null> {
  const result = await db
    .select()
    .from(initiatives)
    .where(eq(initiatives.slug, slug))
    .limit(1)
    .execute();

  if (!result.length) return null;

  return mapInitiativeRow(result[0]);
}

export async function createInitiative(
  data: Omit<Initiative, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Initiative> {
  const inserted = await db
    .insert(initiatives)
    .values({
      slug: data.slug,
      title: data.title,
      oneLiner: data.oneLiner,
      year: data.year,
      tags: data.tags || [],
      context: data.context,
      approach: data.approach,
      technologies: data.technologies || [],
      outcome: data.outcome,
      order: data.order || 0,
    })
    .returning()
    .execute();

  return mapInitiativeRow(inserted[0]);
}

export async function updateInitiative(
  id: number,
  data: Partial<Omit<Initiative, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<Initiative> {
  const updated = await db
    .update(initiatives)
    .set({
      slug: data.slug,
      title: data.title,
      oneLiner: data.oneLiner,
      year: data.year,
      tags: data.tags,
      context: data.context,
      approach: data.approach,
      technologies: data.technologies,
      outcome: data.outcome,
      order: data.order,
      updatedAt: new Date(),
    })
    .where(eq(initiatives.id, id))
    .returning()
    .execute();

  return mapInitiativeRow(updated[0]);
}

export async function deleteInitiative(id: number): Promise<void> {
  await db
    .delete(initiatives)
    .where(eq(initiatives.id, id))
    .execute();
}
