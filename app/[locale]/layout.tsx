import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { ASSETS } from '@/src/assets'
import { CONTACT, LINKS } from '@/src/links'
import { SCHOOL } from '@/src/content'
import {
  SUPPORTED_LOCALES,
  isLocale,
  getLocaleDirection,
  type Locale,
} from '@/lib/i18n'
import { getRouteFontVariables } from '@/components/site/locale-fonts'
import { LocaleProvider } from '@/components/site/i18n'
import '../globals.css'

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }))
}

const TITLE = 'Bangladesh International School English Section, Jeddah | Cambridge IGCSE & A Level'
const DESCRIPTION =
  "Bangladesh International School, English Section, Jeddah (BISESJ): a Cambridge International School since 1993, offering IGCSE and AS & A Level education for Jeddah's Bangladeshi and international community. Admissions open for 2026-27."

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bisesjsa.com'),
  title: TITLE,
  description: DESCRIPTION,
  generator: 'v0.app',
  applicationName: 'BISESJ',
  keywords: [
    'Bangladesh International School Jeddah',
    'BISESJ',
    'Cambridge IGCSE Jeddah',
    'A Level Jeddah',
    'English Section',
    'international school Jeddah',
  ],
  openGraph: {
    type: 'website',
    title: TITLE,
    description: DESCRIPTION,
    siteName: SCHOOL.name,
    images: [{ url: ASSETS.hero, alt: 'BISESJ campus in Jeddah' }],
    locale: 'en_US',
    alternateLocale: ['ar_SA', 'bn_BD'],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [ASSETS.hero],
  },
  icons: { icon: ASSETS.logo, apple: ASSETS.logo },
}

export const viewport: Viewport = {
  themeColor: '#0B3D2E',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'School',
  name: SCHOOL.name,
  alternateName: SCHOOL.shortName,
  foundingDate: String(SCHOOL.founded),
  url: 'https://bisesjsa.com/',
  logo: ASSETS.logo,
  image: ASSETS.hero,
  telephone: CONTACT.phoneDisplay,
  email: CONTACT.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Jeddah',
    addressCountry: 'SA',
  },
  hasMap: LINKS.map.href,
  sameAs: [LINKS.facebook.href, LINKS.youtube.href, LINKS.instagram.href],
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params

  if (!isLocale(rawLocale)) {
    notFound()
  }

  const locale = rawLocale as Locale
  const dir = getLocaleDirection(locale)
  const fontVariables = getRouteFontVariables(locale)

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${fontVariables} bg-background`}
    >
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LocaleProvider initialLocale={locale}>{children}</LocaleProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
