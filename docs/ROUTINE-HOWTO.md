# BISESJ School Routine Runbook (HOW-TO)

This document provides instructions for the School Coordinator (Eva) on how to manage, populate, and unlock class routine timetables on the BISESJ website.

---

## 1. Routine Access Architecture

By school administration policy, the class routine is **locked to the public by default**:
- Visitors visiting `/routine` or `/routine/[class]` see a restricted access notice explaining that class schedules are distributed directly to enrolled families at the beginning of each term.
- Disabled class badges for all 14 classes are displayed so visitors understand which classes the school serves without exposing private timetable schedules.

### Access Control Mechanism
The routine mode is governed by:
1. **Environment Variable:** `ROUTINE_MODE` (`"locked"` | `"open"`).
2. **Default Config Fallback:** `SITE_CONFIG.features.routine` in `lib/site-config.ts` (set to `'locked'`).

When `ROUTINE_MODE` is not explicitly set, `isRoutineLocked()` returns `true`.

---

## 2. Unlocking the Routine (Public Release)

When the school leadership approves public publication of routines:

1. **Option A: Via Environment Variable (cPanel / Host)**
   Set the server environment variable:
   ```bash
   ROUTINE_MODE=open
   ```
2. **Option B: In Code Configuration**
   In `lib/site-config.ts`, change:
   ```typescript
   features: {
     routine: 'open',
   }
   ```

---

## 3. Routine Data Schema (`content/routine-manifest.json`)

The manifest file `content/routine-manifest.json` defines class routines.

```json
{
  "academicYear": "2026-27",
  "generatedAt": "2026-10-31T00:00:00.000Z",
  "classes": [
    {
      "slug": "year-7",
      "label": "Year 7",
      "academicYear": "2026-27",
      "updatedAt": "2026-10-01",
      "pdfUrl": "/documents/routine/year-7-routine.pdf",
      "schedule": [
        {
          "day": "Sunday",
          "periods": [
            {
              "periodNumber": 1,
              "startTime": "07:30",
              "endTime": "08:15",
              "subject": "Mathematics",
              "room": "7A"
            },
            {
              "periodNumber": 2,
              "startTime": "08:15",
              "endTime": "09:00",
              "subject": "English",
              "room": "7A"
            }
          ]
        }
      ]
    }
  ]
}
```

### Supported Fields
- `slug` (string, required): Class identifier matching `lib/classes.ts` (e.g. `pre-reception`, `year-1`, `year-7`, `year-11`, `year-12`).
- `label` (string, required): Display name (e.g. `Year 7`, `Year 11 (AS Level)`).
- `academicYear` (string, required): e.g. `2026-27`.
- `updatedAt` (string, optional): ISO date string of last update.
- `pdfUrl` (string, optional): Path to a downloadable timetable PDF in `public/documents/routine/`.
- `schedule` (array, optional): Days of the week (`Sunday` through `Thursday`) with period timings, subject names, and optional room assignments.

---

## 4. Verification & Testing

Before deploying routine changes, verify using the test suite:
```bash
# Run unit tests verifying locked and open routine states
pnpm test tests/unit/routine.test.ts

# Run end-to-end tests
pnpm e2e tests/e2e/routine.spec.ts

# Build static production bundle
pnpm build
```
