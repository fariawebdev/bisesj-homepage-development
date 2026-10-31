import { describe, it, expect } from 'vitest'
import { generateStaticParams, generateMetadata } from '@/app/[locale]/syllabus/[class]/page'
import { CLASSES } from '@/lib/classes'
import { SUPPORTED_LOCALES } from '@/lib/i18n'
import { getSyllabusForClass } from '@/lib/syllabus'

describe('S3-03: Syllabus Dynamic Routes & Static Params', () => {
  it('generates static params for all 14 classes across all supported locales (42 routes total)', async () => {
    const params = await generateStaticParams()
    expect(params).toHaveLength(CLASSES.length * SUPPORTED_LOCALES.length)
    expect(params).toHaveLength(42)

    for (const locale of SUPPORTED_LOCALES) {
      for (const c of CLASSES) {
        const found = params.find((p) => p.locale === locale && p.class === c.slug)
        expect(found, `Missing static param for ${locale}/${c.slug}`).toBeDefined()
      }
    }
  })

  it('generates metadata properly for valid and invalid classes', async () => {
    const metaY6 = await generateMetadata({
      params: Promise.resolve({ locale: 'en', class: 'year-6' }),
    })
    expect(metaY6.title).toBe('Year 6 Syllabus | BISESJ')
    expect(metaY6.description).toContain('Year 6')

    const metaY11 = await generateMetadata({
      params: Promise.resolve({ locale: 'en', class: 'year-11' }),
    })
    expect(metaY11.title).toBe('Year 11 (AS Level) Syllabus | BISESJ')

    const metaInvalid = await generateMetadata({
      params: Promise.resolve({ locale: 'en', class: 'invalid-class-slug' }),
    })
    expect(metaInvalid.title).toBe('Class Not Found | BISESJ')
  })

  it('ensures every class has non-empty syllabus items with valid paths', () => {
    for (const c of CLASSES) {
      const data = getSyllabusForClass(c.slug)
      expect(data, `Class ${c.slug} must have syllabus data`).toBeDefined()
      expect(data!.items.length).toBeGreaterThan(0)

      for (const item of data!.items) {
        expect(item.url).toBe(`/documents/syllabus/${c.slug}/${item.fileName}`)
        expect(item.fileSizeBytes).toBeGreaterThan(0)
        expect(item.fileSizeFormatted).toMatch(/^[0-9,]+\s*KB$/)
      }
    }
  })
})
