import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import { LINKS } from '@/src/links'
import { NAV_ITEMS } from '@/src/content'

describe('S1-07 Routes and Menu Skeleton', () => {
  it('defines the required menu items in the specified order', () => {
    expect(NAV_ITEMS).toEqual([
      'home',
      'about',
      'admission',
      'syllabus',
      'routine',
      'academicCalendar',
      'news',
      'jobVacancy',
      'contact',
    ])
  })

  it('contains zero external links to the old WordPress site (bisesjsa.com)', () => {
    for (const [key, def] of Object.entries(LINKS)) {
      expect(def.href).not.toMatch(/bisesjsa\.com\/wp-content/)
      expect(def.href).not.toMatch(/https?:\/\/(www\.)?bisesjsa\.com\//)
    }
  })

  it('points all primary internal links to existing routes or local documents', () => {
    const requiredRoutes = [
      'about-us',
      'chairmans-message',
      'principals-message',
      'admission',
      'syllabus',
      'routine',
      'academic-calendar',
      'news',
      'job-vacancy',
      'merit-scholarship',
      '20-years-with-cambridge',
      'contact',
    ]

    for (const route of requiredRoutes) {
      const pageFile = path.resolve(process.cwd(), `app/[locale]/${route}/page.tsx`)
      expect(fs.existsSync(pageFile)).toBe(true)
    }
  })

  it('verifies all linked PDFs exist in public/documents/', () => {
    const expectedPdfs = [
      'academic-calendar-2026-2027.pdf',
      'admission-test-for-newcomers-2026-27.pdf',
      'tuition-fee-structure-bangladeshi-2026-2027.pdf',
      'tuition-fee-structure-foreigner-2026-2027.pdf',
    ]

    for (const pdf of expectedPdfs) {
      const filePath = path.resolve(process.cwd(), 'public/documents', pdf)
      expect(fs.existsSync(filePath)).toBe(true)
    }
  })

  it('verifies no "Book a Campus Tour" buttons exist in active components', () => {
    const heroContent = fs.readFileSync(path.resolve(process.cwd(), 'components/site/hero.tsx'), 'utf8')
    const campusContent = fs.readFileSync(path.resolve(process.cwd(), 'components/site/campus.tsx'), 'utf8')

    expect(heroContent).not.toContain('bookCampusTour')
    expect(heroContent).not.toContain('ctaTour')
    expect(campusContent).not.toContain('bookCampusTour')
    expect(campusContent).not.toContain('Campus tour CTA')
  })
})
