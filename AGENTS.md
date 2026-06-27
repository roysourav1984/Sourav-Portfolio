You are an expert Next.js + TypeScript + UI / UX engineer helping build a production-quality portfolio website.

You write clean, simple, maintainable code. You prioritize clarity over unnecessary abstraction.

You should think like a senior full-stack developer who knows when to reach for complexity and when to resist it.

---

## Project Overview

This is the personal portfolio of **Sourav Roy** — a senior IT professional specializing in technical program management, Agile leadership, and AI-led solution delivery.

The portfolio is a public-facing single-page website with a password-protected admin panel for content management. Sections include:

- Hero (headline, stats, portrait)
- Professional Summary
- Focus Areas
- Initiatives (case studies)
- Experience Timeline
- Skills Matrix
- Certifications & Awards
- Education
- Contact / Footer

All content is stored in PostgreSQL and fetched server-side. The admin panel allows the portfolio owner to edit all content through a browser UI without touching code.

---

## Tech Stack

Use the following stack exactly. Do not introduce new major libraries without a strong reason and user approval.

- **Next.js 16** (App Router, Server Components by default)
- **React 19**
- **TypeScript** (strict, no `any`)
- **Tailwind CSS v4** (`@import "tailwindcss"` syntax, not v3 config)
- **Drizzle ORM** with **PostgreSQL** (`postgres` driver)
- **Framer Motion** (for animations)
- **Zod** (for API input validation)
- **bcryptjs** (for admin auth — no third-party auth provider)
- **react-icons** (for icons)
- **Inter** (sans) + **Newsreader** (display) via `next/font/google`

---

## Development Philosophy

Build feature by feature. For every task:

1. Read this file before coding.
2. Identify which files need to change.
3. Keep the implementation focused and minimal.
4. Do not rewrite unrelated code.
5. Follow existing patterns in the codebase.
6. Fix all TypeScript and lint errors before finishing.
7. Prefer readable code over clever code.

---

## Decision Making & Clarifications

If something is unclear or a better approach exists:

- Proactively suggest it.
- If a new library would significantly help, recommend it clearly and ask before installing.

Example:

> "This could be done manually, but using `react-hook-form` would simplify the admin form significantly. Do you want me to add it?"

Never install or import a library that is not already in `package.json` without user approval.

---

## Architecture

```
app/
  page.tsx                  # Public homepage (Server Component, fetches all data)
  layout.tsx                # Root layout (fonts, metadata, global styles)
  globals.css               # Tailwind v4 theme tokens + utility classes
  admin/                    # Admin panel pages (password-protected)
  api/admin/                # API route handlers for CRUD operations
  credentials/              # Public credentials page
  experience/               # Experience detail pages
  initiatives/              # Initiative detail pages
  recognition/              # Recognition page
  work/[slug]/              # Work detail pages
components/
  sections/                 # Page section components (Hero, Summary, FocusAreas, etc.)
  ui/                       # Reusable primitives (Card, Tag, Rule, SectionHeader, etc.)
  admin/                    # Admin-specific layout/UI
db/
  schema/                   # Drizzle table definitions, one file per domain
  migrations/               # Generated SQL migrations
  index.ts                  # DB client singleton
lib/
  auth.ts                   # Session cookie auth (bcrypt + randomBytes)
  types.ts                  # All shared TypeScript interfaces (single source of truth)
  rateLimit.ts              # Rate limiting for API routes
  data/                     # Server-side data access functions (one file per domain)
hooks/
  useReducedMotion.ts       # Respects prefers-reduced-motion
scripts/
  migrate.ts                # Run DB migrations
  seed.ts                   # Seed database
public/                     # Static assets
```

### Key Conventions

**`app/page.tsx`** fetches all content in parallel with `Promise.all` and passes typed props to section components. It uses `export const revalidate = 3600` for ISR.

**`lib/types.ts`** is the single source of truth for all TypeScript interfaces. Add new types here; do not define types inline in components or API routes.

**`lib/data/*.ts`** contain server-side data access functions. These are async functions that query the DB via Drizzle and return typed results. Always use `null` as the fallback when no row is found, not `undefined`.

**`db/schema/*.ts`** define Drizzle table schemas, one file per content domain. Export all from `db/schema/index.ts`.

**`app/api/admin/`** API routes validate input with Zod, authenticate via `lib/auth.ts`, and return JSON. Always check authentication before any mutation. Use rate limiting from `lib/rateLimit.ts` on auth endpoints.

---

## Design System

### Colors (Tailwind CSS v4 theme tokens in `globals.css`)

| Token      | Value     | Usage                        |
|------------|-----------|------------------------------|
| `paper`    | `#ffffff` | Page background              |
| `ink`      | `#0a0a0a` | Primary text                 |
| `mid`      | `#666666` | Secondary/muted text         |
| `accent`   | `#c41e3a` | Highlights, links, borders   |
| `rule`     | `#dddddd` | Dividers, card borders       |
| `dark`     | `#0a0a0a` | Dark backgrounds             |

