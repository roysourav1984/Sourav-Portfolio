import { db } from '../../db';
import { aiSolutionsSection, aiSolutionItems } from '../../db/schema';
import type { AiSolutionsSection, AiSolutionItem } from '../types';

type ItemRow = typeof aiSolutionItems.$inferSelect;

function mapItemRow(row: ItemRow): AiSolutionItem {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    order: row.order,
    createdAt: row.createdAt || undefined,
    updatedAt: row.updatedAt || undefined,
  };
}

export async function getAiSolutions(): Promise<AiSolutionsSection | null> {
  const sectionRows = await db.select().from(aiSolutionsSection).limit(1).execute();
  if (!sectionRows.length) return null;

  const section = sectionRows[0];
  const items = await db
    .select()
    .from(aiSolutionItems)
    .orderBy(aiSolutionItems.order)
    .execute();

  return {
    id: section.id,
    title: section.title,
    intro: section.intro,
    items: items.map(mapItemRow),
    createdAt: section.createdAt || undefined,
    updatedAt: section.updatedAt || undefined,
  };
}
