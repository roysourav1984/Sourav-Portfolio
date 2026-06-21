import { describe, it, expect } from 'vitest';
import { hashPassword, verifyPassword, generateSessionToken } from '../auth';

describe('Auth Utilities', () => {
  describe('hashPassword & verifyPassword', () => {
    it('should hash a password and verify it correctly', async () => {
      const password = 'secure-password-123';
      const hash = await hashPassword(password);

      expect(hash).toBeDefined();
      expect(hash).not.toBe(password);
      expect(hash.length).toBeGreaterThan(20);
    });

    it('should return true when password matches hash', async () => {
      const password = 'test-password';
      const hash = await hashPassword(password);
      const isValid = await verifyPassword(password, hash);

      expect(isValid).toBe(true);
    });

    it('should return false when password does not match hash', async () => {
      const password = 'correct-password';
      const wrongPassword = 'wrong-password';
      const hash = await hashPassword(password);
      const isValid = await verifyPassword(wrongPassword, hash);

      expect(isValid).toBe(false);
    });

    it('should produce different hashes for same password', async () => {
      const password = 'same-password';
      const hash1 = await hashPassword(password);
      const hash2 = await hashPassword(password);

      expect(hash1).not.toBe(hash2);
      // But both should verify correctly
      expect(await verifyPassword(password, hash1)).toBe(true);
      expect(await verifyPassword(password, hash2)).toBe(true);
    });
  });

  describe('generateSessionToken', () => {
    it('should generate a non-empty token', () => {
      const token = generateSessionToken();

      expect(token).toBeDefined();
      expect(token.length).toBeGreaterThan(0);
      expect(typeof token).toBe('string');
    });

    it('should generate unique tokens', () => {
      const token1 = generateSessionToken();
      const token2 = generateSessionToken();

      expect(token1).not.toBe(token2);
    });

    it('should generate a 64-character hex string', () => {
      const token = generateSessionToken();

      expect(token).toMatch(/^[a-f0-9]{64}$/);
    });
  });
});
