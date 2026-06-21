import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const experienceRoles = pgTable('experience_roles', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  org: text('org').notNull(),
  title: text('title').notNull(),
  startDate: text('start_date').notNull(),
  endDate: text('end_date'),
  summary: text('summary').notNull(),
  responsibilities: text('responsibilities').array().default([]),
  order: serial('order'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
