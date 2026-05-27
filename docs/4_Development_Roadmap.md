# 4_Development_Roadmap.md
# Development Roadmap & Sprint Execution Plan: Digital Wedding Invitation

**Version:** 1.0.0
**Total Estimated Duration:** 6 Days (Solo Developer)
**Deployment Target:** Vercel (Production)

---

## Table of Contents

1. [Pre-Development Checklist](#1-pre-development-checklist)
2. [Phase 1: Repository & Infrastructure Setup (Day 1)](#2-phase-1-repository--infrastructure-setup-day-1)
3. [Phase 2: Core Layout, Styling & Static Content (Day 2–3)](#3-phase-2-core-layout-styling--static-content-day-23)
4. [Phase 3: Supabase Integration & Dynamic Features (Day 4)](#4-phase-3-supabase-integration--dynamic-features-day-4)
5. [Phase 4: Admin Dashboard & Final Features (Day 5)](#5-phase-4-admin-dashboard--final-features-day-5)
6. [Phase 5: Testing, Optimization & Launch (Day 6)](#6-phase-5-testing-optimization--launch-day-6)
7. [Post-Launch Monitoring](#7-post-launch-monitoring)
8. [Git Branching Strategy](#8-git-branching-strategy)
9. [Dependency Reference](#9-dependency-reference)

---

## 1. Pre-Development Checklist

Complete all of the following before writing a single line of code:

- [ ] Create a new GitHub repository: `digital-invitation` (private)
- [ ] Create a Supabase project at [supabase.com](https://supabase.com)
- [ ] Note down Supabase Project URL and Anon Key
- [ ] Create a Vercel account (if not already) and connect to GitHub
- [ ] Confirm domain or use Vercel's free `.vercel.app` domain
- [ ] Prepare final event data: exact date, time, venue name, full address, GPS coordinates
- [ ] Prepare admin WhatsApp number (with country code, e.g., `628123456789`)
- [ ] Create Google Maps link for venue (Right-click pin → "Share" → Copy link)

---

## 2. Phase 1: Repository & Infrastructure Setup (Day 1)

**Goal:** A running Next.js app deployed to Vercel with Supabase database ready.
**Estimated Time:** 4–5 hours

### Step 1.1 — Initialize Next.js Project

```bash
# Create the project with App Router, TypeScript, Tailwind CSS
npx create-next-app@latest digital-invitation \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"

cd digital-invitation
```

**During setup prompts:**
- TypeScript: **Yes**
- ESLint: **Yes**
- Tailwind CSS: **Yes**
- `src/` directory: **No** (use `app/` at root as per this project's structure)
- App Router: **Yes**
- Custom import alias: **Yes** → `@/*`

### Step 1.2 — Install All Dependencies

```bash
# Animation library
npm install framer-motion

# Supabase client (use the SSR package for Next.js App Router)
npm install @supabase/ssr @supabase/supabase-js

# Icon library (lightweight, tree-shakeable)
npm install lucide-react

# UUID generation (for optimistic UI temp IDs)
npm install uuid
npm install -D @types/uuid
```

### Step 1.3 — Set Up Environment Variables

```bash
# Create local env file
touch .env.local .env.example
```

Populate `.env.local` with values from your Supabase project settings and event details (see `2_System_Design_and_Database.md` Section 8 for the full template).

Populate `.env.example` with empty keys (commit this to Git).

```bash
# Add .env.local to .gitignore (should already be there, verify)
echo ".env.local" >> .gitignore
```

### Step 1.4 — Set Up Supabase Database

Navigate to your Supabase Project → SQL Editor → New Query. Execute:

```sql
-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create the guestbook table
CREATE TABLE public.guestbook (
  id           UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  guest_name   VARCHAR(255) NOT NULL,
  attendance   VARCHAR(50)  NOT NULL CHECK (attendance IN ('Hadir', 'Tidak Hadir', 'Ragu')),
  message      TEXT         NOT NULL,
  created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- 3. Create performance index
CREATE INDEX idx_guestbook_created_at ON public.guestbook(created_at DESC);

-- 4. Enable Row Level Security
ALTER TABLE public.guestbook ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies
CREATE POLICY "Allow anonymous insert"
  ON public.guestbook FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous select"
  ON public.guestbook FOR SELECT TO anon USING (true);

CREATE POLICY "Allow admin delete"
  ON public.guestbook FOR DELETE TO authenticated USING (true);
```

**Verify:** Go to Table Editor → `guestbook` table should exist with the correct columns.

**Enable Realtime:** Go to Database → Replication → Find `guestbook` table → Toggle "Insert" to enabled.

### Step 1.5 — Configure Tailwind

Replace the content of `tailwind.config.ts` with the complete configuration from `3_UI_UX_Guidelines.md` Section 9.

### Step 1.6 — Set Up Global Styles

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    background-color: #FAF9F6;
    background-image:
      radial-gradient(ellipse at 20% 10%, rgba(212, 175, 55, 0.08) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 90%, rgba(212, 175, 55, 0.06) 0%, transparent 50%);
    background-attachment: fixed;
    color: #2C3E50;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }

  /* Hide scrollbar during cover animation */
  body.overflow-hidden {
    overflow: hidden;
  }
}

@layer components {
  .glass-card {
    @apply bg-white/60 backdrop-blur-lg border border-white/25 rounded-2xl shadow-card;
    -webkit-backdrop-filter: blur(16px) saturate(1.8);
    backdrop-filter: blur(16px) saturate(1.8);
  }
}
```

### Step 1.7 — Set Up Supabase Client

Create `lib/supabase/client.ts` per the code in `2_System_Design_and_Database.md` Section 9.

Create `types/guestbook.ts` per the TypeScript interfaces in `2_System_Design_and_Database.md` Section 7.

### Step 1.8 — Initial Vercel Deployment

```bash
# Initialize git and push to GitHub
git init
git add .
git commit -m "chore: initial project setup with Next.js, Tailwind, Supabase"
git branch -M main
git remote add origin https://github.com/your-username/digital-invitation.git
git push -u origin main
```

In Vercel Dashboard:
1. "Add New Project" → Import from GitHub
2. Select `digital-invitation` repository
3. Add all environment variables from `.env.local`
4. Deploy

**Milestone:** Visit `https://digital-invitation.vercel.app` — should see the default Next.js page. CI/CD is confirmed working.

---

## 3. Phase 2: Core Layout, Styling & Static Content (Day 2–3)

**Goal:** All visual sections built out with correct styling and layout. No Supabase integration yet.
**Estimated Time:** 8–10 hours

### Step 2.1 — Root Layout + Fonts (Day 2 Morning)

Update `app/layout.tsx`:
- Import `Cormorant_Garamond` and `DM_Sans` from `next/font/google`
- Set correct `lang="id"` on `<html>`
- Apply font CSS variables to `<html className>`
- Add Metadata API config (`title`, `description`, `openGraph`)

```tsx
// app/layout.tsx
import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `Undangan Pernikahan ${process.env.NEXT_PUBLIC_GROOM_NAME} & ${process.env.NEXT_PUBLIC_BRIDE_NAME}`,
  description: 'Dengan penuh rasa syukur, kami mengundang Anda untuk hadir dalam momen sakral kami.',
  openGraph: {
    title: `Undangan Pernikahan`,
    description: 'Hadir dan doakan kami.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
```

### Step 2.2 — CoverEnvelope Component (Day 2 Morning)

Create `components/cover/CoverEnvelope.tsx`:

```tsx
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CoverEnvelopeProps {
  guestName: string;
}

export default function CoverEnvelope({ guestName }: CoverEnvelopeProps) {
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    if (!isOpened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpened]);

  return (
    <AnimatePresence>
      {!isOpened && (
        <motion.div
          key="cover"
          exit={{ y: '-100vh', opacity: 0, transition: { duration: 1.0, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-50 bg-cream-100 flex flex-col items-center justify-center cursor-pointer"
          onClick={() => setIsOpened(true)}
          onKeyDown={(e) => e.key === 'Enter' && setIsOpened(true)}
          tabIndex={0}
          role="button"
          aria-label="Ketuk untuk membuka undangan"
        >
          {/* Ornamental top divider */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-16 bg-gold-400/50" />
            <span className="text-gold-400 text-xl">◆</span>
            <div className="h-px w-16 bg-gold-400/50" />
          </div>

          {/* Content */}
          <p className="font-body text-body-sm text-slate-500 tracking-widest uppercase mb-2">
            Undangan Pernikahan
          </p>
          <p className="font-display text-display-md italic text-slate-700 text-center px-8">
            Kepada Yth.
          </p>
          <h1 className="font-display text-display-lg italic text-gold-400 text-center px-6 mt-1">
            {guestName}
          </h1>

          {/* Ornamental bottom divider */}
          <div className="flex items-center gap-3 my-8">
            <div className="h-px w-16 bg-gold-400/50" />
            <span className="text-gold-400 text-xl">◆</span>
            <div className="h-px w-16 bg-gold-400/50" />
          </div>

          {/* Tap prompt */}
          <motion.p
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="font-body text-body-sm text-slate-400 mt-4"
          >
            Ketuk untuk Membuka
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

### Step 2.3 — HeroSection Component (Day 2 Afternoon)

Create `components/hero/HeroSection.tsx` and `HeroFallback.tsx`:
- `HeroSection` is a Client Component that calls `useSearchParams()` and decodes the guest name.
- `HeroFallback` is a skeleton loading state for the `<Suspense>` boundary.
- Display couple names prominently in `font-display text-display-xl italic`.
- Ornamental date display beneath couple names.

### Step 2.4 — EventDetails Bento Grid (Day 2 Afternoon)

Create `components/details/EventDetails.tsx` as a **Server Component** (no `'use client'` directive):
- Implement the 3-column Bento Grid as specified in `3_UI_UX_Guidelines.md` Section 6.
- Hardcode event data from environment variables or constants file.
- Create `lib/constants/event.ts` for event data.
- The Maps button opens `NEXT_PUBLIC_MAPS_URL` in a new tab.

```typescript
// lib/constants/event.ts
export const EVENT = {
  groomName:  process.env.NEXT_PUBLIC_GROOM_NAME ?? 'Ahmad',
  brideName:  process.env.NEXT_PUBLIC_BRIDE_NAME ?? 'Siti',
  akadDate:   'Minggu, 12 Juli 2026',
  akadTime:   '09:00 WIB',
  venue:      'Masjid Raya Al-Barkah, Jakarta',
  resepsiTime:'11:00 – 13:00 WIB',
  dressCode:  'Batik / Formal',
  mapsUrl:    process.env.NEXT_PUBLIC_MAPS_URL ?? '#',
} as const;
```

### Step 2.5 — Main Page Assembly (Day 3 Morning)

Update `app/page.tsx` to assemble all components:
- Wrap `HeroSection` in `<Suspense fallback={<HeroFallback />}>`
- Pass `guestName` down to `CoverEnvelope` from a shared wrapper
- Important: `CoverEnvelope` also needs the guest name, so it should be a sibling component that also reads `useSearchParams()`, or create a wrapper Client Component that reads the name and passes to both.

```tsx
// app/page.tsx — Server Component
import { Suspense } from 'react';
import InvitationClient from '@/components/InvitationClient';
import HeroFallback from '@/components/hero/HeroFallback';
import EventDetails from '@/components/details/EventDetails';
import GuestbookFeed from '@/components/guestbook/GuestbookFeed';
import RSVPForm from '@/components/rsvp/RSVPForm';

export default function Page() {
  return (
    <main>
      <Suspense fallback={<HeroFallback />}>
        {/* Client wrapper handles useSearchParams, passes name to Cover + Hero */}
        <InvitationClient />
      </Suspense>
      <EventDetails />
      <RSVPForm />
      <GuestbookFeed />
    </main>
  );
}
```

### Step 2.6 — Static Visual Polish (Day 3 Afternoon)

- [ ] Verify glassmorphism card effect renders correctly on mobile Chrome and Safari.
- [ ] Check all `font-display` (Cormorant Garamond) sections render with correct italic weights.
- [ ] Ensure `bg-attachment: fixed` gradient background works correctly (note: iOS Safari has partial support — test and apply fallback if needed).
- [ ] Implement section separators using a thin gold ornamental divider component.
- [ ] Add `<footer>` with couple names and a closing ornamental motif.

**Commit checkpoint:**
```bash
git add .
git commit -m "feat: core layout, cover envelope, hero, bento grid, static styling"
git push
```

---

## 4. Phase 3: Supabase Integration & Dynamic Features (Day 4)

**Goal:** Fully functional RSVP form, real-time guestbook feed, and optimistic UI.
**Estimated Time:** 6–8 hours

### Step 3.1 — Custom Hooks Setup

Create `hooks/useGuestbookFeed.ts`:
- `entries` state, `page` state, `hasMore` state
- `fetchPage(pageNum)` function using the Supabase query from `2_System_Design_and_Database.md` Section 6.1
- `loadMore()` function
- `addOptimisticEntry(entry)` function
- `confirmEntry(tempId, realEntry)` function
- `removeEntry(tempId)` function
- Supabase Realtime subscription in `useEffect` (cleanup on unmount)

Create `hooks/useRSVPSubmit.ts`:
- `submitState` enum state
- `submitRSVP(payload)` async function with 10-second timeout
- Returns `{ submitState, handleSubmit }`

### Step 3.2 — RSVPForm Component

Create `components/rsvp/RSVPForm.tsx`:
- Three form fields: Name input, Attendance select, Message textarea
- Client-side validation (all fields required)
- Connect to `useRSVPSubmit` hook and `addOptimisticEntry` from parent (pass as prop or use context)
- Loading state: spinner + disabled button
- Success state: green checkmark animation for 2 seconds, then form resets
- Error state: toast notification, form re-enabled with values restored

```tsx
// Attendance select options
const ATTENDANCE_OPTIONS = [
  { value: '',             label: '-- Pilih Status Kehadiran --' },
  { value: 'Hadir',        label: '✓ Dengan senang hati, saya akan hadir' },
  { value: 'Tidak Hadir',  label: '✗ Mohon maaf, saya berhalangan hadir' },
  { value: 'Ragu',         label: '◑ Saya masih ragu-ragu' },
];
```

### Step 3.3 — GuestbookFeed Component

Create `components/guestbook/GuestbookFeed.tsx`:
- Uses `useGuestbookFeed` hook
- Renders `GuestbookCard` for each entry
- Empty state message when `entries.length === 0`
- "Muat Lebih Banyak" button with loading state
- Hides "Load More" when `hasMore === false`

Create `components/guestbook/GuestbookCard.tsx`:
- Glass card design
- Avatar initial letter
- Attendance badge
- Relative time formatting: `"2 menit yang lalu"`, `"1 jam yang lalu"`, etc.
- Pending state (slightly muted opacity, dashed border)

```typescript
// lib/utils.ts — Relative time formatter
export function formatRelativeTime(isoString: string): string {
  const now = new Date();
  const past = new Date(isoString);
  const diffMs = now.getTime() - past.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);

  if (diffMinutes < 1)  return 'Baru saja';
  if (diffMinutes < 60) return `${diffMinutes} menit yang lalu`;
  if (diffHours < 24)   return `${diffHours} jam yang lalu`;
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  }).format(past);
}
```

### Step 3.4 — Optimistic UI Wiring

Connect `RSVPForm` and `GuestbookFeed` together:

```tsx
// components/InvitationClient.tsx (or app/page.tsx if using Context)
// This component holds the shared state between RSVPForm and GuestbookFeed

'use client';
export default function InvitationSection() {
  const { entries, addOptimisticEntry, confirmEntry, removeEntry, ...feedProps } = useGuestbookFeed();

  return (
    <>
      <RSVPForm
        onOptimisticAdd={addOptimisticEntry}
        onConfirm={confirmEntry}
        onError={removeEntry}
      />
      <GuestbookFeed entries={entries} {...feedProps} />
    </>
  );
}
```

### Step 3.5 — Integration Testing

Manually test these scenarios in order:
1. Submit RSVP with all valid fields → Verify optimistic card appears immediately → Verify Supabase row created.
2. Submit with empty fields → Verify inline validation errors appear.
3. Simulate network failure → Verify error toast, form restored.
4. Open two browser tabs → Submit in tab 1 → Verify tab 2 receives real-time update.
5. Click "Muat Lebih Banyak" → Verify offset pagination works.

**Commit checkpoint:**
```bash
git add .
git commit -m "feat: supabase rsvp form, guestbook feed, optimistic ui, realtime"
git push
```

---

## 5. Phase 4: Admin Dashboard & Final Features (Day 5)

**Goal:** Password-protected admin dashboard with WhatsApp link generator.
**Estimated Time:** 4–5 hours

### Step 4.1 — Admin Route Setup

Create `app/admin/page.tsx` as a Client Component:

```tsx
'use client';
import { useState } from 'react';
import LinkGenerator from '@/components/admin/LinkGenerator';

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      setError('Password salah. Coba lagi.');
      setPassword('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-100 px-4">
        <div className="glass-card p-8 w-full max-w-sm">
          <h1 className="font-display text-display-md italic text-slate-700 mb-6 text-center">
            Admin Panel
          </h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="Masukkan password..."
            className="[input-base-classes]"
          />
          {error && <p className="text-red-400 text-body-sm mt-2">{error}</p>}
          <button onClick={handleLogin} className="[button-classes] w-full mt-4">
            Masuk
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-100 py-12 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="font-display text-display-lg italic text-slate-700 mb-8 text-center">
          Generator Undangan
        </h1>
        <LinkGenerator />
      </div>
    </div>
  );
}
```

### Step 4.2 — LinkGenerator Component

Create `components/admin/LinkGenerator.tsx`:

```tsx
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

function generateLinks(guestName: string) {
  // Encode name: spaces as +, preserve other special chars
  const encodedName = encodeURIComponent(guestName).replace(/%20/g, '+');
  const inviteUrl = `${SITE_URL}/?to=${encodedName}`;

  // WhatsApp message template
  const waMessage = `Assalamualaikum Warahmatullahi Wabarakatuh,\n\nYth. Bapak/Ibu/Saudara/i *${guestName}*\n\nTanpa mengurangi rasa hormat, kami mengundang Anda untuk hadir dalam acara pernikahan kami.\n\n🔗 Buka undangan Anda di sini:\n${inviteUrl}\n\nMerupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.\n\nWassalamualaikum Warahmatullahi Wabarakatuh.`;

  const encodedMessage = encodeURIComponent(waMessage);
  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodedMessage}`;

  return { inviteUrl, waLink };
}

export default function LinkGenerator() {
  const [guestName, setGuestName] = useState('');
  const [links, setLinks] = useState<{ inviteUrl: string; waLink: string } | null>(null);
  const [copiedInvite, setCopiedInvite] = useState(false);
  const [copiedWa, setCopiedWa] = useState(false);

  const handleGenerate = () => {
    if (!guestName.trim()) return;
    setLinks(generateLinks(guestName.trim()));
  };

  const copyToClipboard = async (text: string, type: 'invite' | 'wa') => {
    await navigator.clipboard.writeText(text);
    if (type === 'invite') {
      setCopiedInvite(true);
      setTimeout(() => setCopiedInvite(false), 2000);
    } else {
      setCopiedWa(true);
      setTimeout(() => setCopiedWa(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      {/* Input */}
      <div className="glass-card p-5">
        <label className="text-label text-slate-500 tracking-widest uppercase block mb-3">
          Nama Tamu
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            placeholder="Contoh: Budi Santoso"
            className="[input-base-classes] flex-1"
          />
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleGenerate}
            className="bg-gold-400 text-white font-body font-medium px-5 py-3 rounded-xl"
          >
            Generate
          </motion.button>
        </div>
      </div>

      {/* Generated links */}
      {links && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          {/* Invite URL */}
          <div className="glass-card p-4">
            <p className="text-label text-slate-500 tracking-widest uppercase mb-2">
              Link Undangan
            </p>
            <code className="text-body-sm text-slate-700 break-all block mb-3 bg-cream-200/60 p-2 rounded-lg">
              {links.inviteUrl}
            </code>
            <button
              onClick={() => copyToClipboard(links.inviteUrl, 'invite')}
              className="flex items-center gap-2 text-body-sm text-gold-500 font-medium"
            >
              {copiedInvite ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copiedInvite ? 'Tersalin!' : 'Salin Link'}
            </button>
          </div>

          {/* WhatsApp Link */}
          <div className="glass-card p-4">
            <p className="text-label text-slate-500 tracking-widest uppercase mb-2">
              Link WhatsApp
            </p>
            <code className="text-body-sm text-slate-700 break-all block mb-3 bg-cream-200/60 p-2 rounded-lg">
              {links.waLink.substring(0, 80)}...
            </code>
            <button
              onClick={() => copyToClipboard(links.waLink, 'wa')}
              className="flex items-center gap-2 text-body-sm font-medium text-white bg-green-500 px-4 py-2 rounded-lg"
            >
              {copiedWa ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copiedWa ? 'Tersalin!' : 'Salin Link WhatsApp'}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
```

### Step 4.3 — Animation Polish Pass

- [ ] Add Framer Motion scroll-reveal to Hero section (see `3_UI_UX_Guidelines.md` Section 8.1).
- [ ] Add Bento Grid stagger animation on `EventDetails` entry (see Section 8.2).
- [ ] Verify `AnimatePresence` is set up correctly at the root for `CoverEnvelope`.
- [ ] Add `prefers-reduced-motion` media query check before applying animations.

### Step 4.4 — SEO & Meta Tags

- [ ] Add OG image placeholder at `public/og-image.jpg` (1200×630px).
- [ ] Verify `metadata` export in `app/layout.tsx` renders correctly in browser dev tools.
- [ ] Test social share preview using [opengraph.xyz](https://www.opengraph.xyz/).

**Commit checkpoint:**
```bash
git add .
git commit -m "feat: admin dashboard, whatsapp link generator, animation polish"
git push
```

---

## 6. Phase 5: Testing, Optimization & Launch (Day 6)

**Goal:** Production-ready app, cross-browser tested, deployed.
**Estimated Time:** 4–6 hours

### Step 5.1 — Cross-Browser Testing Checklist

Test on the following combinations:

| Device | Browser | Critical Tests |
|---|---|---|
| iPhone 13 (iOS 16+) | Safari | Cover animation, blur effect, form submission, WhatsApp link opens |
| iPhone 11 (iOS 15) | Safari | Backdrop-blur fallback if needed |
| Android (mid-range) | Chrome Android | Scroll performance, animation smoothness, form |
| Desktop Mac | Chrome | Full layout, admin panel |
| Desktop Win | Firefox | Glassmorphism, font rendering |

**Common Safari-Specific Issues:**
```css
/* ALWAYS include -webkit- prefix for backdrop-filter */
.glass-card {
  -webkit-backdrop-filter: blur(16px) saturate(1.8);
  backdrop-filter: blur(16px) saturate(1.8);
}

/* iOS Safari viewport height fix */
.min-h-screen-ios {
  min-height: -webkit-fill-available;
}
```

**WhatsApp Link Testing:**
```bash
# Test WhatsApp URL encoding manually
# Ensure spaces in name become + not %20
# Ensure the long message is properly encoded
# Open wa.me link in browser — should redirect to WhatsApp with pre-filled message
```

### Step 5.2 — Performance Audit

Run Lighthouse in Chrome DevTools → Mobile → Analyze:

**Targets:**
- Performance: > 85
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

**Common fixes if score is low:**
- If fonts are blocking render: Verify `display: 'swap'` in `next/font` config.
- If LCP is slow: Ensure above-the-fold content has no heavy resources.
- If CLS is high: Ensure font loading doesn't shift layout (CSS vars on `html` element prevent this).
- If JS bundle is large: Check for unintended large imports. Run `npx @next/bundle-analyzer`.

### Step 5.3 — Accessibility Audit

- [ ] Verify all interactive elements are keyboard-focusable (Tab key).
- [ ] Test with VoiceOver (iOS) — cover overlay must announce `"Ketuk untuk membuka undangan"`.
- [ ] Verify ARIA labels on all icon-only buttons.
- [ ] Check color contrast ratios with browser accessibility panel.

### Step 5.4 — Final Environment Check

Verify all Vercel environment variables are set correctly:
1. Go to Vercel Dashboard → Project → Settings → Environment Variables.
2. Confirm all variables match `.env.local` (Production scope).
3. Trigger a redeploy after confirming.

### Step 5.5 — Production Deployment

```bash
# Final commit
git add .
git commit -m "chore: production-ready — testing complete, all features verified"
git push origin main
```

Vercel auto-deploys on push to `main`. Monitor the build log for any TypeScript or ESLint errors.

### Step 5.6 — Post-Deploy Smoke Tests

After Vercel deployment completes:
- [ ] Open `https://<your-domain>/?to=Test+Tamu` — name renders correctly.
- [ ] Tap the cover — animation plays, scroll unlocks.
- [ ] Submit a test RSVP — appears in Supabase `guestbook` table.
- [ ] Open a second browser window — real-time update appears when first window submits.
- [ ] Open `/admin` — password prompt appears.
- [ ] Login to admin — generate a link for "Test Guest", copy both links.
- [ ] Paste WhatsApp link in browser — it should open WhatsApp with the pre-filled message.
- [ ] Open the Maps tile — Google Maps opens in new tab.

---

## 7. Post-Launch Monitoring

### Supabase Dashboard
- Monitor `guestbook` table for incoming RSVPs.
- Count rows by `attendance` value to track RSVP status:
  ```sql
  SELECT attendance, COUNT(*) as count
  FROM guestbook
  GROUP BY attendance;
  ```

### Vercel Analytics
- Enable Vercel Analytics (free tier) for basic page view and performance data.
- Enable Web Vitals monitoring.

### Error Monitoring (Optional)
- Add Sentry for Next.js if desired: `npm install @sentry/nextjs`
- Free tier is sufficient for a wedding invitation.

---

## 8. Git Branching Strategy

```
main          ← Production (Vercel auto-deploys from here)
  │
  ├── feat/phase-1-setup         ← Merged after Phase 1
  ├── feat/phase-2-layout        ← Merged after Phase 2
  ├── feat/phase-3-supabase      ← Merged after Phase 3
  ├── feat/phase-4-admin         ← Merged after Phase 4
  └── fix/safari-backdrop-blur   ← Hotfix branch pattern
```

Each phase branch merges into `main` via a pull request. This gives a clean audit trail.

---

## 9. Dependency Reference

### Production Dependencies

| Package | Version | Purpose |
|---|---|---|
| `next` | `15.x` | React framework (App Router) |
| `react` | `19.x` | UI library |
| `react-dom` | `19.x` | React DOM renderer |
| `framer-motion` | `^11.x` | Animations (cover, cards, scroll) |
| `@supabase/ssr` | `^0.5.x` | Supabase client for Next.js App Router |
| `@supabase/supabase-js` | `^2.x` | Supabase JS SDK |
| `lucide-react` | `^0.383.x` | Icon library (MapPin, Copy, Check, etc.) |
| `uuid` | `^9.x` | Generate temp UUIDs for optimistic entries |

### Dev Dependencies

| Package | Purpose |
|---|---|
| `typescript` | Type safety |
| `@types/uuid` | UUID types |
| `eslint` | Code linting |
| `eslint-config-next` | Next.js ESLint rules |
| `tailwindcss` | Utility-first CSS |
| `postcss` | CSS processing |
| `autoprefixer` | CSS vendor prefixes |

### Notable Exclusions (and Why)

| Package | Reason Excluded |
|---|---|
| `axios` | Native `fetch` with Supabase SDK is sufficient |
| `react-hook-form` | Overkill for 3 fields; manual state is cleaner |
| `react-query / SWR` | Supabase SDK + custom hooks handles all data fetching |
| `zustand / redux` | No cross-component state complexity; local hooks suffice |
| `date-fns / dayjs` | Custom `formatRelativeTime` util is sufficient |
