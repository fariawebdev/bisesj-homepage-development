import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { CLASSES } from '@/lib/classes'
import { getAllSyllabusClasses, getSyllabusForClass, getSyllabusIndex } from '@/lib/syllabus'

const EXPECTED_COUNTS: Record<string, number> = {
  'pre-reception': 1,
  reception: 1,
  'year-1': 1,
  'year-2': 1,
  'year-3': 1,
  'year-4': 1,
  'year-5': 1,
  'year-6': 14,
  'year-7': 9,
  'year-8': 11,
  'year-9': 13,
  'year-10': 13,
  'year-11': 9,
  'year-12': 9,
}

describe('S3-02: Syllabus Manifest and File Verification', () => {
  it('returns valid syllabus index with exactly 14 classes and 85 files', () => {
    const index = getSyllabusIndex()
    expect(index.academicYear).toBe('2026-27')
    expect(index.totalClasses).toBe(14)
    expect(index.totalFiles).toBe(85)
    expect(index.classes).toHaveLength(14)

    const all = getAllSyllabusClasses()
    expect(all).toHaveLength(14)
  })

  it('matches all classes defined in CLASSES in lib/classes.ts', () => {
    const manifestClasses = getAllSyllabusClasses()
    const manifestSlugs = manifestClasses.map((c) => c.slug)
    const officialSlugs = CLASSES.map((c) => c.slug)

    expect(manifestSlugs).toEqual(officialSlugs)
  })

  it('has exact expected file counts per class with no duplicates', () => {
    const manifestClasses = getAllSyllabusClasses()

    let totalComputedFiles = 0
    const allUrls = new Set<string>()

    for (const c of manifestClasses) {
      const expectedCount = EXPECTED_COUNTS[c.slug]
      expect(expectedCount).toBeDefined()
      expect(c.items.length).toBe(expectedCount)
      expect(c.totalFiles).toBe(expectedCount)
      totalComputedFiles += c.items.length

      // Ensure no duplicate subject slugs or URLs within class
      const subjectSlugs = new Set<string>()
      for (const item of c.items) {
        expect(subjectSlugs.has(item.subjectSlug)).toBe(false)
        subjectSlugs.add(item.subjectSlug)

        expect(allUrls.has(item.url)).toBe(false)
        allUrls.add(item.url)
      }
    }

    expect(totalComputedFiles).toBe(85)
    expect(allUrls.size).toBe(85)
  })

  it('verifies all 85 physical files exist in public/documents/syllabus and are non-empty', () => {
    const manifestClasses = getAllSyllabusClasses()
    const publicDir = path.resolve(process.cwd(), 'public')

    for (const c of manifestClasses) {
      for (const item of c.items) {
        const filePath = path.join(publicDir, item.url.replace(/^\//, ''))
        expect(fs.existsSync(filePath), `File must exist: ${filePath}`).toBe(true)

        const stat = fs.statSync(filePath)
        expect(stat.size).toBeGreaterThan(0)
        expect(stat.size).toBe(item.fileSizeBytes)
      }
    }
  })

  it('returns undefined for non-existent class slug', () => {
    expect(getSyllabusForClass('non-existent-class')).toBeUndefined()
    expect(getSyllabusForClass('grade-1')).toBeUndefined()
  })

  it('preserves flagged items verbatim (B.ST, CS, SAC, Year 6 overview)', () => {
    const y8 = getSyllabusForClass('year-8')!
    const bst = y8.items.find((i) => i.subjectCode === 'B.ST')
    expect(bst).toBeDefined()
    expect(bst?.displayName).toBe('B.ST')
    expect(bst?.flag).toContain('Eva confirmation needed')

    const y9 = getSyllabusForClass('year-9')!
    const cs = y9.items.find((i) => i.subjectCode === 'CS')
    expect(cs).toBeDefined()
    expect(cs?.displayName).toBe('CS')

    const sac = y9.items.find((i) => i.subjectCode === 'SAC')
    expect(sac).toBeDefined()
    expect(sac?.displayName).toBe('SAC')

    const y6 = getSyllabusForClass('year-6')!
    const y6Overview = y6.items.find((i) => i.subjectCode === 'SYLLABUS-OVERVIEW')
    expect(y6Overview).toBeDefined()
    expect(y6Overview?.displayName).toBe('Year 6 Syllabus Overview')
  })
})
