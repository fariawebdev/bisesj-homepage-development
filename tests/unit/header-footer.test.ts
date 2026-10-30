import { describe, it, expect } from 'vitest'
import { FOOTER, NAV_ITEMS } from '@/lib/content'
import { LINKS } from '@/lib/links'
import { SITE_CONFIG } from '@/lib/site-config'
import { isNavItemActive } from '@/components/site/header'

describe('S2-06 Header and Footer Unit Tests', () => {
  describe('Footer Configuration', () => {
    it('defines exactly 3 navigational columns matching the brief requirements', () => {
      expect(FOOTER.columns).toHaveLength(3)
      expect(FOOTER.columns[0].title).toBe('School')
      expect(FOOTER.columns[1].title).toBe('Updates')
      expect(FOOTER.columns[2].title).toBe('Get in touch')
    })

    it('contains the required links under School', () => {
      const schoolLinks = FOOTER.columns[0].links.map((l) => l.link)
      expect(schoolLinks).toEqual(['aboutUs', 'admission', 'syllabus', 'academicCalendar', 'routine'])
    })

    it('contains the required links under Updates', () => {
      const updatesLinks = FOOTER.columns[1].links.map((l) => l.link)
      expect(updatesLinks).toEqual(['news', 'jobVacancy'])
    })

    it('contains the required links under Get in touch', () => {
      const contactLinks = FOOTER.columns[2].links.map((l) => l.link)
      expect(contactLinks).toEqual(['contact', 'parentFeedback'])
    })

    it('has verified contact information in SITE_CONFIG for Column 4', () => {
      expect(SITE_CONFIG.contact.officialPhone.display).toBe('+966 12 664 7079')
      expect(SITE_CONFIG.contact.officialPhone.href).toBe('tel:+966126647079')
      expect(SITE_CONFIG.contact.whatsapp.display).toBe('+966 56 727 6919')
      expect(SITE_CONFIG.contact.whatsapp.href).toBe('https://wa.me/966567276919')
      expect(SITE_CONFIG.contact.inquiryEmail.address).toBe('inquiry@bisesjsa.com')
      expect(SITE_CONFIG.contact.inquiryEmail.href).toBe('mailto:inquiry@bisesjsa.com')
    })

    it('has verified identity attributes for Column 1', () => {
      expect(SITE_CONFIG.shortName).toBe('BISESJ')
      expect(SITE_CONFIG.foundedYear).toBe(1993)
      expect(SITE_CONFIG.curriculum).toBe('Cambridge International School · Jeddah')
    })
  })

  describe('Header Active Route Helper (isNavItemActive)', () => {
    const locale = 'en'

    it('identifies the home page as active when pathname is /en or /en/', () => {
      expect(isNavItemActive('home', '/en', locale)).toBe(true)
      expect(isNavItemActive('home', '/en/', locale)).toBe(true)
      expect(isNavItemActive('about', '/en', locale)).toBe(false)
    })

    it('identifies inner pages correctly and turns off home', () => {
      expect(isNavItemActive('about', '/en/about-us', locale)).toBe(true)
      expect(isNavItemActive('home', '/en/about-us', locale)).toBe(false)

      expect(isNavItemActive('admission', '/en/admission', locale)).toBe(true)
      expect(isNavItemActive('syllabus', '/en/syllabus', locale)).toBe(true)
      expect(isNavItemActive('routine', '/en/routine', locale)).toBe(true)
      expect(isNavItemActive('academicCalendar', '/en/academic-calendar', locale)).toBe(true)
      expect(isNavItemActive('news', '/en/news', locale)).toBe(true)
      expect(isNavItemActive('jobVacancy', '/en/job-vacancy', locale)).toBe(true)
      expect(isNavItemActive('contact', '/en/contact', locale)).toBe(true)
    })

    it('handles nested paths and trailing slashes', () => {
      expect(isNavItemActive('about', '/en/about-us/', locale)).toBe(true)
      expect(isNavItemActive('about', '/en/about-us/team', locale)).toBe(true)
      expect(isNavItemActive('contact', '/en/about-us', locale)).toBe(false)
    })

    it('returns false for null or empty pathname', () => {
      expect(isNavItemActive('home', null, locale)).toBe(false)
      expect(isNavItemActive('about', null, locale)).toBe(false)
    })
  })

  describe('Navigation Items Integrity', () => {
    it('ensures every nav item corresponds to a valid internal link key', () => {
      for (const item of NAV_ITEMS) {
        expect(LINKS).toHaveProperty(item)
        const def = LINKS[item]
        expect(def.internal).toBe(true)
      }
    })
  })
})
