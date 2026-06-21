import { db } from '../../db';
import { certifications } from '../../db/schema';
import { eq } from 'drizzle-orm';
import type { Certification } from '../../lib/types';

function mapCertificationRow(row: {
  id?: number;
  name: string;
  issuer: string;
  year?: string | null;
  order?: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}): Certification {
  return {
    id: row.id,
    name: row.name,
    issuer: row.issuer,
    year: row.year || undefined,
    order: row.order,
    createdAt: row.createdAt || undefined,
    updatedAt: row.updatedAt || undefined,
  };
}

export async function getCertifications(): Promise<Certification[]> {
  const result = await db
    .select()
    .from(certifications)
    .orderBy(certifications.order)
    .execute();

  return result.map(mapCertificationRow);
}

export async function createCertification(
  data: Omit<Certification, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Certification> {
  const inserted = await db
    .insert(certifications)
    .values({
      name: data.name,
      issuer: data.issuer,
      year: data.year || null,
      order: data.order || 0,
    })
    .returning()
    .execute();

  return mapCertificationRow(inserted[0]);
}

export async function updateCertification(
  id: number,
  data: Partial<Omit<Certification, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<Certification> {
  const updateData: Record<string, unknown> = { updatedAt: new Date() };
  if (data.name !== undefined) updateData.name = data.name;
  if (data.issuer !== undefined) updateData.issuer = data.issuer;
  if (data.order !== undefined) updateData.order = data.order;
  if ('year' in data) updateData.year = data.year || null;

  const updated = await db
    .update(certifications)
    .set(updateData)
    .where(eq(certifications.id, id))
    .returning()
    .execute();

  return mapCertificationRow(updated[0]);
}

export async function deleteCertification(id: number): Promise<void> {
  await db
    .delete(certifications)
    .where(eq(certifications.id, id))
    .execute();
}
