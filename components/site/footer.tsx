'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp, ArrowUpRight, Mail, MessageCircle, Phone } from 'lucide-react'
import { ASSETS } from '@/lib/assets'
import { CONTACT, type LinkKey } from '@/lib/links'
import { FOOTER, GALLERY, SCHOOL } from '@/lib/content'
import { SITE_CONFIG } from '@/lib/site-config'
import { useLocale } from './i18n'
import { SafeImage } from './safe-image'
import { SmartLink } from './smart-link'

const SOCIALS: { key: LinkKey; label: string; path: string }[] = [
  {
    key: 'facebook',
    label: `${SITE_CONFIG.shortName} on Facebook`,
    path: 'M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v1.8H7.6v3.3h2.8V22H14V11.8h2.8l.4-3.3H14Z',
  },
  {
    key: 'youtube',
    label: `${SITE_CONFIG.shortName} on YouTube`,
    path: 'M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.7 15V9l5.8 3-5.8 3Z',
  },
  {
    key: 'instagram',
    label: `${SITE_CONFIG.shortName} on Instagram`,
    path: 'M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3c1.2-.1 1.6-.1 4.8-.1ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm5.2-9.6a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z',
  },
]

export function SiteFooter() {
  return (
    <footer className="bg-forest-deep pb-28 text-primary-foreground md:pb-0">
      {/* Instagram preview strip */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-12 md:flex-row md:items-center md:px-6">
          <SmartLink
            to="instagram"
            label={FOOTER.instagramLabel}
            className="inline-flex shrink-0 items-center gap-2 font-serif text-2xl hover:text-gold-soft"
          >
            @bisesjsa
            <ArrowUpRight aria-hidden="true" className="size-5 text-gold rtl:-scale-x-100" />
          </SmartLink>
          <ul className="grid flex-1 grid-cols-3 gap-2 sm:grid-cols-6" aria-label="Instagram preview">
            {GALLERY.map((g) => (
              <li key={g.src}>
                <SafeImage src={g.src} alt="" wrapperClassName="aspect-square rounded-xl opacity-80" />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-16 sm:grid-cols-2 md:px-6 lg:grid-cols-4">
        {/* Column 1: Identity & Socials */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-14 items-center justify-center rounded-full bg-background p-1">
              <SafeImage
                src={ASSETS.logo}
                alt=""
                wrapperClassName="size-full rounded-full [background:none]"
                className="object-contain"
              />
            </span>
            <div className="flex flex-col leading-tight">
              <span className="font-serif text-2xl font-bold tracking-tight">{SITE_CONFIG.shortName}</span>
              <span className="text-xs font-medium text-gold-soft">Est. {SITE_CONFIG.foundedYear}</span>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-primary-foreground/75">
            {SITE_CONFIG.curriculum}
          </p>
          <ul className="mt-2 flex gap-3" aria-label="Social media">
            {SOCIALS.map((s) => (
              <li key={s.key}>
                <SmartLink
                  to={s.key}
                  label={s.label}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-gold hover:bg-gold hover:text-primary focus-visible:outline-2 focus-visible:outline-gold"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="currentColor">
                    <path d={s.path} />
                  </svg>
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2: Academics */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
            {FOOTER.columns[0].title}
          </h2>
          <ul className="mt-5 flex flex-col gap-3">
            {FOOTER.columns[0].links.map((l) => (
              <li key={l.label}>
                <SmartLink
                  to={l.link}
                  label={l.label}
                  className="text-sm text-primary-foreground/80 transition-colors hover:text-gold-soft"
                >
                  {l.label}
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: School Life */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
            {FOOTER.columns[1].title}
          </h2>
          <ul className="mt-5 flex flex-col gap-3">
            {FOOTER.columns[1].links.map((l) => (
              <li key={l.label}>
                <SmartLink
                  to={l.link}
                  label={l.label}
                  className="text-sm text-primary-foreground/80 transition-colors hover:text-gold-soft"
                >
                  {l.label}
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact & Inquiries */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
            {FOOTER.columns[2].title}
          </h2>
          <ul className="mt-5 flex flex-col gap-3">
            {FOOTER.columns[2].links.map((l) => (
              <li key={l.label}>
                <SmartLink
                  to={l.link}
                  label={l.label}
                  className="text-sm text-primary-foreground/80 transition-colors hover:text-gold-soft"
                >
                  {l.label}
                </SmartLink>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-col gap-2.5 border-t border-white/10 pt-4 text-xs text-primary-foreground/80">
            <a
              href={SITE_CONFIG.contact.officialPhone.href}
              className="inline-flex items-center gap-2 transition-colors hover:text-gold-soft"
              aria-label={`Call ${SITE_CONFIG.contact.officialPhone.display}`}
            >
              <Phone aria-hidden="true" className="size-3.5 text-gold" />
              <span dir="ltr">{SITE_CONFIG.contact.officialPhone.display}</span>
            </a>
            <a
              href={SITE_CONFIG.contact.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-gold-soft"
              aria-label={`WhatsApp ${SITE_CONFIG.contact.whatsapp.display}`}
            >
              <MessageCircle aria-hidden="true" className="size-3.5 text-gold" />
              <span dir="ltr">{SITE_CONFIG.contact.whatsapp.display}</span>
            </a>
            <a
              href={SITE_CONFIG.contact.inquiryEmail.href}
              className="inline-flex items-center gap-2 transition-colors hover:text-gold-soft"
              aria-label={`Email ${SITE_CONFIG.contact.inquiryEmail.address}`}
            >
              <Mail aria-hidden="true" className="size-3.5 text-gold" />
              <span>{SITE_CONFIG.contact.inquiryEmail.address}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pb-24 md:pb-0">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between md:px-6">
          <p>{FOOTER.copyright}</p>
          <div className="flex flex-wrap items-center gap-2">
            <span>{FOOTER.tagline}</span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-gold-soft">{SITE_CONFIG.footer.credit}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ------------------------------ Floating UI ------------------------------- */

export function FloatingActions() {
  const { t } = useLocale()
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 800)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Desktop / tablet floating buttons */}
      <div className="fixed bottom-6 end-6 z-40 hidden flex-col items-center gap-3 md:flex">
        <AnimatePresence>
          {showTop && (
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label={t.backToTop}
              className="inline-flex size-12 items-center justify-center rounded-full border border-border bg-card text-primary shadow-lift hover:bg-secondary"
            >
              <ArrowUp aria-hidden="true" className="size-5" />
            </motion.button>
          )}
        </AnimatePresence>
        <SmartLink
          to="whatsapp"
          label={`Chat with ${SITE_CONFIG.shortName} on ${t.whatsapp}`}
          className="inline-flex size-14 items-center justify-center rounded-full bg-[#1F8F4E] text-white shadow-lift transition-transform hover:scale-105"
        >
          <MessageCircle aria-hidden="true" className="size-6" />
        </SmartLink>
      </div>

      {/* Mobile back-to-top sits above the action bar */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label={t.backToTop}
            className="fixed bottom-24 end-4 z-40 inline-flex size-11 items-center justify-center rounded-full border border-border bg-card text-primary shadow-lift md:hidden"
          >
            <ArrowUp aria-hidden="true" className="size-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile sticky action bar */}
      <nav
        aria-label="Quick actions"
        className="glass fixed inset-x-3 bottom-3 z-40 grid grid-cols-3 gap-2 rounded-[20px] border border-white/60 p-2 shadow-lift md:hidden"
        style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
      >
        <a
          href={CONTACT.phoneHref}
          aria-label={`${t.call} ${CONTACT.phoneDisplay}`}
          className="flex flex-col items-center justify-center gap-1 rounded-2xl py-2 text-xs font-semibold text-primary hover:bg-primary/5"
        >
          <Phone aria-hidden="true" className="size-5" />
          {t.call}
        </a>
        <SmartLink
          to="whatsapp"
          label={t.whatsapp}
          className="flex flex-col items-center justify-center gap-1 rounded-2xl py-2 text-xs font-semibold text-primary hover:bg-primary/5"
        >
          <MessageCircle aria-hidden="true" className="size-5" />
          {t.whatsapp}
        </SmartLink>
        <SmartLink
          to="registration"
          label={t.applyNow}
          className="flex items-center justify-center rounded-2xl bg-primary px-2 py-2 text-center text-xs font-semibold text-primary-foreground"
        >
          {t.applyNow}
        </SmartLink>
      </nav>
    </>
  )
}
