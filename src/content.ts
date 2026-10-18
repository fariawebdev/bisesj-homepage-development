/**
 * All homepage copy lives here so it can be edited without touching components.
 *
 * - `UI` holds translated strings (EN / AR / BN) for the nav, hero and CTAs.
 * - Everything else is English-only for now; add `ar` / `bn` keys as the
 *   translation team delivers them.
 *
 * Markers:
 *   [CONFIRM] value must be verified by the school administration
 *   [REPLACE] placeholder content to be swapped for real material
 */

import type { LinkKey } from './links'
import { ASSETS } from './assets'

/* -------------------------------------------------------------------------- */
/*                                   i18n                                     */
/* -------------------------------------------------------------------------- */

export type Locale = 'en' | 'ar' | 'bn'

export const LOCALES: { code: Locale; label: string; dir: 'ltr' | 'rtl'; name: string }[] = [
  { code: 'en', label: 'EN', dir: 'ltr', name: 'English' },
  { code: 'ar', label: 'عربي', dir: 'rtl', name: 'العربية' },
  { code: 'bn', label: 'বাংলা', dir: 'ltr', name: 'বাংলা' },
]

export type NavKey =
  | 'home'
  | 'about'
  | 'syllabus'
  | 'academicCalendar'
  | 'news'
  | 'jobVacancy'
  | 'contact'

type UIStrings = {
  nav: Record<NavKey, string>
  applyNow: string
  announcement: string
  newTab: string
  menu: string
  close: string
  call: string
  whatsapp: string
  backToTop: string
  hero: {
    eyebrow: string
    title: [string, string]
    sub: string
    ctaApply: string
    ctaTour: string
    cardAdmissionsTitle: string
    cardAdmissionsBody: string
    cardAdmissionsCta: string
    cardScholarshipTitle: string
    cardScholarshipBody: string
    cardScholarshipCta: string
  }
}

