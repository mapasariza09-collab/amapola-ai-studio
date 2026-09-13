import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// Users table (maps Firebase Auth UID / Supabase user ID to PostgreSQL record)
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(),
  email: text('email').notNull(),
  name: text('name'),
  role: text('role').default('admin'),
  avatar: text('avatar'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Items table (Core business items explored across the Stitch multi-screen suite)
export const items = pgTable('items', {
  id: serial('id').primaryKey(),
  ownerId: text('owner_id').notNull(),
  title: text('title').notNull(),
  sku: text('sku').notNull(),
  category: text('category').notNull(),
  status: text('status').notNull().default('active'),
  priority: text('priority').default('medium'),
  price: integer('price').default(0),
  cost: integer('cost').default(0),
  stock: integer('stock').default(0),
  description: text('description'),
  tags: text('tags'),
  rating: text('rating').default('4.9'),
  metadata: text('metadata'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Relationships
export const usersRelations = relations(users, ({ many }) => ({
  items: many(items),
}));

export const itemsRelations = relations(items, ({ one }) => ({
  owner: one(users, {
    fields: [items.ownerId],
    references: [users.uid],
  }),
}));
