---
description: "Use when implementing wedding invitation features, UI, Supabase integration, or admin tooling. Enforces project docs and acceptance criteria."
applyTo: "src/**/*.{ts,tsx,css}"
---
# Wedding Invitation Implementation Rules

- Follow the requirements in docs/1_PRD_Digital_Invitation.md for behavior and edge cases.
- Align architecture with docs/2_System_Design_and_Database.md (SSR/CSR boundaries, folder structure).
- Apply the design system from docs/3_UI_UX_Guidelines.md (typography, glassmorphism, bento grid).
- Use dependencies listed in docs/4_Development_Roadmap.md only; avoid excluded packages.
- Keep GPU-friendly animation (transform/opacity only) and wrap useSearchParams in Suspense.
