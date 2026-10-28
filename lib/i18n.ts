import enMessages from '@/messages/en.json'
import arMessages from '@/messages/ar.json'
import bnMessages from '@/messages/bn.json'

export const SUPPORTED_LOCALES = ['en', 'ar', 'bn'] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'

export const LOCALE_CONFIG: Record<
  Locale,
  {
    code: Locale
    label: string
    name: string
    dir: 'ltr' | 'rtl'
    fontVariable: string
  }
> = {
  en: {
    code: 'en',
    label: 'EN',
    name: 'English',
    dir: 'ltr',
    fontVariable: '--font-body',
  },
  ar: {
    code: 'ar',
    label: 'عربي',
    name: 'العربية',
    dir: 'rtl',
    fontVariable: '--font-arabic',
  },
  bn: {
    code: 'bn',
    label: 'বাংলা',
    name: 'বাংলা',
    dir: 'ltr',
    fontVariable: '--font-bengali',
  },
}

export function isLocale(value: string): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale)
}

export function getLocaleDirection(locale: Locale): 'ltr' | 'rtl' {
  return LOCALE_CONFIG[locale]?.dir ?? 'ltr'
}

/**
 * Feature flag for Arabic and Bengali multilingual support.
 * In development, multilingual routes and switcher options are enabled for testing.
 * In production, multilingual is disabled by default until Sprint 7 unless NEXT_PUBLIC_ENABLE_MULTILINGUAL is 'true'.
 */
export function isMultilingualEnabled(): boolean {
  if (process.env.NEXT_PUBLIC_ENABLE_MULTILINGUAL === 'true') {
    return true
  }
  return process.env.NODE_ENV !== 'production'
}

export function isLocaleEnabled(locale: Locale): boolean {
  if (locale === 'en') return true
  return isMultilingualEnabled()
}

export type Messages = typeof enMessages

const MESSAGES_MAP: Record<Locale, Messages> = {
  en: enMessages,
  ar: arMessages,
  bn: bnMessages,
}

export function getMessages(locale: Locale): Messages {
  return MESSAGES_MAP[locale] ?? MESSAGES_MAP.en
}
