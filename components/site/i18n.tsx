'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  type Locale,
  LOCALE_CONFIG,
  getMessages,
  type Messages,
} from '@/lib/i18n'

type LocaleContextValue = {
  locale: Locale
  dir: 'ltr' | 'rtl'
  t: Messages
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({
  children,
  initialLocale = 'en',
}: {
  children: React.ReactNode
  initialLocale?: Locale
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale)
  const dir = LOCALE_CONFIG[locale]?.dir ?? 'ltr'

  // Keep <html lang/dir> in sync when locale changes
  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = dir
  }, [locale, dir])

  useEffect(() => {
    setLocale(initialLocale)
  }, [initialLocale])

  const value = useMemo(
    () => ({
      locale,
      dir,
      t: getMessages(locale),
      setLocale,
    }),
    [locale, dir]
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used inside <LocaleProvider>')
  return ctx
}