export const UI: Record<Locale, UIStrings> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      syllabus: 'Syllabus',
      academicCalendar: 'Academic Calendar',
      news: 'News',
      jobVacancy: 'Job Vacancy',
      contact: 'Contact',
    },
    applyNow: 'Apply Now',
    announcement: 'Admissions open for Academic Year 2026-27, Apply today',
    newTab: '(opens in a new tab)',
    menu: 'Open menu',
    close: 'Close menu',
    call: 'Call',
    whatsapp: 'WhatsApp',
    backToTop: 'Back to top',
    hero: {
      eyebrow: 'Established 1993 · Cambridge International School · Jeddah',
      title: ['Rooted in our culture.', 'Ready for the world.'],
      sub: "Cambridge IGCSE and AS & A Level education for Jeddah's Bangladeshi and international community.",
      ctaApply: 'Apply for 2026-27',
      ctaTour: 'Book a Campus Tour',
      cardAdmissionsTitle: 'Admissions Open 2026-27',
      cardAdmissionsBody: 'Newcomers sit a short admission test. Download the paper to prepare.',
      cardAdmissionsCta: 'Download Admission Test PDF',
      cardScholarshipTitle: 'Merit Scholarship for Regular IGCSE Students',
      cardScholarshipBody: 'Recognising consistent academic excellence.',
      cardScholarshipCta: 'Learn more',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      syllabus: 'المناهج',
      academicCalendar: 'التقويم الأكاديمي',
      news: 'الأخبار',
      jobVacancy: 'الوظائف الشاغرة',
      contact: 'اتصل بنا',
    },
    applyNow: 'سجّل الآن',
    announcement: 'القبول مفتوح للعام الدراسي 2026-27، قدّم اليوم',
    newTab: '(يفتح في علامة تبويب جديدة)',
    menu: 'فتح القائمة',
    close: 'إغلاق القائمة',
    call: 'اتصال',
    whatsapp: 'واتساب',
    backToTop: 'العودة إلى الأعلى',
    hero: {
      eyebrow: 'تأسست عام 1993 · مدرسة كامبريدج الدولية · جدة',
      title: ['متجذّرون في ثقافتنا.', 'مستعدّون للعالم.'],
      sub: 'تعليم كامبريدج IGCSE والمستويين AS و A Level للجالية البنغلاديشية والمجتمع الدولي في جدة.',
      ctaApply: 'قدّم للعام 2026-27',
      ctaTour: 'احجز جولة في المدرسة',
      cardAdmissionsTitle: 'القبول مفتوح 2026-27',
      cardAdmissionsBody: 'يخضع الطلاب الجدد لاختبار قبول قصير. حمّل النموذج للاستعداد.',
      cardAdmissionsCta: 'تحميل اختبار القبول (PDF)',
      cardScholarshipTitle: 'منحة التفوّق لطلاب IGCSE النظاميين',
      cardScholarshipBody: 'تقديرًا للتميّز الأكاديمي المستمر.',
      cardScholarshipCta: 'اعرف المزيد',
    },
  },
  bn: {
    nav: {
      home: 'হোম',
      about: 'আমাদের সম্পর্কে',
      syllabus: 'সিলেবাস',
      academicCalendar: 'একাডেমিক ক্যালেন্ডার',
      news: 'সংবাদ',
      jobVacancy: 'চাকরির সুযোগ',
      contact: 'যোগাযোগ',
    },
    applyNow: 'এখনই আবেদন করুন',
    announcement: '২০২৬-২৭ শিক্ষাবর্ষে ভর্তি চলছে, আজই আবেদন করুন',
    newTab: '(নতুন ট্যাবে খোলে)',
    menu: 'মেনু খুলুন',
    close: 'মেনু বন্ধ করুন',
    call: 'কল',
    whatsapp: 'হোয়াটসঅ্যাপ',
    backToTop: 'উপরে ফিরে যান',
    hero: {
      eyebrow: 'প্রতিষ্ঠিত ১৯৯৩ · কেমব্রিজ ইন্টারন্যাশনাল স্কুল · জেদ্দা',
      title: ['শিকড় আমাদের সংস্কৃতিতে।', 'প্রস্তুত বিশ্বের জন্য।'],
      sub: 'জেদ্দার বাংলাদেশি ও আন্তর্জাতিক কমিউনিটির জন্য কেমব্রিজ IGCSE এবং AS ও A লেভেল শিক্ষা।',
      ctaApply: '২০২৬-২৭ এর জন্য আবেদন করুন',
      ctaTour: 'ক্যাম্পাস ভিজিট বুক করুন',
      cardAdmissionsTitle: 'ভর্তি চলছে ২০২৬-২৭',
      cardAdmissionsBody: 'নতুন শিক্ষার্থীদের একটি সংক্ষিপ্ত ভর্তি পরীক্ষা দিতে হয়। প্রস্তুতির জন্য ডাউনলোড করুন।',
      cardAdmissionsCta: 'ভর্তি পরীক্ষার PDF ডাউনলোড',
      cardScholarshipTitle: 'নিয়মিত IGCSE শিক্ষার্থীদের জন্য মেধা বৃত্তি',
      cardScholarshipBody: 'ধারাবাহিক একাডেমিক সাফল্যের স্বীকৃতি।',
      cardScholarshipCta: 'আরও জানুন',
    },
  },
}

export const NAV_ITEMS: NavKey[] = [
  'home',
  'about',
  'syllabus',
  'academicCalendar',
  'news',
  'jobVacancy',
  'contact',
]

/* -------------------------------------------------------------------------- */
/*                                   School                                   */
/* -------------------------------------------------------------------------- */

export const SCHOOL = {
  name: 'Bangladesh International School, English Section, Jeddah',
  shortName: 'BISESJ',
  tagline: 'Rooted in our culture. Ready for the world.',
  founded: 1993,
  // [CONFIRM] Full street address for the campus.
  address: 'Jeddah, Kingdom of Saudi Arabia',
}

/* -------------------------------------------------------------------------- */
/*                                 Trust strip                                */
/* -------------------------------------------------------------------------- */

