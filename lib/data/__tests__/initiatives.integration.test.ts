import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { db } from '../../../db';
import { initiatives } from '../../../db/schema';
import {
  getInitiatives,
  getInitiativeBySlug,
  createInitiative,
  updateInitiative,
  deleteInitiative,
} from '../initiatives';

describe('Initiatives Data Access Layer', () => {
  beforeEach(async () => {
    await db.delete(initiatives).execute();
  });

  afterEach(async () => {
    await db.delete(initiatives).execute();
  });

  it('should return empty array when no initiatives exist', async () => {
    const result = await getInitiatives();
    expect(result).toEqual([]);
  });

  it('should create an initiative', async () => {
    const data = {
      slug: 'ai-platform-migration',
      title: 'AI Platform Migration',
      oneLiner: 'Successfully migrated legacy systems to cloud-native AI platform',
      year: '2024',
      tags: ['cloud', 'AI/ML'],
      context: 'Legacy systems were outdated',
      approach: 'Phased migration with minimal downtime',
      technologies: ['AWS', 'Python', 'TensorFlow'],
      outcome: 'Reduced infrastructure costs by 40%',
      order: 1,
    };

    const result = await createInitiative(data);

    expect(result).toMatchObject({
      slug: data.slug,
      title: data.title,
      oneLiner: data.oneLiner,
      year: data.year,
      tags: data.tags,
      context: data.context,
      approach: data.approach,
      technologies: data.technologies,
      outcome: data.outcome,
      order: data.order,
    });
    expect(result.id).toBeDefined();
    expect(result.createdAt).toBeDefined();
  });

  it('should retrieve initiative by slug', async () => {
    await createInitiative({
      slug: 'unique-initiative',
      title: 'Test Initiative',
      oneLiner: 'One liner',
      year: '2023',
      tags: [],
      context: 'Context',
      approach: 'Approach',
      technologies: [],
      outcome: 'Outcome',
    });

    const result = await getInitiativeBySlug('unique-initiative');

    expect(result).toBeDefined();
    expect(result?.id).toBe(created.id);
    expect(result?.title).toBe('Test Initiative');
  });

  it('should return null for non-existent slug', async () => {
    const result = await getInitiativeBySlug('non-existent-slug');
    expect(result).toBeNull();
  });

  it('should retrieve all initiatives ordered by order field', async () => {
    await createInitiative({
      slug: 'init-2',
      title: 'Initiative Two',
      oneLiner: 'Second',
      year: '2024',
      tags: [],
      context: 'Context',
      approach: 'Approach',
      technologies: [],
      outcome: 'Outcome',
      order: 2,
    });

    await createInitiative({
      slug: 'init-1',
      title: 'Initiative One',
      oneLiner: 'First',
      year: '2024',
      tags: [],
      context: 'Context',
      approach: 'Approach',
      technologies: [],
      outcome: 'Outcome',
      order: 1,
    });

    const result = await getInitiatives();

    expect(result).toHaveLength(2);
    expect(result[0].slug).toBe('init-1');
    expect(result[1].slug).toBe('init-2');
  });

  it('should update an initiative', async () => {
    await createInitiative({
      slug: 'to-update',
      title: 'Original Title',
      oneLiner: 'Original one liner',
      year: '2023',
      tags: ['old'],
      context: 'Old context',
      approach: 'Old approach',
      technologies: ['Old Tech'],
      outcome: 'Old outcome',
    });

    const updated = await updateInitiative(created.id!, {
      title: 'Updated Title',
      oneLiner: 'Updated one liner',
      tags: ['new'],
      technologies: ['New Tech'],
    });

    expect(updated.id).toBe(created.id);
    expect(updated.title).toBe('Updated Title');
    expect(updated.oneLiner).toBe('Updated one liner');
    expect(updated.tags).toEqual(['new']);
    expect(updated.technologies).toEqual(['New Tech']);
  });

  it('should delete an initiative', async () => {
    await createInitiative({
      slug: 'to-delete',
      title: 'To Delete',
      oneLiner: 'Will be deleted',
      year: '2024',
      tags: [],
      context: 'Context',
      approach: 'Approach',
      technologies: [],
      outcome: 'Outcome',
    });

    await deleteInitiative(created.id!);

    const result = await getInitiatives();
    expect(result).toHaveLength(0);
  });

  it('should handle arrays correctly', async () => {
    await createInitiative({
      slug: 'array-test',
      title: 'Array Test',
      oneLiner: 'Testing arrays',
      year: '2024',
      tags: ['tag1', 'tag2', 'tag3'],
      context: 'Context',
      approach: 'Approach',
      technologies: ['Tech1', 'Tech2'],
      outcome: 'Outcome',
    });

    const retrieved = await getInitiativeBySlug('array-test');

    expect(retrieved?.tags).toEqual(['tag1', 'tag2', 'tag3']);
    expect(retrieved?.technologies).toEqual(['Tech1', 'Tech2']);
  });
});
