import { db } from '../../db';
import { aiSolutionsSection, aiSolutionItems } from '../../db/schema';
import { eq } from 'drizzle-orm';
import type { AiSolutionsSection, AiSolutionItem } from '../types';

type SectionRow = typeof aiSolutionsSection.$inferSelect;
type ItemRow = typeof aiSolutionItems.$inferSelect;

function mapSectionRow(row: SectionRow, items: AiSolutionItem[]): AiSolutionsSection {
  return {
    id: row.id,
    title: row.title,
    intro: row.intro,
    items,
    createdAt: row.createdAt ?? undefined,
    updatedAt: row.updatedAt ?? undefined,
  };
}

function mapItemRow(row: ItemRow): AiSolutionItem {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    order: row.order,
    createdAt: row.createdAt ?? undefined,
    updatedAt: row.updatedAt ?? undefined,
  };
}

async function fetchItems(): Promise<AiSolutionItem[]> {
  const rows = await db.select().from(aiSolutionItems).orderBy(aiSolutionItems.order).execute();
  return rows.map(mapItemRow);
}

export async function getAiSolutions(): Promise<AiSolutionsSection | null> {
  const rows = await db.select().from(aiSolutionsSection).limit(1).execute();
  if (!rows.length) return null;
  return mapSectionRow(rows[0], await fetchItems());
}

export async function upsertAiSolutionsSection(
  data: Pick<AiSolutionsSection, 'title' | 'intro'>,
): Promise<AiSolutionsSection> {
  const existing = await db.select().from(aiSolutionsSection).limit(1).execute();

  let row: SectionRow;
  if (existing.length) {
    const updated = await db
      .update(aiSolutionsSection)
      .set({ title: data.title, intro: data.intro, updatedAt: new Date() })
      .where(eq(aiSolutionsSection.id, existing[0].id))
      .returning()
      .execute();
    row = updated[0];
  } else {
    const inserted = await db
      .insert(aiSolutionsSection)
      .values({ title: data.title, intro: data.intro })
      .returning()
      .execute();
    row = inserted[0];
  }

  return mapSectionRow(row, await fetchItems());
}

export async function getAiSolutionItems(): Promise<AiSolutionItem[]> {
  return fetchItems();
}

export async function createAiSolutionItem(
  data: Pick<AiSolutionItem, 'title' | 'description' | 'order'>,
): Promise<AiSolutionItem> {
  const inserted = await db
    .insert(aiSolutionItems)
    .values({ title: data.title, description: data.description, order: data.order ?? 0 })
    .returning()
    .execute();
  return mapItemRow(inserted[0]);
}

export async function updateAiSolutionItem(
  id: number,
  data: Partial<Pick<AiSolutionItem, 'title' | 'description' | 'order'>>,
): Promise<AiSolutionItem> {
  const updated = await db
    .update(aiSolutionItems)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(aiSolutionItems.id, id))
    .returning()
    .execute();
  return mapItemRow(updated[0]);
}

export async function deleteAiSolutionItem(id: number): Promise<void> {
  await db.delete(aiSolutionItems).where(eq(aiSolutionItems.id, id)).execute();
}
