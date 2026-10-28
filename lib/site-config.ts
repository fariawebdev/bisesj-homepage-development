/**
 * Single source of truth for site configuration, contact details, and statistics.
 * The short name "BISESJ" is defined here in one place for future rebrand flexibility.
 */

export const SITE_CONFIG = {
  shortName: 'BISESJ',
  fullName: 'Bangladesh International School, English Section, Jeddah',
  curriculum: 'Cambridge International School · Jeddah',
  city: 'Jeddah',
  country: 'Saudi Arabia',
  countryCode: 'SA',
  foundedYear: 1993,
  yearsWithCambridge: '20+',

  contact: {
    officialPhone: {
      display: '+966 12 664 7079',
      href: 'tel:+966126647079',
    },
    whatsapp: {
      display: '+966 56 727 6919',
      href: 'https://wa.me/966567276919',
      rawNumber: '966567276919',
    },
    generalEmail: {
      address: 'principal@bisesjsa.com',
      href: 'mailto:principal@bisesjsa.com',
    },
    admissionsEmail: {
      address: 'admissions-info@bisesjsa.com',
      href: 'mailto:admissions-info@bisesjsa.com',
    },
    address: 'Othman Ibn Affan, Al Sharafeyah, Jeddah 23218, Kingdom of Saudi Arabia',
    mapUrl: 'https://maps.app.goo.gl/b1y9wDWiEVpdr21BA',
  },

  socials: {
    facebook: 'https://www.facebook.com/bisesjedsa',
    youtube: 'https://www.youtube.com/@bisesjsa',
    instagram: 'https://www.instagram.com/bisesjsa/',
  },

  stats: [
    {
      label: 'Founded 1993',
      displayValue: '1993',
      numericValue: 1993,
      format: 'year' as const,
    },
    {
      label: '20+ years with Cambridge',
      displayValue: '20+',
      numericValue: 20,
      suffix: '+',
      format: 'number' as const,
    },
    {
      label: 'Pathways',
      displayValue: 'IGCSE + AS & A Level',
      numericValue: null,
      format: 'text' as const,
    },
    {
      label: 'Students enrolled',
      displayValue: '791',
      numericValue: 791,
      format: 'number' as const,
    },
    {
      label: 'Nationalities',
      displayValue: '10',
      numericValue: 10,
      format: 'number' as const,
    },
  ],

  footer: {
    copyright: '© 2026 BISESJ. All rights reserved.',
    credit: 'Powered by Salman & Alwajeez',
    tagline: 'Cambridge International School · Jeddah, Saudi Arabia',
  },
} as const

export type SiteConfig = typeof SITE_CONFIG
