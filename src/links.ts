/**
 * Every destination used on the homepage lives here.
 * Replace with new internal routes as pages are built.
 *
 * `internal: true` links stay on this page (same tab). Everything else opens
 * in a new tab with rel="noopener noreferrer" via <ExternalLink />.
 */

export type LinkDef = {
  href: string
  internal?: boolean
}

export const LINKS = {
  home: { href: '#top', internal: true },
  enquiry: { href: '#enquiry', internal: true },

  about: { href: 'https://bisesjsa.com/about-us/' },
  syllabus: { href: 'https://bisesjsa.com/syllabus/' },
  academicCalendar: { href: '/documents/academic-calendar-2026-2027.pdf', internal: true },
  news: { href: 'https://bisesjsa.com/category/notice/https-bisesjsa-com-tender-notice/' },
  jobVacancy: { href: 'https://bisesjsa.com/category/job-vacancy/' },
  contact: { href: 'https://bisesjsa.com/contact/' },
  registration: { href: 'https://bisesjsa.com/registration/' },

  admissions2026: { href: 'https://bisesjsa.com/new-admission-for-the-academic-year-2026-2027/' },
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
  meritScholarship: {
    href: 'https://bisesjsa.com/introduction-of-merit-scholarship-for-regular-igcse-students/',
  },

  chairmanMessage: { href: 'https://bisesjsa.com/chairman-message/' },
  principalMessage: { href: 'https://bisesjsa.com/principals-message/' },

  twentyYearsCambridge: { href: 'https://bisesjsa.com/20-years-with-cambridge/' },
  sportsWeek2025: { href: 'https://bisesjsa.com/sports-and-cultural-week/' },
  victoryDay2025: { href: 'https://url-shortener.me/3UAD' },

  tenderNotice: { href: 'https://bisesjsa.com/tender-notice/' },
  principalRecruitment: { href: 'https://bisesjsa.com/urgent-recruitment/' },

  map: { href: 'https://maps.app.goo.gl/b1y9wDWiEVpdr21BA' },
  whatsapp: { href: 'https://api.whatsapp.com/send?phone=966582237432' },
  facebook: { href: 'https://www.facebook.com/bisesjedsa' },
  youtube: { href: 'https://www.youtube.com/@bisesjsa' },
  instagram: { href: 'https://www.instagram.com/bisesjsa/' },
} as const satisfies Record<string, LinkDef>

export type LinkKey = keyof typeof LINKS

export const CONTACT = {
  phoneDisplay: '+966 12 663 8992',
  phoneHref: 'tel:+966126638992',
  email: 'principal@bisesjsa.com',
  emailHref: 'mailto:principal@bisesjsa.com',
  whatsappDisplay: '+966 58 223 7432',
} as const
