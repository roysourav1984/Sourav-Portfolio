import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { db } from '../../../db';
import { heroContent, heroStats } from '../../../db/schema';
import {
  getHeroContent,
  upsertHeroContent,
  upsertHeroStat,
  deleteHeroStat,
} from '../hero';

describe('Hero Data Access Layer', () => {
  beforeEach(async () => {
    await db.delete(heroStats).execute();
    await db.delete(heroContent).execute();
  });

  afterEach(async () => {
    await db.delete(heroStats).execute();
    await db.delete(heroContent).execute();
  });

  it('should return null when no hero content exists', async () => {
    const result = await getHeroContent();
    expect(result).toBeNull();
  });

  it('should create hero content', async () => {
    const data = {
      headline: 'Senior Technical Leader',
      subtitle: 'AI/GenAI & Delivery Excellence',
      location: 'San Francisco, CA',
    };

    const result = await upsertHeroContent(data);

    expect(result).toMatchObject({
      headline: data.headline,
      subtitle: data.subtitle,
      location: data.location,
      stats: [],
    });
    expect(result.id).toBeDefined();
    expect(result.createdAt).toBeDefined();
  });

  it('should update existing hero content', async () => {
    await upsertHeroContent({
      headline: 'Initial Headline',
      subtitle: 'Initial Subtitle',
      location: 'Initial Location',
    });

    const updated = await upsertHeroContent({
      headline: 'Updated Headline',
      subtitle: 'Updated Subtitle',
      location: 'Updated Location',
    });

    expect(updated.headline).toBe('Updated Headline');
    expect(updated.subtitle).toBe('Updated Subtitle');
    expect(updated.location).toBe('Updated Location');
  });

  it('should create hero stats', async () => {
    const stat = {
      label: '20+ Years',
      value: 'Leadership Experience',
    };

    const result = await upsertHeroStat(stat);

    expect(result).toMatchObject({
      label: stat.label,
      value: stat.value,
    });
    expect(result.id).toBeDefined();
  });

  it('should update existing hero stat', async () => {
    const created = await upsertHeroStat({
      label: 'Original',
      value: 'Original Value',
    });

    const updated = await upsertHeroStat({
      id: created.id,
      label: 'Updated',
      value: 'Updated Value',
    });

    expect(updated.id).toBe(created.id);
    expect(updated.label).toBe('Updated');
    expect(updated.value).toBe('Updated Value');
  });

  it('should delete hero stat', async () => {
    await upsertHeroContent({
      headline: 'Test Hero',
      subtitle: 'Test Subtitle',
      location: 'Test Location',
    });

    const stat = await upsertHeroStat({
      label: 'Test Stat',
      value: 'Test Value',
    });

    await deleteHeroStat(stat.id!);

    const hero = await getHeroContent();
    expect(hero?.stats).toHaveLength(0);
  });

  it('should retrieve hero content with stats', async () => {
    await upsertHeroContent({
      headline: 'Test Hero',
      subtitle: 'Test Subtitle',
      location: 'Test Location',
    });

    await upsertHeroStat({ label: 'Stat 1', value: 'Value 1' });
    await upsertHeroStat({ label: 'Stat 2', value: 'Value 2' });

    const result = await getHeroContent();

    expect(result).toBeDefined();
    expect(result?.headline).toBe('Test Hero');
    expect(result?.stats).toHaveLength(2);
    expect(result?.stats?.[0]).toMatchObject({
      label: 'Stat 1',
      value: 'Value 1',
    });
  });
});
