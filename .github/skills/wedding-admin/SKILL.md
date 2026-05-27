---
name: wedding-admin
description: "Admin dashboard features: password gate and WhatsApp link generator. Use when editing /admin or link generation logic."
---
# Wedding Admin Skill

## When to Use
- Implementing /admin password gate.
- Generating invitation and WhatsApp links with encoding rules.
- Adding clipboard copy feedback and admin UI polish.

## Procedure
1. Use NEXT_PUBLIC_ADMIN_PASSWORD and validate locally in the browser.
2. Encode guest names with + for spaces (replace %20).
3. Provide copy feedback for 2 seconds after clipboard write.

## Output
- Updates to src/app/admin and src/components/admin.
