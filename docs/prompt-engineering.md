
raw
---
name: prompt-engineer
description: >
  Translates bug reports, feature requests, or technical problems into precise, 
  production-ready prompts for AI coding assistants (GitHub Copilot, Cursor, 
  Windsurf, etc.) inside VSCode. Use this skill whenever the user wants to:
  convert a problem description into a copilot prompt, generate a prompt to fix 
  a bug, create an AI prompt for a new feature, prepare instructions for their 
  AI IDE assistant, or asks "buatin prompt untuk copilot", "generate prompt 
  for cursor", "turn this into a copilot prompt". Also trigger this skill when 
  the user pastes multiple issues/bugs and wants actionable copilot prompts for 
  each one, especially in Next.js/React/TypeScript or web app contexts.
---
 
# Prompt Engineer Skill
 
Converts raw problem descriptions into precise, well-scoped prompts for AI coding 
assistants (GitHub Copilot Chat, Cursor, Windsurf, etc.) — optimized for Next.js 
App Router development with TypeScript + Tailwind + Supabase.
 
---
 
## Core Philosophy
 
A great copilot prompt has **four layers**:
 
1. **Context** — What is this codebase? What pattern does it follow?
2. **Problem** — What is broken or missing? Be specific and observable.
3. **Constraints** — What must NOT be touched? What architecture rules apply?
4. **Expected Output** — What files should be created/modified? What should the result look like?
The AI assistant can't read minds. Every vague prompt produces generic code.  
Every precise prompt produces working code on the first try.
 
---
 
## Reading the User's Input
 
Before generating prompts, extract:
 
- **Stack/Framework** from the conversation (Flutter? React? Node?)
- **Architecture pattern** (App Router? Server/Client Components? MVC?)
- **State management** (React hooks? Zustand? Redux?)
- **Backend** (Supabase? Firebase? REST?)
- **Scope** — Is this a bug fix, new feature, refactor, or migration?
- **Urgency** — Is there a priority order?
If the user has shared a codebase context document (like CODEBASE_CONTEXT.md or 
AGENT_RULES.md), **read it first** and bake those constraints into every prompt.
 
---
 
## Prompt Templates by Type
 
### 🐛 Bug Fix Prompt
 
```
## Context
[App name] is a Next.js App Router app using TypeScript + Tailwind.
Data flow: Server Components (static shell) → Client Components (interactivity) → Hooks/Lib.
Supabase is only accessed via lib/supabase client in client-side hooks/components.
 
## Problem
[Describe the bug with observable behavior: what happens vs. what should happen.
Include: which screen, what user action triggers it, what the actual error or 
wrong behavior is.]
 
## Affected Files (suspected)
- src/app/[route]/page.tsx
- src/components/[feature]/[Component].tsx
- src/hooks/[useFeature].ts
 
## Constraints
- Do NOT modify any frozen features: [list frozen features]
- Do NOT call Supabase from Server Components
- Do NOT add new packages/dependencies
- Preserve server/client boundaries and Suspense rules for useSearchParams
- Use existing design tokens from tailwind.config.ts and globals.css
 
## Task
Fix the bug. Show only the changed files and the minimal diff needed.
Explain why the bug occurred in 1–2 sentences before showing the fix.
```
 
---
 
### ✨ New Feature Prompt
 
```
## Context
[App name] — Next.js App Router, TypeScript, Tailwind, Supabase backend.
[Brief description of the feature area this new feature belongs to.]
 
## Feature Request
[What the user wants to be able to do. Write it as a user story:
"As a [user], I want to [action], so that [outcome]."]
 
## Files to Create
Follow the project folder structure:
src/app/[route]/page.tsx
src/components/[feature]/[Component].tsx
src/hooks/[useFeature].ts
src/lib/[feature].ts
src/types/[feature].ts
 
## Constraints
- Keep Server Components static; use Client Components only when needed
- No direct Supabase access in Server Components
- No hardcoded colors, spacing, or fonts (use Tailwind tokens)
- No new dependencies unless explicitly requested
 
## Task
Implement the feature end-to-end. Show all new files with complete content.
```
 
---
 
### 🔄 Refactor / Migration Prompt
 
```
## Context
[App name] — Next.js App Router, TypeScript, Tailwind.
Current implementation: [describe current approach and why it's problematic]
 
## Goal
Migrate [X] to [Y] with no change in observable behavior.
 
## Scope
Files to change:
- [file 1]
- [file 2]
 
Files to NOT touch:
- [frozen file or feature]
 
## Constraints
- Behavior must be identical before and after
- Do not change public API of affected modules
- Preserve route structure and server/client boundaries
- Do not introduce new packages
 
## Task
Show the before/after for each changed file. Add a short migration note 
explaining what changed and why.
```
 
---
 
### ⚡ Performance Fix Prompt
 
```
## Context
[App name] — Next.js app. The [ScreenName] view has a performance issue.
 
## Problem
[Describe: what is slow? How is it rendered currently? What user interaction 
triggers the lag? Any measurements or observations (frame drops, jank, etc.)]
 
## Current Implementation (paste relevant component code here)
[Paste the problematic component tree or render logic]
 
## Constraints
- Do not introduce new packages
- Keep data fetching logic unchanged — UI fix only
- Avoid pushing more components to the client bundle unnecessarily
 
## Task
Rewrite the widget to fix the performance issue.
Explain the root cause and the fix in 2–3 sentences.
Show only the changed widget file.
```
 
---
 
## Output Format
 
When generating prompts for the user, always:
 
1. **Label each prompt** with the issue number and type (e.g., `# Issue 1 — Bug Fix: Recommendation Performance`)
2. **Use the correct template** based on issue type
3. **Fill in all placeholders** — never leave `[X]` blank if the info is available
4. **Add a "Files to Edit" hint** at the top of each prompt when you can infer it from the codebase context
5. **Separate prompts with a clear divider** (`---`) so the user can copy each one independently
---
 
## Quality Checklist (run before outputting)
 
For each generated prompt, verify:
- [ ] Architecture constraints are explicit (no Supabase in Server Components)
- [ ] Frozen features are listed as DO NOT TOUCH (if applicable)
- [ ] Expected output format is clear (diff? full file? explanation?)
- [ ] Scope is narrow enough (does the prompt ask for ONE thing?)
- [ ] No vague verbs like "improve", "fix", "make it better" — use observable behavior
---
 
## Wedding-Web Defaults

When working on the **wedding-web** project, automatically include these defaults 
in every generated prompt unless overridden:

**Architecture:**
```
Next.js App Router + TypeScript + Tailwind
Data flow: Server Components (static shell) → Client Components → Hooks/Lib
Backend: Supabase via @supabase/ssr client (client-side only)
SSR/CSR boundary: useSearchParams must be wrapped in Suspense
```

**Active features (can modify):** Cover, Hero, Event Details, RSVP, Guestbook, Admin

**Out-of-scope (DO NOT TOUCH):** QR check-in, payment/gifts, guest replies, multi-event

**Design tokens (always use, never hardcode):**
Tailwind tokens in tailwind.config.ts and CSS variables in globals.css

**Routing note:** /admin is client-only with NEXT_PUBLIC_ADMIN_PASSWORD gate.
 
---
 
## Tips for the User
 
After generating prompts, remind the user:
 
> 💡 **Copilot usage tip**: Open the relevant file in VSCode first, then paste 
> the prompt in Copilot Chat with `@workspace` prefix for best results. 
> For file-specific fixes, use `#file:path/to/file.tsx` inline in the prompt.