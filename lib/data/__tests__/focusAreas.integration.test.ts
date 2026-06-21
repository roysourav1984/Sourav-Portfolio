import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { db } from '../../../db';
import { focusAreas } from '../../../db/schema';
import {
  getFocusAreas,
  createFocusArea,
  updateFocusArea,
  deleteFocusArea,
} from '../focusAreas';

describe('Focus Areas Data Access Layer', () => {
  beforeEach(async () => {
    await db.delete(focusAreas).execute();
  });

  afterEach(async () => {
    await db.delete(focusAreas).execute();
  });

  it('should return empty array when no focus areas exist', async () => {
    const result = await getFocusAreas();
    expect(result).toEqual([]);
  });

  it('should create a focus area', async () => {
    const data = {
      title: 'AI/GenAI Leadership',
      description: 'Leading AI-driven transformation initiatives',
      stat: '5+ projects',
      order: 1,
    };

    const result = await createFocusArea(data);

    expect(result).toMatchObject({
      title: data.title,
      description: data.description,
      stat: data.stat,
      order: data.order,
    });
    expect(result.id).toBeDefined();
    expect(result.createdAt).toBeDefined();
  });

  it('should create focus area without optional stat', async () => {
    const data = {
      title: 'Pillar Title',
      description: 'Pillar description',
    };

    const result = await createFocusArea(data);

    expect(result.title).toBe(data.title);
    expect(result.description).toBe(data.description);
    expect(result.stat).toBeUndefined();
  });

  it('should retrieve multiple focus areas ordered by order field', async () => {
    await createFocusArea({
      title: 'Pillar One',
      description: 'First pillar',
      order: 2,
    });
    await createFocusArea({
      title: 'Pillar Two',
      description: 'Second pillar',
      order: 1,
    });

    const result = await getFocusAreas();

    expect(result).toHaveLength(2);
    expect(result[0].title).toBe('Pillar Two');
    expect(result[1].title).toBe('Pillar One');
  });

  it('should update a focus area', async () => {
    const created = await createFocusArea({
      title: 'Original Title',
      description: 'Original description',
      order: 1,
    });

    const updated = await updateFocusArea(created.id!, {
      title: 'Updated Title',
      description: 'Updated description',
      order: 2,
    });

    expect(updated.id).toBe(created.id);
    expect(updated.title).toBe('Updated Title');
    expect(updated.description).toBe('Updated description');
    expect(updated.order).toBe(2);
  });

  it('should delete a focus area', async () => {
    const created = await createFocusArea({
      title: 'To Delete',
      description: 'Will be deleted',
    });

    await deleteFocusArea(created.id!);

    const result = await getFocusAreas();
    expect(result).toHaveLength(0);
  });

  it('should support partial updates', async () => {
    const created = await createFocusArea({
      title: 'Original',
      description: 'Description',
      stat: 'Some stat',
      order: 1,
    });

    const updated = await updateFocusArea(created.id!, {
      title: 'New Title',
    });

    expect(updated.title).toBe('New Title');
    expect(updated.description).toBe('Description');
    expect(updated.stat).toBe('Some stat');
  });
});
