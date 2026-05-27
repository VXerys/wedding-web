# 3_UI_UX_Guidelines.md
# UI/UX Design & Styling Guidelines: Digital Wedding Invitation

**Version:** 1.0.0
**Design Philosophy:** Typography-Led · Glassmorphism · Bento Grid · Micro-Interaction Rich

---

## Table of Contents

1. [Design Philosophy](#1-design-philosophy)
2. [Color System](#2-color-system)
3. [Typography System](#3-typography-system)
4. [Spacing & Layout System](#4-spacing--layout-system)
5. [Glassmorphism Implementation](#5-glassmorphism-implementation)
6. [Bento Grid Layout Specification](#6-bento-grid-layout-specification)
7. [Component Behavior Specifications](#7-component-behavior-specifications)
8. [Framer Motion Animation Specifications](#8-framer-motion-animation-specifications)
9. [Tailwind Configuration](#9-tailwind-configuration)
10. [Mobile Performance Guidelines for Animations](#10-mobile-performance-guidelines-for-animations)

---

## 1. Design Philosophy

This invitation has no photos. Every ounce of visual appeal comes from four pillars:

| Pillar | Application |
|---|---|
| **Typography-Led Hierarchy** | Two-font system: ornate display font for emotional moments, clean sans-serif for information. Scale, weight, and letter-spacing do all the heavy lifting. |
| **Glassmorphism Depth** | Cards appear to float on a textured, warm-cream background. Achieved with backdrop-blur, semi-transparent fills, and subtle white borders. |
| **Bento Grid Composition** | Information is compartmentalized into card tiles of varying sizes, creating visual rhythm without needing imagery. |
| **Fluid Motion** | Every transition uses GPU-compositable properties only (`transform`, `opacity`). Animations feel buttery on mid-range Android devices. |

---

## 2. Color System

### Primary Palette

Configure in `tailwind.config.ts`:

```typescript
colors: {
  cream: {
    50:  '#FDFCF8',
    100: '#FAF9F6',  // ← Page background
    200: '#F5F0E8',  // ← Subtle section divider
  },
  gold: {
    300: '#E8CA6A',  // ← Light gold for hover states
    400: '#D4AF37',  // ← Primary accent (buttons, borders, ornaments)
    500: '#B8941F',  // ← Pressed/active states
    600: '#9A7A0A',  // ← Dark gold for high-contrast text on light bg
  },
  slate: {
    700: '#2C3E50',  // ← Primary text color (headings, body)
    500: '#5D6D7E',  // ← Secondary text (sub-labels, captions)
    300: '#AEB6BF',  // ← Placeholder text, disabled states
  },
  glass: {
    white: 'rgba(255, 255, 255, 0.60)',       // ← Glassmorphism card fill
    border: 'rgba(255, 255, 255, 0.25)',       // ← Glassmorphism card border
    overlay: 'rgba(250, 249, 246, 0.92)',      // ← Cover overlay
  },
}
```

### Usage Guidelines

| Token | Tailwind Class | Usage |
|---|---|---|
| Background | `bg-cream-100` | Page base background |
| Card Fill | Custom glass white | All Bento card backgrounds |
| Primary Accent | `text-gold-400` / `bg-gold-400` | CTA buttons, ornamental text, borders |
| Body Text | `text-slate-700` | All paragraphs, labels |
| Sub-text | `text-slate-500` | Venue addresses, timestamps, captions |
| Placeholder | `text-slate-300` | Form input placeholders |

### CSS Variables in `globals.css`

```css
:root {
  --color-bg: #FAF9F6;
  --color-accent: #D4AF37;
  --color-text-primary: #2C3E50;
  --color-text-secondary: #5D6D7E;
  --color-glass-fill: rgba(255, 255, 255, 0.60);
  --color-glass-border: rgba(255, 255, 255, 0.25);
  --shadow-card: 0 8px 32px rgba(44, 62, 80, 0.08);
  --shadow-card-hover: 0 16px 48px rgba(44, 62, 80, 0.14);
}
```

---

## 3. Typography System

### Font Recommendation Matrix

This is one of the most impactful design decisions. Below are curated pairings from best to alternative:

#### **Recommended Pairing #1 (Premium Elegance) — PRIMARY CHOICE**
| Role | Font | Weight Used | Fallback |
|---|---|---|---|
| Display / Decorative | **Cormorant Garamond** | 300, 400, 600 Italic | Georgia, serif |
| Body / UI | **DM Sans** | 300, 400, 500 | system-ui, sans-serif |

*Why Cormorant Garamond:* Ultra-thin hairlines, dramatic contrast between thick and thin strokes. The italic variant has exceptional calligraphic quality. Feels genuinely luxurious, unlike the overused Playfair Display.

*Why DM Sans:* Geometric but warm. Excellent legibility at small sizes. Modern without feeling cold. Open-source on Google Fonts.

---

#### **Alternative Pairing #2 (Romantic Script)**
| Role | Font | Weight Used |
|---|---|---|
| Display / Decorative | **Libre Baskerville** | 400, 400 Italic, 700 |
| Body / UI | **Plus Jakarta Sans** | 300, 400, 500 |

*Why:* Libre Baskerville has stately proportions; Plus Jakarta Sans has excellent Southeast Asian character coverage.

---

#### **Alternative Pairing #3 (Soft Romantic)**
| Role | Font | Weight Used |
|---|---|---|
| Display / Decorative | **Gloock** | 400, 400 Italic |
| Body / UI | **Outfit** | 300, 400, 500 |

*Why Gloock:* A newer serif with ink-trap details that render beautifully on mobile OLED screens. Modern take on old-style typography.

---

#### **Avoid These Overused Choices**
- ❌ Playfair Display — Beautiful but every wedding site uses it
- ❌ Great Vibes — Script fonts are illegible on small screens
- ❌ Inter / Roboto / Arial — No personality whatsoever
- ❌ Montserrat — Ubiquitous, indistinct

---

### Typography Scale

```typescript
// In tailwind.config.ts
fontSize: {
  'display-xl':  ['3.5rem',  { lineHeight: '1.1', letterSpacing: '-0.02em' }], // Couple names
  'display-lg':  ['2.75rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }], // Section headers
  'display-md':  ['2rem',    { lineHeight: '1.2',  letterSpacing: '0em' }],     // Subsection headers
  'body-lg':     ['1.125rem',{ lineHeight: '1.7',  letterSpacing: '0.01em' }],  // Lead paragraphs
  'body-md':     ['1rem',    { lineHeight: '1.65', letterSpacing: '0.01em' }],  // Body text
  'body-sm':     ['0.875rem',{ lineHeight: '1.6',  letterSpacing: '0.02em' }],  // Captions, labels
  'label':       ['0.75rem', { lineHeight: '1',    letterSpacing: '0.08em' }],  // ALL CAPS labels
}
```

### Typography Hierarchy in Use

```
┌─────────────────────────────────────────┐
│  [label — 12px, tracking-widest]        │  "UNDANGAN PERNIKAHAN"
│                                         │
│  [display-xl — Cormorant Garamond]      │  "Ahmad & Siti"
│  [italic, weight 300]                   │
│                                         │
│  [body-md — DM Sans, weight 300]        │  "Kepada Yth."
│  [display-lg — Cormorant, italic]       │  "Budi Santoso"
│                                         │
│  [body-sm — DM Sans, slate-500]         │  "Minggu, 12 Juli 2026"
│                                         │
│  [label — tracking-widest, gold-400]    │  "AKAD NIKAH"
└─────────────────────────────────────────┘
```

### Next.js Font Loading

```typescript
// app/layout.tsx
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
  preload: true,
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
  display: 'swap',
  preload: true,
});

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="font-body bg-cream-100">{children}</body>
    </html>
  );
}
```

```typescript
// tailwind.config.ts
fontFamily: {
  display: ['var(--font-display)', 'Georgia', 'serif'],
  body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
}
```

---

## 4. Spacing & Layout System

```typescript
// tailwind.config.ts — Custom spacing
spacing: {
  '4.5': '1.125rem',  // 18px
  '18':  '4.5rem',    // 72px
  '22':  '5.5rem',    // 88px
  '26':  '6.5rem',    // 104px
}
```

### Container Strategy

```tsx
// All content is constrained to max-w-md (448px) on mobile
// This creates a "smartphone" view that centers on desktop screens

<div className="max-w-md mx-auto px-4 sm:px-6">
  {/* Content */}
</div>
```

### Section Spacing Rhythm

| Section | Top Padding | Bottom Padding |
|---|---|---|
| Hero | `pt-16` (64px) | `pb-12` (48px) |
| Event Details | `py-12` (48px) | `py-12` |
| RSVP Form | `pt-12` (48px) | `pb-16` (64px) |
| Guestbook Feed | `py-12` (48px) | `pb-24` (96px) |

---

## 5. Glassmorphism Implementation

### The Core CSS Recipe

```css
/* The canonical Glassmorphism card class */
.glass-card {
  background: rgba(255, 255, 255, 0.60);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%); /* Safari */
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 1rem; /* 16px */
  box-shadow: 0 8px 32px rgba(44, 62, 80, 0.08);
}
```

### Tailwind Implementation

```tsx
// Exact Tailwind classes for the Glassmorphism card
const glassCard = `
  bg-white/60
  backdrop-blur-lg
  saturate-150
  border border-white/25
  shadow-[0_8px_32px_rgba(44,62,80,0.08)]
  rounded-2xl
`;
```

### Glass Card Variants

```tsx
// Variant 1: Standard card (most used)
"bg-white/60 backdrop-blur-lg border border-white/25 rounded-2xl shadow-card"

// Variant 2: Elevated card (Maps tile, special emphasis)
"bg-white/70 backdrop-blur-xl border border-gold-400/20 rounded-2xl shadow-card-hover"

// Variant 3: Cream tinted (Resepsi tile)
"bg-cream-200/80 backdrop-blur-md border border-white/30 rounded-2xl shadow-card"

// Variant 4: Gold accent card (RSVP submit success state)
"bg-gold-400/10 backdrop-blur-sm border border-gold-400/30 rounded-2xl"
```

### Background Texture for Glass Effect

The glassmorphism effect only looks good when the background has visual complexity. Since we have no photos, we use a subtle CSS texture on the `<body>`:

```css
/* globals.css */
body {
  background-color: #FAF9F6;
  background-image:
    radial-gradient(ellipse at 20% 10%, rgba(212, 175, 55, 0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 90%, rgba(212, 175, 55, 0.06) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(212, 175, 55, 0.04) 0%, transparent 70%);
  background-attachment: fixed; /* Parallax-like effect on scroll */
}
```

---

## 6. Bento Grid Layout Specification

### Grid Container

```tsx
// components/details/EventDetails.tsx
<section className="max-w-md mx-auto px-4 py-12">
  <h2 className="font-display text-display-lg italic text-slate-700 text-center mb-8">
    Detail Acara
  </h2>
  
  <div className="grid grid-cols-3 gap-3 auto-rows-[minmax(120px,auto)]">
    
    {/* Tile 1: Akad Nikah — LARGE (spans 2 columns, 1 row) */}
    <div className="col-span-2 row-span-1 [glass-card-classes]">
      <AkadTile />
    </div>

    {/* Tile 2: Maps — SMALL (1 column, 1 row) */}
    <div className="col-span-1 row-span-1 [glass-card-classes-elevated]">
      <MapsTile />
    </div>

    {/* Tile 3: Dress Code — MEDIUM (1 column, 1 row) */}
    <div className="col-span-1 row-span-1 [glass-card-classes]">
      <DressCodeTile />
    </div>

    {/* Tile 4: Resepsi — LARGE (2 columns, 1 row) */}
    <div className="col-span-2 row-span-1 bg-cream-200/80 backdrop-blur-md border border-white/30 rounded-2xl">
      <ResepsiTile />
    </div>

  </div>
</section>
```

### Visual Grid Map

```
┌─────────────────────┬──────────┐
│                     │          │
│   AKAD NIKAH        │  MAPS 📍 │
│   Sun, 12 Jul 2026  │          │
│   09:00 WIB         │  [icon]  │
│   Masjid Al-Barkah  │  Buka    │
│                     │  Maps    │
├──────────┬──────────┴──────────┤
│          │                     │
│  DRESS   │   RESEPSI           │
│  CODE    │   11:00 – 13:00 WIB │
│  Batik / │                     │
│  Formal  │                     │
│          │                     │
└──────────┴─────────────────────┘
   col-1       col-2     col-3
```

### Tile Content Specifications

**AkadTile:**
```tsx
<div className="p-5 h-full flex flex-col justify-between">
  <span className="text-label text-gold-400 font-body font-500 tracking-widest uppercase">
    Akad Nikah
  </span>
  <div>
    <p className="font-body text-body-lg text-slate-700 font-medium mt-1">
      {eventDate} {/* "Minggu, 12 Juli 2026" */}
    </p>
    <p className="font-body text-body-sm text-slate-500 mt-1">{eventTime} WIB</p>
    <p className="font-body text-body-sm text-slate-500 leading-snug mt-2">{venue}</p>
  </div>
</div>
```

**MapsTile:**
```tsx
<a
  href={process.env.NEXT_PUBLIC_MAPS_URL}
  target="_blank"
  rel="noopener noreferrer"
  className="p-4 h-full flex flex-col items-center justify-center gap-2 group"
>
  <div className="w-10 h-10 rounded-full bg-gold-400/10 flex items-center justify-center
                  group-hover:bg-gold-400/20 transition-colors duration-200">
    <MapPin className="w-5 h-5 text-gold-400" />
  </div>
  <span className="text-body-sm text-slate-700 font-medium text-center">Buka Maps</span>
</a>
```

---

## 7. Component Behavior Specifications

### 7.1 CoverEnvelope

**Visual Design:**
- Full viewport overlay, `bg-cream-100`.
- Center: Ornamental divider (thin gold horizontal line with diamond shape `◆`).
- Guest salutation: `"Kepada Yth."` in body-md + guest name in display-lg italic.
- Bottom: Pulsing dot with text `"Ketuk untuk Membuka"`.
- Pulse animation: `animate-pulse` on the text label.

**Animation on Dismiss:**
```tsx
// Framer Motion exit variant
const coverVariants = {
  visible: { y: 0, opacity: 1 },
  exit: {
    y: '-100%',
    opacity: 0,
    transition: {
      duration: 0.9,
      ease: [0.76, 0, 0.24, 1], // Custom cubic-bezier for cinematic ease-in-out
    },
  },
};
```

### 7.2 RSVPForm

**Field Order:**
1. `<input>` — Nama (pre-filled, editable)
2. `<select>` — Kehadiran (Hadir / Tidak Hadir / Ragu-ragu) — no default selected
3. `<textarea>` — Ucapan & Doa (min-height: 120px, resize: none)
4. `<button>` — "Kirim Ucapan"

**Form Field Styling:**
```tsx
// Input base class
const inputBase = `
  w-full px-4 py-3
  bg-white/50 backdrop-blur-sm
  border border-white/40
  rounded-xl
  font-body text-body-md text-slate-700
  placeholder:text-slate-300
  focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400/60
  transition-all duration-200
`;

// Error state
const inputError = "border-red-300/60 focus:ring-red-300/50 focus:border-red-300";
```

**Submit Button States:**

| State | Classes | Content |
|---|---|---|
| Idle | `bg-gold-400 hover:bg-gold-300 text-white` | `"Kirim Ucapan"` |
| Loading | `bg-gold-400 opacity-70 cursor-not-allowed` | Spinner SVG |
| Success | `bg-green-500 text-white` | `"✓ Terkirim!"` |
| Error | `bg-red-400 text-white` | `"Gagal, Coba Lagi"` |

**Error Message Component:**
```tsx
{errors.name && (
  <motion.p
    initial={{ opacity: 0, y: -4 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-red-400 text-body-sm mt-1 pl-1"
    role="alert"
    aria-live="polite"
  >
    {errors.name}
  </motion.p>
)}
```

### 7.3 GuestbookCard

**Card Design:**
```tsx
<motion.div
  layout
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: isPending ? 0.6 : 1, y: 0 }}
  className={`
    p-4 rounded-2xl
    bg-white/60 backdrop-blur-lg
    border border-white/25
    shadow-[0_4px_16px_rgba(44,62,80,0.06)]
    ${isPending ? 'border-dashed border-gold-400/30' : ''}
  `}
>
  <div className="flex items-start justify-between gap-3">
    {/* Avatar: First letter of name in gold circle */}
    <div className="w-9 h-9 rounded-full bg-gold-400/15 flex items-center justify-center flex-shrink-0">
      <span className="font-display text-gold-600 font-600 text-lg italic">
        {entry.guest_name.charAt(0)}
      </span>
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2">
        <span className="font-body text-body-sm font-medium text-slate-700 truncate">
          {entry.guest_name}
        </span>
        <AttendanceBadge status={entry.attendance} />
      </div>
      <p className="font-body text-body-sm text-slate-500 mt-1 leading-relaxed">
        {entry.message}
      </p>
      <time className="text-label text-slate-300 mt-2 block">
        {formatRelativeTime(entry.created_at)}
      </time>
    </div>
  </div>
</motion.div>
```

**Attendance Badge:**
```tsx
const badgeConfig = {
  'Hadir':        { bg: 'bg-green-50',  text: 'text-green-600',  label: 'Hadir' },
  'Tidak Hadir':  { bg: 'bg-red-50',    text: 'text-red-400',    label: 'Berhalangan' },
  'Ragu':         { bg: 'bg-amber-50',  text: 'text-amber-500',  label: 'Ragu-ragu' },
};

<span className={`text-label px-2 py-0.5 rounded-full ${config.bg} ${config.text} tracking-wide`}>
  {config.label}
</span>
```

---

## 8. Framer Motion Animation Specifications

### 8.1 Page Section Reveal (Staggered)

Used for each major section as it enters the viewport:

```tsx
// hooks/useScrollReveal.ts — utility for section animations
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuart
    },
  },
};

// Usage in any section component:
const ref = useRef(null);
const isInView = useInView(ref, { once: true, margin: '-10%' });

<motion.section
  ref={ref}
  variants={sectionVariants}
  initial="hidden"
  animate={isInView ? 'visible' : 'hidden'}
>
```

### 8.2 Bento Grid Card Stagger

```tsx
const bentoContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,  // 80ms between each card
      delayChildren: 0.2,
    },
  },
};

const bentoItemVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1], // Spring-like ease (slight overshoot)
    },
  },
};
```

### 8.3 Guestbook Feed — New Card Entry

```tsx
// When a new card enters the feed (optimistic or realtime)
const cardEntryVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    marginBottom: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    height: 'auto',
    marginBottom: '0.75rem', // gap-3
    scale: 1,
    transition: {
      height:       { duration: 0.3, ease: 'easeOut' },
      opacity:      { duration: 0.3, delay: 0.1 },
      scale:        { duration: 0.3, delay: 0.1 },
      marginBottom: { duration: 0.3, ease: 'easeOut' },
    },
  },
};
```

### 8.4 Cover Envelope Dismiss

```tsx
// The cinematic cover-exit animation
const coverExitVariants = {
  initial: { y: 0, opacity: 1 },
  animate: { y: 0, opacity: 1 },
  exit: {
    y: '-100vh',
    opacity: 0,
    transition: {
      duration: 1.0,
      ease: [0.76, 0, 0.24, 1], // Custom cubic-bezier
    },
  },
};

// Usage with AnimatePresence
<AnimatePresence mode="wait">
  {!isOpened && (
    <motion.div
      key="cover"
      variants={coverExitVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 z-50 ..."
    />
  )}
</AnimatePresence>
```

### 8.5 Button Micro-Interaction (Submit)

```tsx
<motion.button
  whileTap={{ scale: 0.97 }}
  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
>
  {/* Button content */}
</motion.button>
```

### 8.6 WhatsApp "Salin" Button Feedback

```tsx
<motion.button
  onClick={handleCopy}
  animate={copied ? { backgroundColor: '#22c55e' } : { backgroundColor: '#D4AF37' }}
  transition={{ duration: 0.3 }}
>
  {copied ? '✓ Tersalin!' : 'Salin Link WhatsApp'}
</motion.button>
```

---

## 9. Tailwind Configuration

### Complete `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['3.5rem',   { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'display-lg': ['2.75rem',  { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-md': ['2rem',     { lineHeight: '1.2',  letterSpacing: '0em' }],
        'body-lg':    ['1.125rem', { lineHeight: '1.7',  letterSpacing: '0.01em' }],
        'body-md':    ['1rem',     { lineHeight: '1.65', letterSpacing: '0.01em' }],
        'body-sm':    ['0.875rem', { lineHeight: '1.6',  letterSpacing: '0.02em' }],
        'label':      ['0.75rem',  { lineHeight: '1',    letterSpacing: '0.08em' }],
      },
      colors: {
        cream: {
          50:  '#FDFCF8',
          100: '#FAF9F6',
          200: '#F5F0E8',
        },
        gold: {
          300: '#E8CA6A',
          400: '#D4AF37',
          500: '#B8941F',
          600: '#9A7A0A',
        },
        slate: {
          300: '#AEB6BF',
          500: '#5D6D7E',
          700: '#2C3E50',
        },
      },
      spacing: {
        '4.5': '1.125rem',
        '18':  '4.5rem',
        '22':  '5.5rem',
        '26':  '6.5rem',
      },
      backdropBlur: {
        xs: '4px',
      },
      boxShadow: {
        'card':       '0 8px 32px rgba(44, 62, 80, 0.08)',
        'card-hover': '0 16px 48px rgba(44, 62, 80, 0.14)',
        'card-sm':    '0 4px 16px rgba(44, 62, 80, 0.06)',
        'gold':       '0 4px 24px rgba(212, 175, 55, 0.25)',
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'shimmer': 'shimmer 1.5s infinite linear',
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## 10. Mobile Performance Guidelines for Animations

### Non-Negotiable Rules

1. **Only animate GPU-compositable properties:** `transform` (translate, scale, rotate) and `opacity`. Never animate `width`, `height`, `top`, `left`, `margin`, `padding`, or `border-radius` directly.

2. **Use `will-change` sparingly:**
   ```css
   /* Only on the cover overlay — removed after animation completes */
   .cover-overlay { will-change: transform, opacity; }
   ```

3. **Framer Motion `layout` prop:**
   - Use `layout` on the guestbook feed container to smoothly animate card insertions.
   - Do NOT use `layout` on every card — this causes mass recalculation.

4. **Reduce animation complexity on low-end devices:**
   ```tsx
   // Detect reduced-motion preference
   const prefersReducedMotion = window.matchMedia(
     '(prefers-reduced-motion: reduce)'
   ).matches;

   const animationProps = prefersReducedMotion
     ? {} // No animations
     : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };
   ```

5. **Cover animation duration caps:**
   - Mobile: Max 1200ms for cover dismiss.
   - Feed card entry: Max 400ms.
   - Micro-interactions (button tap): Max 200ms.

6. **Backdrop-blur performance note:**
   - `backdrop-blur-lg` (16px blur) is GPU-accelerated on iOS Safari 9+ and Chrome Android 76+.
   - If targeting devices older than 2019, provide a fallback: `@supports not (backdrop-filter: blur(1px)) { background: rgba(255,255,255,0.90); }`.

7. **Stagger animation limit:**
   - Maximum 6 staggered children at once. The Bento grid has 4 tiles — this is safe.
   - For the guestbook feed, animate each card individually on entry, not as a bulk stagger.
