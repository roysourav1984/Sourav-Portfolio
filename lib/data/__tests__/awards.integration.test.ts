import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { db } from '../../../db';
import { awards } from '../../../db/schema';
import { getAwards, createAward, updateAward, deleteAward } from '../awards';

describe('Awards Data Access Layer', () => {
  beforeEach(async () => {
    await db.delete(awards).execute();
  });

  afterEach(async () => {
    await db.delete(awards).execute();
  });

  it('should return empty array when no awards exist', async () => {
    const result = await getAwards();
    expect(result).toEqual([]);
  });

  it('should create an award', async () => {
    const data = {
      title: 'Tech Leader of the Year',
      org: 'TechWeekly',
      description: 'Recognized for exceptional tech leadership',
      order: 1,
    };

    const result = await createAward(data);

    expect(result).toMatchObject({
      title: data.title,
      org: data.org,
      description: data.description,
      order: data.order,
    });
    expect(result.id).toBeDefined();
    expect(result.createdAt).toBeDefined();
  });

  it('should create award without description', async () => {
    const data = {
      title: 'Innovation Award',
      org: 'Annual Company Awards',
    };

    const result = await createAward(data);

    expect(result.title).toBe(data.title);
    expect(result.org).toBe(data.org);
    expect(result.description).toBeUndefined();
  });

  it('should retrieve awards ordered by order field', async () => {
    await createAward({
      title: 'Award Two',
      org: 'Org Two',
      order: 2,
    });

    await createAward({
      title: 'Award One',
      org: 'Org One',
      order: 1,
    });

    const result = await getAwards();

    expect(result).toHaveLength(2);
    expect(result[0].title).toBe('Award One');
    expect(result[1].title).toBe('Award Two');
  });

  it('should update an award', async () => {
    const created = await createAward({
      title: 'Original Title',
      org: 'Original Org',
      description: 'Original description',
      order: 1,
    });

    const updated = await updateAward(created.id!, {
      title: 'Updated Title',
      org: 'Updated Org',
      description: 'Updated description',
      order: 2,
    });

    expect(updated.id).toBe(created.id);
    expect(updated.title).toBe('Updated Title');
    expect(updated.org).toBe('Updated Org');
    expect(updated.description).toBe('Updated description');
    expect(updated.order).toBe(2);
  });

  it('should update award and clear description', async () => {
    const created = await createAward({
      title: 'Has Description',
      org: 'Some Org',
      description: 'Detailed description',
    });

    const updated = await updateAward(created.id!, {
      description: undefined,
    });

    expect(updated.description).toBeUndefined();
  });

  it('should delete an award', async () => {
    const created = await createAward({
      title: 'To Delete',
      org: 'To Delete Org',
      order: 1,
    });

    await deleteAward(created.id!);

    const result = await getAwards();
    expect(result).toHaveLength(0);
  });

  it('should handle multiple awards', async () => {
    const awardList = [
      { title: 'Best Team Lead', org: 'Company Annual Awards', description: 'Exceptional leadership' },
      { title: 'Innovation Award', org: 'Tech Summit', description: 'Outstanding innovation' },
      { title: 'Impact Award', org: 'Industry Association', description: 'Significant business impact' },
    ];

    for (const award of awardList) {
      await createAward(award);
    }

    const result = await getAwards();

    expect(result).toHaveLength(3);
    expect(result.map((a) => a.title)).toEqual(awardList.map((a) => a.title));
  });
});