export const TRUST = {
  label: 'Recognised Cambridge International Centre',
  partners: [
    { name: 'University of Cambridge', asset: 'cambridge' },
    { name: 'Pearson Edexcel', asset: 'edexcel' },
    { name: 'Oxford AQA', asset: 'oxfordAqa' },
    { name: 'Saudi Education', asset: 'saudiEducation' },
    { name: 'IDP', asset: 'idp' },
  ] as const,
}

/* -------------------------------------------------------------------------- */
/*                                   Stats                                    */
/* -------------------------------------------------------------------------- */

export type Stat = {
  label: string
  /** Numeric value animates as a count-up. `null` renders a neutral placeholder. */
  value: number | null
  /** Text value is shown as-is (no count-up). */
  text?: string
  suffix?: string
  format?: 'year' | 'number'
  note?: string
}

export const STATS: Stat[] = [
  { label: 'Founded', value: 1993, format: 'year' },
  { label: 'Years with Cambridge', value: 20, suffix: '+' },
  { label: 'Pathways', value: null, text: 'IGCSE + AS & A Level' },
  // [CONFIRM] Students enrolled: replace `null` with the verified number.
  { label: 'Students enrolled', value: null, note: 'Figure being confirmed' },
  // [CONFIRM] Nationalities represented: replace `null` with the verified number.
  { label: 'Nationalities', value: null, note: 'Figure being confirmed' },
]

/* -------------------------------------------------------------------------- */
/*                                 Why BISESJ                                 */
/* -------------------------------------------------------------------------- */

export const WHY = {
  eyebrow: 'Why BISESJ',
  heading:
    'A leader in international education, while students remain firmly rooted in their native culture.',
  tiles: [
    { icon: 'graduation', title: 'Cambridge-affiliated curriculum', body: 'Globally recognised IGCSE and AS & A Level qualifications.' },
    { icon: 'users', title: 'Qualified, experienced faculty', body: 'Dedicated teachers who know every learner by name.' },
    { icon: 'shield', title: 'Safe, caring, inclusive environment', body: 'A campus where every child feels secure and valued.' },
    { icon: 'sprout', title: 'Values-based education for the whole child', body: 'Growing intellectually, physically and spiritually.' },
    { icon: 'award', title: 'Merit scholarships', body: 'Rewarding consistent excellence among IGCSE students.' },
    { icon: 'home', title: 'Strong community since 1993', body: 'Three decades serving families across Jeddah.' },
  ] as const,
}

/* -------------------------------------------------------------------------- */
/*                              Academic pathway                              */
/* -------------------------------------------------------------------------- */

export const PATHWAY = {
  eyebrow: 'Academic Pathway',
  heading: 'One clear journey, from first steps to university.',
  sub: 'Select a stage to see how it builds towards Cambridge qualifications.',
  cta: 'View Syllabus',
  // [CONFIRM] Stage names, grade ranges and descriptions with the academic office.
  stages: [
    { name: 'Early Years', grades: 'KG', body: 'Play-based foundations in language, numeracy and curiosity.' },
    { name: 'Primary', grades: 'Grades 1 to 5', body: 'Core literacy, mathematics and science with a strong values base.' },
    { name: 'Lower Secondary', grades: 'Grades 6 to 8', body: 'Broadening subject knowledge and independent study habits.' },
    { name: 'Cambridge IGCSE', grades: 'Grades 9 to 10', body: 'Internationally recognised qualifications across a wide subject choice.' },
    { name: 'AS & A Level', grades: 'Grades 11 to 12', body: 'Specialised, university-ready study accepted worldwide.' },
  ],
}

/* -------------------------------------------------------------------------- */
/*                                 Admissions                                 */
/* -------------------------------------------------------------------------- */

