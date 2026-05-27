# 1_PRD_Digital_Invitation.md
# Product Requirements Document: Digital Wedding Invitation Platform

**Version:** 1.0.0
**Status:** Final — Ready for Development
**Author:** Product & Engineering Team
**Last Updated:** 2026

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Goals & Success Metrics](#2-goals--success-metrics)
3. [Target Audience & Personas](#3-target-audience--personas)
4. [MVP Scope & Feature Matrix](#4-mvp-scope--feature-matrix)
5. [Detailed User Stories & Acceptance Criteria](#5-detailed-user-stories--acceptance-criteria)
6. [Edge Cases & Error Handling Specification](#6-edge-cases--error-handling-specification)
7. [Non-Functional Requirements](#7-non-functional-requirements)
8. [Out-of-Scope (v1.0)](#8-out-of-scope-v10)

---

## 1. Executive Summary

A **mobile-first, photo-free digital wedding invitation** web application. The platform relies entirely on premium UI/UX techniques — Glassmorphism cards, Bento Grid layouts, decorative typography, and fluid Framer Motion animations — to deliver an emotionally resonant and elegant experience without any pre-wedding photography assets.

The system delivers personalized invitations via WhatsApp links, captures RSVP confirmations and guest wishes in real-time via Supabase, and provides the event organizer with a simple password-protected admin dashboard to manage guest link generation.

---

## 2. Goals & Success Metrics

### Primary Goals
- Guest opens their invitation and immediately sees their own name personalized in the hero.
- Guest can confirm attendance and write a wish in under 60 seconds.
- Admin can generate and copy a WhatsApp invitation link for any guest in under 10 seconds.

### Key Performance Indicators (KPIs)
| Metric | Target |
|---|---|
| Time-to-Interactive (Mobile, 4G) | < 3 seconds |
| Largest Contentful Paint (LCP) | < 2.5 seconds |
| Cumulative Layout Shift (CLS) | < 0.1 |
| RSVP Form Submission Success Rate | > 98% |
| Cross-browser Compatibility | Safari iOS 15+, Chrome Android 90+ |
| Admin Link Generation Time | < 5 seconds from input to clipboard copy |

---

## 3. Target Audience & Personas

### Persona A: The Wedding Guest (Budi)
- **Device:** Smartphone (80% iOS Safari, 20% Android Chrome)
- **Context:** Received a WhatsApp message with a link during daily commute.
- **Goal:** Check event details, confirm attendance, and leave a heartfelt wish.
- **Frustration:** Slow-loading pages, confusing forms, repeated data entry.

### Persona B: The Event Organizer (Admin)
- **Device:** Any (Desktop preferred for admin dashboard).
- **Context:** Has a list of 50–300 guest names to send individualized invitations.
- **Goal:** Generate unique WhatsApp links for each guest as fast as possible.
- **Frustration:** Manually editing URLs, copy-paste errors, no centralized tool.

---

## 4. MVP Scope & Feature Matrix

### In-Scope (MVP v1.0)

| Feature | Priority | Description |
|---|---|---|
| Dynamic URL Personalization | P0 — Critical | Guest name injected from `?to=` URL param |
| Interactive Cover (Tap-to-Open) | P0 — Critical | Animated envelope/ribbon reveal on first tap |
| Hero Section | P0 — Critical | Decorative greeting with personalized name |
| Event Details (Bento Grid) | P0 — Critical | Akad, Resepsi, Dress Code, Maps button |
| RSVP & Guestbook Form | P0 — Critical | Supabase-connected form with attendance + message |
| Optimistic UI for Guestbook Feed | P1 — High | Instant local display before DB confirmation |
| Paginated Guestbook Feed | P1 — High | 8 items/page with "Load More" button |
| Admin Dashboard (`/admin`) | P1 — High | Password-protected link generator |
| WhatsApp Link Auto-Generator | P1 — High | Generate `wa.me` link with URL-encoded message |
| Vercel Deployment + CI/CD | P0 — Critical | Auto-deploy from `main` branch |
| Countdown Timer (Save The Date) | P1 — High | Real-time countdown to akad ceremony datetime |

### Out-of-Scope (v1.0)
- QR code generation and scanning at the physical venue.
- Digital amplop/gift registry or payment gateway integration.
- Guest-to-guest comment replies within the guestbook.
- Multi-event support (this build is for a single event).
- Email notification system for new RSVP submissions.
- Push notifications.

---

## 5. Detailed User Stories & Acceptance Criteria

---

### US-001: Dynamic URL Personalization

**As a** wedding guest,
**I want** to see my name already filled in on the invitation when I open the link,
**so that** I feel the invitation was personally prepared for me.

#### Acceptance Criteria

**AC-001-1 (Happy Path):**
- GIVEN the guest opens URL `https://domain.com/?to=Budi+Santoso`
- WHEN the page fully loads
- THEN the Hero section displays `"Kepada Yth. Budi Santoso"` or similar greeting with the decoded name.
- AND the RSVP form's "Nama" field is pre-populated with `"Budi Santoso"`.
- AND the decoded name replaces `+` signs with spaces.

**AC-001-2 (Encoded Characters):**
- GIVEN a URL parameter `?to=Siti+Nurbaya+Binti+Rahmat`
- WHEN rendered
- THEN the displayed name is `"Siti Nurbaya Binti Rahmat"` (all `+` decoded to spaces).

**AC-001-3 (URL Encoding):**
- GIVEN a URL parameter `?to=Budi%20Santoso` (standard `%20` encoding)
- WHEN rendered
- THEN displays correctly as `"Budi Santoso"`.

---

### US-002: Interactive Cover (Tap-to-Open)

**As a** wedding guest,
**I want** to tap a digital envelope/ribbon to "open" the invitation,
**so that** I experience a sense of ceremony and anticipation.

#### Acceptance Criteria

**AC-002-1 (Initial State):**
- GIVEN the page loads for the first time
- WHEN the DOM is ready
- THEN the cover overlay is visible and occupies 100% of the viewport.
- AND `document.body.style.overflow = 'hidden'` (scroll is locked).
- AND a visual affordance (e.g., animated pulse, text "Ketuk untuk Membuka") prompts the user to tap.

**AC-002-2 (Opening Animation):**
- GIVEN the cover is displayed
- WHEN the user taps/clicks anywhere on the cover
- THEN Framer Motion triggers the cover-exit animation (slide-up, fade-out, or unfold — per design spec).
- AND `overflow` is unlocked on the `body` element.
- AND the main invitation content beneath scrolls into view.
- AND the animation duration is ≤ 1200ms.

**AC-002-3 (No Re-Trigger):**
- GIVEN the cover has been dismissed
- WHEN the user scrolls back to the top
- THEN the cover does NOT reappear for the remainder of the session.
- IMPLEMENTATION NOTE: Use a React `useState` boolean (`isOpened`) to control visibility. Do NOT use `sessionStorage` for this unless required for page refresh persistence.

**AC-002-4 (Animation Performance):**
- GIVEN the animation is running
- THEN it uses only CSS `transform` and `opacity` properties (no layout-triggering properties like `height`, `width`, `top` that cause repaints).

---

### US-003: Event Details — Bento Grid

**As a** wedding guest,
**I want** to see the event details (time, venue, dress code) in a clear and structured layout,
**so that** I can quickly absorb the critical information I need to attend.

#### Acceptance Criteria

**AC-003-1 (Data Display):**
- THEN all of the following are displayed:
  - Akad Nikah: Day, Date, Time (WIB), and Venue name + full address.
  - Resepsi: Time range.
  - Dress Code.
  - A button/tile linking to Google Maps.

**AC-003-2 (Google Maps Integration):**
- GIVEN the Maps tile is visible
- WHEN tapped
- THEN opens `https://maps.google.com/?q=<venue_lat>,<venue_lng>` or a direct Google Maps short URL in a new tab (`target="_blank"`).
- AND the link includes `rel="noopener noreferrer"` for security.

**AC-003-3 (Bento Layout Responsiveness):**
- GIVEN viewport width < 480px (mobile)
- THEN Akad tile spans full width; Maps tile stacks below.
- GIVEN viewport width ≥ 768px (tablet/desktop container)
- THEN Akad tile is larger (col-span-2) and Maps is col-span-1.

---

### US-004: RSVP & Guestbook Submission

**As a** wedding guest,
**I want** to confirm my attendance and leave a personal wish in one form,
**so that** the organizer knows I'm coming and feels the love.

#### Acceptance Criteria

**AC-004-1 (Form Fields — Pre-fill):**
- GIVEN `?to=Budi` is in the URL
- WHEN the RSVP form section is scrolled to
- THEN the Name field contains `"Budi"` (editable, not read-only).

**AC-004-2 (Form Validation — Client Side):**
- GIVEN the user clicks Submit
- IF the Name field is empty
- THEN display inline validation error: `"Nama tidak boleh kosong."`.
- IF the Attendance dropdown is not selected (no default)
- THEN display: `"Pilih status kehadiran Anda."`.
- IF the Message textarea is empty
- THEN display: `"Tulis ucapan atau doa singkat."`.
- THEN form does NOT submit to Supabase.

**AC-004-3 (Submit — Loading State):**
- GIVEN all fields are valid and the user clicks Submit
- THEN the submit button shows a spinner and is `disabled`.
- THEN the Supabase `insert` call is made.

**AC-004-4 (Submit — Optimistic UI):**
- GIVEN the Supabase insert call is in-flight
- THEN the new guestbook entry is immediately prepended to the feed with an `isPending: true` visual state (e.g., slightly muted opacity).
- AND the form fields are cleared.

**AC-004-5 (Submit — Success State):**
- GIVEN the Supabase insert resolves successfully
- THEN the pending card transitions to a confirmed state (full opacity).
- AND a brief success animation is displayed (e.g., checkmark icon appears for 2 seconds).

**AC-004-6 (Submit — Error State):**
- GIVEN the Supabase insert rejects with an error
- THEN the optimistic card is removed from the feed.
- THEN an error toast/banner is displayed: `"Gagal mengirim ucapan. Silakan coba lagi."`.
- THEN the form is re-enabled with the previously entered values restored.

---

### US-005: Real-Time Guestbook Feed

**As a** wedding guest,
**I want** to see wishes from other guests in a live feed,
**so that** I feel part of a collective celebration.

#### Acceptance Criteria

**AC-005-1 (Initial Load):**
- GIVEN the guestbook section loads
- THEN exactly 8 most recent entries are fetched from Supabase, ordered by `created_at DESC`.

**AC-005-2 (Load More Pagination):**
- GIVEN 8 or more entries exist in the DB
- WHEN the user taps "Muat Lebih Banyak"
- THEN the next 8 entries (offset 8) are fetched and appended below existing cards.
- AND the "Muat Lebih Banyak" button shows a loading spinner during the fetch.
- AND if no more entries exist, the button is hidden or replaced with `"Semua ucapan telah ditampilkan."`.

**AC-005-3 (Real-Time Subscription):**
- GIVEN the Supabase Realtime channel is subscribed on mount
- WHEN another guest submits a wish (from a different device/browser)
- THEN the new card is prepended to the top of the feed without a full page refresh.
- IMPLEMENTATION: Use `supabase.channel('guestbook').on('postgres_changes', ...)`.

**AC-005-4 (Empty State):**
- GIVEN zero entries exist in the DB
- THEN display an empty state message: `"Jadilah yang pertama memberikan ucapan! 🌸"`.

---

### US-006: Admin — Guest Link Generator

**As an** event organizer (admin),
**I want** to enter a guest's name and instantly generate a shareable WhatsApp link,
**so that** I can send personalized invitations at scale without manual URL editing.

#### Acceptance Criteria

**AC-006-1 (Authentication):**
- GIVEN I navigate to `/admin`
- THEN I am presented with a password input field (not a full login system).
- GIVEN I enter the correct password (stored in `.env` as `NEXT_PUBLIC_ADMIN_PASSWORD` — NOTE: see security caveat in Section 7)
- THEN I am granted access to the dashboard view.
- GIVEN I enter an incorrect password
- THEN an error `"Password salah."` is displayed.

**AC-006-2 (Link Generation):**
- GIVEN I am authenticated and I type `"Budi Santoso"` into the Name input and click "Generate"
- THEN the system generates:
  - **Invitation URL:** `https://<DOMAIN>/?to=Budi+Santoso` (spaces encoded as `+`).
  - **WhatsApp Message (URL-encoded):**
    `wa.me/628xxxxxxxxxx?text=Assalamualaikum+Budi+Santoso%2C+Kami+mengundang+Anda...+<encoded_invitation_url>`
- THEN both URLs are displayed in a read-only text area.

**AC-006-3 (Clipboard Copy):**
- GIVEN the link has been generated
- WHEN I click "Salin Link WhatsApp"
- THEN the full `wa.me` string is copied to the clipboard using `navigator.clipboard.writeText()`.
- AND the button text changes to `"✓ Tersalin!"` for 2 seconds, then resets.

**AC-006-4 (URL Encoding Logic):**
- GIVEN guest name is `"Budi Santoso"`
- THEN spaces MUST be encoded as `+` (not `%20`) in the `?to=` parameter for best WhatsApp compatibility.
- IMPLEMENTATION: `encodeURIComponent(name).replace(/%20/g, '+')`.

---

### US-007: Countdown Timer — Save The Date

**As a** wedding guest,
**I want** to see a live countdown to the wedding ceremony,
**so that** I feel the anticipation building and know exactly how much time is left.

#### Acceptance Criteria

**AC-007-1 (Live Countdown Display):**
- GIVEN the invitation page is loaded
- WHEN the countdown section is visible
- THEN four countdown boxes display the remaining: Hari (Days), Jam (Hours), Menit (Minutes), Detik (Seconds).
- AND the seconds value updates every 1 second in real-time.

**AC-007-2 (Heading & Styling):**
- THEN the section displays "Save" as an uppercase label and "The Date" in display font.
- AND an ornamental gold divider separates the heading from the countdown boxes.
- AND the countdown boxes use the glassmorphism elevated card style.

**AC-007-3 (Expired State):**
- GIVEN the event datetime has passed
- WHEN the page loads
- THEN instead of countdown boxes, display: "Terima kasih atas kehadirannya 💕".
- AND the countdown interval stops (no unnecessary setInterval running).

**AC-007-4 (Date Source):**
- GIVEN `NEXT_PUBLIC_EVENT_DATE` is set as ISO 8601 datetime (e.g., `2026-07-12T09:00:00+07:00`)
- THEN the countdown targets that exact datetime with timezone.
- GIVEN `NEXT_PUBLIC_EVENT_DATE` is date-only (e.g., `2026-07-12`)
- THEN the countdown targets midnight local time of that date.

---

## 6. Edge Cases & Error Handling Specification

### EC-001: Empty or Missing `?to=` Parameter
- **Scenario:** Guest opens `https://domain.com/` (no `?to=` param).
- **Expected Behavior:** Name defaults to `"Tamu Undangan"`.
- **Implementation:** `const guestName = searchParams.get('to') ?? 'Tamu Undangan';`

### EC-002: Extremely Long Guest Name
- **Scenario:** `?to=` contains a string > 80 characters.
- **Expected Behavior:** Hero section truncates with CSS `overflow: hidden; text-overflow: ellipsis; white-space: nowrap;` or wraps gracefully.
- **Max Recommended Length:** 60 characters for display.

### EC-003: Special Characters in Guest Name
- **Scenario:** Name contains characters like `/`, `<`, `>`, `"`, `'`.
- **Expected Behavior:** URL decode is handled by `useSearchParams()` automatically. React's JSX rendering escapes HTML entities. No XSS risk.
- **Explicitly Test:** `?to=<script>alert(1)</script>` — must render as plain text, not execute.

### EC-004: Supabase Connection Timeout / Network Error on Submit
- **Scenario:** Guest is on a slow or intermittent connection and the `insert` call hangs.
- **Expected Behavior:** A client-side timeout of 10 seconds is set. If exceeded, display error toast and re-enable form.
- **Implementation:**
  ```typescript
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Request timeout')), 10000)
  );
  await Promise.race([supabaseInsert, timeoutPromise]);
  ```

### EC-005: Admin Password Exposed on Client
- **Scenario:** `NEXT_PUBLIC_ADMIN_PASSWORD` is visible in browser source.
- **Risk:** Low for a personal wedding site. Medium if used commercially.
- **Mitigation for v1:** Accept this risk; document clearly. For v1.1, migrate to Next.js API Route that validates password server-side and sets an HttpOnly session cookie.

### EC-006: Multiple Rapid RSVP Submissions (Double-Submit)
- **Scenario:** User taps "Kirim" multiple times before the first response returns.
- **Expected Behavior:** Submit button is `disabled` immediately on first click, preventing duplicate DB rows.

### EC-007: Guestbook Feed with 0 Items on "Load More" Click
- **Scenario:** User clicks "Load More" but there are no more items in the DB (race condition).
- **Expected Behavior:** The button disappears and text reads: `"Semua ucapan sudah ditampilkan."`.
- **Detection:** If the returned array length is < 8, there are no more pages.

### EC-008: `useSearchParams()` Usage in Next.js App Router
- **Scenario:** `useSearchParams()` in App Router requires a `Suspense` boundary.
- **Expected Behavior:** Wrap the component that calls `useSearchParams()` in `<Suspense fallback={...}>` to prevent build errors and hydration issues.

---

## 7. Non-Functional Requirements

### Performance
- Use Next.js `<Image />` component if any images are added in future iterations (not applicable v1.0 — no photos).
- Google Fonts loaded via `next/font/google` for zero layout shift.
- Framer Motion animations must only animate `transform` and `opacity` (GPU-compositable properties). Never animate `height`, `width`, `top`, `left`.
- Tailwind CSS — purge unused classes in production build. Final CSS bundle target: < 30KB.

### Accessibility (a11y)
- All interactive elements (buttons, form fields) must have `aria-label` where text is not descriptive.
- Color contrast ratio must meet WCAG AA standard (4.5:1 for body text).
- Cover overlay must be dismissible via `Enter` key (keyboard accessibility).
- Form errors use `aria-describedby` to link error message to the input.

### Security
- Supabase Row Level Security (RLS) must be enabled on the `guestbook` table.
- RLS Policy: `INSERT` — allow for anonymous (unauthenticated) users.
- RLS Policy: `SELECT` — allow for anonymous users (public guestbook).
- RLS Policy: `DELETE` / `UPDATE` — allow only for authenticated (admin) role.
- All Supabase credentials (`SUPABASE_URL`, `SUPABASE_ANON_KEY`) are stored in `.env.local`. The `ANON_KEY` is designed to be public but RLS is the enforcement layer.

### SEO & Social Sharing
- `<head>` must include:
  - `<title>` — dynamic: `"Undangan Pernikahan [Groom] & [Bride]"`
  - `<meta name="description" content="..." />`
  - Open Graph tags: `og:title`, `og:description`, `og:image` (a static placeholder image), `og:url`
- Use Next.js Metadata API in `app/layout.tsx`.

---

## 8. Out-of-Scope (v1.0)

| Feature | Reason |
|---|---|
| QR Code venue check-in | Requires hardware integration at venue |
| Digital amplop / payment | Legal and trust complexity |
| Guest-to-guest comment replies | UX complexity; out of MVP scope |
| Multi-language (EN/ID toggle) | Single-language (Bahasa Indonesia) for v1 |
| Push notifications for new RSVPs | Requires service worker; adds dev time |
| Admin RSVP monitoring table | Can be done directly in Supabase dashboard for v1 |
| Email invitations | Out of scope; WhatsApp is the primary channel |
