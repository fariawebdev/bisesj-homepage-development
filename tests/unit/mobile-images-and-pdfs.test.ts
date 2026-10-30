import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import { ASSETS } from '@/lib/assets'
import { LINKS } from '@/lib/links'

describe('S2-07 Mobile Images and PDFs Unit Tests', () => {
  const publicDir = path.resolve(process.cwd(), 'public')

  describe('Official PDF Documents', () => {
    const expectedPdfs = [
      { name: 'admission-test-for-newcomers-2026-27.pdf', minSize: 1000000 },
      { name: 'tuition-fee-structure-bangladeshi-2026-2027.pdf', minSize: 40000 },
      { name: 'tuition-fee-structure-foreigner-2026-2027.pdf', minSize: 40000 },
      { name: 'academic-calendar-2026-2027.pdf', minSize: 400000 },
    ]

    for (const pdf of expectedPdfs) {
      it(`verifies ${pdf.name} exists in public/documents/ with valid file size`, () => {
        const filePath = path.join(publicDir, 'documents', pdf.name)
        expect(fs.existsSync(filePath)).toBe(true)
        const stats = fs.statSync(filePath)
        expect(stats.size).toBeGreaterThan(pdf.minSize)
      })
    }

    it('ensures LINKS dictionary points to existing local PDF documents', () => {
      const pdfLinkKeys = [
        'admissionTestPdf',
        'tuitionFeeBangladeshi',
        'tuitionFeeForeigner',
        'academicCalendarPdf',
      ] as const

      for (const key of pdfLinkKeys) {
        const def = LINKS[key]
        expect(def.internal).toBe(true)
        expect(def.href).toMatch(/^\/documents\/.+\.pdf$/)

        const relPath = def.href.replace(/^\//, '')
        const fullPath = path.join(publicDir, relPath)
        expect(fs.existsSync(fullPath)).toBe(true)
      }
    })
  })

  describe('Image Assets Integrity', () => {
    it('verifies all primary image assets exist in public/images/ and are non-empty', () => {
      const primaryImages = [
        ASSETS.logo,
        ASSETS.hero,
        ASSETS.campus1,
        ASSETS.admissionsNotice,
        ASSETS.scholarship,
        ASSETS.twentyYearsCambridge,
        ASSETS.chairman,
        ASSETS.principal,
        ASSETS.kindergarten,
        ASSETS.playground,
      ]

      for (const img of primaryImages) {
        const fullPath = path.join(publicDir, img.replace(/^\//, ''))
        expect(fs.existsSync(fullPath)).toBe(true)
        const stats = fs.statSync(fullPath)
        expect(stats.size).toBeGreaterThan(1000)
      }
    })

    it('verifies all campus gallery images exist', () => {
      for (const img of ASSETS.campus) {
        const fullPath = path.join(publicDir, img.replace(/^\//, ''))
        expect(fs.existsSync(fullPath)).toBe(true)
      }
    })

    it('verifies all accreditation partner logos exist', () => {
      for (const img of Object.values(ASSETS.partners)) {
        const fullPath = path.join(publicDir, img.replace(/^\//, ''))
        expect(fs.existsSync(fullPath)).toBe(true)
      }
    })
  })

  describe('Image Audit Documentation', () => {
    it('verifies docs/image-audit.md exists and documents all required assets', () => {
      const auditFile = path.resolve(process.cwd(), 'docs/image-audit.md')
      expect(fs.existsSync(auditFile)).toBe(true)
      const content = fs.readFileSync(auditFile, 'utf8')
      expect(content).toContain('hero-campus.png')
      expect(content).toContain('logo.png')
      expect(content).toContain('twenty-years-cambridge.jpeg')
      expect(content).toContain('scholarship.jpg')
      expect(content).toContain('chairman.jpg')
      expect(content).toContain('principal.jpeg')
      expect(content).toContain('admission-test-for-newcomers-2026-27.pdf')
      expect(content).toContain('academic-calendar-2026-2027.pdf')
    })
  })
})
