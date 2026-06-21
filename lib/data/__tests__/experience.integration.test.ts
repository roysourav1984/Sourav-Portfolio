import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { db } from '../../../db';
import { experienceRoles } from '../../../db/schema';
import {
  getExperienceRoles,
  getRoleBySlug,
  createRole,
  updateRole,
  deleteRole,
} from '../experience';

describe('Experience Data Access Layer', () => {
  beforeEach(async () => {
    await db.delete(experienceRoles).execute();
  });

  afterEach(async () => {
    await db.delete(experienceRoles).execute();
  });

  it('should return empty array when no roles exist', async () => {
    const result = await getExperienceRoles();
    expect(result).toEqual([]);
  });

  it('should create an experience role', async () => {
    const data = {
      slug: 'cto-techcorp',
      org: 'TechCorp',
      title: 'Chief Technology Officer',
      startDate: '2020-01-15',
      endDate: 'Present',
      summary: 'Led technology strategy and team',
      responsibilities: ['Team leadership', 'Strategy', 'Innovation'],
      order: 1,
    };

    const result = await createRole(data);

    expect(result).toMatchObject({
      slug: data.slug,
      org: data.org,
      title: data.title,
      startDate: data.startDate,
      endDate: data.endDate,
      summary: data.summary,
      responsibilities: data.responsibilities,
      order: data.order,
    });
    expect(result.id).toBeDefined();
    expect(result.createdAt).toBeDefined();
  });

  it('should handle "Present" as endDate', async () => {
    const created = await createRole({
      slug: 'current-role',
      org: 'Current Org',
      title: 'Senior Lead',
      startDate: '2022-06-01',
      endDate: 'Present',
      summary: 'Current role summary',
      responsibilities: ['Ongoing work'],
    });

    const retrieved = await getRoleBySlug('current-role');

    expect(retrieved?.endDate).toBe('Present');
  });

  it('should handle past endDate', async () => {
    const created = await createRole({
      slug: 'past-role',
      org: 'Past Org',
      title: 'Lead',
      startDate: '2018-01-01',
      endDate: '2021-12-31',
      summary: 'Past role',
      responsibilities: ['Completed work'],
    });

    const retrieved = await getRoleBySlug('past-role');

    expect(retrieved?.endDate).toBe('2021-12-31');
  });

  it('should retrieve role by slug', async () => {
    const created = await createRole({
      slug: 'director-acme',
      org: 'ACME Inc',
      title: 'Director of Engineering',
      startDate: '2019-01-01',
      endDate: '2023-12-31',
      summary: 'Built engineering team from 5 to 50 people',
      responsibilities: ['Hiring', 'Architecture', 'Mentoring'],
    });

    const result = await getRoleBySlug('director-acme');

    expect(result).toBeDefined();
    expect(result?.id).toBe(created.id);
    expect(result?.title).toBe('Director of Engineering');
  });

  it('should return null for non-existent slug', async () => {
    const result = await getRoleBySlug('non-existent-role');
    expect(result).toBeNull();
  });

  it('should retrieve all roles ordered by order field', async () => {
    await createRole({
      slug: 'role-2',
      org: 'Org Two',
      title: 'Title Two',
      startDate: '2020-01-01',
      endDate: 'Present',
      summary: 'Second role',
      responsibilities: [],
      order: 2,
    });

    await createRole({
      slug: 'role-1',
      org: 'Org One',
      title: 'Title One',
      startDate: '2018-01-01',
      endDate: '2019-12-31',
      summary: 'First role',
      responsibilities: [],
      order: 1,
    });

    const result = await getExperienceRoles();

    expect(result).toHaveLength(2);
    expect(result[0].slug).toBe('role-1');
    expect(result[1].slug).toBe('role-2');
  });

  it('should update a role', async () => {
    const created = await createRole({
      slug: 'original-slug',
      org: 'Original Org',
      title: 'Original Title',
      startDate: '2020-01-01',
      endDate: 'Present',
      summary: 'Original summary',
      responsibilities: ['Old responsibility'],
    });

    const updated = await updateRole(created.id!, {
      org: 'Updated Org',
      title: 'Updated Title',
      summary: 'Updated summary',
      responsibilities: ['New responsibility 1', 'New responsibility 2'],
    });

    expect(updated.id).toBe(created.id);
    expect(updated.org).toBe('Updated Org');
    expect(updated.title).toBe('Updated Title');
    expect(updated.summary).toBe('Updated summary');
    expect(updated.responsibilities).toEqual(['New responsibility 1', 'New responsibility 2']);
  });

  it('should delete a role', async () => {
    const created = await createRole({
      slug: 'to-delete',
      org: 'To Delete',
      title: 'To Delete',
      startDate: '2020-01-01',
      endDate: 'Present',
      summary: 'Will be deleted',
      responsibilities: [],
    });

    await deleteRole(created.id!);

    const result = await getExperienceRoles();
    expect(result).toHaveLength(0);
  });

  it('should handle responsibilities array correctly', async () => {
    const responsibilities = [
      'Led team of 20+ engineers',
      'Architected microservices platform',
      'Reduced deployment time by 80%',
    ];

    const created = await createRole({
      slug: 'test-responsibilities',
      org: 'Test Org',
      title: 'Test Title',
      startDate: '2020-01-01',
      endDate: 'Present',
      summary: 'Test summary',
      responsibilities,
    });

    const retrieved = await getRoleBySlug('test-responsibilities');

    expect(retrieved?.responsibilities).toEqual(responsibilities);
  });
});
