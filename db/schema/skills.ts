import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const skillCategories = pgTable('skill_categories', {
  id: serial('id').primaryKey(),
  categoryName: text('category_name').notNull(),
  skills: text('skills').array().default([]),
  order: serial('order'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const functionalSkills = pgTable('functional_skills', {
  id: serial('id').primaryKey(),
  label: text('label').notNull(),
  order: serial('order'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
