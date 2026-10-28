# BISESJ Static Assets Manifest

This document records all local static assets brought into the repository for Sprint 1 (Task S1-03), including their origin in the project resources / old-site archive, their destination path in `public/`, and where they are referenced across the site components.

---

## 1. Documents & Publications (`public/documents/`)

| Destination File | Source Path | Where Used |
| :--- | :--- | :--- |
| `public/documents/admission-test-for-newcomers-2026-27.pdf` | `Resources\Admission & Fee\Admission_Test_for_Newcomers_2026-27.pdf` | Hero admissions card download CTA (`hero.tsx`), Admissions section CTA (`admissions.tsx`), Admission route (`/admission`) |
| `public/documents/tuition-fee-structure-bangladeshi-2026-2027.pdf` | `Resources\Admission & Fee\Tuition Fee Structure (2026-2027) Bangladeshi.pdf` | Admissions fee schedule download (`/admission`), site links config |
| `public/documents/tuition-fee-structure-foreigner-2026-2027.pdf` | `Resources\Admission & Fee\Tuition Fee Structure (2026-2027) Foreigner.pdf` | Admissions international fee schedule download (`/admission`), site links config |
| `public/documents/academic-calendar-2026-2027.pdf` | `Resources\Academic Calendar 2026-2027\Academic Calendar 2026-2027 To be Printed 9.09.2026.pdf` | Header nav & utility bar, Academic Calendar route (`/academic-calendar`), Footer updates column |

---

## 2. Branding & Logos (`public/images/`)

| Destination File | Source Path | Where Used |
| :--- | :--- | :--- |
| `public/images/logo.png` | `images\logo1.png` | Main navigation bar (`header.tsx`), Site footer (`footer.tsx`), Favicon / Apple touch icon (`layout.tsx`), Schema.org JSON-LD |
| `public/images/school-logo.png` | `images\bisweblogo-1.png` | Alternative high-resolution school emblem |
| `public/images/partner-cambridge.png` | `images\UniversityofCambridgeLogoPNGimage.png` | Partner trust strip marquee (`trust-stats.tsx`) |
| `public/images/partner-edexcel.svg` | SVG Vector Design | Partner trust strip marquee (`trust-stats.tsx`) |
| `public/images/partner-oxfordaqa.webp` | `images\OxfordAQAMasterLogo.webp` | Partner trust strip marquee (`trust-stats.tsx`) |
| `public/images/partner-saudi-education.png` | `images\sAUDIEDUCATION.png` | Partner trust strip marquee (`trust-stats.tsx`) |
| `public/images/partner-idp.jpeg` | `images\idap2.jpeg` | Partner trust strip marquee (`trust-stats.tsx`) |

---

## 3. Photographs & Visuals (`public/images/`)

| Destination File | Source Path | Where Used |
| :--- | :--- | :--- |
| `public/images/hero-campus.png` | `Resources\Photo\background photo for website.png` | Hero section main background (`hero.tsx`), Open Graph preview image (`layout.tsx`), Twitter summary card |
| `public/images/kindergarten-classroom.png` | `Resources\Photo\Bright, Cheerful Kindergarten Classroom Learning.png` | Academic pathway Early Years stage, About us feature visuals |
| `public/images/playground-canopy.png` | `Resources\Photo\Vibrant School Playground Under Blue Canopy.png` | Campus life gallery, About us campus facilities |
| `public/images/campus-1.jpg` | `images\20230508_114914-scaled.jpg` | Campus life gallery item 0 (`campus.tsx`), fallback campus hero shot |
| `public/images/campus-2.webp` | `images\bisesjold-2-1.webp` | Campus life gallery item 2 (`campus.tsx`) |
| `public/images/campus-3.jpg` | `images\20230521_072400-scaled.jpg` | Campus life gallery item 4 (`campus.tsx`) |
| `public/images/campus-4.jpeg` | `images\113.jpeg` | Campus life gallery item 3 (`campus.tsx`) |
| `public/images/campus-5.jpg` | `images\IMG_20211110_194240.jpg` | Campus life gallery item 5 (`campus.tsx`) |
| `public/images/chairman.jpg` | `images\Chairman-Pic-copy-3.jpg` | Leadership section Chairman card (`leadership.tsx`), Chairman's Message route |
| `public/images/principal.jpeg` | `images\WhatsApp-Image-2025-11-03-at-6.59.15-AM.jpeg` | Leadership section Principal card (`leadership.tsx`), Principal's Message route |
| `public/images/scholarship.jpg` | `images\img_3634-1.jpg` | Admissions scholarship spotlight card (`admissions.tsx`), Merit Scholarship route |
| `public/images/twenty-years-cambridge.jpeg` | `images\WhatsApp-Image-2025-10-27-at-9.23.26-AM.jpeg` | Campus life gallery item 1 (`campus.tsx`), 20 Years with Cambridge route |
| `public/images/admissions-notice.jpg` | `images\admission-scaled.jpg` | Admissions announcement banner / flyer visual |
