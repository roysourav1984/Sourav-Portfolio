import { db } from '../../db';
import { awards } from '../../db/schema';
import { eq } from 'drizzle-orm';
import type { Award } from '../../lib/types';

function mapAwardRow(row: {
  id?: number;
  title: string;
  org: string;
  description?: string | null;
  order?: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}): Award {
  return {
    id: row.id,
    title: row.title,
    org: row.org,
    description: row.description || undefined,
    order: row.order,
    createdAt: row.createdAt || undefined,
    updatedAt: row.updatedAt || undefined,
  };
}

export async function getAwards(): Promise<Award[]> {
  const result = await db
    .select()
    .from(awards)
    .orderBy(awards.order)
    .execute();

  return result.map(mapAwardRow);
}

export async function createAward(
  data: Omit<Award, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Award> {
  const inserted = await db
    .insert(awards)
    .values({
      title: data.title,
      org: data.org,
      description: data.description || null,
      order: data.order || 0,
    })
    .returning()
    .execute();

  return mapAwardRow(inserted[0]);
}

export async function updateAward(
  id: number,
  data: Partial<Omit<Award, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<Award> {
  const updateData: Record<string, unknown> = { updatedAt: new Date() };
  if (data.title !== undefined) updateData.title = data.title;
  if (data.org !== undefined) updateData.org = data.org;
  if (data.order !== undefined) updateData.order = data.order;
  if ('description' in data) updateData.description = data.description || null;

  const updated = await db
    .update(awards)
    .set(updateData)
    .where(eq(awards.id, id))
    .returning()
    .execute();

  return mapAwardRow(updated[0]);
}

export async function deleteAward(id: number): Promise<void> {
  await db
    .delete(awards)
    .where(eq(awards.id, id))
    .execute();
}
