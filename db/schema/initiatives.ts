import { pgTable, serial, text, timestamp, index } from "drizzle-orm/pg-core";

export const initiatives = pgTable(
  "initiatives",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    oneLiner: text("one_liner").notNull(),
    year: text("year").notNull(),
    tags: text("tags").array().default([]),
    context: text("context").notNull(),
    approach: text("approach").notNull(),
    technologies: text("technologies").array().default([]),
    outcome: text("outcome").notNull(),
    order: serial("order"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [index("idx_initiatives_order").on(table.order)],
);