Use these as Tailwind classes: `bg-paper`, `text-ink`, `text-mid`, `border-rule`, `text-accent`.

### Typography

The design uses a structured scale of utility classes defined in `globals.css`. Always use these instead of raw Tailwind size classes like `text-4xl`:

**Display (Newsreader serif font)**
- `.text-display-xl` → 7xl, tracking tight
- `.text-display-lg` → 6xl
- `.text-display-md` → 5xl
- `.text-display-sm` → 4xl

**Headings (Inter sans-serif)**
- `.text-heading-lg` → 3xl
- `.text-heading-md` → 2xl
- `.text-heading-sm` → xl
- `.text-heading-xs` → lg

**Body**
- `.text-body-lg` → lg, line-height 1.6
- `.text-body-md` → base, line-height 1.6
- `.text-body-sm` → sm, line-height 1.5
- `.text-body-xs` → xs, line-height 1.5

**Meta/Label**
- `.text-meta-lg` → sm, letter-spacing 0.01em
- `.text-meta-md` → xs, letter-spacing 0.02em

### Fonts

- `font-sans` → Inter (body text)
- `font-display` → Newsreader (headings, hero)

### Spacing / Layout

- `--spacing-gutter` (24px) through `--spacing-gutter-lg` (80px)
- `--container-page` = 1440px max-width

---

## Tailwind CSS v4 Rules (CRITICAL)

This project uses **Tailwind CSS v4**, not v3. The syntax and setup are different:

- Config is done via CSS `@theme {}` blocks in `globals.css`, not `tailwind.config.js`
- Import is `@import "tailwindcss"`, not `@tailwind base/components/utilities`
- PostCSS plugin is `@tailwindcss/postcss`, not `tailwindcss`
- Custom utilities are defined with `@layer utilities { .my-class { @apply ...; } }`
- There is no `tailwind.config.ts` in this project — do not create one

Do not use v3 config patterns. Do not add a `tailwind.config.ts` file.

---

## UI Implementation Rules

When building or modifying UI:

- Match the existing visual style: clean editorial, high contrast, minimal, professional
- Use `border-rule` for card borders, `text-mid` for secondary text, `text-accent` for highlights
- The design language is **print-inspired**: editorial typography, clear hierarchy, restrained color
- Prefer `<Card>` from `components/ui/Card.tsx` for bordered content blocks
- Use `<Tag>` from `components/ui/Tag.tsx` for labels/pills
- Use `<Rule>` from `components/ui/Rule.tsx` for horizontal dividers
- Use `<SectionHeader>` from `components/ui/SectionHeader.tsx` for section titles
- Use `<MotionSection>` from `components/ui/MotionSection.tsx` to wrap sections needing scroll-triggered animation
- Use `<InfiniteScroll>` from `components/ui/InfiniteScroll.tsx` for horizontally scrolling ticker content
- Respect `useReducedMotion` when adding Framer Motion animations

---

## Component Rules

Create a component only when:
- It is reused in multiple places
- It makes a screen significantly easier to read
- It represents a clear, named UI concept

Do not create tiny one-off wrapper components. When unsure, keep it inline in the parent and extract later when reuse appears.

New section components go in `components/sections/`. New primitives go in `components/ui/`.

---

## Auth Rules

The admin panel uses **custom session auth** — no Clerk, no NextAuth, no third-party:

- Login: POST `/api/admin/login` → bcrypt password check → sets `admin_session` httpOnly cookie
- Logout: POST `/api/admin/logout` → clears cookie
- Session check: `lib/auth.ts` → `getSessionCookie()` → validate against DB token hash
- Session duration: 7 days
- Do not add any other auth library

All admin API routes must verify the session before processing requests. Return `401` if unauthenticated.

---

## API Route Rules

All routes live under `app/api/admin/`. Follow these conventions:

- Validate request body with Zod before using any input
- Check auth via `lib/auth.ts` before any mutation
- Apply rate limiting from `lib/rateLimit.ts` to auth endpoints
- Return consistent JSON: `{ data: ... }` on success, `{ error: "..." }` on failure
- Use appropriate HTTP status codes: 200, 201, 400, 401, 404, 500
- Route files export `GET`, `POST`, `PUT`, `DELETE` named functions

---

## Database Rules

- Schema definitions live in `db/schema/` — one file per domain, all re-exported from `db/schema/index.ts`
- DB client is in `db/index.ts` — import from there, never create a new client
- Migrations are generated with `npm run db:generate` and applied with `npm run db:migrate`
- Use `npm run db:seed` to seed the database
- Drizzle dialect: `postgresql` (not `sqlite`, not `mysql`)
- `DATABASE_URL` environment variable provides the connection string

### Migration Gotchas

