import { pgTable, serial, text, timestamp, index } from 'drizzle-orm/pg-core';

export const aiSolutionsSection = pgTable('ai_solutions_section', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  intro: text('intro').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const aiSolutionItems = pgTable(
  'ai_solution_items',
  {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    order: serial('order'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (table) => [index('idx_ai_solution_items_order').on(table.order)],
);
