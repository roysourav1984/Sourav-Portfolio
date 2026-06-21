import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '..', '.env.local') });

import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('❌ DATABASE_URL environment variable is not set');
  console.error('Checked path:', path.resolve(__dirname, '..', '.env.local'));
  process.exit(1);
}

console.log('🗄️  Connecting to database...');

const client = postgres(databaseUrl, {
  max: 1,
  idle_timeout: 30,
  connect_timeout: 10,
});

const db = drizzle(client);

async function runMigrations() {
  try {
    console.log('📝 Running migrations...');
    await migrate(db, { migrationsFolder: path.resolve(__dirname, '..', 'src/db/migrations') });
    console.log('✅ Migrations completed successfully');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigrations();
