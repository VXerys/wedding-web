---
name: wedding-deployment
description: "Deployment, metadata, and env configuration. Use for Next.js config, OG metadata, or .env templates."
---
# Wedding Deployment Skill

## When to Use
- Adjusting next.config.ts, metadata, or open graph settings.
- Managing .env.example or deployment readiness checks.

## Procedure
1. Follow docs/1_PRD_Digital_Invitation.md for SEO and social tags.
2. Keep security headers minimal and consistent.
3. Ensure metadataBase uses NEXT_PUBLIC_SITE_URL with a safe fallback.

## Output
- Updates to next.config.ts, app/layout.tsx, and env templates.
