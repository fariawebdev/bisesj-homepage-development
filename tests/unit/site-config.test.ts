import { describe, it, expect } from 'vitest'
import { SITE_CONFIG } from '@/lib/site-config'
import { CONTACT, LINKS } from '@/lib/links'
import { STATS, FOOTER } from '@/lib/content'

describe('Site Configuration & Stats Strip (S1-04, S1-10, S2-03)', () => {
  it('has correct official phone details', () => {
    expect(SITE_CONFIG.contact.officialPhone.display).toBe('+966 12 664 7079')
    expect(SITE_CONFIG.contact.officialPhone.href).toBe('tel:+966126647079')
    expect(CONTACT.phoneDisplay).toBe('+966 12 664 7079')
    expect(CONTACT.phoneHref).toBe('tel:+966126647079')
  })

  it('has correct WhatsApp details', () => {
    expect(SITE_CONFIG.contact.whatsapp.display).toBe('+966 56 727 6919')
    expect(SITE_CONFIG.contact.whatsapp.href).toBe('https://wa.me/966567276919')
    expect(LINKS.whatsapp.href).toBe('https://wa.me/966567276919')
  })

  it('has correct school emails including inquiry, admissions, and feedback (S2-03)', () => {
    expect(SITE_CONFIG.inquiryEmail).toBe('inquiry@bisesjsa.com')
    expect(SITE_CONFIG.admissionsEmail).toBe('admissions-info@bisesjsa.com')
    expect(SITE_CONFIG.feedbackEmail).toBe('feedback@bisesjsa.com')

    expect(SITE_CONFIG.contact.generalEmail.address).toBe('inquiry@bisesjsa.com')
    expect(SITE_CONFIG.contact.inquiryEmail.address).toBe('inquiry@bisesjsa.com')
    expect(SITE_CONFIG.contact.admissionsEmail.address).toBe('admissions-info@bisesjsa.com')
    expect(SITE_CONFIG.contact.feedbackEmail.address).toBe('feedback@bisesjsa.com')
  })

  it('has routine feature locked by default (S2-03)', () => {
    expect(SITE_CONFIG.features.routine).toBe('locked')
  })

  it('has verified campus street address from pages/contact.md', () => {
    expect(SITE_CONFIG.contact.address).toBe(
      'Othman Ibn Affan, Al Sharafeyah, Jeddah 23218, Kingdom of Saudi Arabia'
    )
  })

  it('has correct statistics without placeholder text', () => {
    expect(STATS[0].label).toBe('Founded')
    expect(STATS[0].value).toBe(1993)

    expect(STATS[1].label).toBe('Years with Cambridge')
    expect(STATS[1].value).toBe(20)

    expect(STATS[3].label).toBe('Students enrolled')
    expect(STATS[3].value).toBe(791)

    expect(STATS[4].label).toBe('Nationalities')
    expect(STATS[4].value).toBe(10)

    STATS.forEach((s) => {
      expect(s.note).toBeUndefined()
    })
  })

  it('has correct footer credit line and copyright', () => {
    expect(FOOTER.credit).toBe('Powered by Salman & Alwajeez')
    expect(FOOTER.copyright).toContain('BISESJ')
  })
})