export const ADMISSIONS = {
  eyebrow: 'Admissions 2026-27',
  heading: 'Joining BISESJ is simple.',
  sub: 'Four clear steps from first conversation to first day.',
  steps: [
    { title: 'Enquire', body: 'Reach out by phone, WhatsApp or the enquiry form.' },
    { title: 'Admission Test', body: 'Newcomers sit a short test appropriate to their grade.' },
    { title: 'Offer', body: 'Successful applicants receive an offer of a place.' },
    { title: 'Enrol', body: 'Complete registration and welcome to the BISESJ family.' },
  ],
  scholarshipTitle: 'Merit Scholarship for Regular IGCSE Students',
  scholarshipBody: 'Our merit scholarship recognises regular IGCSE students who demonstrate outstanding academic achievement.',
  scholarshipCta: 'Read about the scholarship',
  downloadCta: 'Download Admission Test for Newcomers 2026-27',
  noticeCta: 'Read the admission notice',
}

/* -------------------------------------------------------------------------- */
/*                                 Leadership                                 */
/* -------------------------------------------------------------------------- */

export const LEADERSHIP = {
  eyebrow: 'Leadership',
  heading: 'A message from those who guide us.',
  vision: 'Nurturing students who are intellectually capable, spiritually grounded and of noble character.',
  leaders: [
    {
      name: 'Abdullah Nasir Uddin',
      role: 'Chairman',
      asset: 'chairman',
      link: 'chairmanMessage',
      quote:
        'Bangladesh International School, English Section, Jeddah, is not just a center of learning, it is a living dream, a beacon of hope, and a source of pride for our community.',
    },
    {
      name: 'Md. Motiour Rahman Khan',
      role: 'Acting Principal',
      asset: 'principal',
      link: 'principalMessage',
      quote:
        'It is with great honor and a profound sense of responsibility that I welcome you to Bangladesh International School, English Section, Jeddah (BISESJ).',
    },
  ] as const,
  readMore: 'Read full message',
}

/* -------------------------------------------------------------------------- */
/*                                Campus life                                 */
/* -------------------------------------------------------------------------- */

export type GalleryItem = {
  src: string
  alt: string
  caption?: string
  link?: LinkKey
  tall?: boolean
}

// [CONFIRM] Which campus photo best represents each captioned event.
export const GALLERY: GalleryItem[] = [
  { src: ASSETS.campus[0], alt: 'Smiling young BISESJ students in school uniform', tall: true },
  { src: ASSETS.twentyYearsCambridge, alt: 'Celebrating 20 years with Cambridge at BISESJ', caption: '20 Years with Cambridge', link: 'twentyYearsCambridge' },
  { src: ASSETS.campus[1], alt: 'Collage of BISESJ sports, cultural and community events', caption: 'Sports & Cultural Week 2025', link: 'sportsWeek2025' },
  { src: ASSETS.campus[3], alt: 'Students with Bangladesh flags and green balloons celebrating Victory Day', caption: 'The Great Victory Day, 16 December 2025', link: 'victoryDay2025', tall: true },
  { src: ASSETS.campus[2], alt: 'The BISESJ campus building in Jeddah' },
  { src: ASSETS.campus[4], alt: 'The BISESJ school crest on display', tall: true },
]

export const CAMPUS = {
  eyebrow: 'Campus Life',
  heading: 'Where learning, culture and friendship meet.',
  ctaHeading: "Let's make your next campus tour unforgettable.",
  ctaBody: 'Walk our corridors, meet our teachers and see BISESJ in action.',
  cta: 'Book a Campus Tour',
}

/* -------------------------------------------------------------------------- */
/*                               News & notices                               */
/* -------------------------------------------------------------------------- */

export type NewsItem = {
  title: string
  link: LinkKey
  /** Only set when the date is known. Leave undefined otherwise. */
  date?: string
  tag: string
}

