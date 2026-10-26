import Link from 'next/link'
import { getMessages, type Locale, LOCALE_CONFIG } from '@/lib/i18n'

export function LocalePlaceholder({ locale }: { locale: Locale }) {
  const messages = getMessages(locale)
  const isRtl = LOCALE_CONFIG[locale]?.dir === 'rtl'

  return (
    <section
      aria-label="Multilingual preview status"
      className="border-b border-gold/30 bg-gold/10 px-6 py-8"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="mx-auto max-w-4xl text-center">
        <span className="inline-block rounded-full bg-forest px-3 py-1 text-xs font-semibold text-primary-foreground">
          {messages.placeholder.badge}
        </span>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-forest sm:text-3xl">
          {messages.placeholder.title}
        </h1>
        <p className="mt-2 text-base text-muted-foreground sm:text-lg">
          {messages.placeholder.description}
        </p>
        <div className="mt-4 flex items-center justify-center gap-3">
          <Link
            href="/en"
            className="rounded-full bg-forest px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-forest-deep"
          >
            {locale === 'ar' ? 'العودة إلى الإنجليزية (EN)' : 'Back to English (EN)'}
          </Link>
        </div>
      </div>
    </section>
  )
}
