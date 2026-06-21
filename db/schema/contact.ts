import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const contactInfo = pgTable('contact_info', {
  id: serial('id').primaryKey(),
  email: text('email').notNull(),
  linkedIn: text('linked_in'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
