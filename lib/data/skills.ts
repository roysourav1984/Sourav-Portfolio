import { db } from '../../db';
import { skillCategories, functionalSkills } from '../../db/schema';
import { eq } from 'drizzle-orm';
import type { SkillCategory, FunctionalSkill } from '../../lib/types';

function mapSkillCategoryRow(row: {
  id?: number;
  categoryName: string;
  skills?: string[] | null;
  order?: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}): SkillCategory {
  return {
    id: row.id,
    categoryName: row.categoryName,
    skills: row.skills || [],
    order: row.order,
    createdAt: row.createdAt || undefined,
    updatedAt: row.updatedAt || undefined,
  };
}

function mapFunctionalSkillRow(row: {
  id?: number;
  label: string;
  order?: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}): FunctionalSkill {
  return {
    id: row.id,
    label: row.label,
    order: row.order,
    createdAt: row.createdAt || undefined,
    updatedAt: row.updatedAt || undefined,
  };
}

// Skill Categories
export async function getSkillCategories(): Promise<SkillCategory[]> {
  const result = await db
    .select()
    .from(skillCategories)
    .orderBy(skillCategories.order)
    .execute();

  return result.map(mapSkillCategoryRow);
}

export async function createSkillCategory(
  data: Omit<SkillCategory, 'id' | 'createdAt' | 'updatedAt'>
): Promise<SkillCategory> {
  const inserted = await db
    .insert(skillCategories)
    .values({
      categoryName: data.categoryName,
      skills: data.skills || [],
      order: data.order || 0,
    })
    .returning()
    .execute();

  return mapSkillCategoryRow(inserted[0]);
}

export async function updateSkillCategory(
  id: number,
  data: Partial<Omit<SkillCategory, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<SkillCategory> {
  const updated = await db
    .update(skillCategories)
    .set({
      categoryName: data.categoryName,
      skills: data.skills,
      order: data.order,
      updatedAt: new Date(),
    })
    .where(eq(skillCategories.id, id))
    .returning()
    .execute();

  return mapSkillCategoryRow(updated[0]);
}

export async function deleteSkillCategory(id: number): Promise<void> {
  await db
    .delete(skillCategories)
    .where(eq(skillCategories.id, id))
    .execute();
}

// Functional Skills
export async function getFunctionalSkills(): Promise<FunctionalSkill[]> {
  const result = await db
    .select()
    .from(functionalSkills)
    .orderBy(functionalSkills.order)
    .execute();

  return result.map(mapFunctionalSkillRow);
}

export async function createFunctionalSkill(
  data: Omit<FunctionalSkill, 'id' | 'createdAt' | 'updatedAt'>
): Promise<FunctionalSkill> {
  const inserted = await db
    .insert(functionalSkills)
    .values({
      label: data.label,
      order: data.order || 0,
    })
    .returning()
    .execute();

  return mapFunctionalSkillRow(inserted[0]);
}

export async function updateFunctionalSkill(
  id: number,
  data: Partial<Omit<FunctionalSkill, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<FunctionalSkill> {
  const updated = await db
    .update(functionalSkills)
    .set({
      label: data.label,
      order: data.order,
      updatedAt: new Date(),
    })
    .where(eq(functionalSkills.id, id))
    .returning()
    .execute();

  return mapFunctionalSkillRow(updated[0]);
}

export async function deleteFunctionalSkill(id: number): Promise<void> {
  await db
    .delete(functionalSkills)
    .where(eq(functionalSkills.id, id))
    .execute();
}
