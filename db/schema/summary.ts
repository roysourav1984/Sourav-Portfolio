import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const summary = pgTable('summary', {
  id: serial('id').primaryKey(),
  paragraphs: text('paragraphs').array().notNull().default([]),
  pullQuote: text('pull_quote'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
