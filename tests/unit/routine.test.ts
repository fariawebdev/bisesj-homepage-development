import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { getRoutineMode, isRoutineLocked, getRoutineForClass } from '@/lib/routine'
import { generateStaticParams, generateMetadata } from '@/app/[locale]/routine/[class]/page'
import { CLASSES } from '@/lib/classes'
import { SUPPORTED_LOCALES } from '@/lib/i18n'
import fixtureData from '@/tests/fixtures/routine-year-7.json'

describe('S3-04: Routine Architecture, Modes & Dynamic Routes', () => {
  const originalEnv = process.env.ROUTINE_MODE

  beforeEach(() => {
    delete process.env.ROUTINE_MODE
  })

  afterEach(() => {
    if (originalEnv) {
      process.env.ROUTINE_MODE = originalEnv
    } else {
      delete process.env.ROUTINE_MODE
    }
  })

  it('defaults to locked mode when ROUTINE_MODE is not set', () => {
    expect(getRoutineMode()).toBe('locked')
    expect(isRoutineLocked()).toBe(true)
  })

  it('respects ROUTINE_MODE="open" environment override', () => {
    process.env.ROUTINE_MODE = 'open'
    expect(getRoutineMode()).toBe('open')
    expect(isRoutineLocked()).toBe(false)
  })

  it('respects ROUTINE_MODE="locked" environment override', () => {
    process.env.ROUTINE_MODE = 'locked'
    expect(getRoutineMode()).toBe('locked')
    expect(isRoutineLocked()).toBe(true)
  })

  it('retrieves class routine from Year 7 fixture when open', () => {
    const y7 = getRoutineForClass('year-7', fixtureData as any)
    expect(y7).toBeDefined()
    expect(y7?.label).toBe('Year 7')
    expect(y7?.schedule).toHaveLength(2)
    expect(y7?.schedule![0].day).toBe('Sunday')
    expect(y7?.schedule![0].periods).toHaveLength(3)
    expect(y7?.schedule![0].periods[0].subject).toBe('Mathematics')
  })

  it('returns undefined for non-existent class in routine manifest', () => {
    const nonexistent = getRoutineForClass('non-existent-class', fixtureData as any)
    expect(nonexistent).toBeUndefined()
  })

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
    const metaY7 = await generateMetadata({
      params: Promise.resolve({ locale: 'en', class: 'year-7' }),
    })
    expect(metaY7.title).toBe('Year 7 Routine & Timetable | BISESJ')
    expect(metaY7.description).toContain('Year 7')

    const metaInvalid = await generateMetadata({
      params: Promise.resolve({ locale: 'en', class: 'unknown-class' }),
    })
    expect(metaInvalid.title).toBe('Class Not Found | BISESJ')
  })
})
