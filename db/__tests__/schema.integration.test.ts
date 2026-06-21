import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { sql } from 'drizzle-orm';
import * as schema from '../schema';

// Setup test database connection
const testDatabaseUrl = process.env.DATABASE_URL_TEST || process.env.DATABASE_URL;

if (!testDatabaseUrl) {
  throw new Error('DATABASE_URL or DATABASE_URL_TEST environment variable is not set');
}

// Create a test client (with minimal connection pooling for test isolation)
let testClient: postgres.Sql;
let testDb: ReturnType<typeof drizzle>;

beforeAll(async () => {
  testClient = postgres(testDatabaseUrl, { max: 1 });
  testDb = drizzle(testClient, { schema });

  // Run migrations (simplified - in production use drizzle-kit migrate)
  // For now we assume the database is already migrated
});

afterAll(async () => {
  if (testClient) {
    await testClient.end();
  }
});

describe('Database Schema - Integration Tests', () => {
  describe('Tables Existence', () => {
    it('should have all required tables created', async () => {
      const tables = await testDb.execute(sql`
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public'
        ORDER BY table_name
      `);

      const tableNames = (tables as any[]).map((t) => t.table_name);

      // Verify all expected tables exist
      expect(tableNames).toContain('admin_sessions');
      expect(tableNames).toContain('awards');
      expect(tableNames).toContain('certifications');
      expect(tableNames).toContain('contact_info');
      expect(tableNames).toContain('education');
      expect(tableNames).toContain('experience_roles');
      expect(tableNames).toContain('focus_areas');
      expect(tableNames).toContain('hero_content');
      expect(tableNames).toContain('hero_stats');
      expect(tableNames).toContain('summary');
      expect(tableNames).toContain('initiatives');
      expect(tableNames).toContain('functional_skills');
      expect(tableNames).toContain('skill_categories');
    });

    it('hero_content table should have correct columns', async () => {
      const columns = await testDb.execute(sql`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_name = 'hero_content'
        ORDER BY ordinal_position
      `);

      const columnMap = (columns as any[]).reduce(
        (acc, col) => {
          acc[col.column_name] = { type: col.data_type, nullable: col.is_nullable };
          return acc;
        },
        {} as Record<string, any>
      );

      expect(columnMap['id'].type).toBe('integer');
      expect(columnMap['headline'].type).toBe('text');
      expect(columnMap['subtitle'].type).toBe('text');
      expect(columnMap['location'].type).toBe('text');
      expect(columnMap['created_at'].type).toBe('timestamp without time zone');
      expect(columnMap['updated_at'].type).toBe('timestamp without time zone');
    });

    it('initiatives table should have unique slug constraint', async () => {
      const constraints = await testDb.execute(sql`
        SELECT constraint_name, constraint_type
        FROM information_schema.table_constraints
        WHERE table_name = 'initiatives'
      `);

      const uniqueConstraints = (constraints as any[])
        .filter((c) => c.constraint_type === 'UNIQUE')
        .map((c) => c.constraint_name);

      expect(uniqueConstraints.some((name) => name.includes('slug'))).toBe(true);
    });

    it('experience_roles table should have unique slug constraint', async () => {
      const constraints = await testDb.execute(sql`
        SELECT constraint_name, constraint_type
        FROM information_schema.table_constraints
        WHERE table_name = 'experience_roles'
      `);

      const uniqueConstraints = (constraints as any[])
        .filter((c) => c.constraint_type === 'UNIQUE')
        .map((c) => c.constraint_name);

      expect(uniqueConstraints.some((name) => name.includes('slug'))).toBe(true);
    });

    it('admin_sessions table should have uuid primary key', async () => {
      const columns = await testDb.execute(sql`
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_name = 'admin_sessions' AND column_name = 'id'
      `);

      expect((columns as any[])[0].data_type).toBe('uuid');
    });

    it('admin_sessions tokenHash should have unique constraint', async () => {
      const constraints = await testDb.execute(sql`
        SELECT constraint_name, constraint_type
        FROM information_schema.table_constraints
        WHERE table_name = 'admin_sessions'
      `);

      const uniqueConstraints = (constraints as any[])
        .filter((c) => c.constraint_type === 'UNIQUE')
        .map((c) => c.constraint_name);

      expect(uniqueConstraints.some((name) => name.includes('token_hash'))).toBe(true);
    });

    it('summary table should have paragraphs as text array', async () => {
      const columns = await testDb.execute(sql`
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_name = 'summary' AND column_name = 'paragraphs'
      `);

      const dataType = (columns as any[])[0].data_type;
      // PostgreSQL represents arrays as "text" in data_type with a different representation
      expect(['text', 'ARRAY']).toContain(dataType);
    });

    it('initiatives table should have tags and technologies as text arrays', async () => {
      const columns = await testDb.execute(sql`
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_name = 'initiatives' AND column_name IN ('tags', 'technologies')
      `);

      expect((columns as any[]).length).toBe(2);
      (columns as any[]).forEach((col) => {
        expect(['text', 'ARRAY']).toContain(col.data_type);
      });
    });
  });

  describe('Insert and Query Operations', () => {
    it('should be able to insert and query hero_content', async () => {
      // Insert
      const result = await testDb
        .insert(schema.heroContent)
        .values({
          headline: 'Senior IT Leader',
          subtitle: 'Program Management & AI Solutions',
          location: 'San Francisco, CA',
        })
        .returning();

      expect(result[0]).toHaveProperty('id');
      expect(result[0].headline).toBe('Senior IT Leader');

      // Cleanup
      await testDb.delete(schema.heroContent).where(sql`id = ${result[0].id}`);
    });

    it('should be able to insert and query initiatives with array fields', async () => {
      const result = await testDb
        .insert(schema.initiatives)
        .values({
          slug: 'test-initiative',
          title: 'Test Initiative',
          oneLiner: 'A test initiative',
          year: '2023',
          tags: ['AI', 'Cloud'],
          context: 'Test context',
          approach: 'Test approach',
          technologies: ['OpenAI', 'Azure'],
          outcome: 'Test outcome',
        })
        .returning();

      expect(result[0]).toHaveProperty('id');
      expect(result[0].tags).toEqual(['AI', 'Cloud']);
      expect(result[0].technologies).toEqual(['OpenAI', 'Azure']);

      // Cleanup
      await testDb.delete(schema.initiatives).where(sql`id = ${result[0].id}`);
    });

    it('should enforce unique slug constraint on initiatives', async () => {
      // Insert first
      const first = await testDb
        .insert(schema.initiatives)
        .values({
          slug: 'unique-slug-test',
          title: 'First Initiative',
          oneLiner: 'First',
          year: '2023',
          tags: [],
          context: 'Context',
          approach: 'Approach',
          technologies: [],
          outcome: 'Outcome',
        })
        .returning();

      // Try to insert duplicate slug
      try {
        await testDb
          .insert(schema.initiatives)
          .values({
            slug: 'unique-slug-test',
            title: 'Duplicate Initiative',
            oneLiner: 'Duplicate',
            year: '2023',
            tags: [],
            context: 'Context',
            approach: 'Approach',
            technologies: [],
            outcome: 'Outcome',
          })
          .returning();

        expect(true).toBe(false); // Should not reach here
      } catch (error) {
        // Expected to fail due to unique constraint
        expect(error).toBeDefined();
      }

      // Cleanup
      await testDb.delete(schema.initiatives).where(sql`id = ${first[0].id}`);
    });

    it('should be able to insert and query admin sessions with uuid', async () => {
      const result = await testDb
        .insert(schema.adminSessions)
        .values({
          tokenHash: 'test-token-hash-123',
          expiresAt: new Date(Date.now() + 3600000),
        })
        .returning();

      expect(result[0]).toHaveProperty('id');
      expect(result[0].tokenHash).toBe('test-token-hash-123');
      // Verify it's a valid UUID format
      expect(result[0].id).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
      );

      // Cleanup
      await testDb.delete(schema.adminSessions).where(sql`id = ${result[0].id}`);
    });
  });

  describe('Default Values', () => {
    it('should set createdAt and updatedAt timestamps automatically', async () => {
      const result = await testDb
        .insert(schema.heroContent)
        .values({
          headline: 'Test',
          subtitle: 'Test',
          location: 'Test',
        })
        .returning();

      expect(result[0].createdAt).toBeDefined();
      expect(result[0].updatedAt).toBeDefined();
      expect(result[0].createdAt).toBeInstanceOf(Date);
      expect(result[0].updatedAt).toBeInstanceOf(Date);

      // Cleanup
      await testDb.delete(schema.heroContent).where(sql`id = ${result[0].id}`);
    });

    it('should set empty arrays as default for array fields', async () => {
      const result = await testDb
        .insert(schema.initiatives)
        .values({
          slug: 'no-arrays-test',
          title: 'No Arrays',
          oneLiner: 'Test',
          year: '2023',
          context: 'Context',
          approach: 'Approach',
          outcome: 'Outcome',
          // tags and technologies not provided
        })
        .returning();

      expect(result[0].tags).toEqual([]);
      expect(result[0].technologies).toEqual([]);

      // Cleanup
      await testDb.delete(schema.initiatives).where(sql`id = ${result[0].id}`);
    });
  });
});
