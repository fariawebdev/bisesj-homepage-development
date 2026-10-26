'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Mail, Menu, Phone, X, CalendarDays } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ASSETS } from '@/src/assets'
import { CONTACT } from '@/src/links'
import { LOCALES, NAV_ITEMS, SCHOOL, type Locale } from '@/src/content'
import { isLocaleEnabled } from '@/lib/i18n'
import { useLocale } from './i18n'
import { SmartLink } from './smart-link'
import { Magnetic } from './motion'
import { SafeImage } from './safe-image'

/* ------------------------------ Announcement ------------------------------ */

function AnnouncementBar() {
  const { t } = useLocale()
  return (
    <div className="bg-forest-deep text-primary-foreground">
      <SmartLink
        to="registration"
        label={t.announcement}
        className="group mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2.5 text-center text-sm font-medium focus-visible:outline-2 focus-visible:outline-gold"
      >
        <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-brand-red" />
        <span>{t.announcement}</span>
        <ArrowRight
          aria-hidden="true"
          className="size-4 text-gold transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
        />
      </SmartLink>
    </div>
  )
}

/* ------------------------------- Utility bar ------------------------------ */

function useTodayLabel() {
  const [label, setLabel] = useState<string | null>(null)

  // Rendered after mount only, so server and client markup never disagree.
  useEffect(() => {
    const now = new Date()
    const gregorian = new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(now)
    try {
      const hijri = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(now)
      setLabel(`${hijri} · ${gregorian}`)
    } catch {
      setLabel(gregorian)
    }
  }, [])

  return label
}

function UtilityBar() {
  const today = useTodayLabel()
  return (
    <div className="hidden border-b border-border/70 bg-background md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-6">
          <a
            href={CONTACT.phoneHref}
            className="inline-flex items-center gap-2 transition-colors hover:text-primary"
            aria-label={`Call ${CONTACT.phoneDisplay}`}
          >
            <Phone aria-hidden="true" className="size-3.5 text-gold" />
            <span dir="ltr">{CONTACT.phoneDisplay}</span>
          </a>
          <a
            href={CONTACT.emailHref}
            className="inline-flex items-center gap-2 transition-colors hover:text-primary"
            aria-label={`Email ${CONTACT.email}`}
          >
            <Mail aria-hidden="true" className="size-3.5 text-gold" />
            {CONTACT.email}
          </a>
        </div>
        <p className="inline-flex min-h-4 items-center gap-2" aria-live="off">
          <CalendarDays aria-hidden="true" className="size-3.5 text-gold" />
          {today && <time dir="ltr">{today}</time>}
        </p>
      </div>
    </div>
  )
}

/* ---------------------------- Language switcher --------------------------- */

function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const visibleLocales = LOCALES.filter((l) => isLocaleEnabled(l.code))

  const handleSelectLocale = (newLocale: Locale) => {
    setLocale(newLocale)
    if (pathname) {
      const segments = pathname.split('/')
      if (segments[1] && (LOCALES.map((l) => l.code) as string[]).includes(segments[1])) {
        segments[1] = newLocale
        router.push(segments.join('/') || `/${newLocale}`)
      } else {
        router.push(`/${newLocale}${pathname === '/' ? '' : pathname}`)
      }
    } else {
      router.push(`/${newLocale}`)
    }
  }

  return (
    <div
      role="group"
      aria-label="Choose language"
      className={cn('flex items-center rounded-full border border-border bg-card/70 p-0.5', className)}
    >
      {visibleLocales.map((l) => (
        <button
          key={l.code}
          type="button"
          lang={l.code}
          onClick={() => handleSelectLocale(l.code)}
          aria-pressed={locale === l.code}
          aria-label={l.name}
          className={cn(
            'rounded-full px-2.5 py-1 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-gold',
            locale === l.code ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-primary',
          )}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}

/* --------------------------------- Navbar --------------------------------- */

function Navbar() {
  const { t } = useLocale()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <div className="sticky top-0 z-50 px-3 pt-3 md:px-6">
      <nav
        aria-label="Main"
        className={cn(
          'glass mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-[20px] border border-white/60 px-3 py-2.5 transition-shadow duration-500 md:px-4',
          scrolled ? 'shadow-lift' : 'shadow-soft',
        )}
      >
        <SmartLink to="home" label={`${SCHOOL.name}, home`} className="flex items-center gap-3 rounded-xl">
          <SafeImage
            src={ASSETS.logo}
            alt=""
            priority
            wrapperClassName="size-11 shrink-0 rounded-full bg-transparent [background:none]"
            className="object-contain"
          />
          <span className="flex flex-col leading-none">
            <span className="font-serif text-lg font-semibold tracking-tight text-primary">BISESJ</span>
            <span className="mt-1 hidden text-[11px] font-medium text-muted-foreground sm:block">
              English Section · Jeddah
            </span>
          </span>
        </SmartLink>

        <ul className="hidden items-center gap-1 xl:flex">
          {NAV_ITEMS.map((key) => (
            <li key={key}>
              <SmartLink
                to={key}
                label={t.nav[key]}
                className="rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-primary/5 hover:text-primary focus-visible:outline-2 focus-visible:outline-gold"
              >
                {t.nav[key]}
              </SmartLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LanguageSwitcher className="hidden sm:flex" />
          <Magnetic className="hidden md:inline-flex">
            <SmartLink
              to="registration"
              label={t.applyNow}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-forest-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              {t.applyNow}
              <span aria-hidden="true" className="size-1.5 rounded-full bg-gold" />
            </SmartLink>
          </Magnetic>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t.menu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-card text-primary xl:hidden"
          >
            <Menu aria-hidden="true" className="size-5" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[70] flex flex-col bg-primary text-primary-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center justify-between px-5 py-5">
              <span className="font-serif text-xl">BISESJ</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t.close}
                autoFocus
                className="inline-flex size-11 items-center justify-center rounded-full border border-white/20"
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            </div>
            <div className="gold-rule mx-5 opacity-60" />
            <ul className="flex flex-1 flex-col gap-1 overflow-y-auto px-5 py-6">
              {NAV_ITEMS.map((key, i) => (
                <motion.li
                  key={key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <SmartLink
                    to={key}
                    label={t.nav[key]}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-serif text-3xl tracking-tight transition-colors hover:text-gold"
                  >
                    {t.nav[key]}
                  </SmartLink>
                </motion.li>
              ))}
            </ul>
            <div className="flex flex-col gap-4 px-5 pb-8">
              <LanguageSwitcher className="self-start border-white/20 bg-white/10 [&_button[aria-pressed=false]]:text-primary-foreground/70 [&_button[aria-pressed=true]]:bg-gold [&_button[aria-pressed=true]]:text-primary" />
              <SmartLink
                to="registration"
                label={t.applyNow}
                className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-4 text-base font-semibold text-primary"
              >
                {t.applyNow}
              </SmartLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function SiteHeader() {
  return (
    <>
      <AnnouncementBar />
      <UtilityBar />
      <Navbar />
    </>
  )
}
