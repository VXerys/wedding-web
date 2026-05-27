---
name: wedding-supabase
description: "Supabase guestbook integration and realtime feed. Use when implementing RSVP submit, optimistic UI, pagination, or realtime subscriptions."
---
# Wedding Supabase Skill

## When to Use
- Implementing guestbook feed logic, pagination, or realtime updates.
- Wiring RSVP form to Supabase insert with optimistic UI.
- Creating Supabase client helpers or database types.

## Procedure
1. Follow docs/2_System_Design_and_Database.md for schema, RLS, and data flow.
2. Use @supabase/ssr client and keep logic in client components.
3. Deduplicate realtime inserts and preserve optimistic entries.

## Output
- Updates to src/lib/supabase, src/hooks, and guestbook components.
