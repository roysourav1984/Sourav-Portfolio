import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { db } from '../../../db';
import { summary } from '../../../db/schema';
import { getSummary, upsertSummary } from '../summary';

describe('Summary Data Access Layer', () => {
  beforeEach(async () => {
    await db.delete(summary).execute();
  });

  afterEach(async () => {
    await db.delete(summary).execute();
  });

  it('should return null when no summary exists', async () => {
    const result = await getSummary();
    expect(result).toBeNull();
  });

  it('should create summary content', async () => {
    const data = {
      paragraphs: ['First paragraph', 'Second paragraph'],
      pullQuote: 'An inspiring quote',
    };

    const result = await upsertSummary(data);

    expect(result).toMatchObject({
      paragraphs: data.paragraphs,
      pullQuote: data.pullQuote,
    });
    expect(result.id).toBeDefined();
    expect(result.createdAt).toBeDefined();
  });

  it('should create summary without pull quote', async () => {
    const data = {
      paragraphs: ['Paragraph one', 'Paragraph two'],
    };

    const result = await upsertSummary(data);

    expect(result.paragraphs).toEqual(data.paragraphs);
    expect(result.pullQuote).toBeUndefined();
  });

  it('should update existing summary', async () => {
    await upsertSummary({
      paragraphs: ['Initial para'],
      pullQuote: 'Initial quote',
    });

    const updated = await upsertSummary({
      paragraphs: ['Updated para 1', 'Updated para 2', 'Updated para 3'],
      pullQuote: 'Updated quote',
    });

    expect(updated.paragraphs).toHaveLength(3);
    expect(updated.pullQuote).toBe('Updated quote');
  });

  it('should retrieve existing summary', async () => {
    const created = await upsertSummary({
      paragraphs: ['Para 1', 'Para 2'],
      pullQuote: 'Inspiring quote',
    });

    const retrieved = await getSummary();

    expect(retrieved).toBeDefined();
    expect(retrieved?.id).toBe(created.id);
    expect(retrieved?.paragraphs).toEqual(['Para 1', 'Para 2']);
    expect(retrieved?.pullQuote).toBe('Inspiring quote');
  });

  it('should handle empty paragraphs array', async () => {
    const data = {
      paragraphs: [],
    };

    const result = await upsertSummary(data);

    expect(result.paragraphs).toEqual([]);
  });
});
