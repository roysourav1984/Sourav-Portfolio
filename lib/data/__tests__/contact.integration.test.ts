import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { db } from '../../../db';
import { contactInfo } from '../../../db/schema';
import { getContactInfo, upsertContactInfo } from '../contact';

describe('Contact Data Access Layer', () => {
  beforeEach(async () => {
    await db.delete(contactInfo).execute();
  });

  afterEach(async () => {
    await db.delete(contactInfo).execute();
  });

  it('should return null when no contact info exists', async () => {
    const result = await getContactInfo();
    expect(result).toBeNull();
  });

  it('should create contact info', async () => {
    const data = {
      email: 'name@example.com',
      linkedIn: 'https://linkedin.com/in/username',
    };

    const result = await upsertContactInfo(data);

    expect(result).toMatchObject({
      email: data.email,
      linkedIn: data.linkedIn,
    });
    expect(result.id).toBeDefined();
    expect(result.createdAt).toBeDefined();
  });

  it('should update existing contact info', async () => {
    await upsertContactInfo({
      email: 'original@example.com',
      linkedIn: 'https://linkedin.com/in/original',
    });

    const updated = await upsertContactInfo({
      email: 'updated@example.com',
      linkedIn: 'https://linkedin.com/in/updated',
    });

    expect(updated.email).toBe('updated@example.com');
    expect(updated.linkedIn).toBe('https://linkedin.com/in/updated');
  });

  it('should retrieve existing contact info', async () => {
    const created = await upsertContactInfo({
      email: 'test@example.com',
      linkedIn: 'https://linkedin.com/in/test',
    });

    const retrieved = await getContactInfo();

    expect(retrieved).toBeDefined();
    expect(retrieved?.id).toBe(created.id);
    expect(retrieved?.email).toBe('test@example.com');
    expect(retrieved?.linkedIn).toBe('https://linkedin.com/in/test');
  });

  it('should support multiple updates', async () => {
    await upsertContactInfo({
      email: 'first@example.com',
      linkedIn: 'https://linkedin.com/in/first',
    });

    const second = await upsertContactInfo({
      email: 'second@example.com',
      linkedIn: 'https://linkedin.com/in/second',
    });

    const third = await upsertContactInfo({
      email: 'third@example.com',
      linkedIn: 'https://linkedin.com/in/third',
    });

    const retrieved = await getContactInfo();

    expect(retrieved?.email).toBe('third@example.com');
    expect(retrieved?.linkedIn).toBe('https://linkedin.com/in/third');
  });

  it('should handle different email formats', async () => {
    const emails = [
      'user@company.com',
      'firstname.lastname@domain.co.uk',
      'user+tag@example.com',
    ];

    for (const email of emails) {
      await upsertContactInfo({
        email,
        linkedIn: 'https://linkedin.com/in/test',
      });

      const retrieved = await getContactInfo();
      expect(retrieved?.email).toBe(email);
    }
  });

  it('should handle different LinkedIn URLs', async () => {
    const linkedInUrls = [
      'https://linkedin.com/in/username',
      'https://www.linkedin.com/in/username',
      'https://linkedin.com/company/company-name',
    ];

    for (const url of linkedInUrls) {
      await upsertContactInfo({
        email: 'test@example.com',
        linkedIn: url,
      });

      const retrieved = await getContactInfo();
      expect(retrieved?.linkedIn).toBe(url);
    }
  });
});
