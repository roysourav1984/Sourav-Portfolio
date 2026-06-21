import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const education = pgTable('education', {
  id: serial('id').primaryKey(),
  institution: text('institution').notNull(),
  degree: text('degree').notNull(),
  year: text('year').notNull(),
  order: serial('order'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
