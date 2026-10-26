import { Fraunces, Plus_Jakarta_Sans, Noto_Sans_Arabic, Hind_Siliguri } from 'next/font/google'
import type { Locale } from '@/lib/i18n'

export const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz', 'SOFT'],
})

export const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
  preload: false,
})

export const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-bengali',
  display: 'swap',
  preload: false,
})

/**
 * Returns font variable classes based strictly on the current language route.
 * English routes only load Fraunces and Plus Jakarta Sans.
 * Arabic route loads Noto Sans Arabic.
 * Bengali route loads Hind Siliguri.
 */
export function getRouteFontVariables(locale: Locale): string {
  const base = `${fraunces.variable} ${jakarta.variable}`
  if (locale === 'ar') {
    return `${base} ${notoArabic.variable}`
  }
  if (locale === 'bn') {
    return `${base} ${hindSiliguri.variable}`
  }
  return base
}
