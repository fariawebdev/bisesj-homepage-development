import { describe, it, expect } from 'vitest'
import {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  isLocale,
  getLocaleDirection,
  isMultilingualEnabled,
  isLocaleEnabled,
  getMessages,
  LOCALE_CONFIG,
} from '@/lib/i18n'
import { getRouteFontVariables } from '@/components/site/locale-fonts'

describe('S1-06 Language Scaffolding & i18n', () => {
  it('defines supported locales with en as default', () => {
    expect(SUPPORTED_LOCALES).toEqual(['en', 'ar', 'bn'])
    expect(DEFAULT_LOCALE).toBe('en')
    expect(isLocale('en')).toBe(true)
    expect(isLocale('ar')).toBe(true)
    expect(isLocale('bn')).toBe(true)
    expect(isLocale('fr')).toBe(false)
  })

  it('assigns rtl to Arabic and ltr to English and Bengali', () => {
    expect(getLocaleDirection('ar')).toBe('rtl')
    expect(getLocaleDirection('en')).toBe('ltr')
    expect(getLocaleDirection('bn')).toBe('ltr')
    expect(LOCALE_CONFIG.ar.dir).toBe('rtl')
  })

  it('loads valid message dictionaries for all supported locales', () => {
    for (const locale of SUPPORTED_LOCALES) {
      const messages = getMessages(locale)
      expect(messages).toBeDefined()
      expect(messages.nav).toBeDefined()
      expect(messages.nav.home).toBeTruthy()
      expect(messages.nav.about).toBeTruthy()
      expect(messages.nav.syllabus).toBeTruthy()
      expect(messages.nav.contact).toBeTruthy()
      expect(messages.hero).toBeDefined()
      expect(messages.hero.title).toHaveLength(2)
      expect(messages.placeholder).toBeDefined()
      expect(messages.placeholder.badge).toBeTruthy()
    }
  })

  it('manages multilingual feature flag and locale availability', () => {
    expect(isLocaleEnabled('en')).toBe(true)
    // In dev environment, isMultilingualEnabled is true
    const isMultilingual = isMultilingualEnabled()
    expect(typeof isMultilingual).toBe('boolean')
    if (isMultilingual) {
      expect(isLocaleEnabled('ar')).toBe(true)
      expect(isLocaleEnabled('bn')).toBe(true)
    }
  })

  it('loads Noto Sans Arabic and Hind Siliguri only on their respective routes', () => {
    const enFonts = getRouteFontVariables('en')
    expect(enFonts).toContain('--font-fraunces')
    expect(enFonts).toContain('--font-body')
    expect(enFonts).not.toContain('--font-arabic')
    expect(enFonts).not.toContain('--font-bengali')

    const arFonts = getRouteFontVariables('ar')
    expect(arFonts).toContain('--font-fraunces')
    expect(arFonts).toContain('--font-body')
    expect(arFonts).toContain('--font-arabic')
    expect(arFonts).not.toContain('--font-bengali')

    const bnFonts = getRouteFontVariables('bn')
    expect(bnFonts).toContain('--font-fraunces')
    expect(bnFonts).toContain('--font-body')
    expect(bnFonts).not.toContain('--font-arabic')
    expect(bnFonts).toContain('--font-bengali')
  })
})
