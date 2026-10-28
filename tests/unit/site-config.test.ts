import { describe, it, expect } from 'vitest'
import { SITE_CONFIG } from '@/lib/site-config'
import { CONTACT, LINKS } from '@/src/links'
import { STATS, FOOTER } from '@/src/content'

describe('Site Configuration & Stats Strip (S1-04)', () => {
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

  it('has correct admissions and general contact email', () => {
    expect(SITE_CONFIG.contact.admissionsEmail.address).toBe('admissions-info@bisesjsa.com')
    expect(SITE_CONFIG.contact.generalEmail.address).toBe('principal@bisesjsa.com')
  })

  it('has correct statistics without placeholder text', () => {
    expect(STATS[0].label).toBe('Founded 1993')
    expect(STATS[0].value).toBe(1993)

    expect(STATS[1].label).toBe('20+ years with Cambridge')
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