export const NEWS = {
  eyebrow: 'News & Notices',
  heading: 'What is happening at BISESJ.',
  viewAll: 'View all news',
  calendarTitle: 'Academic Calendar',
  calendarBody: 'Term dates, holidays and examination windows for the year.',
  calendarCta: 'Open calendar',
  tabs: {
    news: [
      // [CONFIRM] Publication date for this notice.
      { title: 'New Admission for Academic Year 2026-2027', link: 'admissions2026', tag: 'Admissions' },
      // [CONFIRM] Publication date for this announcement.
      { title: 'Introduction of Merit Scholarship for Regular IGCSE Students', link: 'meritScholarship', tag: 'Scholarship' },
      // [CONFIRM] Exact event dates.
      { title: 'Sports & Cultural Week 2025', link: 'sportsWeek2025', tag: 'Events', date: '2025' },
      { title: 'The Great Victory Day, 16 December 2025', link: 'victoryDay2025', tag: 'Events', date: '16 Dec 2025' },
    ],
    notices: [{ title: 'Tender Notice', link: 'tenderNotice', tag: 'Notice', date: '10 Jan 2026' }],
    careers: [
      // [CONFIRM] Publication date for this circular.
      { title: 'Principal Recruitment Circular', link: 'principalRecruitment', tag: 'Careers' },
    ],
  } satisfies Record<string, NewsItem[]>,
}

/* -------------------------------------------------------------------------- */
/*                                  Voices                                    */
/* -------------------------------------------------------------------------- */

export const VOICES = {
  eyebrow: 'Voices',
  heading: 'In the words of our community.',
  sampleLabel: 'Sample testimonial',
  // [REPLACE] All three testimonials are placeholders. Replace with real,
  // approved quotes from parents and alumni before launch.
  items: [
    {
      quote:
        'Our children have grown in confidence and character, while staying close to the language and values we brought from home.',
      name: 'Parent name',
      role: 'Parent, Grade 7',
    },
    {
      quote:
        'The Cambridge programme gave me the foundation I needed for university abroad. My teachers believed in me from day one.',
      name: 'Alumni name',
      role: 'Alumnus, A Level',
    },
    {
      quote:
        'A warm, disciplined environment. We always feel welcome and informed about our daughter’s progress.',
      name: 'Parent name',
      role: 'Parent, IGCSE',
    },
  ],
}

/* -------------------------------------------------------------------------- */
/*                                  Enquiry                                   */
/* -------------------------------------------------------------------------- */

export const ENQUIRY = {
  eyebrow: 'Enquiry & Contact',
  heading: 'Seeking more information on education and schools? Let’s talk.',
  sub: 'Send us a short message and our admissions team will be in touch.',
  tourMessage: 'I would like to book a campus tour.',
  success:
    'Thank you! Your enquiry has been received. Our admissions team will contact you shortly.',
  // [CONFIRM] Grade options offered by the school.
  grades: [
    'KG',
    'Grade 1',
    'Grade 2',
    'Grade 3',
    'Grade 4',
    'Grade 5',
    'Grade 6',
    'Grade 7',
    'Grade 8',
    'Grade 9 (IGCSE)',
    'Grade 10 (IGCSE)',
    'AS Level',
    'A Level',
  ],
  fields: {
    name: 'Parent name',
    phone: 'Phone / WhatsApp',
    grade: "Child's grade",
    message: 'Message',
  },
  submit: 'Send enquiry',
  sending: 'Sending...',
}

/* -------------------------------------------------------------------------- */
/*                                   Footer                                   */
/* -------------------------------------------------------------------------- */

export const FOOTER = {
  tagline: 'Cambridge IGCSE and AS & A Level education in Jeddah since 1993.',
  columns: [
    {
      title: 'School',
      links: [
        { label: 'About Us', link: 'about' },
        { label: 'Syllabus', link: 'syllabus' },
        { label: 'Academic Calendar', link: 'academicCalendar' },
      ],
    },
    {
      title: 'Updates',
      links: [
        { label: 'News', link: 'news' },
        { label: 'Job Vacancy', link: 'jobVacancy' },
      ],
    },
    {
      title: 'Get in touch',
      links: [
        { label: 'Contact', link: 'contact' },
        { label: 'Registration', link: 'registration' },
      ],
    },
  ] as { title: string; links: { label: string; link: LinkKey }[] }[],
  instagramLabel: 'Follow us on Instagram',
  copyright: '© 2026 BISESJ. All rights reserved.',
}
