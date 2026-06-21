import { db } from '../../db';
import { education } from '../../db/schema';
import { eq } from 'drizzle-orm';
import type { EducationEntry } from '../../lib/types';

function mapEducationRow(row: {
  id?: number;
  institution: string;
  degree: string;
  year: string;
  order?: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}): EducationEntry {
  return {
    id: row.id,
    institution: row.institution,
    degree: row.degree,
    year: row.year,
    order: row.order,
    createdAt: row.createdAt || undefined,
    updatedAt: row.updatedAt || undefined,
  };
}

export async function getEducation(): Promise<EducationEntry[]> {
  const result = await db
    .select()
    .from(education)
    .orderBy(education.order)
    .execute();

  return result.map(mapEducationRow);
}

export async function createEducation(
  data: Omit<EducationEntry, 'id' | 'createdAt' | 'updatedAt'>
): Promise<EducationEntry> {
  const inserted = await db
    .insert(education)
    .values({
      institution: data.institution,
      degree: data.degree,
      year: data.year,
      order: data.order || 0,
    })
    .returning()
    .execute();

  return mapEducationRow(inserted[0]);
}

export async function updateEducation(
  id: number,
  data: Partial<Omit<EducationEntry, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<EducationEntry> {
  const updated = await db
    .update(education)
    .set({
      institution: data.institution,
      degree: data.degree,
      year: data.year,
      order: data.order,
      updatedAt: new Date(),
    })
    .where(eq(education.id, id))
    .returning()
    .execute();

  return mapEducationRow(updated[0]);
}

export async function deleteEducation(id: number): Promise<void> {
  await db
    .delete(education)
    .where(eq(education.id, id))
    .execute();
}
