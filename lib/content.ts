/**
 * All homepage copy lives here so it can be edited without touching components.
 *
 * - `UI` holds translated strings (EN / AR / BN) for the nav, hero and CTAs.
 * - Everything else is English-only for now; add `ar` / `bn` keys as the
 *   translation team delivers them.
 */

import type { LinkKey } from './links'
import { ASSETS } from './assets'
import { SITE_CONFIG } from '@/lib/site-config'
import { PATHWAY_STAGES } from '@/lib/classes'
import {
  type Locale,
  LOCALE_CONFIG,
  getMessages,
  type Messages,
} from '@/lib/i18n'

/* -------------------------------------------------------------------------- */
/*                                   i18n                                     */
/* -------------------------------------------------------------------------- */

export type { Locale }

export const LOCALES: { code: Locale; label: string; dir: 'ltr' | 'rtl'; name: string }[] = [
  LOCALE_CONFIG.en,
  LOCALE_CONFIG.ar,
  LOCALE_CONFIG.bn,
]

export type NavKey =
  | 'home'
  | 'about'
  | 'admission'
  | 'syllabus'
  | 'routine'
  | 'academicCalendar'
  | 'news'
  | 'jobVacancy'
  | 'contact'

export type UIStrings = Messages

export const UI: Record<Locale, UIStrings> = {
  en: getMessages('en'),
  ar: getMessages('ar'),
  bn: getMessages('bn'),
}

export const NAV_ITEMS: NavKey[] = [
  'home',
  'about',
  'admission',
  'syllabus',
  'routine',
  'academicCalendar',
  'news',
  'jobVacancy',
  'contact',
]

/* -------------------------------------------------------------------------- */
/*                                   School                                   */
/* -------------------------------------------------------------------------- */

export const SCHOOL = {
  name: SITE_CONFIG.fullName,
  shortName: SITE_CONFIG.shortName,
  tagline: 'Rooted in our culture. Ready for the world.',
  founded: SITE_CONFIG.foundedYear,
  address: SITE_CONFIG.contact.address,
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
  { label: SITE_CONFIG.stats[0].label, value: SITE_CONFIG.stats[0].numericValue, format: 'year' },
  { label: SITE_CONFIG.stats[1].label, value: SITE_CONFIG.stats[1].numericValue, suffix: '+' },
  { label: SITE_CONFIG.stats[2].label, value: null, text: SITE_CONFIG.stats[2].displayValue },
  { label: SITE_CONFIG.stats[3].label, value: SITE_CONFIG.stats[3].numericValue },
  { label: SITE_CONFIG.stats[4].label, value: SITE_CONFIG.stats[4].numericValue },
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
  stages: PATHWAY_STAGES.map((s) => ({
    name: s.name,
    classes: s.classesLabel,
    body: s.body,
  })),
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
    { title: 'Admission Test', body: 'Newcomers sit a short test appropriate to their class level.' },
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
}

/* -------------------------------------------------------------------------- */
/*                               News & notices                               */
/* -------------------------------------------------------------------------- */

export type NewsItem = {
  title: string
  link: LinkKey
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
      { title: 'New Admission for Academic Year 2026-2027', link: 'admissions2026', tag: 'Admissions' },
      { title: 'Introduction of Merit Scholarship for Regular IGCSE Students', link: 'meritScholarship', tag: 'Scholarship' },
      { title: 'Sports & Cultural Week 2025', link: 'sportsWeek2025', tag: 'Events', date: '2025' },
      { title: 'The Great Victory Day, 16 December 2025', link: 'victoryDay2025', tag: 'Events', date: '16 Dec 2025' },
    ],
    notices: [{ title: 'Tender Notice', link: 'tenderNotice', tag: 'Notice', date: '10 Jan 2026' }],
    careers: [
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
  items: [
    {
      quote:
        'Our children have grown in confidence and character, while staying close to the language and values we brought from home.',
      name: 'Parent name',
      role: 'Parent, Year 7',
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
  success:
    'Thank you! Your enquiry has been received. Our admissions team will contact you shortly.',
  fields: {
    name: 'Parent name',
    phone: 'Phone / WhatsApp',
    classLevel: "Child's class",
    message: 'Message',
  },
  submit: 'Send enquiry',
  sending: 'Sending...',
}

/* -------------------------------------------------------------------------- */
/*                                   Footer                                   */
/* -------------------------------------------------------------------------- */

export const FOOTER = {
  tagline: SITE_CONFIG.curriculum,
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
  copyright: SITE_CONFIG.footer.copyright,
  credit: SITE_CONFIG.footer.credit,
}
