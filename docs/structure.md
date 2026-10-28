# Proposed Source Code Structure: Merging `src/` into `lib/`

## 1. Context & Motivation
During initial prototype generation by v0, Next.js page components and route definitions were scaffolded into `/app` and `/components`, while static metadata, copy dictionaries, and links were generated under `/src`.

This created a dual-root pattern where developers must navigate both `src/` and root-level folders (`components/`, `lib/`, `app/`). Standard Next.js architecture recommends either:
1. Pure root structure: `/app`, `/components`, `/lib`, `/messages`
2. Pure `src` structure: `/src/app`, `/src/components`, `/src/lib`, `/src/messages`

Because our database foundation, authentication, site configuration, utility helpers, and locale routing already live in `/lib/`, consolidating the remaining `src/` modules into `/lib/` aligns the codebase with a single, consistent root-level architectural pattern.

---

## 2. Current Inventory of `src/`

| File | Purpose | Key Consumers |
| :--- | :--- | :--- |
| `src/assets.ts` | Static asset manifest & image path mappings | `components/site/*.tsx`, `lib/site-config.ts` |
| `src/content.ts` | Approved homepage copy, section data, nav items | `components/site/*.tsx`, `tests/unit/*.ts` |
| `src/links.ts` | Internal route mappings & external links | `components/site/*.tsx`, `src/content.ts`, tests |

---

## 3. Target Architecture Proposal

We propose moving the three modules directly under `lib/` (or grouped under `lib/content/`):

### Option A: Flat under `lib/` (Recommended)
```
lib/
├── assets.ts          <- moved from src/assets.ts
├── content.ts         <- moved from src/content.ts
├── links.ts           <- moved from src/links.ts
├── site-config.ts     <- existing
├── i18n.ts            <- existing
├── utils.ts           <- existing
└── db/                <- existing database layer
    ├── auth.ts
    ├── index.ts
    ├── migrate.ts
    ├── seed.ts
    └── migrations/
```

**Advantages**:
- Minimal path depth: `@/lib/content`, `@/lib/assets`, `@/lib/links`.
- Mirrors existing `@/lib/site-config` and `@/lib/i18n`.
- Deletes `src/` completely with zero nested directories.

### Option B: Grouped under `lib/content/`
```
lib/
├── content/
│   ├── assets.ts
│   ├── index.ts (re-exports copy)
│   └── links.ts
├── site-config.ts
├── i18n.ts
├── utils.ts
└── db/
```

**Trade-off**: Slightly deeper import paths (`@/lib/content/links`), but groups all display copy and asset mappings together.

---

## 4. Import Migration Matrix

With TypeScript path aliases configured as `"@/*": ["./*"]` in `tsconfig.json`:

| Current Import | Target Import (Option A) | Target Import (Option B) |
| :--- | :--- | :--- |
| `import { ASSETS } from '@/src/assets'` | `import { ASSETS } from '@/lib/assets'` | `import { ASSETS } from '@/lib/content/assets'` |
| `import { ... } from '@/src/content'` | `import { ... } from '@/lib/content'` | `import { ... } from '@/lib/content'` |
| `import { LINKS } from '@/src/links'` | `import { LINKS } from '@/lib/links'` | `import { LINKS } from '@/lib/content/links'` |

---

## 5. Execution Plan (For Sprint 2)
1. **Branch**: `s2/structure-src-consolidation`.
2. **Move files**: `git mv src/* lib/`.
3. **Automate Import Rewrites**: Run regex replace across `components/`, `app/`, and `tests/` for `@/src/` -> `@/lib/`.
4. **Remove empty directory**: `rmdir src`.
5. **Verify Suite**: Run `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm e2e`, and `pnpm build`.
6. **PR & Review**: Open pull request with zero functional regressions.

> **Note (Sprint 1 Rule)**: Per S1-15 requirements, this document is a proposal only. No files have been relocated in Sprint 1.
