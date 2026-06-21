import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { db } from '../../../db';
import { certifications } from '../../../db/schema';
import {
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
} from '../certifications';

describe('Certifications Data Access Layer', () => {
  beforeEach(async () => {
    await db.delete(certifications).execute();
  });

  afterEach(async () => {
    await db.delete(certifications).execute();
  });

  it('should return empty array when no certifications exist', async () => {
    const result = await getCertifications();
    expect(result).toEqual([]);
  });

  it('should create a certification', async () => {
    const data = {
      name: 'AWS Solutions Architect',
      issuer: 'Amazon Web Services',
      year: '2023',
      order: 1,
    };

    const result = await createCertification(data);

    expect(result).toMatchObject({
      name: data.name,
      issuer: data.issuer,
      year: data.year,
      order: data.order,
    });
    expect(result.id).toBeDefined();
    expect(result.createdAt).toBeDefined();
  });

  it('should create certification without year', async () => {
    const data = {
      name: 'Certified Scrum Master',
      issuer: 'Scrum Alliance',
    };

    const result = await createCertification(data);

    expect(result.name).toBe(data.name);
    expect(result.issuer).toBe(data.issuer);
    expect(result.year).toBeUndefined();
  });

  it('should retrieve certifications ordered by order field', async () => {
    await createCertification({
      name: 'Cert Two',
      issuer: 'Issuer Two',
      order: 2,
    });

    await createCertification({
      name: 'Cert One',
      issuer: 'Issuer One',
      order: 1,
    });

    const result = await getCertifications();

    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('Cert One');
    expect(result[1].name).toBe('Cert Two');
  });

  it('should update a certification', async () => {
    const created = await createCertification({
      name: 'Original Name',
      issuer: 'Original Issuer',
      year: '2022',
      order: 1,
    });

    const updated = await updateCertification(created.id!, {
      name: 'Updated Name',
      issuer: 'Updated Issuer',
      year: '2023',
      order: 2,
    });

    expect(updated.id).toBe(created.id);
    expect(updated.name).toBe('Updated Name');
    expect(updated.issuer).toBe('Updated Issuer');
    expect(updated.year).toBe('2023');
    expect(updated.order).toBe(2);
  });

  it('should update certification and clear year', async () => {
    const created = await createCertification({
      name: 'Has Year',
      issuer: 'Some Issuer',
      year: '2023',
    });

    const updated = await updateCertification(created.id!, {
      year: undefined,
    });

    expect(updated.year).toBeUndefined();
  });

  it('should delete a certification', async () => {
    const created = await createCertification({
      name: 'To Delete',
      issuer: 'To Delete Issuer',
      order: 1,
    });

    await deleteCertification(created.id!);

    const result = await getCertifications();
    expect(result).toHaveLength(0);
  });

  it('should handle multiple certifications', async () => {
    const certList = [
      { name: 'AWS Solutions Architect', issuer: 'AWS', year: '2023' },
      { name: 'Certified Kubernetes Administrator', issuer: 'CNCF', year: '2022' },
      { name: 'Google Cloud Associate', issuer: 'Google', year: '2023' },
    ];

    for (const cert of certList) {
      await createCertification(cert);
    }

    const result = await getCertifications();

    expect(result).toHaveLength(3);
  });
});
