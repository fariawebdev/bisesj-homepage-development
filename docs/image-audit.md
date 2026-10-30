# BISESJ Image Audit & Mobile Responsiveness

This audit covers every image asset utilized across the BISESJ website, evaluating dimensions, aspect ratios, display contexts, mobile viewport cropping behavior (specifically on 360px and 390px screens), and recommended CSS \`object-fit\` and \`object-position\` parameters to prevent layout breakage and preserve visual clarity.

---

## 1. Asset Inventory & Responsive Evaluation

| Image File | Dimensions | Aspect Ratio | Location / Component | Mobile Cropping Analysis (360px & 390px) | Recommended Fit & Position |
| :--- | :---: | :---: | :--- | :--- | :--- |
| `/images/hero-campus.png` | 4800 × 3200 | 1.50:1 (3:2) | Homepage Hero background, Open Graph, Schema.org | Architectural perspective with central facade. Horizontal viewports crop sides while maintaining central building focus. | `object-cover object-center` |
| `/images/logo.png` | 150 × 151 | 0.99:1 (~1:1) | Header navbar (`header.tsx`), Footer Column 1 (`footer.tsx`), Favicon | School crest. Rendered in circular container (`size-11` and `size-14`). Never cropped. | `object-contain object-center` |
| `/images/school-logo.png` | 2860 × 765 | 3.74:1 | Reserve crest + typography wordmark | Wide panoramic asset. Must not be placed in square aspect container without `object-contain`. | `object-contain object-left` |
| `/images/campus-1.jpg` | 2560 × 1152 | 2.22:1 | Campus Life tile 1, Instagram preview strip | Uniformed junior students smiling in campus courtyard. Centered group framing preserves faces on mobile. | `object-cover object-center` |
| `/images/campus-2.webp` | 480 × 251 | 1.91:1 | Campus Life tile 2, Instagram preview strip | Main academic building exterior. Scaled cleanly in square grid thumbnail. | `object-cover object-center` |
| `/images/campus-3.jpg` | 2560 × 1152 | 2.22:1 | Campus Life tile 4, Instagram preview strip | Victory Day celebration with students holding Bangladesh flags. Flag colors and student smiles centered. | `object-cover object-center` |
| `/images/campus-4.jpeg` | 1080 × 695 | 1.55:1 | Campus Life tile 3, Instagram preview strip | Sports & Cultural Week events collage. Multi-action grid scales cleanly with centered framing. | `object-cover object-center` |
| `/images/campus-5.jpg` | 1643 × 2038 | 0.81:1 | Campus Life tile 6, Instagram preview strip | Vertical school crest and banner display. High vertical resolution fits tall and square tiles. | `object-cover object-center` |
| `/images/twenty-years-cambridge.jpeg` | 960 × 1280 | 0.75:1 (3:4) | Why BISESJ section (`why.tsx`), 20 Years page (`/20-years-with-cambridge`) | Certificate presentation ceremony. Text and ceremonial crest located in top half; top positioning prevents crest clipping. | `object-cover object-top` |
| `/images/admissions-notice.jpg` | 2048 × 2560 | 0.80:1 (4:5) | Admissions section notice card, Admission route | Official printed flyer for Admissions 2026–27. Must maintain legible headings on mobile screens. | `object-contain sm:object-cover object-top` |
| `/images/scholarship.jpg` | 1205 × 1719 | 0.70:1 | Admissions section scholarship banner (`admissions.tsx`), Scholarship page | Official Merit Scholarship announcement for regular IGCSE students. Title header located at top. | `object-cover object-top` |
| `/images/chairman.jpg` | 551 × 623 | 0.88:1 | Leadership section (`leadership.tsx`), Chairman's message page | Formal portrait of Chairman Abdullah Nasir Uddin. Face located in upper-middle region; top-alignment avoids chin/head cutoffs. | `object-cover object-top` |
| `/images/principal.jpeg` | 649 × 777 | 0.84:1 | Leadership section (`leadership.tsx`), Principal's message page | Formal portrait of Acting Principal. Upper portrait framing; top-alignment frames subject properly. | `object-cover object-top` |
| `/images/kindergarten-classroom.png` | 1448 × 1086 | 1.33:1 (4:3) | Academic Pathway Early Years highlight, facilities gallery | Activity-based learning classroom with early childhood furniture. Wide framing scales evenly on mobile. | `object-cover object-center` |
| `/images/playground-canopy.png` | 1536 × 1024 | 1.50:1 (3:2) | Sports & outdoor campus facilities highlight | Shaded outdoor playground with sun canopy. Horizon and structural lines centered. | `object-cover object-center` |
| `/images/partner-cambridge.png` | 1764 × 488 | 3.61:1 | Accreditation bar (`trust-stats.tsx`) | Cambridge Assessment International Education logo. Wide corporate logo; must never be cropped. | `object-contain object-center` |
| `/images/partner-edexcel.svg` | 200 × 60 | 3.33:1 | Accreditation bar (`trust-stats.tsx`) | Pearson Edexcel accreditation logo. Lossless vector geometry rendered via SVG. | `object-contain object-center` |
| `/images/partner-idp.jpeg` | 783 × 1024 | 0.76:1 | Accreditation bar (`trust-stats.tsx`) | IDP IELTS official test venue seal. Vertical crest badge; contained to container height. | `object-contain object-center` |
| `/images/partner-oxfordaqa.webp` | 512 × 152 | 3.37:1 | Accreditation bar (`trust-stats.tsx`) | OxfordAQA International Examinations partner mark. Lossless WebP. Must remain uncropped. | `object-contain object-center` |
| `/images/partner-saudi-education.png` | 700 × 579 | 1.21:1 | Accreditation bar (`trust-stats.tsx`) | Ministry of Education, Kingdom of Saudi Arabia emblem. Emblem details preserved with containment. | `object-contain object-center` |

---

## 2. Layout Breaking Fixes Applied

1. **Accreditation / Partner Logos (`components/site/trust-stats.tsx`)**:
   - Ensured all partner logos use `object-contain object-center` and flexbox wrapping with adequate padding so wide logos (Cambridge 3.61:1, OxfordAQA 3.37:1) never overflow horizontal viewport boundaries on 360px devices.
2. **Leadership Portraits (`components/site/leadership.tsx`)**:
   - Specified `className="object-top"` on `SafeImage` to ensure portraits frame executive faces accurately on narrow screens without awkward forehead or neck clipping.
3. **Merit Scholarship & 20 Years Cambridge Banners (`components/site/admissions.tsx` & `why.tsx`)**:
   - Explicitly configured `object-top` positioning so certificate headings, dates, and scholarship titles remain visible and well-aligned when aspect ratio narrows on mobile viewports.
4. **Hero Image Clearance (`components/site/hero.tsx`)**:
   - Retained responsive padding (`pb-28`) and CSS `scroll-padding-bottom: 5.5rem` to guarantee hero buttons and bottom navigation never collide with sticky action controls on small screens.

---

## 3. Official Downloadable Documents (PDFs)

All official documents are verified, stored locally in `public/documents/`, and surfaced via the accessible `DocumentCard` component:

1. **Admission Test for Newcomers 2026–27**:
   - Path: `/documents/admission-test-for-newcomers-2026-27.pdf`
   - File Size: 1.63 MB (1,713,571 bytes)
   - Pages: `/en/admission`
2. **Tuition Fee Structure (Bangladeshi Students) 2026–2027**:
   - Path: `/documents/tuition-fee-structure-bangladeshi-2026-2027.pdf`
   - File Size: 55 KB (56,610 bytes)
   - Pages: `/en/admission`
3. **Tuition Fee Structure (Foreigner Students) 2026–2027**:
   - Path: `/documents/tuition-fee-structure-foreigner-2026-2027.pdf`
   - File Size: 53 KB (54,301 bytes)
   - Pages: `/en/admission`
4. **BISESJ Academic Calendar 2026–2027**:
   - Path: `/documents/academic-calendar-2026-2027.pdf`
   - File Size: 582 KB (595,617 bytes)
   - Pages: `/en/academic-calendar`
