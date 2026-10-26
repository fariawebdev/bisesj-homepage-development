/**
 * Every destination used on the BISESJ website lives here.
 * All internal links point to the new Next.js routes or local documents.
 * No external links point to the old WordPress site (bisesjsa.com).
 */

import { SITE_CONFIG } from '@/lib/site-config'

export type LinkDef = {
  href: string
  internal?: boolean
}

export const LINKS = {
  home: { href: '#top', internal: true },
  enquiry: { href: '#enquiry', internal: true },

  // Primary Routes
  about: { href: '/about-us', internal: true },
  aboutUs: { href: '/about-us', internal: true },
  admission: { href: '/admission', internal: true },
  admissions: { href: '/admission', internal: true },
  admissions2026: { href: '/admission', internal: true },
  registration: { href: '/admission', internal: true },
  syllabus: { href: '/syllabus', internal: true },
  routine: { href: '/routine', internal: true },
  academicCalendar: { href: '/academic-calendar', internal: true },
  news: { href: '/news', internal: true },
  jobVacancy: { href: '/job-vacancy', internal: true },
  contact: { href: '/contact', internal: true },

  // Feature & Message Routes
  chairmanMessage: { href: '/chairmans-message', internal: true },
  principalMessage: { href: '/principals-message', internal: true },
  meritScholarship: { href: '/merit-scholarship', internal: true },
  twentyYearsCambridge: { href: '/20-years-with-cambridge', internal: true },
  sportsWeek2025: { href: '/news', internal: true },
  victoryDay2025: { href: '/news', internal: true },
  tenderNotice: { href: '/news', internal: true },
  principalRecruitment: { href: '/job-vacancy', internal: true },

  // PDF Documents
  admissionTestPdf: {
    href: '/documents/admission-test-for-newcomers-2026-27.pdf',
    internal: true,
  },
  tuitionFeeBangladeshi: {
    href: '/documents/tuition-fee-structure-bangladeshi-2026-2027.pdf',
    internal: true,
  },
  tuitionFeeForeigner: {
    href: '/documents/tuition-fee-structure-foreigner-2026-2027.pdf',
    internal: true,
  },
  academicCalendarPdf: {
    href: '/documents/academic-calendar-2026-2027.pdf',
    internal: true,
  },

  // External Social & Map
  map: { href: SITE_CONFIG.contact.mapUrl },
  whatsapp: { href: SITE_CONFIG.contact.whatsapp.href },
  facebook: { href: SITE_CONFIG.socials.facebook },
  youtube: { href: SITE_CONFIG.socials.youtube },
  instagram: { href: SITE_CONFIG.socials.instagram },
} as const satisfies Record<string, LinkDef>

export type LinkKey = keyof typeof LINKS

export const CONTACT = {
  phoneDisplay: SITE_CONFIG.contact.officialPhone.display,
  phoneHref: SITE_CONFIG.contact.officialPhone.href,
  email: SITE_CONFIG.contact.generalEmail.address,
  emailHref: SITE_CONFIG.contact.generalEmail.href,
  admissionsEmail: SITE_CONFIG.contact.admissionsEmail.address,
  admissionsEmailHref: SITE_CONFIG.contact.admissionsEmail.href,
  whatsappDisplay: SITE_CONFIG.contact.whatsapp.display,
  whatsappHref: SITE_CONFIG.contact.whatsapp.href,
} as const
