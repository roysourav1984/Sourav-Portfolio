import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { db } from '../../../db';
import { skillCategories, functionalSkills } from '../../../db/schema';
import {
  getSkillCategories,
  createSkillCategory,
  updateSkillCategory,
  deleteSkillCategory,
  getFunctionalSkills,
  createFunctionalSkill,
  updateFunctionalSkill,
  deleteFunctionalSkill,
} from '../skills';

describe('Skills Data Access Layer', () => {
  beforeEach(async () => {
    await db.delete(skillCategories).execute();
    await db.delete(functionalSkills).execute();
  });

  afterEach(async () => {
    await db.delete(skillCategories).execute();
    await db.delete(functionalSkills).execute();
  });

  describe('Skill Categories', () => {
    it('should return empty array when no categories exist', async () => {
      const result = await getSkillCategories();
      expect(result).toEqual([]);
    });

    it('should create a skill category', async () => {
      const data = {
        categoryName: 'Cloud Platforms',
        skills: ['AWS', 'Azure', 'GCP'],
        order: 1,
      };

      const result = await createSkillCategory(data);

      expect(result).toMatchObject({
        categoryName: data.categoryName,
        skills: data.skills,
        order: data.order,
      });
      expect(result.id).toBeDefined();
      expect(result.createdAt).toBeDefined();
    });

    it('should retrieve categories ordered by order field', async () => {
      await createSkillCategory({
        categoryName: 'Languages',
        skills: ['Python', 'TypeScript'],
        order: 2,
      });

      await createSkillCategory({
        categoryName: 'Frameworks',
        skills: ['React', 'Next.js'],
        order: 1,
      });

      const result = await getSkillCategories();

      expect(result).toHaveLength(2);
      expect(result[0].categoryName).toBe('Frameworks');
      expect(result[1].categoryName).toBe('Languages');
    });

    it('should update a skill category', async () => {
      const created = await createSkillCategory({
        categoryName: 'Original Category',
        skills: ['Old Skill'],
        order: 1,
      });

      const updated = await updateSkillCategory(created.id!, {
        categoryName: 'Updated Category',
        skills: ['New Skill 1', 'New Skill 2'],
        order: 2,
      });

      expect(updated.id).toBe(created.id);
      expect(updated.categoryName).toBe('Updated Category');
      expect(updated.skills).toEqual(['New Skill 1', 'New Skill 2']);
      expect(updated.order).toBe(2);
    });

    it('should delete a skill category', async () => {
      const created = await createSkillCategory({
        categoryName: 'To Delete',
        skills: ['Skill'],
        order: 1,
      });

      await deleteSkillCategory(created.id!);

      const result = await getSkillCategories();
      expect(result).toHaveLength(0);
    });

    it('should handle multiple skills in array', async () => {
      const skills = ['React', 'Vue', 'Angular', 'Svelte', 'Qwik'];

      await createSkillCategory({
        categoryName: 'Frontend Frameworks',
        skills,
        order: 1,
      });

      const categories = await getSkillCategories();

      expect(categories[0].skills).toEqual(skills);
    });
  });

  describe('Functional Skills', () => {
    it('should return empty array when no functional skills exist', async () => {
      const result = await getFunctionalSkills();
      expect(result).toEqual([]);
    });

    it('should create a functional skill', async () => {
      const data = {
        label: 'Leadership',
        order: 1,
      };

      const result = await createFunctionalSkill(data);

      expect(result).toMatchObject({
        label: data.label,
        order: data.order,
      });
      expect(result.id).toBeDefined();
      expect(result.createdAt).toBeDefined();
    });

    it('should retrieve functional skills ordered by order field', async () => {
      await createFunctionalSkill({
        label: 'Stakeholder Management',
        order: 2,
      });

      await createFunctionalSkill({
        label: 'Strategic Planning',
        order: 1,
      });

      const result = await getFunctionalSkills();

      expect(result).toHaveLength(2);
      expect(result[0].label).toBe('Strategic Planning');
      expect(result[1].label).toBe('Stakeholder Management');
    });

    it('should update a functional skill', async () => {
      const created = await createFunctionalSkill({
        label: 'Original Label',
        order: 1,
      });

      const updated = await updateFunctionalSkill(created.id!, {
        label: 'Updated Label',
        order: 2,
      });

      expect(updated.id).toBe(created.id);
      expect(updated.label).toBe('Updated Label');
      expect(updated.order).toBe(2);
    });

    it('should delete a functional skill', async () => {
      const created = await createFunctionalSkill({
        label: 'To Delete',
        order: 1,
      });

      await deleteFunctionalSkill(created.id!);

      const result = await getFunctionalSkills();
      expect(result).toHaveLength(0);
    });

    it('should handle multiple functional skills', async () => {
      const labels = ['Leadership', 'Communication', 'Problem Solving', 'Time Management'];

      for (let i = 0; i < labels.length; i++) {
        await createFunctionalSkill({
          label: labels[i],
          order: i,
        });
      }

      const result = await getFunctionalSkills();

      expect(result).toHaveLength(4);
      expect(result.map((s) => s.label)).toEqual(labels);
    });
  });
});
