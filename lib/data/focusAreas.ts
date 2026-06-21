import { db } from '../../db';
import { focusAreas } from '../../db/schema';
import { eq } from 'drizzle-orm';
import type { FocusArea } from '../../lib/types';

function mapFocusAreaRow(row: {
  id?: number;
  title: string;
  description: string;
  stat?: string | null;
  order?: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}): FocusArea {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    stat: row.stat || undefined,
    order: row.order,
    createdAt: row.createdAt || undefined,
    updatedAt: row.updatedAt || undefined,
  };
}

export async function getFocusAreas(): Promise<FocusArea[]> {
  const result = await db
    .select()
    .from(focusAreas)
    .orderBy(focusAreas.order)
    .execute();

  return result.map(mapFocusAreaRow);
}

export async function createFocusArea(
  data: Omit<FocusArea, 'id' | 'createdAt' | 'updatedAt'>
): Promise<FocusArea> {
  const inserted = await db
    .insert(focusAreas)
    .values({
      title: data.title,
      description: data.description,
      stat: data.stat || null,
      order: data.order || 0,
    })
    .returning()
    .execute();

  return mapFocusAreaRow(inserted[0]);
}

export async function updateFocusArea(
  id: number,
  data: Partial<Omit<FocusArea, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<FocusArea> {
  const updated = await db
    .update(focusAreas)
    .set({
      title: data.title,
      description: data.description,
      stat: data.stat === undefined ? undefined : data.stat || null,
      order: data.order,
      updatedAt: new Date(),
    })
    .where(eq(focusAreas.id, id))
    .returning()
    .execute();

  return mapFocusAreaRow(updated[0]);
}

export async function deleteFocusArea(id: number): Promise<void> {
  await db
    .delete(focusAreas)
    .where(eq(focusAreas.id, id))
    .execute();
}
