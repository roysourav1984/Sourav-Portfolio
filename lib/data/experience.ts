import { db } from '../../db';
import { experienceRoles } from '../../db/schema';
import { eq } from 'drizzle-orm';
import type { ExperienceRole } from '../../lib/types';

function mapExperienceRow(row: {
  id?: number;
  slug: string;
  org: string;
  title: string;
  startDate: string;
  endDate?: string | null;
  summary: string;
  responsibilities?: string[] | null;
  order?: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}): ExperienceRole {
  return {
    id: row.id,
    slug: row.slug,
    org: row.org,
    title: row.title,
    startDate: row.startDate,
    endDate: (row.endDate || 'Present') as string | 'Present',
    summary: row.summary,
    responsibilities: row.responsibilities || [],
    order: row.order,
    createdAt: row.createdAt || undefined,
    updatedAt: row.updatedAt || undefined,
  };
}

export async function getExperienceRoles(): Promise<ExperienceRole[]> {
  const result = await db
    .select()
    .from(experienceRoles)
    .orderBy(experienceRoles.order)
    .execute();

  return result.map(mapExperienceRow);
}

export async function getRoleBySlug(slug: string): Promise<ExperienceRole | null> {
  const result = await db
    .select()
    .from(experienceRoles)
    .where(eq(experienceRoles.slug, slug))
    .limit(1)
    .execute();

  if (!result.length) return null;

  return mapExperienceRow(result[0]);
}

export async function createRole(
  data: Omit<ExperienceRole, 'id' | 'createdAt' | 'updatedAt'>
): Promise<ExperienceRole> {
  const inserted = await db
    .insert(experienceRoles)
    .values({
      slug: data.slug,
      org: data.org,
      title: data.title,
      startDate: data.startDate,
      endDate: data.endDate,
      summary: data.summary,
      responsibilities: data.responsibilities || [],
      order: data.order || 0,
    })
    .returning()
    .execute();

  return mapExperienceRow(inserted[0]);
}

export async function updateRole(
  id: number,
  data: Partial<Omit<ExperienceRole, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<ExperienceRole> {
  const updated = await db
    .update(experienceRoles)
    .set({
      slug: data.slug,
      org: data.org,
      title: data.title,
      startDate: data.startDate,
      endDate: data.endDate,
      summary: data.summary,
      responsibilities: data.responsibilities,
      order: data.order,
      updatedAt: new Date(),
    })
    .where(eq(experienceRoles.id, id))
    .returning()
    .execute();

  return mapExperienceRow(updated[0]);
}

export async function deleteRole(id: number): Promise<void> {
  await db
    .delete(experienceRoles)
    .where(eq(experienceRoles.id, id))
    .execute();
}
