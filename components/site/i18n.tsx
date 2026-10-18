'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { LOCALES, UI, type Locale } from '@/src/content'

type LocaleContextValue = {
  locale: Locale
  dir: 'ltr' | 'rtl'
  t: (typeof UI)[Locale]
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en')
  const dir = LOCALES.find((l) => l.code === locale)?.dir ?? 'ltr'

  // Keep <html lang/dir> in sync so fonts, screen readers and RTL layout follow the choice.
  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = dir
  }, [locale, dir])

  const value = useMemo(() => ({ locale, dir, t: UI[locale], setLocale }), [locale, dir])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used inside <LocaleProvider>')
  return ctx
}
