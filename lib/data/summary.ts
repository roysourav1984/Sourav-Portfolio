import { db } from '../../db';
import { summary } from '../../db/schema';
import type { SummaryContent } from '../../lib/types';

function mapSummaryRow(row: {
  id?: number;
  paragraphs?: string[] | null;
  pullQuote?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}): SummaryContent {
  return {
    id: row.id,
    paragraphs: row.paragraphs || [],
    pullQuote: row.pullQuote || undefined,
    createdAt: row.createdAt || undefined,
    updatedAt: row.updatedAt || undefined,
  };
}

export async function getSummary(): Promise<SummaryContent | null> {
  const result = await db
    .select()
    .from(summary)
    .limit(1)
    .execute();

  if (!result.length) return null;

  return mapSummaryRow(result[0]);
}

export async function upsertSummary(
  data: Omit<SummaryContent, 'id' | 'createdAt' | 'updatedAt'>
): Promise<SummaryContent> {
  const existing = await db
    .select()
    .from(summary)
    .limit(1)
    .execute();

  if (existing.length) {
    await db
      .update(summary)
      .set({
        paragraphs: data.paragraphs,
        pullQuote: data.pullQuote || null,
        updatedAt: new Date(),
      })
      .execute();
  } else {
    await db
      .insert(summary)
      .values({
        paragraphs: data.paragraphs,
        pullQuote: data.pullQuote || null,
      })
      .execute();
  }

  const result = await getSummary();
  if (!result) throw new Error('Failed to upsert summary');
  return result;
}
