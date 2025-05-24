// db/schema/users.ts
import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  name: text('name'),
  email: text('email'),
  createdAt: timestamp('created_at').defaultNow()
});

export const moodEntries = pgTable('mood_entries', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  entryText: text('entry_text'),
  moodLabel: text('mood_label'),
  dayLabel : text('day_label'),
  createdAt: timestamp('created_at').defaultNow()
});

export const moodEntryRelations = relations(moodEntries, ({ one }) => ({
  user: one(users, {
    fields: [moodEntries.userId],
    references: [users.id],
  }),
}));