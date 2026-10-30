# Sprint 2 Report: Public Pages Foundation & Quality Assurance

**Project**: BISESJ Website Modernization (`bisesjsa.com`)  
**Sprint**: Sprint 2 (Weeks 3–4: Public Pages)  
**Author**: agy (Software Engineer, Alwajeez Tech)  
**Reviewers**: Claude (Senior Engineer & QA), Eva (Coordinator & Deployment Lead)  
**Date**: October 30, 2026  

---

## 1. Executive Summary

Sprint 2 successfully transitions the BISESJ web platform from the initial Sprint 1 prototype scaffold into a production-grade, accessible, multi-page public web experience. All inner pages and public content have been migrated to an approved Markdown-driven content pipeline, eliminating raw text inside React components. Official institutional decisions regarding class levels (Pre-Reception to Year 12), official email routing (`inquiry@`, `admissions-info@`, `feedback@`), locked routine access, responsive images, downloadable PDF assets, and WCAG 2.1 AA accessibility have been fully implemented and verified with automated test suites.

All eight planned sprint tasks (**S2-01 through S2-08**) have been completed with zero regressions. All pull requests follow the strict working rules: independent branch per task, automated test and quality gate verification logs pasted into each PR description, and no self-merging (awaiting Eva's review and sequential merge).

---

## 2. Tasks Summary & Branch Traceability

| Task ID | Task Description | Branch Name | Pull Request | Status |
| :--- | :--- | :--- | :--- | :--- |
| **S2-01** | Merge `src/` into `lib/` (Option A in `docs/structure.md`) | `s2/s2-01-merge-src-into-lib` | [PR #16](https://github.com/fariawebdev/bisesj-homepage-development/pull/16) | Completed |
| **S2-02** | One source of truth for classes (`lib/classes.ts`) | `s2/s2-02-classes-source-of-truth` | [PR #17](https://github.com/fariawebdev/bisesj-homepage-development/pull/17) | Completed |
| **S2-03** | Settings and official email routing | `s2/s2-03-settings-and-emails` | [PR #18](https://github.com/fariawebdev/bisesj-homepage-development/pull/18) | Completed |
| **S2-04** | Home page fixes (Hero branding & action bar clearance) | `s2/s2-04-homepage-fixes` | [PR #19](https://github.com/fariawebdev/bisesj-homepage-development/pull/19) | Completed |
| **S2-05** | Inner pages markdown pipeline, map, feedback & styled 404 | `s2/s2-05-inner-pages` | [PR #20](https://github.com/fariawebdev/bisesj-homepage-development/pull/20) | Completed |
| **S2-06** | Header and footer enhancements (a11y, skip link, 4 columns) | `s2/s2-06-header-footer` | [PR #21](https://github.com/fariawebdev/bisesj-homepage-development/pull/21) | Completed |
| **S2-07** | Mobile images audit, DocumentCard component & official PDFs | `s2/s2-07-mobile-images` | [PR #22](https://github.com/fariawebdev/bisesj-homepage-development/pull/22) | Completed |
| **S2-08** | Quality gates, axe-core WCAG 2.1 AA audits & final report | `s2/s2-08-quality-gates` | [PR #23](https://github.com/fariawebdev/bisesj-homepage-development/pull/23) | Completed |

---

## 3. Key Implementations by Task

### S2-01: Directory Unification (`src/` into `lib/`)
- Relocated `src/content.ts`, `src/types.ts`, and `src/auth.ts` to `lib/content.ts`, `lib/types.ts`, and `lib/auth.ts`.
- Completely removed the redundant `src/` directory.
- Updated all module imports across components, pages, tests, and configuration files.

### S2-02: Single Source of Truth for Classes (`lib/classes.ts`)
- Defined canonical 14 class levels with slug, display label, stage, and sort order:
  - **Early Years**: Pre-Reception, Reception
  - **Primary**: Year 1 through Year 5
  - **Lower Secondary**: Year 6 through Year 8
  - **Cambridge IGCSE**: Year 9, Year 10
  - **Cambridge International AS & A Level**: Year 11 (AS Level), Year 12 (A Level)
- Retired legacy terms ("Grade" and "KG").
- Connected `lib/classes.ts` to the home page pathway strip and admission enquiry dropdown.

### S2-03: Settings and Institutional Email Routing
- Updated `SITE_CONFIG` and `lib/links.ts` to reflect the school's official communication channels:
  - General Inquiries: `inquiry@bisesjsa.com`
  - Admissions: `admissions-info@bisesjsa.com`
  - Parent Feedback & Complaints: `feedback@bisesjsa.com`
  - Canonical School Phone: `+966 12 664 7079`
  - Canonical School WhatsApp: `+966 56 727 6919`
- Replaced all legacy numbers (`+966 012 663 8992` and `966582237432`) across the codebase.

### S2-04: Home Page Fixes
- Updated Home Hero headings:
  - Primary title: `"BANGLADESH INTERNATIONAL SCHOOL ENGLISH SECTION, JEDDAH"`
  - Subtitle: `"ESTABLISHED 1993"`
  - Removed outdated hero banner text.
- Added responsive bottom padding (`pb-28 md:pb-0`) to prevent mobile sticky action bars from overlapping hero action buttons or footer elements.
- Captured automated responsive layout screenshots at 360px, 768px, and 1280px in `docs/qa/sprint-2/`.

### S2-05: Inner Pages & Markdown Pipeline
- Created `lib/markdown.tsx` renderer for parsing approved markdown content from `content/pages/` without storing static copy in React components.
- Sanitized page content to omit developer notes, internal page IDs, and outdated metadata.
- Implemented **Locked Routine Page**: displays the approved institutional message advising enrolled families that routines are distributed directly each term, with a direct contact office button.
- Implemented **Click-to-Load Interactive Map** on the Contact page for enhanced user privacy and performance (no automatic third-party iframe tracking on initial load).
- Built dedicated **Parent Feedback & Complaints** route (`/en/parent-feedback`).
- Created styled, on-brand **404 Not Found Page** (`app/[locale]/[...not-found]/page.tsx`) with quick recovery navigation links.

### S2-06: Header & Footer Navigation
- Enhanced `components/site/header.tsx`:
  - Active page indicator (`aria-current="page"`).
  - "Skip to main content" link targeting `<main id="main">`.
  - Accessible mobile drawer with keyboard navigation, focus trap, and Escape key dismissal.
  - Smooth in-page scrolling to `#top` when on Home, and client routing to `/${locale}` when on inner pages via `SmartLink`.
- Enhanced `components/site/footer.tsx`:
  - 4-column responsive layout: School Overview, Academics, School Life, and Contact & Inquiries.

### S2-07: Mobile Images Audit & Document Downloads
- Completed comprehensive audit in `docs/image-audit.md` covering all 20 images with dimensions, aspect ratios, mobile crop analysis, and CSS `object-fit` / `object-position` recommendations.
- Created `components/site/document-card.tsx` with document title, description, format badge (`PDF`), exact human-readable file size, download button, and `target="_blank" rel="noopener noreferrer"`.
- Linked 4 official institutional documents:
  1. `Admission Test for Newcomers 2026–27` (1.63 MB)
  2. `Tuition Fee Structure (Bangladeshi Students) 2026–2027` (55 KB)
  3. `Tuition Fee Structure (Foreigner Students) 2026–2027` (53 KB)
  4. `BISESJ Academic Calendar 2026–2027` (582 KB)

### S2-08: Quality Assurance & Accessibility Audits
- Integrated `@axe-core/playwright` automated accessibility audits.
- Achieved **zero critical and zero serious accessibility violations** across all key routes: Home (`/en`), Admission (`/en/admission`), Contact (`/en/contact`), Routine (`/en/routine`), and 404 (`/en/not-found`).
- Resolved WCAG 2.5.3 (Label in Name) mismatches on the logo, language switcher, and Instagram strip.

---

## 4. Decisions from School & Discrepancies Handled

| Topic | Decision / Action Taken |
| :--- | :--- |
| **Class Names** | Standardized strictly to `Pre-Reception`, `Reception`, `Year 1` to `Year 10`, `Year 11 (AS Level)`, `Year 12 (A Level)`. Legacy terms "Grade" and "KG" are completely eliminated. |
| **Email Hierarchy** | Dedicated endpoints established: `inquiry@` for general inquiries, `admissions-info@` for admissions, `feedback@` for parental feedback. |
| **Routine Page** | Public timetable remains locked; displays approved text directing enrolled parents to the school office. |
| **Address** | Canonical address pinned: `Othman Ibn Affan, Al Sharafeyah, Jeddah 23218, Kingdom of Saudi Arabia`. |
| **Phone & WhatsApp** | Canonical numbers pinned: Phone `+966 12 664 7079`, WhatsApp `+966 56 727 6919`. |
| **Out-of-Scope Items** | Portals, online payments, admit cards, fee calculator, certificate verification, and tender submissions remained completely parked per brief. |

---

## 5. Items On Hold (Awaiting Eva's Review)

The following items were explicitly kept unchanged per the Sprint 2 brief instructions:
1. **Testimonials Section (`VOICES`)**: Kept in its existing state on the Home page pending Eva's and school management's decision on authentic testimonials copy.
2. **"20+ years with Cambridge" Statistic**: Maintained without alteration pending institutional verification of Cambridge affiliation timeline.
3. **`principal@bisesjsa.com` on Contact Page**: Retained in the approved markdown content on `/contact` pending final sign-off on direct principal email publication.

---

## 6. Test Suite & Verification Results

### Summary of Quality Gates
- **TypeScript**: `tsc --noEmit` exited 0 (Zero type errors).
- **ESLint**: `eslint .` exited 0 (Zero errors, zero warnings).
- **Unit Tests (Vitest)**: 11 test suites passed, 59/59 tests passed.
- **E2E Tests (Playwright)**: 28/28 tests passed across all functional, responsive, and accessibility specs.
- **Production Build (Next.js 16 Turbopack)**: Compiled successfully, all 45 static routes prerendered without errors.

---

## 7. Next Steps (Sprint 3 Preview)
Upon Eva's review and sequential merge of PRs #16 through #23:
1. Implementation of Syllabus and Curriculum pages (Sprint 3).
2. Dynamic class filter integration using `lib/classes.ts`.
3. PDF syllabus file repository structure and automated validation.
