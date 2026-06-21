import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { db } from '../../../db';
import { education } from '../../../db/schema';
import { getEducation, createEducation, updateEducation, deleteEducation } from '../education';

describe('Education Data Access Layer', () => {
  beforeEach(async () => {
    await db.delete(education).execute();
  });

  afterEach(async () => {
    await db.delete(education).execute();
  });

  it('should return empty array when no education exists', async () => {
    const result = await getEducation();
    expect(result).toEqual([]);
  });

  it('should create an education entry', async () => {
    const data = {
      institution: 'Massachusetts Institute of Technology',
      degree: 'Bachelor of Science in Computer Science',
      year: '2005',
      order: 1,
    };

    const result = await createEducation(data);

    expect(result).toMatchObject({
      institution: data.institution,
      degree: data.degree,
      year: data.year,
      order: data.order,
    });
    expect(result.id).toBeDefined();
    expect(result.createdAt).toBeDefined();
  });

  it('should retrieve education ordered by order field', async () => {
    await createEducation({
      institution: 'Stanford University',
      degree: 'MBA',
      year: '2010',
      order: 2,
    });

    await createEducation({
      institution: 'UC Berkeley',
      degree: 'BS Engineering',
      year: '2008',
      order: 1,
    });

    const result = await getEducation();

    expect(result).toHaveLength(2);
    expect(result[0].institution).toBe('UC Berkeley');
    expect(result[1].institution).toBe('Stanford University');
  });

  it('should update an education entry', async () => {
    const created = await createEducation({
      institution: 'Original University',
      degree: 'Original Degree',
      year: '2020',
      order: 1,
    });

    const updated = await updateEducation(created.id!, {
      institution: 'Updated University',
      degree: 'Updated Degree',
      year: '2021',
      order: 2,
    });

    expect(updated.id).toBe(created.id);
    expect(updated.institution).toBe('Updated University');
    expect(updated.degree).toBe('Updated Degree');
    expect(updated.year).toBe('2021');
    expect(updated.order).toBe(2);
  });

  it('should delete an education entry', async () => {
    const created = await createEducation({
      institution: 'To Delete University',
      degree: 'To Delete Degree',
      year: '2020',
      order: 1,
    });

    await deleteEducation(created.id!);

    const result = await getEducation();
    expect(result).toHaveLength(0);
  });

  it('should handle multiple education entries', async () => {
    const eduList = [
      { institution: 'MIT', degree: 'BS Computer Science', year: '2005' },
      { institution: 'Stanford', degree: 'MBA', year: '2010' },
      { institution: 'Harvard', degree: 'Executive Program', year: '2019' },
    ];

    for (const edu of eduList) {
      await createEducation(edu);
    }

    const result = await getEducation();

    expect(result).toHaveLength(3);
  });

  it('should support partial updates', async () => {
    const created = await createEducation({
      institution: 'Original Institution',
      degree: 'Original Degree',
      year: '2020',
      order: 1,
    });

    const updated = await updateEducation(created.id!, {
      year: '2021',
    });

    expect(updated.institution).toBe('Original Institution');
    expect(updated.degree).toBe('Original Degree');
    expect(updated.year).toBe('2021');
  });
});
