import { db } from '../../db';
import { contactInfo } from '../../db/schema';
import type { ContactInfo } from '../../lib/types';

function mapContactInfoRow(row: {
  id?: number;
  email: string;
  linkedIn?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}): ContactInfo {
  return {
    id: row.id,
    email: row.email,
    linkedIn: row.linkedIn || '',
    createdAt: row.createdAt || undefined,
    updatedAt: row.updatedAt || undefined,
  };
}

export async function getContactInfo(): Promise<ContactInfo | null> {
  const result = await db
    .select()
    .from(contactInfo)
    .limit(1)
    .execute();

  if (!result.length) return null;

  return mapContactInfoRow(result[0]);
}

export async function upsertContactInfo(
  data: Omit<ContactInfo, 'id' | 'createdAt' | 'updatedAt'>
): Promise<ContactInfo> {
  const existing = await db
    .select()
    .from(contactInfo)
    .limit(1)
    .execute();

  if (existing.length) {
    await db
      .update(contactInfo)
      .set({
        email: data.email,
        linkedIn: data.linkedIn,
        updatedAt: new Date(),
      })
      .execute();
  } else {
    await db
      .insert(contactInfo)
      .values({
        email: data.email,
        linkedIn: data.linkedIn,
      })
      .execute();
  }

  const result = await getContactInfo();
  if (!result) throw new Error('Failed to upsert contact info');
  return result;
}
