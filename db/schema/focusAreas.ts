import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const focusAreas = pgTable('focus_areas', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  stat: text('stat'),
  order: serial('order'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
