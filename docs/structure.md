# Source Code Structure: Merging `src/` into `lib/`

## 1. Context & Motivation
During initial prototype generation by v0, Next.js page components and route definitions were scaffolded into `/app` and `/components`, while static metadata, copy dictionaries, and links were generated under `/src`.

This created a dual-root pattern where developers navigated both `src/` and root-level folders (`components/`, `lib/`, `app/`). Standard Next.js architecture recommends either a pure root structure or pure `src` structure.

Because our database foundation, authentication, site configuration, utility helpers, and locale routing already lived in `/lib/`, consolidating the remaining `src/` modules into `/lib/` aligns the codebase with a single, consistent root-level architectural pattern.

---

## 2. Implementation (Completed in S2-01)
As executed in task S2-01, Option A was implemented:

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

- All three modules (`assets.ts`, `content.ts`, `links.ts`) were moved to `lib/` using `git mv`.
- All consumer imports were updated to `@/lib/assets`, `@/lib/content`, and `@/lib/links`.
- The empty `src/` directory has been deleted.
