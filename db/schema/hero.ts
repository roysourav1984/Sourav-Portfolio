import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const heroContent = pgTable('hero_content', {
  id: serial('id').primaryKey(),
  name: text('name'),
  headline: text('headline').notNull(),
  subtitle: text('subtitle').notNull(),
  location: text('location').notNull(),
  summary: text('summary'),
  portraitUrl: text('portrait_url'),
  portraitAlt: text('portrait_alt'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const heroStats = pgTable('hero_stats', {
  id: serial('id').primaryKey(),
  label: text('label').notNull(),
  value: text('value').notNull(),
  order: serial('order'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
