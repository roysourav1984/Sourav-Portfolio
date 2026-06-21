import dotenv from 'dotenv';
import path from 'path';
import { beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

let queryClient: ReturnType<typeof postgres> | null = null;

beforeAll(async () => {
  const databaseUrl = process.env.DATABASE_URL_TEST;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL_TEST environment variable is not set');
  }

  console.log('🗄️  Setting up test database...');

  queryClient = postgres(databaseUrl);
  const db = drizzle(queryClient);

  try {
    // Run migrations against test database
    await migrate(db, { migrationsFolder: './src/db/migrations' });
    console.log('✅ Test database migrations completed');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
});

afterAll(async () => {
  if (queryClient) {
    console.log('🔌 Closing test database connection...');
    await queryClient.end();
    console.log('✅ Test database connection closed');
  }
});

beforeEach(async () => {
  // Optional: Add per-test setup (e.g., seeding)
});

afterEach(async () => {
  // Optional: Add per-test cleanup (e.g., clearing tables)
});
