# 2_System_Design_and_Database.md
# System Design & Architecture: Digital Wedding Invitation

**Version:** 1.0.0
**Stack:** Next.js 15 (App Router) · React 19 · Supabase (PostgreSQL) · Vercel

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [CSR vs SSR Strategy — Decision Matrix](#2-csr-vs-ssr-strategy--decision-matrix)
3. [Project Directory Structure](#3-project-directory-structure)
4. [Database Schema (Supabase PostgreSQL)](#4-database-schema-supabase-postgresql)
5. [Row Level Security (RLS) Policies](#5-row-level-security-rls-policies)
6. [API & Data Flow Specification](#6-api--data-flow-specification)
7. [State Management Architecture](#7-state-management-architecture)
8. [Environment Variables](#8-environment-variables)
9. [Supabase Client Configuration](#9-supabase-client-configuration)
10. [Deployment Architecture](#10-deployment-architecture)

---

## 1. Architecture Overview

```
┌──────────────────────────────────────────────────────────┐
│                        CLIENT                            │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Next.js 15 (App Router) — Vercel Edge Network     │  │
│  │                                                    │  │
│  │  app/                                              │  │
│  │  ├── layout.tsx      (Static Shell + Fonts)        │  │
│  │  ├── page.tsx        (SSR — Event Data)            │  │
│  │  └── admin/page.tsx  (CSR — Password Protected)    │  │
│  │                                                    │  │
│  │  components/                                       │  │
│  │  ├── CoverEnvelope   (CSR — Animation State)       │  │
│  │  ├── HeroSection     (CSR — useSearchParams)       │  │
│  │  ├── EventDetails    (Static — Bento Grid)         │  │
│  │  ├── RSVPForm        (CSR — Form State)            │  │
│  │  └── GuestbookFeed   (CSR — Realtime + Pagination) │  │
│  └────────────────────────────────────────────────────┘  │
│                          │                               │
│                    Supabase JS SDK                        │
│                    (@supabase/ssr)                        │
└────────────────────┬─────────────────────────────────────┘
                     │ HTTPS
                     ▼
┌────────────────────────────────────────────────────────────┐
│                   SUPABASE CLOUD                           │
│                                                            │
│  ┌──────────────────┐   ┌──────────────────────────────┐  │
│  │  PostgreSQL DB   │   │  Realtime Engine (WebSocket) │  │
│  │                  │   │                              │  │
│  │  Table:          │   │  Channel: guestbook          │  │
│  │  guestbook       │◄──┤  Event: postgres_changes     │  │
│  │                  │   │  Filter: INSERT on guestbook │  │
│  └──────────────────┘   └──────────────────────────────┘  │
│                                                            │
│  Row Level Security (RLS) enforced on all operations       │
└────────────────────────────────────────────────────────────┘
```

**Key Architectural Decisions:**
1. The main invitation page is **Server-Side Rendered (SSR)** for SEO and performance, but the dynamic name personalization happens client-side to allow CDN caching.
2. The Guestbook Feed is **fully Client-Side Rendered (CSR)** to enable Supabase Realtime WebSocket subscriptions.
3. Admin dashboard is pure **CSR** — never indexed, never cached.

---

## 2. CSR vs SSR Strategy — Decision Matrix

This is the most critical architectural decision for this application. The goal is to maximize CDN cacheability without sacrificing personalization.

### The Core Problem
If we server-render the guest's name (from the `?to=` URL param), every unique URL would be a **unique cache miss** on Vercel's Edge Network. With 300 guests, that's 300 separate SSR calls on first load.

### The Solution: "Static Shell + Client Hydration" Pattern

| Component | Rendering Strategy | Reasoning |
|---|---|---|
| `app/layout.tsx` | **Static** | Fonts, meta tags, body wrapper. Cached permanently by CDN. |
| `app/page.tsx` | **SSR (light)** | Event data (date, venue, names of the couple) is static. Can use `export const revalidate = 3600`. No personalization here. |
| `CoverEnvelope` | **CSR** (`'use client'`) | Requires `useState` for `isOpened` animation trigger. |
| `HeroSection` | **CSR** (`'use client'`) | Must call `useSearchParams()` — requires client context. Wrapped in `<Suspense>`. |
| `EventDetails` | **Server Component** | Pure static data. No interactivity. Rendered server-side, zero JS sent. |
| `RSVPForm` | **CSR** (`'use client'`) | Form state, submit handler, validation, optimistic updates. |
| `GuestbookFeed` | **CSR** (`'use client'`) | Supabase Realtime subscription, pagination state, optimistic items array. |
| `app/admin/page.tsx` | **CSR** (`'use client'`) | All logic is client-side; password check, clipboard API. |

### Implementation of `useSearchParams` in App Router

```tsx
// app/page.tsx — Server Component (the page itself is cached)
import { Suspense } from 'react';
import HeroSection from '@/components/HeroSection';
import HeroFallback from '@/components/HeroFallback';

export default function InvitationPage() {
  return (
    <main>
      <CoverEnvelope />
      {/* Suspense boundary is REQUIRED for useSearchParams */}
      <Suspense fallback={<HeroFallback />}>
        <HeroSection />
      </Suspense>
      <EventDetails />
      <RSVPForm />
      <GuestbookFeed />
    </main>
  );
}
```

```tsx
// components/HeroSection.tsx — Client Component
'use client';
import { useSearchParams } from 'next/navigation';

export default function HeroSection() {
  const searchParams = useSearchParams();
  // decodeURIComponent handles %20; replace handles +
  const rawName = searchParams.get('to') ?? '';
  const guestName = rawName
    ? decodeURIComponent(rawName.replace(/\+/g, ' '))
    : 'Tamu Undangan';

  return (
    <section>
      <p className="text-secondary">Kepada Yth.</p>
      <h1 className="font-display text-4xl">{guestName}</h1>
    </section>
  );
}
```

> **Critical Note:** The `rawName.replace(/\+/g, ' ')` step must happen **before** `decodeURIComponent`, because `decodeURIComponent` does not decode `+` to spaces (only `%20`).

---

## 3. Project Directory Structure

```
digital-invitation/
├── app/
│   ├── layout.tsx                # Root layout: fonts, metadata, body
│   ├── page.tsx                  # Main invitation page (Server Component wrapper)
│   ├── globals.css               # Tailwind base + custom CSS variables
│   └── admin/
│       └── page.tsx              # Admin dashboard (Client Component)
│
├── components/
│   ├── cover/
│   │   └── CoverEnvelope.tsx     # Tap-to-open animated overlay
│   ├── hero/
│   │   ├── HeroSection.tsx       # Guest personalization (uses useSearchParams)
│   │   └── HeroFallback.tsx      # Suspense skeleton
│   ├── details/
│   │   └── EventDetails.tsx      # Bento grid (Server Component)
│   ├── rsvp/
│   │   ├── RSVPForm.tsx          # RSVP form with Supabase integration
│   │   └── FormField.tsx         # Reusable input/select/textarea wrapper
│   ├── guestbook/
│   │   ├── GuestbookFeed.tsx     # Feed container with realtime + pagination
│   │   └── GuestbookCard.tsx     # Individual wish card
│   └── admin/
│       └── LinkGenerator.tsx     # WhatsApp link generator component
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts             # Browser Supabase client (singleton)
│   │   └── types.ts              # Generated Supabase TypeScript types
│   └── utils.ts                  # URL encoding, name formatting utilities
│
├── types/
│   └── guestbook.ts              # TypeScript interfaces
│
├── hooks/
│   ├── useGuestbookFeed.ts       # Custom hook: fetch + realtime + pagination
│   └── useRSVPSubmit.ts          # Custom hook: form submission + optimistic UI
│
├── public/
│   └── og-image.jpg              # Static OG image for social sharing
│
├── .env.local                    # Local environment variables (never commit)
├── .env.example                  # Template for env vars (commit this)
├── tailwind.config.ts            # Extended color palette + font families
└── next.config.ts                # Next.js config
```

---

## 4. Database Schema (Supabase PostgreSQL)

### Table: `guestbook`

Execute the following SQL in the Supabase SQL Editor:

```sql
-- ============================================
-- DIGITAL INVITATION — DATABASE SETUP
-- Table: guestbook
-- ============================================

-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create guestbook table
CREATE TABLE public.guestbook (
  id           UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  guest_name   VARCHAR(255)  NOT NULL,
  attendance   VARCHAR(50)   NOT NULL CHECK (attendance IN ('Hadir', 'Tidak Hadir', 'Ragu')),
  message      TEXT          NOT NULL,
  created_at   TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- 3. Index untuk sorting by created_at (semua query pakai ini)
CREATE INDEX idx_guestbook_created_at ON public.guestbook(created_at DESC);

-- 4. Enable Row Level Security
ALTER TABLE public.guestbook ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES
-- ============================================

-- Tamu bisa INSERT (kirim ucapan & RSVP)
CREATE POLICY "Allow anonymous insert"
  ON public.guestbook
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Semua orang bisa SELECT (lihat feed ucapan)
CREATE POLICY "Allow anonymous select"
  ON public.guestbook
  FOR SELECT
  TO anon
  USING (true);

-- Hanya admin (authenticated) yang bisa DELETE (moderasi ucapan)
CREATE POLICY "Allow admin delete"
  ON public.guestbook
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================
-- VERIFY — jalankan ini untuk cek hasilnya
-- ============================================
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'guestbook'
ORDER BY ordinal_position;
```

### Schema Reference

| Column | Data Type | Constraints | Default | Description |
|---|---|---|---|---|
| `id` | `UUID` | PRIMARY KEY, NOT NULL | `uuid_generate_v4()` | Auto-generated unique identifier |
| `guest_name` | `VARCHAR(255)` | NOT NULL | — | Name submitted via form (pre-filled from URL) |
| `attendance` | `VARCHAR(50)` | NOT NULL, CHECK constraint | — | One of: `'Hadir'`, `'Tidak Hadir'`, `'Ragu'` |
| `message` | `TEXT` | NOT NULL | — | Guest's wish or prayer message |
| `created_at` | `TIMESTAMPTZ` | NOT NULL | `NOW()` | Timestamp with timezone for accurate sorting |

### Design Decisions

**Why `VARCHAR(50)` with CHECK for `attendance` instead of an `ENUM`?**
PostgreSQL ENUMs are harder to modify after creation. Using a CHECK constraint on VARCHAR allows future modification via `ALTER TABLE` without migration complexity. The three valid values (`Hadir`, `Tidak Hadir`, `Ragu`) are enforced at the database level.

**Why no `likes_count` column?**
As documented in the PRD (US-005), the "tap-tap" like feature is implemented as **front-end-only local state** to minimize write load on the database. Each client maintains its own liked-card set in memory. This is intentional for a single-event, short-lived deployment where persistent like counts provide minimal value.

**Why `TIMESTAMPTZ` instead of `TIMESTAMP`?**
`TIMESTAMPTZ` stores the timestamp in UTC and converts to the session timezone. This prevents data integrity issues if the server or client timezone ever differs. All timestamps are sorted and displayed in WIB (UTC+7) on the client side via JavaScript's `Intl.DateTimeFormat`.

---

## 5. Row Level Security (RLS) Policies

**Enable RLS on the table first:**

```sql
ALTER TABLE public.guestbook ENABLE ROW LEVEL SECURITY;
```

**Policy 1: Allow anonymous INSERT (guests submit their RSVP)**
```sql
CREATE POLICY "Allow anonymous insert"
ON public.guestbook
FOR INSERT
TO anon
WITH CHECK (true);
```

**Policy 2: Allow anonymous SELECT (anyone can read the guestbook feed)**
```sql
CREATE POLICY "Allow anonymous select"
ON public.guestbook
FOR SELECT
TO anon
USING (true);
```

**Policy 3: Block anonymous UPDATE and DELETE (no policy = blocked)**
> By default, if RLS is enabled and no matching policy exists for an operation, it is denied. No additional SQL needed to block `UPDATE`/`DELETE` from anonymous users.

**Policy 4: Allow authenticated DELETE (admin moderates messages)**
```sql
CREATE POLICY "Allow admin delete"
ON public.guestbook
FOR DELETE
TO authenticated
USING (true);
```

> **Note:** For v1.0, admin moderation is done directly via the Supabase dashboard (authenticated session). The `/admin` route in the Next.js app uses the public `anon` key — it does NOT perform authenticated DB operations.

---

## 6. API & Data Flow Specification

### 6.1 Fetch Initial Guestbook Feed

```typescript
// hooks/useGuestbookFeed.ts

const PAGE_SIZE = 8;

const fetchGuestbook = async (page: number) => {
  const from = page * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error } = await supabase
    .from('guestbook')
    .select('id, guest_name, attendance, message, created_at')
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) throw error;
  return data;
};
```

**Query Explanation:**
- `.select('id, guest_name, attendance, message, created_at')` — Explicitly lists columns; avoids accidentally fetching future columns with sensitive data.
- `.order('created_at', { ascending: false })` — Newest first.
- `.range(from, to)` — Supabase uses inclusive range. Page 0: rows 0–7. Page 1: rows 8–15.

### 6.2 Insert New Guestbook Entry

```typescript
// hooks/useRSVPSubmit.ts

interface RSVPPayload {
  guest_name: string;
  attendance: 'Hadir' | 'Tidak Hadir' | 'Ragu';
  message: string;
}

const submitRSVP = async (payload: RSVPPayload) => {
  const { data, error } = await supabase
    .from('guestbook')
    .insert([payload])
    .select() // Returns the inserted row with generated id and created_at
    .single();

  if (error) throw error;
  return data;
};
```

> **Critical:** `.select().single()` is required to retrieve the server-assigned `id` and `created_at` for the optimistic UI update — replacing the temporary client-side ID with the real UUID.

### 6.3 Realtime Subscription

```typescript
// Inside useGuestbookFeed.ts — useEffect

useEffect(() => {
  const channel = supabase
    .channel('public:guestbook') // Channel name must be unique
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'guestbook',
      },
      (payload) => {
        const newEntry = payload.new as GuestbookEntry;
        // Prepend new entry, but only if it's not our own optimistic entry
        setEntries((prev) => {
          const isDuplicate = prev.some((e) => e.id === newEntry.id);
          if (isDuplicate) return prev;
          return [newEntry, ...prev];
        });
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);
```

> **Deduplication Logic:** Because the user's own submission goes through the Optimistic UI path (which already inserts into the local state), the Realtime INSERT event for the same entry must be de-duplicated using the UUID check `isDuplicate`.

---

## 7. State Management Architecture

No external state management library (Redux, Zustand) is needed. All state is local to components or managed via custom hooks.

### GuestbookFeed State Flow

```
useGuestbookFeed Hook
│
├── entries: GuestbookEntry[]        ← All loaded entries (real + optimistic)
├── page: number                     ← Current pagination page (0-indexed)
├── hasMore: boolean                 ← True if last fetch returned PAGE_SIZE items
├── isLoading: boolean               ← True during fetch
├── isLoadingMore: boolean           ← True during "Load More" fetch
│
├── addOptimisticEntry(entry)        ← Prepends entry with isPending: true
├── confirmEntry(tempId, realEntry)  ← Replaces temp entry with server response
├── removeEntry(tempId)              ← Removes failed optimistic entry
└── loadMore()                       ← Fetches next page, appends to entries
```

### RSVPForm State Flow

```
RSVPForm Component
│
├── formData: { name, attendance, message }   ← Controlled inputs
├── errors: { name?, attendance?, message? }  ← Inline validation errors
├── submitState: 'idle' | 'loading' | 'success' | 'error'
│
├── handleSubmit()
│   ├── 1. Validate all fields → set errors or proceed
│   ├── 2. Set submitState = 'loading', disable button
│   ├── 3. Call addOptimisticEntry() in parent hook
│   ├── 4. Clear form fields
│   ├── 5. Await submitRSVP(payload)
│   │   ├── SUCCESS: confirmEntry(tempId, serverEntry), submitState = 'success'
│   │   └── ERROR: removeEntry(tempId), restore form, submitState = 'error'
│   └── 6. After 2s: submitState = 'idle'
```

### TypeScript Interfaces

```typescript
// types/guestbook.ts

export interface GuestbookEntry {
  id: string;           // UUID (from DB) or temp UUID (optimistic)
  guest_name: string;
  attendance: 'Hadir' | 'Tidak Hadir' | 'Ragu';
  message: string;
  created_at: string;   // ISO 8601 string
  isPending?: boolean;  // Only true for optimistic entries
}

export interface RSVPFormData {
  name: string;
  attendance: 'Hadir' | 'Tidak Hadir' | 'Ragu' | '';
  message: string;
}

export interface FormErrors {
  name?: string;
  attendance?: string;
  message?: string;
}
```

---

## 8. Environment Variables

### `.env.local` (never committed to Git)

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Admin Dashboard
# WARNING: NEXT_PUBLIC_ prefix makes this visible in browser bundle.
# Acceptable for a personal wedding site. For production-grade security,
# migrate this to a server-side API route in v1.1.
NEXT_PUBLIC_ADMIN_PASSWORD=yourSecurePassword123

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://wedding-invite.vercel.app
NEXT_PUBLIC_WHATSAPP_NUMBER=628123456789  # WA number without + or spaces
NEXT_PUBLIC_MAPS_URL=https://maps.google.com/?q=-6.2088,106.8456

# Couple Names (used in metadata and hero)
NEXT_PUBLIC_GROOM_NAME=Ahmad
NEXT_PUBLIC_BRIDE_NAME=Siti
NEXT_PUBLIC_EVENT_DATE=2026-07-12
```

### `.env.example` (committed to Git as template)

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_ADMIN_PASSWORD=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_MAPS_URL=
NEXT_PUBLIC_GROOM_NAME=
NEXT_PUBLIC_BRIDE_NAME=
NEXT_PUBLIC_EVENT_DATE=
```

---

## 9. Supabase Client Configuration

```typescript
// lib/supabase/client.ts
// Browser-side singleton — safe to use in 'use client' components

import { createBrowserClient } from '@supabase/ssr';
import type { Database } from './types';

let client: ReturnType<typeof createBrowserClient<Database>> | null = null;

export function getSupabaseClient() {
  if (!client) {
    client = createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return client;
}

// Named export for convenience
export const supabase = getSupabaseClient();
```

> **Why `@supabase/ssr` instead of `@supabase/supabase-js` directly?**
> `@supabase/ssr` is the official package for Next.js App Router. It handles cookie-based session management correctly and is the recommended approach per Supabase docs for Next.js 14+.

---

## 10. Deployment Architecture

```
Developer pushes to main branch
        │
        ▼
  GitHub Repository
        │
        ▼ (Automatic via GitHub App integration)
  Vercel Build Pipeline
        │
        ├── next build (with TypeScript + ESLint checks)
        ├── Output: Static + SSR functions bundled
        └── Deploy to Vercel Edge Network
                │
                ├── Static assets → Vercel CDN (global edge)
                └── SSR functions → Vercel Serverless Functions (closest region)
```

### Vercel Configuration

Add the following to Vercel Project Settings → Environment Variables:
- All variables from `.env.local` (Production, Preview, Development scopes).

### `next.config.ts` Recommended Settings

```typescript
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable experimental features if needed
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default nextConfig;
```