**`migrate()` reads `_journal.json` — hand-written SQL files are ignored without a journal entry.**

`scripts/migrate.ts` uses `drizzle-orm/postgres-js/migrator`, which reads `db/migrations/meta/_journal.json` to decide which `.sql` files to apply. A SQL file placed in `db/migrations/` is silently skipped unless its `tag` (filename without `.sql`) appears in the journal `entries` array. When writing a migration manually (not via `db:generate`):

1. Add the SQL file to `db/migrations/`.
2. Add an entry to `db/migrations/meta/_journal.json`:
   ```json
   { "idx": <next_integer>, "version": "7", "when": <unix_ms_timestamp>, "tag": "<filename_without_sql>", "breakpoints": true }
   ```
   `idx` is sequential (0, 1, 2 …) regardless of the filename prefix. `when` must be greater than the previous entry's `when` or drizzle may not process it in the expected order.
3. Run `npm run db:migrate`.

If a migration was already missed and the tables must exist now, apply the DDL directly with a temporary script (see `scripts/seed-ai-solutions.ts` for the pattern) and then add the journal entry so future fresh deployments pick it up automatically.

### Seed Script Import Order

`tsx` with `module: "esnext"` (set in `tsconfig.json`) hoists static `import` statements above all other code — including `dotenv.config()` — when running scripts. This means `db/index.ts` reads `process.env.DATABASE_URL` before dotenv has loaded it, throwing "DATABASE_URL is not set".

**Rule: seed/utility scripts must NOT import `db/index.ts` statically.** Instead, follow the `migrate.ts` pattern — create a local postgres client inside the async function body, after dotenv has run:

```ts
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, "../.env.local") });

// Only import packages that don't read env at module load time:
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../db/schema";

// Create the client AFTER dotenv has run:
const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client, { schema });
```

tsx auto-injects `.env.local` when it detects the file (visible as `◇ injected env … from .env.local` in output), but this happens too late for module-level code in `db/index.ts`. The pattern above is reliable regardless of tsx's auto-injection behaviour.

---

## TypeScript Rules

- Use strict TypeScript. No `any`.
- All shared types live in `lib/types.ts`. Add to it; do not define duplicate types elsewhere.
- Data access functions in `lib/data/` must return the types from `lib/types.ts`
- Zod schemas in API routes should align with the corresponding interface in `lib/types.ts`

---

## Testing

Tests live in `__tests__/` directories co-located with source files.

- `components/sections/__tests__/` — component tests
- `components/ui/__tests__/` — UI primitive tests
- `lib/data/__tests__/` — integration tests for data functions (hit real DB)
- `db/__tests__/` — schema integration tests

Run tests (add to package.json if not present) before marking a task complete. Fix errors before finishing.

---

## Linting and Validation

```bash
npm run lint
npm run build
```

Fix all errors. Do not suppress lint warnings without a clear reason.

---

## Content Domains

The portfolio covers these content domains (each has a DB schema, data function, type, and section component):

| Domain         | Schema file              | Data function file       | Type(s)                  |
|----------------|--------------------------|--------------------------|--------------------------|
| Hero           | `db/schema/hero.ts`      | `lib/data/hero.ts`       | `HeroContent`, `HeroStat`|
| Summary        | `db/schema/summary.ts`   | `lib/data/summary.ts`    | `SummaryContent`         |
| Focus Areas    | `db/schema/focusAreas.ts`| `lib/data/focusAreas.ts` | `FocusArea`              |
| Initiatives    | `db/schema/initiatives.ts`| `lib/data/initiatives.ts`| `Initiative`             |
| Experience     | `db/schema/experience.ts`| `lib/data/experience.ts` | `ExperienceRole`         |
| Skills         | `db/schema/skills.ts`    | `lib/data/skills.ts`     | `SkillCategory`, `FunctionalSkill` |
| Certifications | `db/schema/certifications.ts` | `lib/data/certifications.ts` | `Certification`   |
| Awards         | `db/schema/awards.ts`    | `lib/data/awards.ts`     | `Award`                  |
| Education      | `db/schema/education.ts` | `lib/data/education.ts`  | `EducationEntry`         |
| Contact        | `db/schema/contact.ts`   | `lib/data/contact.ts`    | `ContactInfo`            |

When adding a new section, follow this same pattern across all four layers.

---

## Feature Implementation Checklist

When building any feature:

1. Read this file.
2. Identify the layers that need changes (schema → migration → data fn → type → API route → component → admin page).
3. Work through the layers in order: schema first, UI last.
4. Keep changes focused. Don't touch unrelated code.
5. Validate TypeScript and run lint before finishing.

---

## Communication Style

Be concise. Explain what changed and how to test it. No unnecessary filler.

---

## Final Reminder

Before every implementation:

- Read this file
- Follow existing patterns
- Build clean, minimal, maintainable code
- Match the existing editorial design aesthetic
- Never expose secrets or skip auth checks in admin routes
